import { create } from 'zustand'

interface CartDrawerStore {
  isCartOpen: boolean

  openCart: () => void
  closeCart: () => void
}

export const useCartDrawerStore = create<CartDrawerStore>((set) => ({
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}))
