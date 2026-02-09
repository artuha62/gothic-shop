export type ApiCategory = 'all' | 'HIGHBOOTS' | 'BOOTS' | 'SANDALS'
export type ApiPriceRange = 'all' | 'to10' | '10to15' | 'from15'
export type ApiSort = 'all' | 'popular' | 'price_asc' | 'price_desc'

export type ApiFilters = {
  category?: ApiCategory
  price?: ApiPriceRange
  color?: string
  sizes?: string
  sort?: ApiSort
  search?: string
  page?: number
  limit?: number
}

export type Filters = {
  category: ApiCategory
  priceRange: ApiPriceRange
  sizes: number[]
  color: string
  sort: ApiSort
  search?: string
}
