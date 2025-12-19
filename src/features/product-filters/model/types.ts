export type Category = 'HIGHBOOTS' | 'BOOTS' | 'SANDALS'
export type PriceRange = 'ALL' | 'LT_10K' | 'BETWEEN_10K_15K' | 'GT_15K'
export type Sort = 'ALL' | 'PRICE_ASC' | 'PRICE_DESC'

export type Filters = {
  category: Category | null
  priceRange: PriceRange
  sizes: number[]
  color: string | null
  sort: Sort
}
