import { useAuthStore } from '@/entities/auth/store/useAuthStore'
import { useCartStore } from '@/entities/cart/store/useCartStore.ts'
import { useSearchStore } from '@/features/search/store/useSearchStore.ts'
import { useUIStore } from '@/shared/store/useUIStore'
import { CartBadge, FavoritesBadge } from '@/shared/ui/badge'
import { IconButton } from '@/shared/ui/icon-button'
import cn from 'classnames'
import { Heart, Menu, Search, ShoppingCart, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import styles from './Header.module.scss'

interface HeaderProps {
  variant?: 'default' | 'light'
}

const Header = ({ variant = 'default' }: HeaderProps) => {
  const navigate = useNavigate()
  const openCart = useCartStore((state) => state.openCart)
  const openSearch = useSearchStore((state) => state.openSearch)
  const openLoginModal = useUIStore((state) => state.openLoginModal)
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const handleProfileClick = () => {
    if (isAuthenticated && user) {
      navigate('/profile')
    } else {
      openLoginModal()
    }
  }

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

          <IconButton
            isActive={isAuthenticated}
            onClick={handleProfileClick}
            variant="header"
            aria-label="Профиль"
          >
            <User strokeWidth={1.5} size={17} />
          </IconButton>
        </div>
      </div>
    </header>
  )
}

export default Header
