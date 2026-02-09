import { useAuthStore } from '@/entities/auth/store/useAuthStore'
import { useScrollLock } from '@/shared/hooks/useScrollLock'
import { Button } from '@/shared/ui/button'
import { CodeTitle } from '@/shared/ui/code-title'
import { IconButton } from '@/shared/ui/icon-button'
import { useLoginModalStore } from '@/widgets/login-modal/store/useLoginModalStore'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './LoginModal.module.scss'

type EmailFormData = {
  email: string
  rememberMe: boolean
}

type CodeFormData = {
  code: string
}

type LoginStep = 'email' | 'code'

const CODE_LENGTH = 6
const RESET_DELAY = 300

const EMAIL_VALIDATION = {
  required: 'Введите email',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Некорректный email',
  },
}

const CODE_VALIDATION = {
  required: 'Введите код',
  minLength: {
    value: CODE_LENGTH,
    message: `Код должен содержать ${CODE_LENGTH} цифр`,
  },
}

export const LoginModal = () => {
  const isLoginModalOpen = useLoginModalStore((state) => state.isLoginModalOpen)
  const closeLoginModal = useLoginModalStore((state) => state.closeLoginModal)

  const sendCode = useAuthStore((state) => state.sendCode)
  const login = useAuthStore((state) => state.login)
  const isLoading = useAuthStore((state) => state.isLoading)

  const [step, setStep] = useState<LoginStep>('email')
  const [savedEmail, setSavedEmail] = useState('')
  const [savedRememberMe, setSavedRememberMe] = useState(false)

  useScrollLock(isLoginModalOpen)

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
    reset: resetEmail,
    setError: setEmailError,
    watch: watchEmail,
  } = useForm<EmailFormData>({
    defaultValues: {
      email: '',
      rememberMe: false,
    },
  })

  const {
    register: registerCode,
    handleSubmit: handleSubmitCode,
    formState: { errors: codeErrors },
    reset: resetCode,
    setError: setCodeError,
    watch: watchCode,
    setValue: setCodeValue,
    clearErrors: clearCodeErrors,
  } = useForm<CodeFormData>({
    defaultValues: {
      code: '',
    },
  })

  const emailValue = watchEmail('email')
  const codeValue = watchCode('code')

  useEffect(() => {
    if (!isLoginModalOpen) {
      const timeoutId = setTimeout(() => {
        setStep('email')
        resetEmail()
        resetCode()
        setSavedEmail('')
        setSavedRememberMe(false)
      }, RESET_DELAY)

      return () => clearTimeout(timeoutId)
    }
  }, [isLoginModalOpen, resetEmail, resetCode])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLoginModalOpen) {
        closeLoginModal()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isLoginModalOpen, closeLoginModal])

  const onEmailSubmit = async (data: EmailFormData) => {
    if (isLoading) return

    try {
      await sendCode(data.email)
      setSavedEmail(data.email)
      setSavedRememberMe(data.rememberMe)
      setStep('code')
      resetCode()
    } catch {
      setEmailError('root', {
        message: 'Не удалось отправить код. Проверьте правильность email.',
      })
    }
  }

  const onCodeSubmit = async (data: CodeFormData) => {
    if (isLoading || data.code.length < CODE_LENGTH) return

    try {
      await login({
        email: savedEmail,
        code: data.code,
        rememberMe: savedRememberMe,
      })
      closeLoginModal()
    } catch (error) {
      let errorMessage = 'Неверный код. Попробуйте снова.'

      if (error instanceof Error) {
        const isTokenError =
          error.message.includes('Refresh token') ||
          error.message.includes('token') ||
          error.message.includes('Invalid code')

        if (!isTokenError) {
          errorMessage = 'Ошибка входа. Попробуйте позже.'
        }
      }

      setCodeError('root', { message: errorMessage })
    }
  }

  const handleCodeChange = (value: string) => {
    const onlyNums = value.replace(/\D/g, '').slice(0, CODE_LENGTH)
    setCodeValue('code', onlyNums)
    if (codeErrors.root) {
      clearCodeErrors('root')
    }
  }

  const handleBackToEmail = () => {
    setStep('email')
    resetCode()
  }

  const getErrorMessage = () => {
    if (step === 'email') {
      return emailErrors.root?.message || emailErrors.email?.message
    }
    return codeErrors.root?.message || codeErrors.code?.message
  }

  const errorMessage = getErrorMessage()

  if (!isLoginModalOpen) return null

  return (
    <div className={styles.loginModal} role="dialog" aria-modal="true">
      <div
        className={styles.overlay}
        onClick={closeLoginModal}
        aria-label="Закрыть модальное окно"
      />
      <div className={styles.content}>
        <h2 className={styles.title}>
          {step === 'email' ? 'ВВЕДИТЕ ЭЛЕКТРОННУЮ ПОЧТУ' : 'ВВЕДИТЕ КОД'}
        </h2>

        <p className={styles.subtitle}>
          {step === 'email'
            ? 'Вход или регистрация по e-mail'
            : 'Мы отправили код на вашу почту. Введите 6 цифр.'}
        </p>

        {/* Ошибки */}
        {errorMessage && (
          <div className={styles.error}>
            <CodeTitle variant="error">{errorMessage}</CodeTitle>
          </div>
        )}

        {/* Email форма */}
        {step === 'email' ? (
          <form
            className={styles.form}
            onSubmit={handleSubmitEmail(onEmailSubmit)}
            noValidate
          >
            <div className={styles.field}>
              <label htmlFor="email-input">Электронная почта</label>
              <input
                id="email-input"
                className={styles.emailInput}
                type="email"
                placeholder="Введите ваш адрес электронной почты"
                disabled={isLoading}
                aria-invalid={!!emailErrors.email}
                {...registerEmail('email', EMAIL_VALIDATION)}
              />
            </div>

            <div className={styles.checkbox}>
              <input
                id="remember"
                type="checkbox"
                disabled={isLoading}
                {...registerEmail('rememberMe')}
              />
              <label htmlFor="remember">Запомнить</label>
            </div>

            <Button
              variant="green"
              size="lg"
              fullWidth
              disabled={isLoading || !emailValue}
              className={isLoading ? styles.loadingBtn : ''}
              type="submit"
            >
              {isLoading ? 'ОТПРАВЛЯЕМ...' : 'ПОЛУЧИТЬ КОД'}
            </Button>
          </form>
        ) : (
          // Код форма
          <form
            className={styles.form}
            onSubmit={handleSubmitCode(onCodeSubmit)}
          >
            <div className={styles.field}>
              <label htmlFor="code-input">КОД ИЗ ПИСЬМА</label>
              <input
                id="code-input"
                type="text"
                inputMode="numeric"
                placeholder="0 0 0 0 0 0"
                maxLength={CODE_LENGTH}
                autoFocus
                disabled={isLoading}
                className={styles.codeInput}
                aria-invalid={!!codeErrors.code}
                {...registerCode('code', {
                  ...CODE_VALIDATION,
                  onChange: (e) => handleCodeChange(e.target.value),
                })}
              />
            </div>

            <Button
              variant="green"
              fullWidth
              disabled={isLoading || (codeValue?.length ?? 0) < CODE_LENGTH}
              type="submit"
            >
              {isLoading ? 'ПРОВЕРЯЕМ...' : 'Войти в личный кабинет'}
            </Button>

            <button
              type="button"
              className={styles.backButton}
              onClick={handleBackToEmail}
              disabled={isLoading}
            >
              ← Изменить email
            </button>
          </form>
        )}

        <IconButton
          onClick={closeLoginModal}
          variant="default"
          className={styles.closeButton}
          aria-label="Закрыть окно авторизации"
        >
          <X strokeWidth={0.75} size={36} />
        </IconButton>
      </div>
    </div>
  )
}
