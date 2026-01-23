import {
  selectTotalQuantity,
  useCartStore,
} from '@/entities/cart/store/useCartStore.ts'
import styles from '@/widgets/cart-drawer/ui/CartDrawer.module.scss'

const TotalCartQuantity = () => {
  const totalQuantity = useCartStore(selectTotalQuantity)

  if (totalQuantity === 0) return null

  return <span className={styles.titleCount}> • {totalQuantity}</span>
}

export default TotalCartQuantity
