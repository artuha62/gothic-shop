import { create } from 'zustand'

interface FiltersStore {
  // State
  isFiltersOpen: boolean

  // UI actions
  openFilters: () => void
  closeFilters: () => void
}

export const useFiltersStore = create<FiltersStore>((set) => ({
  // State
  isFiltersOpen: false,

  // UI actions
  openFilters: () => set({ isFiltersOpen: true }),
  closeFilters: () => set({ isFiltersOpen: false }),
}))
