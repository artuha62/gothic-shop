import {
  cartIsEmptySelector,
  useCartStore,
} from '@/entities/cart/store/useCartStore'
import { CartItems } from '@/entities/cart/ui/cart-items-list'
import { Overlay } from '@/shared/ui/overlay'
import {
  CartDrawerFooter,
  CartDrawerHeader,
  EmptyCart,
} from '@/widgets/cart-drawer/ui/components'
import styles from './CartDrawer.module.scss'

export const CartDrawer = () => {
  const isCartOpen = useCartStore((state) => state.isCartOpen)
  const closeCart = useCartStore((state) => state.closeCart)
  const isEmpty = useCartStore(cartIsEmptySelector)

  return (
    isCartOpen && (
      <div className={styles.cartDrawer}>
        <Overlay onClick={closeCart} />
        <aside className={styles.panel}>
          {isEmpty ? (
            <>
              <CartDrawerHeader />
              <EmptyCart />
            </>
          ) : (
            <>
              <CartDrawerHeader />
              <CartItems variant="drawer" />
              <CartDrawerFooter />
            </>
          )}
        </aside>
      </div>
    )
  )
}
