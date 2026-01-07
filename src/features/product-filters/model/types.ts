import {
  PRICE_OPTIONS,
  SORT_OPTIONS,
  COLOR_OPTIONS,
  SIZES,
  CATEGORY,
} from './constants'

export type Category = (typeof CATEGORY)[number]['value']

export type PriceRange = (typeof PRICE_OPTIONS)[number]['value']

export type Color = (typeof COLOR_OPTIONS)[number]['value']

export type Sizes = (typeof SIZES)[number]

export type Sort = (typeof SORT_OPTIONS)[number]['value']

export type Filters = {
  category: Category | null
  priceRange: PriceRange
  sizes: number[]
  color: Color
  sort: Sort
}
