import { Heart, Menu, Search, ShoppingCart, User } from 'lucide-react'
import { Link } from 'react-router'
import { IconButton } from '@/shared/ui/icon-button'
import FavoritesBadge from '@/shared/ui/badge/FavoritesBadge'
import { CartBadge } from '@/shared/ui/badge'
import { useCartDrawerContext } from '@/features/cart/model/CartDrawerContext'
import styles from './Header.module.scss'

const Header = () => {
  const { openCart } = useCartDrawerContext()

  const handleClick = () => {
    openCart()
  }
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.left}>
            <IconButton variant="header" aria-label="Меню">
              <Menu strokeWidth={1.5} size={17} />
            </IconButton>
            <nav className={styles.navigation}>
              <Link to={'/catalog-page'} className={styles.navigationLink}>
                Каталог
              </Link>
              <Link to={'/'} className={styles.navigationLink}>
                New
              </Link>
            </nav>
          </div>

          <Link to="/catalog">
            <img
              className={styles.logo}
              src="/images/logo.webp"
              alt="Gothic shop"
              loading="lazy"
            />
          </Link>

          <div className={styles.actions}>
            <IconButton variant="header" aria-label="Поиск">
              <Search strokeWidth={1.5} size={17} />
            </IconButton>
            <Link to={'/favorites'}>
              <IconButton variant="header" aria-label="Избранное">
                <Heart strokeWidth={1.5} size={17} />
                <FavoritesBadge />
              </IconButton>
            </Link>
            <IconButton
              onClick={handleClick}
              variant="header"
              aria-label="Корзина"
            >
              <ShoppingCart strokeWidth={1.5} size={17} />
              <CartBadge />
            </IconButton>
            <IconButton variant="header" aria-label="Профиль">
              <User strokeWidth={1.5} size={17} />
            </IconButton>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
