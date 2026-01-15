import { useFavoritesContext } from '@/entities/favorites/model/FavoritesContext.tsx'
import { IconButton } from '@/shared/ui/icon-button/index'
import { Heart } from 'lucide-react'
import styles from './AddToFavoritesButton.module.scss'

interface Props {
  productId: string
}

const AddToFavoritesButton = ({ productId }: Props) => {
  const { toggleFavorite, isFavorite } = useFavoritesContext()
  const active = isFavorite(productId)

  return (
    <IconButton
      onClick={() => toggleFavorite(productId)}
      variant="card"
      className={active ? styles.favorite : ''}
      aria-label="Добавить в избранное"
    >
      <Heart strokeWidth={1.25} size={24} />
    </IconButton>
  )
}

export default AddToFavoritesButton
