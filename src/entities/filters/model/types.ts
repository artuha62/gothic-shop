// types.ts - типы API (источник правды)
export type ApiCategory = 'HIGHBOOTS' | 'BOOTS' | 'SANDALS'
export type ApiPriceRange = 'all' | 'to10' | '10to15' | 'from15'
export type ApiSort = 'all' | 'price_asc' | 'price_desc'

// Тип для query params (что отправляем на сервер)
export type ApiFilters = {
  category?: ApiCategory
  price?: ApiPriceRange // Заметь: price, не priceRange!
  color?: string
  sizes?: string // "36,37,38" - строка для query param
  sort?: ApiSort
  search?: string
  page?: number
  limit?: number
}

// Тип для UI (внутреннее состояние фронта)
export type Filters = {
  category: ApiCategory | null
  priceRange: ApiPriceRange // На фронте удобнее так
  sizes: number[] // На фронте массив чисел
  color: string
  sort: ApiSort
  search: string
}
