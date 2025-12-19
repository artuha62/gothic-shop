export const PRICE_OPTIONS = [
  { value: 'ALL', label: 'Все' },
  { value: 'LT_10K', label: 'До 10 000 ₽' },
  { value: 'BETWEEN_10K_15K', label: '10 000 - 15 000 ₽' },
  { value: 'GT_15K', label: 'От 15 000 ₽' },
] as const

export const SORT_OPTIONS = [
  { value: 'ALL', label: 'Популярные' },
  { value: 'PRICE_ASC', label: 'Цена ↑' },
  { value: 'PRICE_DESC', label: 'Цена ↓' },
] as const

export const SIZES = [36, 37, 38, 39, 40, 41, 42] as const
