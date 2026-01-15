import { useCartContext } from '@/entities/cart/model/CartContext.tsx'
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
