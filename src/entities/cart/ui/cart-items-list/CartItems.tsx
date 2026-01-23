import { useCartStore } from '@/entities/cart/store/useCartStore'
import { CartItem } from '@/entities/cart/ui/cart-item'
import { useProductsByIds } from '@/entities/product/model/useProductsByIds'
import styles from '@/widgets/cart-drawer/ui/CartDrawer.module.scss'

const CartItems = () => {
  const items = useCartStore((state) => state.items)
  const productIds = items.map((item) => item.productId)
  const { products } = useProductsByIds(productIds)
  const productsMap = new Map(products.map((product) => [product.id, product]))

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
          />
        )
      })}
    </div>
  )
}

export default CartItems
