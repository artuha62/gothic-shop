import { useFavorites } from '@/entities/favorites/model/useFavorites.ts'
import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

type FavoritesContextValue = ReturnType<typeof useFavorites>

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null
)

interface FavoritesProviderProps {
  children: ReactNode
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const favorites = useFavorites()

  return (
    <FavoritesContext.Provider value={favorites}>
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
