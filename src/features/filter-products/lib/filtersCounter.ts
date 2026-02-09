import type { Filters } from '@/features/filter-products/model/types.ts'

// UI
export const filtersCounter = (filters: Filters) => {
  return (
    (filters.category !== 'all' ? 1 : 0) +
    (filters.priceRange !== 'all' ? 1 : 0) +
    (filters.sizes.length > 0 ? 1 : 0) +
    (filters.color?.trim() !== 'all' ? 1 : 0) +
    (filters.sort !== 'all' ? 1 : 0)
  )
}

// Boolean
export const hasActiveFilters = (filters: Filters) => {
  return (
    filters.category !== 'all' ||
    filters.priceRange !== 'all' ||
    filters.sizes.length > 0 ||
    filters.color?.trim() !== 'all' ||
    filters.sort !== 'all' ||
    filters.search?.trim() !== ''
  )
}
