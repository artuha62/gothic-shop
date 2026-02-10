import { formatCode } from '@/features/auth/verify-login-code/lib/formatCode'
import { useVerifyLoginCode } from '@/features/auth/verify-login-code/model/useVerifyLoginCode'
import { Button } from '@/shared/ui/button'
import { CodeTitle } from '@/shared/ui/code-title'
import styles from '@/widgets/login-modal/ui/LoginModal.module.scss'
import { useForm } from 'react-hook-form'

interface VerifyLoginCodeFormProps {
  email: string
  rememberMe: boolean
  onSuccess: () => void
  onBack: () => void
}

type FormData = {
  code: string
}

const CODE_LENGTH = 6

export const VerifyLoginCodeForm = ({
  onSuccess,
  onBack,
  rememberMe,
  email,
}: VerifyLoginCodeFormProps) => {
  const { verify, clearError, error, isLoading } = useVerifyLoginCode()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({ defaultValues: { code: '' } })

  const codeValue = watch('code')

  const handleCodeChange = (value: string) => {
    setValue('code', formatCode(value, CODE_LENGTH))
    if (error) clearError()
  }

  const onSubmit = async (data: FormData) => {
    if (data.code.length < CODE_LENGTH) return

    const success = await verify({ email, code: data.code, rememberMe })

    if (success) {
      onSuccess()
    }
  }

  const errorMessage = error || errors.code?.message

  return (
    <>
      <h2 className={styles.title}>Введите код</h2>
      <p className={styles.subtitle}>
        Мы отправили код на вашу почту. Введите 6 цифр.
      </p>

      {errorMessage && (
        <div className={styles.error}>
          <CodeTitle variant="error">{errorMessage}</CodeTitle>
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
            aria-invalid={!!errors.code}
            {...register('code', {
              required: 'Введите код',
              minLength: {
                value: CODE_LENGTH,
                message: `Код должен содержать ${CODE_LENGTH} цифр`,
              },
              onChange: (event) => handleCodeChange(event.target.value),
            })}
          />
        </div>

        <Button
          variant="green"
          fullWidth
          disabled={isLoading || codeValue.length < CODE_LENGTH}
          type="submit"
        >
          {isLoading ? 'ПРОВЕРЯЕМ...' : 'Войти в личный кабинет'}
        </Button>

        <button
          type="button"
          className={styles.backButton}
          onClick={onBack}
          disabled={isLoading}
        >
          ← Изменить email
        </button>
      </form>
    </>
  )
}
