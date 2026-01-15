import { useFiltersDrawer } from '@/entities/filters/model/useFiltersDrawer.ts'
import { createContext, type ReactNode, useContext } from 'react'

const FiltersDrawerContext = createContext<ReturnType<
  typeof useFiltersDrawer
> | null>(null)

export const FiltersDrawerProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const filtersDrawer = useFiltersDrawer()

  return (
    <FiltersDrawerContext.Provider value={filtersDrawer}>
      {children}
    </FiltersDrawerContext.Provider>
  )
}

export const useFiltersDrawerContext = () => {
  const context = useContext(FiltersDrawerContext)

  if (!context) {
    throw new Error(
      'useFiltersDrawerContext must be used within FiltersDrawerProvider'
    )
  }

  return context
}
