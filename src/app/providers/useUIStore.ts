import { create } from 'zustand'

interface UIStore {
  // Menus
  isNavMenuOpen: boolean

  // Menus actions
  openNavMenu: () => void
  closeNavMenu: () => void
  toggleNavMenu: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  // Menus state
  isNavMenuOpen: false,

  // Menus actions
  openNavMenu: () => set({ isNavMenuOpen: true }),
  closeNavMenu: () => set({ isNavMenuOpen: false }),
  toggleNavMenu: () =>
    set((state) => ({ isNavMenuOpen: !state.isNavMenuOpen })),
}))
