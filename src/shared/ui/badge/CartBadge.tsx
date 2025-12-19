import { useCartContext } from '@/features/cart/model/CartContext'
import styles from './Badge.module.scss'

const CartBadge = () => {
  const { totalQuantity } = useCartContext()
  return (
    <>
      {totalQuantity > 0 && (
        <span className={styles.badge}>{totalQuantity}</span>
      )}
    </>
  )
}

export default CartBadge
