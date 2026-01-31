import { CartItems } from '@/entities/cart/ui/cart-items-list'
import { PromoCodeInput } from '@/features/apply-promocode'
import { DeliveryPromo } from '@/features/delivery-promo'
import { OrderTotals } from '@/widgets/checkout/ui/sidebar/components'
import styles from './CheckoutSidebar.module.scss'

export const CheckoutSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <DeliveryPromo />
      <PromoCodeInput />
      <CartItems variant="checkout" />
      <OrderTotals />
    </aside>
  )
}
