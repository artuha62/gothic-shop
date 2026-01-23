import {
  selectCartItem,
  useCartStore,
} from '@/entities/cart/store/useCartStore.ts'
import type { Product } from '@/entities/product/model/types.ts'
import { formatPrice } from '@/shared/lib/format-price/formatPrice.ts'
import { Button } from '@/shared/ui/button'
import cn from 'classnames'
import { memo } from 'react'
import { Link } from 'react-router'
import styles from './CartItemRow.module.scss'

interface CartItemRowProps {
  productId: string
  size: number
  product: Product
  variant?: 'drawer' | 'checkout'
}

const CartItemRow = ({
  productId,
  size,
  product,
  variant = 'drawer',
}: CartItemRowProps) => {
  const item = useCartStore(selectCartItem(productId, size))

  const increaseItemQuantity = useCartStore(
    (state) => state.increaseItemQuantity
  )
  const decreaseItemQuantity = useCartStore(
    (state) => state.decreaseItemQuantity
  )
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const closeCart = useCartStore((state) => state.closeCart)

  if (!item) return null

  const { quantity } = item
  const { slug, price, images, name } = product

  const sizeData = product.sizeStock.find((s) => s.size === size)
  const maxQuantity = sizeData?.stock ?? 0
  const isDisabled = quantity >= maxQuantity

  const subtotal = price * quantity

  return (
    <div className={cn(styles.item, styles[variant])}>
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
              onClick={() => decreaseItemQuantity(productId, size)}
            >
              -
            </button>
            <span className={styles.button}>{quantity}</span>
            <button
              className={styles.button}
              type="button"
              onClick={() => increaseItemQuantity(productId, size, maxQuantity)}
              disabled={isDisabled}
            >
              +
            </button>
          </div>
          <Button
            onClick={() => removeFromCart(productId, size)}
            variant="white"
            size="sm"
          >
            УДАЛИТЬ
          </Button>
        </div>
      </div>
    </div>
  )
}

export default memo(CartItemRow)
