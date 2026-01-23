import {
  selectItemsLength,
  useCartStore,
} from '@/entities/cart/store/useCartStore'
import { Button } from '@/shared/ui/button'
import { PromoMini } from '@/shared/ui/promo-mini'
import { Link } from 'react-router'
import styles from '../CartDrawer.module.scss'
import CartSummary from './CartSummary'

const CartDrawerFooter = () => {
  const itemsLength = useCartStore(selectItemsLength)
  const closeCart = useCartStore((state) => state.closeCart)

  if (itemsLength === 0) {
    return (
      <footer className={styles.footer}>
        <Button
          as={Link}
          to="/catalog"
          onClick={closeCart}
          variant="black"
          size="md"
          fullWidth
        >
          В КАТАЛОГ
        </Button>
      </footer>
    )
  }

  return (
    <footer className={styles.footer}>
      <PromoMini size="md">Доставка бесплатна!</PromoMini>
      <div className={styles.summary}>
        <span>ИТОГО: </span>
        <CartSummary />
      </div>
      <div className={styles.actions}>
        <Button onClick={closeCart} variant="white" size="md">
          ПРОДОЛЖИТЬ ОХОТУ
        </Button>
        <Button
          as={Link}
          to="/checkout"
          onClick={closeCart}
          variant="black"
          size="md"
          style={{ flex: '1' }}
        >
          КУПИТЬ
        </Button>
      </div>
    </footer>
  )
}

export default CartDrawerFooter
