import { useLocalStorage } from '@/shared/hooks/useLocalStorage.ts'
import { useCallback } from 'react'

const STORAGE_KEY = 'favorites'

export const useFavorites = () => {
  const [favoritesIds, setFavoritesIds] = useLocalStorage<string>(
    STORAGE_KEY,
    []
  )

  const toggleFavorite = useCallback(
    (productId: string) => {
      setFavoritesIds((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      )
    },
    [setFavoritesIds]
  )

  const isFavorite = useCallback(
    (productId: string) => {
      return favoritesIds.includes(productId)
    },
    [favoritesIds]
  )

  return {
    favoritesIds,
    toggleFavorite,
    isFavorite,
  }
}
