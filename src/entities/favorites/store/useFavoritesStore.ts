import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesStore {
  // State
  favoritesIds: string[]

  // Favorites actions
  toggleFavorite: (productId: string) => void
  isFavorite: (productId: string) => boolean
  clearFavorites: () => void
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      // State
      favoritesIds: [],

      // Favorites actions
      toggleFavorite: (productId: string) => {
        set((state) => ({
          favoritesIds: state.favoritesIds.includes(productId)
            ? state.favoritesIds.filter((id) => id !== productId)
            : [...state.favoritesIds, productId],
        }))
      },

      isFavorite: (productId: string) => {
        return get().favoritesIds.includes(productId)
      },

      clearFavorites: () => {
        set({ favoritesIds: [] })
      },
    }),
    {
      name: 'favorites',
    }
  )
)
