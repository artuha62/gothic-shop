import { desktopMenu, mobileMenu } from '@/widgets/header/model/constants'
import { Link } from 'react-router'
import styles from './NavMenu.module.scss'

interface NavMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const NavMenu = ({ isOpen, onClose }: NavMenuProps) => {
  if (!isOpen) return null

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <nav className={styles.menu}>
        <div className={styles.menuContent}>
          {/* Мобильный контент */}
          <div className={styles.mobileContent}>
            <div className={styles.menuSection}>
              {mobileMenu.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={styles.menuLink}
                  onClick={onClose}
                >
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Десктопный контент */}
          <div className={styles.desktopContent}>
            {desktopMenu.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={styles.menuLink}
                onClick={onClose}
              >
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}
