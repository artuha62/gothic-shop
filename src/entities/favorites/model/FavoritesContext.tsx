import { useFavorites } from '@/entities/favorites/model/useFavorites.ts'
import type { ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'

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
