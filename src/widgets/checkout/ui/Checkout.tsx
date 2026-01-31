import {
  cartIsEmptySelector,
  useCartStore,
} from '@/entities/cart/store/useCartStore'
import { CheckoutForm } from '@/features/checkout'
import { useCheckout } from '@/features/checkout/model/useCheckout'
import styles from '@/pages/checkout-page/ui/CheckoutPage.module.scss'
import { Button } from '@/shared/ui/button'
import { EmptyState } from '@/shared/ui/empty-state'
import { CheckoutSidebar, CheckoutSuccess } from '@/widgets/checkout'
import cn from 'classnames'
import { useNavigate } from 'react-router'

export const Checkout = () => {
  const isEmpty = useCartStore(cartIsEmptySelector)
  const navigate = useNavigate()

  const { isSuccess, orderData, submitOrder, isLoading, errorMessage } =
    useCheckout()

  if (isEmpty && !isSuccess) {
    return (
      <EmptyState
        description="Корзина пуста"
        action={
          <Button onClick={() => navigate('/catalog')} variant="black">
            Перейти в каталог
          </Button>
        }
      />
    )
  }

  if (isSuccess && orderData)
    return <CheckoutSuccess orderId={orderData.orderId} />

  return (
    <div className={cn(styles.checkout, 'container')}>
      <h1 className={styles.pageTitle}>Оформление заказа</h1>

      <div className={styles.grid}>
        <CheckoutForm
          onSubmit={submitOrder}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
        <CheckoutSidebar />
      </div>
    </div>
  )
}
