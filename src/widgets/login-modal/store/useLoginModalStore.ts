import { create } from 'zustand'

interface LoginModalStore {
  isLoginModalOpen: boolean

  openLoginModal: () => void
  closeLoginModal: () => void
}

export const useLoginModalStore = create<LoginModalStore>((set) => ({
  isLoginModalOpen: false,

  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}))
