import type { CartItem } from '@/entities/cart/store/types.ts'
import type { Product } from '@/entities/product/model/types.ts'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartStore {
  // State
  items: CartItem[]
  isCartOpen: boolean

  // Cart actions
  addToCart: (productId: string, size: number) => void
  removeFromCart: (productId: string, size: number) => void
  increaseItemQuantity: (
    productId: string,
    size: number,
    maxQuantity: number
  ) => void
  decreaseItemQuantity: (productId: string, size: number) => void
  clearCart: () => void

  // UI actions
  openCart: () => void
  closeCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      // Initial state
      items: [],
      isCartOpen: false,

      // Cart actions
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

      // UI actions
      openCart: () => {
        set({ isCartOpen: true })
      },

      closeCart: () => {
        set({ isCartOpen: false })
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)

// Selectors
export const selectTotalQuantity = (state: CartStore) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectItemsLength = (state: CartStore) => state.items.length

export const selectCartItem =
  (productId: string, size: number) => (state: CartStore) =>
    state.items.find(
      (item) => item.productId === productId && item.size === size
    )

export const selectCartTotals =
  (
    products: Map<string, Product>,
    deliveryMethod: 'courier' | 'pickup' = 'courier',
    discount: number = 0
  ) =>
  (state: CartStore) => {
    const itemsTotal = state.items.reduce((sum, item) => {
      const product = products.get(item.productId)
      if (!product) return sum
      return sum + product.price * item.quantity
    }, 0)

    const deliveryCost = deliveryMethod === 'courier' ? 0 : 0
    const total = itemsTotal + deliveryCost - discount

    return {
      itemsTotal,
      deliveryCost,
      discount,
      total,
      itemsCount: state.items.reduce((sum, item) => sum + item.quantity, 0),
    }
  }
