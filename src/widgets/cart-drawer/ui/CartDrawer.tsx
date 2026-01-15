import { CartItemRow } from '@/entities/cart'
import { useCartContext } from '@/entities/cart/model/CartContext.tsx'
import { useCartDrawerContext } from '@/entities/cart/model/CartDrawerContext.tsx'
import { useProductsByIds } from '@/entities/product/model/useProductsByIds.ts'
import { formatPrice } from '@/shared/lib/format-price/formatPrice.ts'
import { Button } from '@/shared/ui/button'
import { PromoMini } from '@/shared/ui/promo-mini'
import { X } from 'lucide-react'
import { Link } from 'react-router'
import styles from './CartDrawer.module.scss'

const CartDrawer = () => {
  const { cartItems, totalQuantity, removeFromCart, increase, decrease } =
    useCartContext()
  const { isOpen, closeCart } = useCartDrawerContext()

  const productIds = cartItems.map((item) => item.productId)

  const { products } = useProductsByIds(productIds)

  const productsMap = new Map(products.map((product) => [product.id, product]))

  const totalPrice = cartItems.reduce((sum, { productId, quantity }) => {
    const product = productsMap.get(productId)
    if (!product) return sum

    const { price } = product
    return sum + price * quantity
  }, 0)

  return (
    <div className={`${styles.cartDrawer} ${isOpen ? styles.isOpen : ''}`}>
      <div onClick={closeCart} className={styles.overlay}></div>
      {/*TODO Доделать a11y*/}
      <aside className={styles.panel}>
        <header className={styles.header}>
          <div className={styles.title}>
            МОЯ КОРЗИНА
            {cartItems.length === 0 ? (
              ''
            ) : (
              <span className={styles.titleCount}> • {totalQuantity}</span>
            )}
          </div>
          <button
            className={styles.close}
            onClick={closeCart}
            type="button"
            aria-label="Закрыть корзину"
          >
            <X strokeWidth={0.75} size={36} />
          </button>
        </header>
        <div className={styles.body}>
          {cartItems.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyTitle}>Корзина пуста</span>
              <span className={styles.emptyHelp}>
                Ты ещё не выбрал ни одного артефакта. Пора исправить это!
              </span>
            </div>
          ) : (
            cartItems.map(({ productId, size, quantity }) => {
              const product = productsMap.get(productId)

              if (!product) return null

              const sizeData = product.sizeStock.find(
                (item) => item.size === size
              )

              const maxQuantity = sizeData?.stock ?? 0

              return (
                <CartItemRow
                  key={`${productId}-${size}`}
                  product={product}
                  size={size}
                  quantity={quantity}
                  isDisabled={quantity >= maxQuantity}
                  onIncrease={() => increase(productId, size, maxQuantity)}
                  onDecrease={() => decrease(productId, size)}
                  onRemove={() => removeFromCart(productId, size)}
                />
              )
            })
          )}
        </div>
        <footer className={styles.footer}>
          {cartItems.length === 0 ? (
            <Link to="/catalog">
              <Button onClick={closeCart} variant="black" size="md" fullWidth>
                В КАТАЛОГ
              </Button>
            </Link>
          ) : (
            <>
              <PromoMini size="md">Доставка бесплатна!</PromoMini>
              <div className={styles.summary}>
                <span>ИТОГО: </span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className={styles.actions}>
                <Button onClick={closeCart} variant="white" size="md">
                  ПРОДОЛЖИТЬ ОХОТУ
                </Button>
                <Button variant="black" size="md">
                  КУПИТЬ
                </Button>
              </div>
            </>
          )}
        </footer>
      </aside>
    </div>
  )
}

export default CartDrawer
