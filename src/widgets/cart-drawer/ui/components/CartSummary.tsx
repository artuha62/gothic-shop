import { useCartStore } from '@/entities/cart/store/useCartStore.ts'
import { useProductsByIds } from '@/entities/product/model/useProductsByIds.ts'
import { formatPrice } from '@/shared/lib/format-price/formatPrice.ts'

const CartSummary = () => {
  const items = useCartStore((state) => state.items)

  const productIds = items.map((item) => item.productId)
  const { products } = useProductsByIds(productIds)

  const productsMap = new Map(products.map((product) => [product.id, product]))

  const totalPrice = items.reduce((sum, { productId, quantity }) => {
    const product = productsMap.get(productId)
    return product ? sum + product.price * quantity : sum
  }, 0)

  return <span>{formatPrice(totalPrice)}</span>
}

export default CartSummary
