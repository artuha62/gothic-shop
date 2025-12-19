import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'favorites'

export const useFavorites = () => {
  const [favoritesIds, setFavoritesIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      const parsed = saved ? JSON.parse(saved) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritesIds))
  }, [favoritesIds])

  const toggleFavorite = useCallback((productId: string) => {
    setFavoritesIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }, [])

  const isFavorite = (productId: string) => {
    return favoritesIds.includes(productId)
  }

  return {
    favoritesIds,
    toggleFavorite,
    isFavorite,
  }
}
