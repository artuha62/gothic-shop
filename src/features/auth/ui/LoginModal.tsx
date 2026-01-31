import { useAuthStore } from '@/entities/auth/store/useAuthStore'
import { useUIStore } from '@/shared/store/useUIStore'
import { Button } from '@/shared/ui/button'
import { useEffect, useState } from 'react'
import styles from './LoginModal.module.scss'

export const LoginModal = () => {
  const isLoginModalOpen = useUIStore((state) => state.isLoginModalOpen)
  const closeLoginModal = useUIStore((state) => state.closeLoginModal)

  const sendCode = useAuthStore((state) => state.sendCode)
  const login = useAuthStore((state) => state.login)
  const isLoading = useAuthStore((state) => state.isLoading)

  const [step, setStep] = useState<'email' | 'code'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoginModalOpen) {
      setTimeout(() => {
        setStep('email')
        setEmail('')
        setCode('')
        setError(null)
        setRememberMe(false)
      }, 0)
    }
  }, [isLoginModalOpen])

  const handleRequestCode = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!email || isLoading) return

    try {
      await sendCode(email)
      setStep('code')
    } catch {
      setError('Не удалось отправить код. Проверьте правильность email.')
    }
  }

  const handleVerifyAndLogin = async (
    event?: React.FormEvent,
    manualCode?: string
  ) => {
    event?.preventDefault()

    const finalCode = manualCode || code

    if (!finalCode || finalCode.length < 6 || isLoading) return
    try {
      await login({ email, code: finalCode, rememberMe })
      closeLoginModal()
      setStep('email')
      setEmail('')
      setCode('')
      setError(null)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Неверный код. Попробуй снова.')
      }
    }
  }

  const handleCodeChange = (value: string) => {
    const onlyNums = value.replace(/\D/g, '')
    setCode(onlyNums)
    if (onlyNums.length === 6) {
      void handleVerifyAndLogin(undefined, onlyNums)
    }
  }

  return (
    isLoginModalOpen && (
      <div className={styles.loginModal}>
        <div className={styles.overlay} onClick={closeLoginModal}></div>
        <div className={styles.content}>
          {isLoading && <div className={styles.loadingLine} />}

          <h2 className={styles.title}>
            {step === 'email' ? 'ВВЕДИТЕ ЭЛЕКТРОННУЮ ПОЧТУ' : 'ВВЕДИТЕ КОД'}
          </h2>

          {error && <p className={styles.errorMsg}>{error}</p>}

          <p className={styles.subtitle}>
            {step === 'email'
              ? 'Вход или регистрация по e-mail'
              : `Мы отправили код на вашу почту. Введите 6 цифр.`}
          </p>

          {step === 'email' ? (
            <form className={styles.form} onSubmit={handleRequestCode}>
              <div className={styles.field}>
                <label>Электронная почта</label>
                <input
                  className={styles.emailInput}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Введите ваш адрес электронной почты"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className={styles.checkbox}>
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <label htmlFor="remember">Запомнить</label>
              </div>

              <Button
                variant="green"
                size="lg"
                fullWidth
                disabled={isLoading || !email}
                className={isLoading ? styles.loadingBtn : ''}
              >
                {isLoading ? 'ОТПРАВЛЯЕМ...' : 'ПОЛУЧИТЬ КОД'}
              </Button>
            </form>
          ) : (
            <form className={styles.form} onSubmit={handleVerifyAndLogin}>
              <div className={styles.field}>
                <label>КОД ИЗ ПИСЬМА</label>
                <input
                  type="text"
                  value={code}
                  onChange={(event) => handleCodeChange(event.target.value)}
                  placeholder="0 0 0 0 0 0"
                  maxLength={6}
                  autoFocus
                  disabled={isLoading}
                  className={styles.codeInput}
                />
              </div>

              <Button
                variant="green"
                fullWidth
                disabled={isLoading || code.length < 6}
              >
                {isLoading ? 'ПРОВЕРЯЕМ...' : 'Войти в личный кабинет'}
              </Button>

              <button
                type="button"
                className={styles.backButton}
                onClick={() => {
                  setStep('email')
                  setCode('')
                }}
              >
                ← Изменить email
              </button>
            </form>
          )}
        </div>
      </div>
    )
  )
}
