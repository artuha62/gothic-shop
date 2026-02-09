import {
  cartItemQuantitySelector,
  cartItemSubtotalSelector,
  useCartStore,
} from '@/entities/cart/store/useCartStore.ts'
import type { Product } from '@/entities/product/model/types.ts'
import { formatPrice } from '@/shared/lib/format-price/formatPrice.ts'
import { getImageUrl } from '@/shared/lib/getImageURL/getImageURL'
import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'
import { useCartDrawerStore } from '@/widgets/cart-drawer/store/useCartDrawerStore'
import cn from 'classnames'
import { memo } from 'react'
import { Link } from 'react-router'
import styles from './CartItem.module.scss'

interface CartItemProps {
  productId: string
  size: number
  product: Product
  variant?: 'drawer' | 'checkout'
}

export const CartItem = memo(
  ({ productId, size, product, variant = 'drawer' }: CartItemProps) => {
    const { slug, price, images, name } = product

    const quantity = useCartStore(cartItemQuantitySelector(productId, size))
    const subtotal = useCartStore(
      cartItemSubtotalSelector(productId, size, price)
    )
    const increaseItemQuantity = useCartStore(
      (state) => state.increaseItemQuantity
    )
    const decreaseItemQuantity = useCartStore(
      (state) => state.decreaseItemQuantity
    )
    const removeFromCart = useCartStore((state) => state.removeFromCart)
    const closeCart = useCartDrawerStore((state) => state.closeCart)

    if (quantity === 0) return null

    const maxQuantity =
      product.sizeStock.find((s) => s.size === size)?.stock ?? 0

    const isDisabled = quantity >= maxQuantity

    return (
      <div className={cn(styles.item, styles[variant])}>
        <Link to={`/product/${slug}`} onClick={closeCart}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src={getImageUrl(images[0])}
              alt={name}
              width={810}
              height={1080}
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
              <IconButton
                className={styles.button}
                type="button"
                onClick={() => decreaseItemQuantity(productId, size)}
              >
                -
              </IconButton>
              <span className={styles.button}>{quantity}</span>
              <IconButton
                className={styles.button}
                type="button"
                onClick={() =>
                  increaseItemQuantity(productId, size, maxQuantity)
                }
                disabled={isDisabled}
              >
                +
              </IconButton>
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
)
