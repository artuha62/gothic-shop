import { useFavoritesStore } from '@/entities/favorites/store/useFavoritesStore'
import styles from './Badge.module.scss'

export const FavoritesBadge = () => {
  const favoritesIds = useFavoritesStore((state) => state.favoritesIds)
  return (
    <>
      {favoritesIds.length > 0 && (
        <span className={styles.badge}>{favoritesIds.length}</span>
      )}
    </>
  )
}
