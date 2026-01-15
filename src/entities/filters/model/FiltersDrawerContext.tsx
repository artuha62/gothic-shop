import { useFiltersDrawer } from '@/entities/filters/model/useFiltersDrawer.ts'
import { createContext, type ReactNode, useContext, useMemo } from 'react'

const FiltersDrawerContext = createContext<ReturnType<
  typeof useFiltersDrawer
> | null>(null)

export const FiltersDrawerProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const cartDrawer = useFiltersDrawer()

  const value = useMemo(() => cartDrawer, [cartDrawer])

  return (
    <FiltersDrawerContext.Provider value={value}>
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
