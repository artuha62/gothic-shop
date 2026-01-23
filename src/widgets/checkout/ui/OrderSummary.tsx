import { CartItems } from '@/entities/cart/ui/cart-items-list'
import { formatPrice } from '@/shared/lib/format-price/formatPrice'
import { Button } from '@/shared/ui/button'
import { PromoMini } from '@/shared/ui/promo-mini'
import styles from './OrderSummary.module.scss'

interface OrderSummaryProps {
  deliveryMethod: 'courier' | 'pickup'
  promocode: string
  discount: number
  totals: {
    itemsTotal: number
    deliveryCost: number
    discount: number
    total: number
    itemsCount: number
  }
  onPromocodeChange: (code: string) => void
  onApplyPromocode: () => void
}

export const OrderSummary = ({
  deliveryMethod,
  promocode,
  discount,
  totals,
  onPromocodeChange,
  onApplyPromocode,
}: OrderSummaryProps) => {
  return (
    <div className={styles.summary}>
      <PromoMini>Доставка бесплатна!</PromoMini>

      {/* Промокод */}
      <div className={styles.promocode}>
        <h3 className={styles.title}>Промокод</h3>
        <div className={styles.promocodeInput}>
          <input
            type="text"
            placeholder="Код купона"
            value={promocode}
            onChange={(e) => onPromocodeChange(e.target.value)}
          />
          <Button variant="black" size="sm" onClick={onApplyPromocode}>
            Применить
          </Button>
        </div>
      </div>

      {/* Состав заказа */}
      <div className={styles.cart}>
        <h3 className={styles.title}>Состав заказа</h3>
        <div className={styles.items}>
          <CartItems />
        </div>
      </div>

      {/* Итоги */}
      <div className={styles.totals}>
        <h3 className={styles.title}>Оплата</h3>

        <div className={styles.row}>
          <span>Сумма заказа</span>
          <span>{formatPrice(itemsTotal)}</span>
        </div>

        <div className={styles.row}>
          <span>Доставка бесплатная!</span>
          <span>{formatPrice(deliveryCost)}</span>
        </div>

        {discount > 0 && (
          <div className={styles.row}>
            <span>Скидка</span>
            <span className={styles.discount}>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className={styles.row}>
          <span>Итого к оплате</span>
          <strong className={styles.totalPrice}>{formatPrice(total)}</strong>
        </div>

        <div className={styles.row}>
          <span>Способ оплаты</span>
          <span>—</span>
        </div>
      </div>
    </div>
  )
}
