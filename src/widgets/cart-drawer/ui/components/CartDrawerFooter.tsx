import { useAuthStore } from '@/entities/auth/store/useAuthStore'
import { DeliveryPromo } from '@/entities/cart/ui/delivery-promo'
import { Button } from '@/shared/ui/button'
import { useCartDrawerStore } from '@/widgets/cart-drawer/store/useCartDrawerStore'
import { useLoginModalStore } from '@/widgets/login-modal/store/useLoginModalStore'
import { useNavigate } from 'react-router'
import styles from '../CartDrawer.module.scss'
import CartSummary from './CartSummary'

export const CartDrawerFooter = () => {
  const navigate = useNavigate()
  const closeCart = useCartDrawerStore((state) => state.closeCart)
  const openLoginModal = useLoginModalStore((state) => state.openLoginModal)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const handleCheckoutClick = () => {
    if (isAuthenticated) {
      closeCart()
      navigate('/checkout')
    } else {
      openLoginModal()
    }
  }

  return (
    <footer className={styles.footer}>
      <DeliveryPromo />
      <div className={styles.summary}>
        <span>ИТОГО: </span>
        <CartSummary />
      </div>
      <div className={styles.actions}>
        <Button onClick={closeCart} variant="white" size="md">
          ПРОДОЛЖИТЬ ОХОТУ
        </Button>
        <Button
          onClick={handleCheckoutClick}
          variant="black"
          size="md"
          className={styles.checkoutButton}
        >
          КУПИТЬ
        </Button>
      </div>
    </footer>
  )
}
