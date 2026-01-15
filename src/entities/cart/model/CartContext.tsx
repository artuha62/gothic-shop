import { useCart } from '@/entities/cart/model/useCart.ts'
import type { ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'

type CartContextValue = ReturnType<typeof useCart>

export const CartContext = createContext<CartContextValue | null>(null)

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const cart = useCart()
  const value = useMemo(() => cart, [cart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCartContext = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCartContext must be used within CartProvider')
  }

  return context
}
