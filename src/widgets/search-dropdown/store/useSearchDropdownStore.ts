import { create } from 'zustand'

interface SearchDropdownStore {
  // State
  isSearchOpen: boolean

  // UI actions
  openSearch: () => void
  closeSearch: () => void
  toggleSearch: () => void
}

export const useSearchDropdownStore = create<SearchDropdownStore>((set) => ({
  // State
  isSearchOpen: false,

  // UI actions
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
}))
