import { useFavoritesContext } from '@/entities/favorites/model/FavoritesContext.tsx'
import styles from './Badge.module.scss'

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
