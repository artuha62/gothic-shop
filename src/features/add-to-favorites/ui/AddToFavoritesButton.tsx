import { useFavoritesStore } from '@/entities/favorites/store/useFavoritesStore.ts'
import { IconButton } from '@/shared/ui/icon-button/index'
import { Heart } from 'lucide-react'
import styles from './AddToFavoritesButton.module.scss'

interface Props {
  productId: string
}

export const AddToFavoritesButton = ({ productId }: Props) => {
  const isFavorite = useFavoritesStore((state) => state.isFavorite(productId))
  const toggleFavorites = useFavoritesStore((state) => state.toggleFavorite)
  return (
    <IconButton
      onClick={() => toggleFavorites(productId)}
      variant="card"
      className={isFavorite ? styles.favorite : ''}
      aria-label="Добавить в избранное"
    >
      <Heart strokeWidth={1.25} size={24} />
    </IconButton>
  )
}
