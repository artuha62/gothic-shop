import {
  selectItemsLength,
  useCartStore,
} from '@/entities/cart/store/useCartStore'
import { CartItems } from '@/entities/cart/ui/cart-items-list'
import styles from '../CartDrawer.module.scss'

const CartDrawerBody = () => {
  const itemsLength = useCartStore(selectItemsLength)

  if (itemsLength === 0) {
    return (
      <div className={styles.body}>
        <div className={styles.empty}>
          <span className={styles.emptyTitle}>Корзина пуста</span>
          <span className={styles.emptyHelp}>
            Ты ещё не выбрал ни одного артефакта. Пора исправить это!
          </span>
        </div>
      </div>
    )
  }

  return <CartItems />
}

export default CartDrawerBody
