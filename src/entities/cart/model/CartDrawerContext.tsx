import { createContext, type ReactNode, useContext, useMemo } from 'react'
import { useCartDrawer } from './useCartDrawer.ts'

const CartDrawerContext = createContext<ReturnType<
  typeof useCartDrawer
> | null>(null)

export const CartDrawerProvider = ({ children }: { children: ReactNode }) => {
  const cartDrawer = useCartDrawer()

  const value = useMemo(() => cartDrawer, [cartDrawer])

  return (
    <CartDrawerContext.Provider value={value}>
      {children}
    </CartDrawerContext.Provider>
  )
}

export const useCartDrawerContext = () => {
  const context = useContext(CartDrawerContext)

  if (!context) {
    throw new Error(
      'useCartDrawerContext must be used within CartDrawerProvider'
    )
  }

  return context
}
