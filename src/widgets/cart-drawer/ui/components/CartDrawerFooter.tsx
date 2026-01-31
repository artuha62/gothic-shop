import { useAuthStore } from '@/entities/auth/store/useAuthStore'
import { useCartStore } from '@/entities/cart/store/useCartStore'
import { DeliveryPromo } from '@/features/delivery-promo'
import { useUIStore } from '@/shared/store/useUIStore'
import { Button } from '@/shared/ui/button'
import { useNavigate } from 'react-router'
import styles from '../CartDrawer.module.scss'
import CartSummary from './CartSummary'

export const CartDrawerFooter = () => {
  const navigate = useNavigate()
  const closeCart = useCartStore((state) => state.closeCart)
  const openLoginModal = useUIStore((state) => state.openLoginModal)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const handleCheckoutClick = () => {
    if (isAuthenticated) {
      closeCart()
      navigate('/checkout')
    } else {
      closeCart()
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
          style={{ flex: '1' }}
        >
          КУПИТЬ
        </Button>
      </div>
    </footer>
  )
}
