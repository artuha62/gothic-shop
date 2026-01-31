import { useCartSummary } from '@/entities/cart/model/hooks'
import { formatPrice } from '@/shared/lib/format-price/formatPrice'
import { Loader } from '@/shared/ui/loader'
import styles from './OrderTotals.module.scss'

export const OrderTotals = () => {
  const {
    subtotal,
    delivery,
    discount,
    discountAmount,
    totalWithDiscount,
    isLoading,
  } = useCartSummary()

  if (isLoading) {
    return (
      <div className={styles.totals}>
        <h3 className={styles.title}>Оплата</h3>
        <div className={styles.row}>
          <Loader>undefined</Loader>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.totals}>
      <h3 className={styles.title}>Оплата</h3>

      <div className={styles.row}>
        <span>Сумма заказа</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      <div className={styles.row}>
        <span>Стоимость доставки</span>
        <span>{delivery === 0 ? 'Бесплатно' : formatPrice(delivery)}</span>
      </div>

      {discount > 0 && (
        <div className={styles.row}>
          <span>Скидка ({discount}%)</span>
          <span className={styles.discount}>
            -{formatPrice(discountAmount)}
          </span>
        </div>
      )}

      <div className={styles.row}>
        <span>Итого к оплате</span>
        <strong className={styles.totalPrice}>
          {formatPrice(totalWithDiscount)}
        </strong>
      </div>
    </div>
  )
}
