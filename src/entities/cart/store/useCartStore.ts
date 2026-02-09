import type { CartItem } from '@/entities/cart/model/types.ts'
import type { Product } from '@/entities/product/model/types.ts'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartStore {
  items: CartItem[]

  addToCart: (productId: string, size: number) => void
  removeFromCart: (productId: string, size: number) => void
  increaseItemQuantity: (
    productId: string,
    size: number,
    maxQuantity: number
  ) => void
  decreaseItemQuantity: (productId: string, size: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (productId, size) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.productId === productId && item.size === size
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === productId && item.size === size
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          }
          return {
            items: [...state.items, { productId, size, quantity: 1 }],
          }
        })
      },

      removeFromCart: (productId, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === productId && item.size === size)
          ),
        }))
      },

      increaseItemQuantity: (productId, size, maxQuantity) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.productId === productId && item.size === size) {
              if (item.quantity >= maxQuantity) return item
              return { ...item, quantity: item.quantity + 1 }
            }
            return item
          }),
        }))
      },

      decreaseItemQuantity: (productId, size) => {
        set((state) => {
          const item = state.items.find(
            (item) => item.productId === productId && item.size === size
          )

          if (!item) return state

          if (item.quantity === 1) {
            return {
              items: state.items.filter(
                (item) => !(item.productId === productId && item.size === size)
              ),
            }
          }

          return {
            items: state.items.map((item) =>
              item.productId === productId && item.size === size
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }
        })
      },

      clearCart: () => {
        set({ items: [] })
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)

export const totalQuantitySelector = (state: CartStore) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0)

export const cartItemQuantitySelector =
  (productId: string, size: number) => (state: CartStore) =>
    state.items.find((i) => i.productId === productId && i.size === size)
      ?.quantity ?? 0

export const cartItemSubtotalSelector =
  (productId: string, size: number, price: number) => (state: CartStore) => {
    const item = state.items.find(
      (i) => i.productId === productId && i.size === size
    )
    return item ? item.quantity * price : 0
  }

export const cartTotalSelector =
  (products: Product[]) => (state: CartStore) => {
    const priceMap = new Map(
      products.map((product) => [product.id, product.price])
    )

    return state.items.reduce((sum, item) => {
      const price = priceMap.get(item.productId) ?? 0
      return sum + price * item.quantity
    }, 0)
  }

export const cartIsEmptySelector = (state: CartStore) =>
  state.items.length === 0

export const productsIdsSelector = (state: CartStore) =>
  Array.from(new Set(state.items.map((item) => item.productId)))
