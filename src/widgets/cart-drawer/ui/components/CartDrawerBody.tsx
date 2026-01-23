import { CartItemRow } from '@/entities/cart'
import {
  selectItemsLength,
  useCartStore,
} from '@/entities/cart/store/useCartStore'
import { useProductsByIds } from '@/entities/product/model/useProductsByIds'
import styles from '../CartDrawer.module.scss'

const CartDrawerBody = () => {
  const items = useCartStore((state) => state.items)
  const itemsLength = useCartStore(selectItemsLength)

  const productIds = items.map((item) => item.productId)

  const { products } = useProductsByIds(productIds)
  const productsMap = new Map(products.map((product) => [product.id, product]))

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

  return (
    <div className={styles.body}>
      {items.map(({ productId, size }) => {
        const product = productsMap.get(productId)
        if (!product) return null

        return (
          <CartItemRow
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

export default CartDrawerBody
