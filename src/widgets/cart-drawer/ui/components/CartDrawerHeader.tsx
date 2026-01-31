import { useCartStore } from '@/entities/cart/store/useCartStore'
import { IconButton } from '@/shared/ui/icon-button'
import { X } from 'lucide-react'
import styles from '../CartDrawer.module.scss'
import TotalCartQuantity from './TotalCartQuantity'

export const CartDrawerHeader = () => {
  const closeCart = useCartStore((state) => state.closeCart)

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
