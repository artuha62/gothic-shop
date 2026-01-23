import { useCartStore } from '@/entities/cart/store/useCartStore'
import { Overlay } from '@/shared/ui/overlay'
import {
  CartDrawerBody,
  CartDrawerFooter,
  CartDrawerHeader,
} from '@/widgets/cart-drawer/ui/components'
import styles from './CartDrawer.module.scss'

const CartDrawer = () => {
  const isCartOpen = useCartStore((state) => state.isCartOpen)
  const closeCart = useCartStore((state) => state.closeCart)

  return (
    isCartOpen && (
      <div className={styles.cartDrawer}>
        <Overlay onClick={closeCart} />
        <aside className={styles.panel}>
          <CartDrawerHeader />
          <CartDrawerBody />
          <CartDrawerFooter />
        </aside>
      </div>
    )
  )
}

export default CartDrawer
