import { useCartStore } from '@/entities/cart/store/useCartStore'
import { useProductsByIds } from '@/entities/product/model/useProductsByIds'
import { Button } from '@/shared/ui/button'
import { OrderSummary } from '@/widgets/checkout/ui/OrderSummary'
import cn from 'classnames'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import styles from './CheckoutPage.module.scss'

type FormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  apartment?: string
  comment?: string
}

type DeliveryMethod = 'courier' | 'pickup'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>('courier')
  const [promocode, setPromocode] = useState('')
  const [discount, setDiscount] = useState(0)

  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  const productIds = items.map((item) => item.productId)
  const { products } = useProductsByIds(productIds)
  const productsMap = new Map(products.map((p) => [p.id, p]))

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: 'onBlur',
  })

  // Расчет итогов
  const calculateTotals = () => {
    const itemsTotal = items.reduce((sum, item) => {
      const product = productsMap.get(item.productId)
      if (!product) return sum
      return sum + product.price * item.quantity
    }, 0)

    const delivery = deliveryMethod === 'courier' ? 0 : 0
    const total = itemsTotal + delivery - discount

    return { itemsTotal, delivery, total }
  }

  const totals = calculateTotals()

  const applyPromocode = async () => {
    try {
      const response = await fetch('/api/promocode/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: promocode,
          total: totals.itemsTotal,
        }),
      })

      const data = await response.json()

      if (data.valid) {
        setDiscount(data.discount)
        alert('Промокод применен!')
      } else {
        alert('Промокод недействителен')
      }
    } catch (error) {
      console.error('Ошибка проверки промокода:', error)
      alert('Ошибка проверки промокода')
    }
  }

  const onSubmit = async (formData: FormValues) => {
    try {
      const orderData = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        delivery: {
          method: deliveryMethod,
          address: deliveryMethod === 'courier' ? formData.address : undefined,
          apartment: formData.apartment,
          comment: formData.comment,
        },
        items: items.map((item) => {
          const product = productsMap.get(item.productId)
          return {
            productId: item.productId,
            size: item.size,
            quantity: item.quantity,
            price: product?.price || 0, // проверка на сервере
          }
        }),
        promocode: promocode || undefined,
        totals,
      }

      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error('Ошибка создания заказа')
      }

      const data = await response.json()

      clearCart()

      navigate(`/order/${data.orderId}`)
    } catch (error) {
      console.error('Ошибка при отправке:', error)
      alert('Произошла ошибка. Попробуйте снова.')
    }
  }

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Корзина пуста</h2>
        <button onClick={() => navigate('/catalog')}>Перейти в каталог</button>
      </div>
    )
  }

  return (
    <div className={cn(styles.checkout, 'container')}>
      <div>
        <h1 className={styles.pageTitle}>ОФОРМЛЕНИЕ ЗАКАЗА</h1>

        <div className={styles.grid}>
          {/* Форма */}
          <div className={styles.formColumn}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
                      <span className={styles.error}>
                        {errors.firstName.message}
                      </span>
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
                      <span className={styles.error}>
                        {errors.lastName.message}
                      </span>
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
                      <span className={styles.error}>
                        {errors.email.message}
                      </span>
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
                      <span className={styles.error}>
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>
              </section>

              {/* Доставка */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  2. ВЫБЕРИТЕ СПОСОБ ДОСТАВКИ
                </h2>

                <div className={styles.deliveryButtons}>
                  <Button
                    variant="white"
                    className={
                      deliveryMethod === 'courier' ? styles.active : ''
                    }
                    onClick={() => setDeliveryMethod('courier')}
                  >
                    КУРЬЕРОМ
                  </Button>
                  <Button
                    variant="white"
                    className={deliveryMethod === 'pickup' ? styles.active : ''}
                    onClick={() => setDeliveryMethod('pickup')}
                  >
                    В ПУНКТ ВЫДАЧИ
                  </Button>
                </div>

                {deliveryMethod === 'courier' && (
                  <>
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
                        <span className={styles.error}>
                          {errors.address.message}
                        </span>
                      )}
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

                    <div className={styles.field}>
                      <textarea
                        placeholder="Комментарий к заказу"
                        rows={3}
                        {...register('comment')}
                      />
                      <label>КОММЕНТАРИЙ</label>
                    </div>
                  </>
                )}
              </section>

              {/* Способы оплаты */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>3. СПОСОБЫ ОПЛАТЫ</h2>

                <div className={styles.paymentButtons}>
                  <button type="button" className={styles.active}>
                    СИСТЕМА БЫСТРЫХ ПЛАТЕЖЕЙ
                  </button>
                  <button type="button">БАНКОВСКОЙ КАРТОЙ</button>
                  <button type="button">ОПЛАТА ДОЛЯМИ</button>
                </div>
              </section>
              <Button
                className={styles.submitBtn}
                variant="black"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? 'ПОДТВЕРЖДЕНИЕ...' : 'ПОДТВЕРДИТЬ ЗАКАЗ'}
              </Button>
            </form>
          </div>

          {/* Итого */}
          <div className={styles.summaryColumn}>
            <OrderSummary
              deliveryMethod={deliveryMethod}
              promocode={promocode}
              discount={discount}
              onPromocodeChange={setPromocode}
              onApplyPromocode={applyPromocode}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
