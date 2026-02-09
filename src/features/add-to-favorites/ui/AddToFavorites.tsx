import { useFavoritesStore } from '@/entities/favorites/store/useFavoritesStore.ts'
import { IconButton } from '@/shared/ui/icon-button'
import { Heart } from 'lucide-react'
import styles from './AddToFavorites.module.scss'

interface AddToFavoritesProps {
  productId: string
}

export const AddToFavorites = ({ productId }: AddToFavoritesProps) => {
  const isFavorite = useFavoritesStore((state) => state.isFavorite(productId))
  const toggleFavorites = useFavoritesStore((state) => state.toggleFavorite)
  return (
    <IconButton
      onClick={() => toggleFavorites(productId)}
      variant="card"
      className={isFavorite ? styles.favorite : ''}
      aria-label="Добавить в избранное"
    >
      <Heart className={styles.icon} strokeWidth={1.25} size={24} />
    </IconButton>
  )
}
