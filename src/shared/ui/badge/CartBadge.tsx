import {
  totalQuantitySelector,
  useCartStore,
} from '@/entities/cart/store/useCartStore'
import styles from './Badge.module.scss'

export const CartBadge = () => {
  const totalQuantity = useCartStore(totalQuantitySelector)

  return (
    <>
      {totalQuantity > 0 && (
        <span className={styles.badge}>{totalQuantity}</span>
      )}
    </>
  )
}
