import { useState } from 'react'
import type { CartItem } from '@/features/cart/model/types'

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (productId: string) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.productId === productId)

      if (existingItem) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { productId, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId))
  }

  const increase = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decrease = (productId: string) => {
    setCartItems((prev) => {
      const item = prev.find((item) => item.productId === productId)

      if (!item) return prev

      if (item.quantity === 1) {
        return prev.filter((item) => item.productId !== productId)
      }

      return prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    })
  }

  const clearCart = () => {
    setCartItems([])
  }

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return {
    cartItems,
    totalQuantity,
    addToCart,
    removeFromCart,
    increase,
    decrease,
    clearCart,
  }
}
