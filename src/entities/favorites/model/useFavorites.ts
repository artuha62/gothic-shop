import { useLocalStorage } from '@/shared/hooks/useLocalStorage.ts'

const STORAGE_KEY = 'favorites'

export const useFavorites = () => {
  const [favoritesIds, setFavoritesIds] = useLocalStorage<string>(
    STORAGE_KEY,
    []
  )

  const toggleFavorite = (productId: string) => {
    setFavoritesIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  const isFavorite = (productId: string) => {
    return favoritesIds.includes(productId)
  }

  return {
    favoritesIds,
    toggleFavorite,
    isFavorite,
  }
}
