import { PRICE_OPTIONS, SORT_OPTIONS, SIZES } from './constants'

export type Category = 'HIGHBOOTS' | 'BOOTS' | 'SANDALS'

export type PriceRange = (typeof PRICE_OPTIONS)[number]['value']

export type Sizes = (typeof SIZES)[number]

export type Sort = (typeof SORT_OPTIONS)[number]['value']

export type Filters = {
  category: Category | null
  priceRange: PriceRange
  sizes: number[]
  color: string | null
  sort: Sort
}
