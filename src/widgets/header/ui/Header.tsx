import { useAuthStore } from '@/entities/auth/store/useAuthStore'
import { useSearchDropdownStore } from '@/widgets/search-dropdown/store/useSearchDropdownStore'

import { CartBadge } from '@/entities/cart/ui/cart-badge'
import { FavoritesBadge } from '@/entities/favorites/ui/favorites-badge'
import { IconButton } from '@/shared/ui/icon-button'
import { useCartDrawerStore } from '@/widgets/cart-drawer/store/useCartDrawerStore'
import { NavMenu } from '@/widgets/header/ui/nav-menu'
import { useLoginModalStore } from '@/widgets/login-modal/store/useLoginModalStore'
import cn from 'classnames'
import { Heart, Menu, Search, ShoppingCart, User } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import styles from './Header.module.scss'

interface HeaderProps {
  variant?: 'default' | 'light'
}

export const Header = ({ variant = 'default' }: HeaderProps) => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()

  const openCart = useCartDrawerStore((state) => state.openCart)
  const openSearch = useSearchDropdownStore((state) => state.openSearch)
  const openLoginModal = useLoginModalStore((state) => state.openLoginModal)
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const toggleNavMenu = () => setIsNavMenuOpen((prev) => !prev)
  const closeNavMenu = () => setIsNavMenuOpen(false)

  const handleProfileClick = () => {
    if (isAuthenticated && user) {
      navigate('/profile')
    } else {
      openLoginModal()
    }
  }

  return (
    <header
      ref={headerRef}
      className={cn(styles.header, styles[variant], 'container')}
    >
      <div className={styles.inner}>
        {/* LEFT */}
        <div className={styles.left}>
          <IconButton
            className={styles.burgerButton}
            onClick={toggleNavMenu}
            variant="header"
            aria-label="Меню"
            isActive={isNavMenuOpen}
          >
            <Menu strokeWidth={1.5} size={17} />
          </IconButton>
          {/*Иконка поиска на мобильных*/}
          <IconButton
            variant="header"
            aria-label="Поиск"
            onClick={openSearch}
            data-hide-mobile="true"
            className={styles.mobileSearchButton}
          >
            <Search strokeWidth={1.5} size={17} />
          </IconButton>

          <nav className={styles.navigation}>
            <Link to="/catalog" className={styles.link}>
              Каталог
            </Link>
            <Link to="/" className={styles.link}>
              New
            </Link>
          </nav>
        </div>

        {/* CENTER */}
        <Link to="/">
          <img
            className={styles.logo}
            src="/images/logo.webp"
            alt="Gothic shop"
            width={480}
            height={233}
            loading="eager"
          />
        </Link>

        {/* RIGHT */}
        <div className={styles.right}>
          <IconButton
            variant="header"
            aria-label="Поиск"
            onClick={openSearch}
            data-hide-mobile="true"
            className={styles.searchButton}
          >
            <Search strokeWidth={1.5} size={17} />
          </IconButton>

          <Link
            className={styles.favoritesButton}
            to="/favorites"
            data-hide-mobile="true"
          >
            <IconButton variant="header" aria-label="Избранное">
              <Heart strokeWidth={1.5} size={17} />
              <FavoritesBadge />
            </IconButton>
          </Link>

          <IconButton
            className={styles.cartButton}
            onClick={openCart}
            variant="header"
            aria-label="Корзина"
          >
            <ShoppingCart strokeWidth={1.5} size={17} />
            <CartBadge />
          </IconButton>

          <IconButton
            isActive={isAuthenticated}
            onClick={handleProfileClick}
            variant="header"
            aria-label="Профиль"
            className={styles.accountButton}
          >
            <User strokeWidth={1.5} size={17} />
          </IconButton>
        </div>
      </div>

      <NavMenu isOpen={isNavMenuOpen} onClose={closeNavMenu} />
    </header>
  )
}
