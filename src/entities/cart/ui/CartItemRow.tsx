import { useCartDrawerContext } from '@/entities/cart/model/CartDrawerContext.tsx'
import type { Product } from '@/entities/product/model/types.ts'
import { formatPrice } from '@/shared/lib/format-price/formatPrice.ts'
import { Button } from '@/shared/ui/button'
import { Link } from 'react-router'
import styles from './CartItemRow.module.scss'

interface CartItemRowProps {
  product: Product
  size: number
  quantity: number
  isDisabled: boolean
  onIncrease: () => void
  onDecrease: () => void
  onRemove: () => void
}

const CartItemRow = ({
  product,
  size,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
  isDisabled,
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
          <div className={styles.name}>
            {name.toUpperCase()} - {size}
          </div>
          <div className={styles.price}>{formatPrice(subtotal)}</div>
        </header>
        <div className={styles.size}>{`Размер: ${size} ${quantity} Шт.`}</div>
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
              style={{
                opacity: isDisabled ? 0.2 : 1,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
              }}
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
