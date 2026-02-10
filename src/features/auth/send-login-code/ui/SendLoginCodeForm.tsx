import { useSendLoginCode } from '@/features/auth/send-login-code/model/useSendLoginCode'
import { Button } from '@/shared/ui/button'
import { CodeTitle } from '@/shared/ui/code-title'
import styles from '@/widgets/login-modal/ui/LoginModal.module.scss'
import { useForm } from 'react-hook-form'

interface SendLoginCodeFormProps {
  onSuccess: (email: string, rememberMe: boolean) => void
}

type FormData = {
  email: string
  rememberMe: boolean
}

export const SendLoginCodeForm = ({ onSuccess }: SendLoginCodeFormProps) => {
  const { send, isLoading, error } = useSendLoginCode()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: { email: '', rememberMe: false },
  })

  const emailValue = watch('email')

  const onSubmit = async (data: FormData) => {
    const success = await send(data.email)
    if (success) {
      onSuccess(data.email, data.rememberMe)
    }
  }

  const errorMessage = error || errors.email?.message

  return (
    <>
      <h2 className={styles.title}>Введите электронную почту</h2>
      <p className={styles.subtitle}>Вход или регистрация по e-mail</p>

      {errorMessage && (
        <div className={styles.error}>
          <CodeTitle variant="error">{errorMessage}</CodeTitle>
        </div>
      )}

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
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
            aria-invalid={!!errors.email}
            {...register('email', {
              required: 'Введите email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Некорректный email',
              },
            })}
          />
        </div>

        <div className={styles.checkbox}>
          <input
            id="remember"
            type="checkbox"
            disabled={isLoading}
            {...register('rememberMe')}
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
    </>
  )
}
