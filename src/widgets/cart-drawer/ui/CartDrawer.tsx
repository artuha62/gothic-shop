import {
  cartIsEmptySelector,
  useCartStore,
} from '@/entities/cart/store/useCartStore'
import { CartItems } from '@/entities/cart/ui/cart-items-list'
import { useScrollLock } from '@/shared/hooks/useScrollLock'
import { Overlay } from '@/shared/ui/overlay'
import { useCartDrawerStore } from '@/widgets/cart-drawer/store/useCartDrawerStore'
import {
  CartDrawerFooter,
  CartDrawerHeader,
  EmptyCart,
} from '@/widgets/cart-drawer/ui/components'
import styles from './CartDrawer.module.scss'

export const CartDrawer = () => {
  const isCartOpen = useCartDrawerStore((state) => state.isCartOpen)
  const closeCart = useCartDrawerStore((state) => state.closeCart)
  const isEmpty = useCartStore(cartIsEmptySelector)

  useScrollLock(isCartOpen)

  if (!isCartOpen) return null

  return (
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
}
