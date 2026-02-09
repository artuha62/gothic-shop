import { Button } from '@/shared/ui/button'
import { useCartDrawerStore } from '@/widgets/cart-drawer/store/useCartDrawerStore'
import styles from '@/widgets/cart-drawer/ui/CartDrawer.module.scss'
import { Link } from 'react-router'

export const EmptyCart = () => {
  const currentFilters = location.search
  const closeCart = useCartDrawerStore((state) => state.closeCart)

  return (
    <>
      <div className={styles.body}>
        <div className={styles.empty}>
          <span className={styles.emptyTitle}>Корзина пуста</span>
          <span className={styles.emptyHelp}>
            Ты ещё не выбрал ни одного артефакта. Пора исправить это!
          </span>
        </div>
      </div>

      <footer className={styles.footer}>
        <Button
          as={Link}
          to={`/catalog${currentFilters}`}
          onClick={closeCart}
          variant="black"
          size="md"
          fullWidth
        >
          В КАТАЛОГ
        </Button>
      </footer>
    </>
  )
}
