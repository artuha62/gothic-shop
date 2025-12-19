import type { Product } from '@/entities/product/model/types'
import { formatPrice } from '@/shared/lib/format-price/formatPrice'
import { Link } from 'react-router'
import { useCartDrawerContext } from '@/features/cart/model/CartDrawerContext'
import { Button } from '@/shared/ui/button'
import styles from './CartItemRow.module.scss'

interface CartItemRowProps {
  product: Product
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  onRemove: () => void
}

const CartItemRow = ({
  product,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemRowProps) => {
  const { slug, price, images, name } = product
  const { closeCart } = useCartDrawerContext()
  const subtotal = price * quantity

  return (
    <div className={styles.item}>
      <Link to={`/product/${slug}`}>
        <div className={styles.imageWrapper}>
          <img
            onClick={closeCart}
            className={styles.image}
            src={images[0]}
            alt={name}
            loading="lazy"
          />
        </div>
      </Link>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.name}>{name.toUpperCase()}</div>
          <div className={styles.price}>{formatPrice(subtotal)}</div>
        </header>
        <div className={styles.actions}>
          <div className={styles.quantity}>
            <button
              className={styles.button}
              type="button"
              onClick={onDecrease}
            >
              -
            </button>
            <span className={styles.button}>{quantity}</span>
            <button
              className={styles.button}
              type="button"
              onClick={onIncrease}
            >
              +
            </button>
          </div>
          <Button onClick={onRemove} variant="white" size="sm">
            УДАЛИТЬ
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartItemRow
