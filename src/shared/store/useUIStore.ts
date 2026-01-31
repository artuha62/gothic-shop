import { create } from 'zustand'

interface UIStore {
  // Modals
  isLoginModalOpen: boolean

  // Modal actions
  openLoginModal: () => void
  closeLoginModal: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  // Modals state
  isLoginModalOpen: false,

  // Modals actions
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}))
