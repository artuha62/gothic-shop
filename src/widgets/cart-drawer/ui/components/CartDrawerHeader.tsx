import { IconButton } from '@/shared/ui/icon-button'
import { useCartDrawerStore } from '@/widgets/cart-drawer/store/useCartDrawerStore'
import { X } from 'lucide-react'
import styles from '../CartDrawer.module.scss'
import TotalCartQuantity from './TotalCartQuantity'

export const CartDrawerHeader = () => {
  const closeCart = useCartDrawerStore((state) => state.closeCart)

  return (
    <header className={styles.header}>
      <div className={styles.title}>
        МОЯ КОРЗИНА
        <TotalCartQuantity />
      </div>
      <IconButton
        onClick={closeCart}
        variant="default"
        className={styles.closeButton}
        aria-label="Закрыть корзину"
      >
        <X strokeWidth={0.75} size={36} />
      </IconButton>
    </header>
  )
}
