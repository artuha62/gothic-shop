import { useForm } from 'react-hook-form'
import styles from './CheckoutForm.module.scss'

export type FormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  apartment?: string
  comment?: string
}

interface CheckoutFormProps {
  onSubmit: (data: FormValues) => void
  errorMessage: string | null
}

export const CheckoutForm = ({ onSubmit, errorMessage }: CheckoutFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
  })

  return (
    <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Данные  */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. ДАННЫЕ ПОЛУЧАТЕЛЯ</h2>

        <div className={styles.row}>
          <div className={styles.field}>
            <input
              type="text"
              placeholder="Введите ваше имя"
              className={errors.firstName ? styles.inputError : ''}
              {...register('firstName', {
                required: 'Обязательное поле',
              })}
            />
            <label>ИМЯ *</label>
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <input
              type="text"
              placeholder="Введите вашу фамилию"
              className={errors.lastName ? styles.inputError : ''}
              {...register('lastName', {
                required: 'Обязательное поле',
              })}
            />
            <label>ФАМИЛИЯ *</label>
            {errors.lastName && (
              <span className={styles.error}>{errors.lastName.message}</span>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <input
              type="email"
              placeholder="Введите ваш Email"
              className={errors.email ? styles.inputError : ''}
              {...register('email', {
                required: 'Введите email',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Некорректный email',
                },
              })}
            />
            <label>EMAIL *</label>
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <input
              type="tel"
              placeholder="79991234567"
              className={errors.phone ? styles.inputError : ''}
              {...register('phone', {
                required: 'Введите телефон',
                pattern: {
                  value: /^[0-9+]+$/,
                  message: 'Допускаются только цифры и +',
                },
                minLength: {
                  value: 11,
                  message: 'Номер слишком короткий',
                },
                maxLength: {
                  value: 12,
                  message: 'Номер слишком длинный',
                },
              })}
            />
            <label>Телефон *</label>
            {errors.phone && (
              <span className={styles.error}>{errors.phone.message}</span>
            )}
          </div>
        </div>
      </section>

      {/* Доставка */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. АДРЕС ДОСТАВКИ</h2>
        <>
          <div className={styles.row}>
            <div className={styles.field}>
              <input
                type="text"
                placeholder="Введите адрес доставки"
                className={errors.address ? styles.inputError : ''}
                {...register('address', {
                  required: 'Обязательное поле',
                  minLength: {
                    value: 5,
                    message: 'Введите полный адрес',
                  },
                })}
              />
              <label>Адрес *</label>
              {errors.address && (
                <span className={styles.error}>{errors.address.message}</span>
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <input
                type="text"
                placeholder="Например: 62"
                {...register('apartment')}
              />
              <label>КВ / ОФИС</label>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <textarea
                placeholder="Комментарий к заказу"
                rows={3}
                {...register('comment')}
              />
              <label>КОММЕНТАРИЙ</label>
            </div>
          </div>
        </>
      </section>

      {errorMessage && (
        <div className={styles.orderError} role="alert">
          {errorMessage}
        </div>
      )}
    </form>
  )
}
