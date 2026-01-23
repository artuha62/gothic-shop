import { useCartStore } from '@/entities/cart/store/useCartStore.ts'
import { useSearchStore } from '@/entities/search/store/useSearchStore.ts'
import { CartBadge } from '@/shared/ui/badge'
import FavoritesBadge from '@/shared/ui/badge/FavoritesBadge'
import { IconButton } from '@/shared/ui/icon-button'
import cn from 'classnames'
import { Heart, Menu, Search, ShoppingCart, User } from 'lucide-react'
import { Link } from 'react-router'
import styles from './Header.module.scss'

interface HeaderProps {
  variant?: 'default' | 'light'
}

const Header = ({ variant = 'default' }: HeaderProps) => {
  const openCart = useCartStore((state) => state.openCart)

  const openSearch = useSearchStore((state) => state.openSearch)

  return (
    <header className={cn(styles.header, styles[variant], 'container')}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <nav className={styles.navigation}>
            <IconButton variant="header" aria-label="Меню">
              <Menu strokeWidth={1.5} size={17} />
            </IconButton>
            <Link to={'/catalog'} className={styles.link}>
              Каталог
            </Link>
            <Link to={'/'} className={styles.link}>
              New
            </Link>
          </nav>
        </div>

        <Link to="/">
          <img
            className={styles.logo}
            src="/images/logo.webp"
            alt="Gothic shop"
            loading="lazy"
          />
        </Link>

        <div className={styles.right}>
          <IconButton variant="header" aria-label="Поиск" onClick={openSearch}>
            <Search strokeWidth={1.5} size={17} />
          </IconButton>

          <Link to={'/favorites'}>
            <IconButton variant="header" aria-label="Избранное">
              <Heart strokeWidth={1.5} size={17} />
              <FavoritesBadge />
            </IconButton>
          </Link>

          <IconButton onClick={openCart} variant="header" aria-label="Корзина">
            <ShoppingCart strokeWidth={1.5} size={17} />
            <CartBadge />
          </IconButton>

          <IconButton variant="header" aria-label="Профиль">
            <User strokeWidth={1.5} size={17} />
          </IconButton>
        </div>
      </div>
    </header>
  )
}

export default Header
