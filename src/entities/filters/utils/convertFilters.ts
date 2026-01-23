import type {
  ApiCategory,
  ApiFilters,
  ApiPriceRange,
  ApiSort,
  Filters,
} from '@/entities/filters/model/types.ts'

export const filtersToApiParams = (filters: Filters): ApiFilters => {
  return {
    category: filters.category ?? undefined,
    price: filters.priceRange,
    color: filters.color || undefined,
    sizes: filters.sizes.length > 0 ? filters.sizes.join(',') : undefined,
    sort: filters.sort !== 'all' ? filters.sort : undefined,
    search: filters.search || undefined,
  }
}

export const apiParamsToFilters = (params: URLSearchParams): Filters => {
  return {
    category: (params.get('category') as ApiCategory) || null,
    priceRange: (params.get('price') as ApiPriceRange) || 'all',
    color: params.get('color') || '',
    sizes: params.get('sizes')
      ? params.get('sizes')!.split(',').map(Number)
      : [],
    sort: (params.get('sort') as ApiSort) || 'all',
    search: params.get('search') || '',
  }
}
