import { useFavoritesStore } from '@/entities/favorites/store/useFavoritesStore'
import { Badge } from '@/shared/ui/badge'

export const FavoritesBadge = () => {
  const favoritesIds = useFavoritesStore((state) => state.favoritesIds)

  if (favoritesIds.length === 0) return null

  return <Badge>{favoritesIds.length}</Badge>
}
