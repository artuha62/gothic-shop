import { createContext, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useFavorites } from '@/features/favorites/model/useFavorites'

type FavoritesContextValue = ReturnType<typeof useFavorites>

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null
)

interface FavoritesProviderProps {
  children: ReactNode
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const favorites = useFavorites()

  const value = useMemo(() => favorites, [favorites])

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error('useFavoritesContext must be used within FavoritesProvider')
  }

  return context
}
