import {
  cartIsEmptySelector,
  useCartStore,
} from '@/entities/cart/store/useCartStore'
import { CheckoutForm } from '@/features/checkout'
import { useCheckout } from '@/features/checkout/model/useCheckout'
import { Button } from '@/shared/ui/button'
import { CheckoutSidebar, CheckoutSuccess } from '@/widgets/checkout'
import { EmptyState } from '@/widgets/empty-state'
import { useNavigate } from 'react-router'
import styles from './CheckoutPage.module.scss'

const CheckoutPage = () => {
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
    <div className={styles.checkout}>
      <h1 className={styles.pageTitle}>Оформление заказа</h1>

      <div className={styles.grid}>
        <CheckoutForm errorMessage={errorMessage} onSubmit={submitOrder} />
        <CheckoutSidebar isLoading={isLoading} />
      </div>
    </div>
  )
}

export default CheckoutPage
