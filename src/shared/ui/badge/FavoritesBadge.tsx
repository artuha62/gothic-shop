import styles from './Badge.module.scss'
import { useFavoritesContext } from '@/features/favorites/model/FavoritesContext'

const FavoritesBadge = () => {
  const { favoritesIds } = useFavoritesContext()
  return (
    <>
      {favoritesIds.length > 0 && (
        <span className={styles.badge}>{favoritesIds.length}</span>
      )}
    </>
  )
}

export default FavoritesBadge
