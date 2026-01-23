import {
  selectTotalQuantity,
  useCartStore,
} from '@/entities/cart/store/useCartStore.ts'
import styles from './Badge.module.scss'

const CartBadge = () => {
  const totalQuantity = useCartStore(selectTotalQuantity)

  return (
    <>
      {totalQuantity > 0 && (
        <span className={styles.badge}>{totalQuantity}</span>
      )}
    </>
  )
}

export default CartBadge
