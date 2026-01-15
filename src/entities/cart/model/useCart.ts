import type { CartItem } from '@/entities/cart/model/types.ts'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage.ts'
import { useCallback, useMemo } from 'react'

const STORAGE_KEY = 'cart'

export const useCart = () => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem>(STORAGE_KEY, [])

  const addToCart = useCallback(
    (productId: string, size: number) => {
      setCartItems((prev) => {
        const existingItem = prev.find(
          (item) => item.productId === productId && item.size === size
        )

        if (existingItem) {
          return prev.map((item) =>
            item.productId === productId && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
        return [...prev, { productId, size, quantity: 1 }]
      })
    },
    [setCartItems]
  )

  const removeFromCart = useCallback(
    (productId: string, size: number) => {
      setCartItems((prev) =>
        prev.filter(
          (item) => !(item.productId === productId && item.size === size)
        )
      )
    },
    [setCartItems]
  )

  const increase = useCallback(
    (productId: string, size: number, maxQuantity: number) => {
      setCartItems((prev) =>
        prev.map((item) => {
          if (item.productId === productId && item.size === size) {
            if (item.quantity >= maxQuantity) return item
            return { ...item, quantity: item.quantity + 1 }
          }
          return item
        })
      )
    },
    [setCartItems]
  )

  const decrease = useCallback(
    (productId: string, size: number) => {
      setCartItems((prev) => {
        const item = prev.find(
          (item) => item.productId === productId && item.size === size
        )

        if (!item) return prev

        if (item.quantity === 1) {
          return prev.filter(
            (item) => !(item.productId === productId && item.size === size)
          )
        }

        return prev.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      })
    },
    [setCartItems]
  )

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [setCartItems])

  const totalQuantity = useMemo(
    () => cartItems.reduce((sum, { quantity }) => sum + quantity, 0),
    [cartItems]
  )

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
