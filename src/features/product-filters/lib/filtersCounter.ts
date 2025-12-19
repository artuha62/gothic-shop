import type { Filters } from '@/features/product-filters/model/types'

export const filtersCounter = (filters: Filters) => {
  return (
    (filters.category ? 1 : 0) +
    (filters.priceRange !== 'ALL' ? 1 : 0) +
    (filters.sizes.length > 0 ? 1 : 0) +
    (filters.color?.trim() ? 1 : 0) +
    (filters.sort !== 'ALL' ? 1 : 0)
  )
}
