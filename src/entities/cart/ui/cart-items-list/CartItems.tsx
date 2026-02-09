import { useCartProducts } from '@/entities/cart/model/hooks'
import { useCartStore } from '@/entities/cart/store/useCartStore'
import { CartItem } from '@/entities/cart/ui/cart-item'
import { Loader } from '@/shared/ui/loader'
import styles from '@/widgets/cart-drawer/ui/CartDrawer.module.scss'
import { useMemo } from 'react'

interface CartItemsProps {
  variant?: 'drawer' | 'checkout'
}

export const CartItems = ({ variant }: CartItemsProps) => {
  const items = useCartStore((state) => state.items)
  const { products, isLoading } = useCartProducts()

  const productsMap = useMemo(
    () => new Map(products.map((product) => [product.id, product])),
    [products]
  )

  if (isLoading) {
    return (
      <div className={styles.body}>
        <Loader>Загрузка корзины</Loader>
      </div>
    )
  }

  return (
    <div className={styles.body}>
      {items.map(({ productId, size }) => {
        const product = productsMap.get(productId)
        if (!product) return null

        return (
          <CartItem
            key={`${productId}-${size}`}
            productId={productId}
            size={size}
            product={product}
            variant={variant}
          />
        )
      })}
    </div>
  )
}
