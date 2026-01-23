import { create } from 'zustand'

interface SearchStore {
  // State
  isSearchOpen: boolean

  // UI actions
  openSearch: () => void
  closeSearch: () => void
  toggleSearch: () => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  // State
  isSearchOpen: false,

  // UI actions
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
}))
