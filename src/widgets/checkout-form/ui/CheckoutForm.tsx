import { useForm } from 'react-hook-form'
import styles from './CheckoutForm.module.scss'

type FormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  apartment?: string
  comment?: string
}

const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: 'onBlur',
  })

  //FIXME: test
  const onSubmit = async (data: FormValues) => {
    try {
      console.log('FORM DATA:', data)
      alert('Заказ успешно оформлен!')
    } catch (error) {
      console.error('Ошибка при отправке:', error)
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <section className={styles.customer}>
        <h2 className={styles.title}>1. Данные получателя</h2>

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
            <label>Имя *</label>
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
            <label>Фамилия *</label>
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
            <label>Email *</label>
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

      <section className={styles.delivery}>
        <h2 className={styles.title}>2. Доставка</h2>

        <div className={styles.field}>
          <input
            type="text"
            placeholder="Введите адрес доставки"
            className={errors.address ? styles.inputError : ''}
            {...register('address', {
              required: 'Введите адрес',
            })}
          />
          <label>Адрес *</label>
          {errors.address && (
            <span className={styles.error}>{errors.address.message}</span>
          )}
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <input
              type="text"
              placeholder="Например: 15"
              {...register('apartment')}
            />
            <label>Кв / офис</label>
          </div>
        </div>

        <div className={styles.field}>
          <textarea
            placeholder="Дополнительная информация для курьера"
            rows={4}
            {...register('comment')}
          />
          <label>Комментарий</label>
        </div>
      </section>

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
      </button>
    </form>
  )
}

export default CheckoutForm
