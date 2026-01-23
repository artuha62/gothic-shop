import { CartItemRow } from '@/entities/cart'
import { useCartStore } from '@/entities/cart/store/useCartStore'
import { useProductsByIds } from '@/entities/product/model/useProductsByIds'
import { formatPrice } from '@/shared/lib/format-price/formatPrice'
import { Button } from '@/shared/ui/button'
import { PromoMini } from '@/shared/ui/promo-mini'
import styles from './OrderSummary.module.scss'

interface OrderSummaryProps {
  deliveryMethod: 'courier' | 'pickup'
  promocode: string
  discount: number
  onPromocodeChange: (code: string) => void
  onApplyPromocode: () => void
}

export const OrderSummary = ({
  deliveryMethod,
  promocode,
  discount,
  onPromocodeChange,
  onApplyPromocode,
}: OrderSummaryProps) => {
  const items = useCartStore((state) => state.items)
  const productIds = items.map((item) => item.productId)
  const { products } = useProductsByIds(productIds)
  const productsMap = new Map(products.map((p) => [p.id, p]))

  // Расчет итогов
  const itemsTotal = items.reduce((sum, item) => {
    const product = productsMap.get(item.productId)
    if (!product) return sum
    return sum + product.price * item.quantity
  }, 0)

  const deliveryCost = deliveryMethod === 'courier' ? 0 : 0 // Бесплатная доставка
  const total = itemsTotal + deliveryCost - discount

  return (
    <div className={styles.summary}>
      <PromoMini>Доставка бесплатна!</PromoMini>

      {/* Промокод */}
      <div className={styles.promocode}>
        <h3 className={styles.title}>ПРОМОКОД</h3>
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
        <h3 className={styles.title}>СОСТАВ ЗАКАЗА</h3>
        <div className={styles.items}>
          {items.map(({ productId, size }) => {
            const product = productsMap.get(productId)
            if (!product) return null

            return (
              <CartItemRow
                key={`${productId}-${size}`}
                productId={productId}
                size={size}
                product={product}
              />
            )
          })}
        </div>
      </div>

      {/* Итоги */}
      <div className={styles.totals}>
        <h3 className={styles.title}>ОПЛАТА</h3>

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
