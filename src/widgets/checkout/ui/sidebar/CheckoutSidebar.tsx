import { CartItems } from '@/entities/cart/ui/cart-items-list'
import { DeliveryPromo } from '@/entities/cart/ui/delivery-promo'
import { PromoCodeInput } from '@/features/apply-promocode'
import { Button } from '@/shared/ui/button'
import { OrderTotals } from '@/widgets/checkout/ui/sidebar/components'
import styles from './CheckoutSidebar.module.scss'

interface CheckoutSidebarProps {
  isLoading: boolean
}

export const CheckoutSidebar = ({ isLoading }: CheckoutSidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <DeliveryPromo />
      <PromoCodeInput />
      <CartItems variant="checkout" />
      <OrderTotals />
      <Button
        type="submit"
        form="checkout-form"
        className={styles.submitBtn}
        variant="black"
        fullWidth
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? 'ОБРАБОТКА...' : 'ПОДТВЕРДИТЬ ЗАКАЗ'}
      </Button>
    </aside>
  )
}
