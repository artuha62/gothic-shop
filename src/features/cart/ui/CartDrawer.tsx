import { CircleAlert, X } from 'lucide-react'
import { useCartContext } from '@/features/cart/model/CartContext'
import { CartItemRow } from '@/features/cart'
import { formatPrice } from '@/shared/lib/format-price/formatPrice'
import { useCartDrawerContext } from '@/features/cart/model/CartDrawerContext'
import { useProductsByIds } from '@/entities/product/model/useProductsByIds'
import { Button } from '@/shared/ui/button'
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
    <div className={`${styles.drawer} ${isOpen ? styles.isOpen : ''}`}>
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
            cartItems.map(({ productId, quantity }) => {
              const product = productsMap.get(productId)

              if (!product) return null

              return (
                <CartItemRow
                  key={productId}
                  product={product}
                  quantity={quantity}
                  onIncrease={() => increase(productId)}
                  onDecrease={() => decrease(productId)}
                  onRemove={() => removeFromCart(productId)}
                />
              )
            })
          )}
        </div>
        <footer className={styles.footer}>
          {products.length === 0 ? (
            <Link to="/catalog">
              <Button onClick={closeCart} variant="black" size="lg" fullWidth>
                В КАТАЛОГ
              </Button>
            </Link>
          ) : (
            <>
              <div className={styles.promo}>
                <CircleAlert strokeWidth={2} size={18} />
                <span>Доставка бесплатна!</span>
              </div>
              <div className={styles.summary}>
                <span>ИТОГО: </span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className={styles.actions}>
                <Button onClick={closeCart} variant="white" size="lg">
                  ПРОДОЛЖИТЬ ОХОТУ
                </Button>
                <Button variant="black" size="lg">
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
