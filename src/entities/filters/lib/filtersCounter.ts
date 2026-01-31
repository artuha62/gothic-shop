import type { Filters } from '@/entities/filters/model/types.ts'

export const filtersCounter = (filters: Filters) => {
  return (
    (filters.category !== 'all' ? 1 : 0) +
    (filters.priceRange !== 'all' ? 1 : 0) +
    (filters.sizes.length > 0 ? 1 : 0) +
    (filters.color?.trim() !== 'all' ? 1 : 0) +
    (filters.sort !== 'all' ? 1 : 0)
  )
}
