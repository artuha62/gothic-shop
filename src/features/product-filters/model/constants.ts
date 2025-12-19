export const SORT_OPTIONS = [
  { value: 'ALL', label: 'Популярные' },
  { value: 'PRICE_ASC', label: 'Цена ↑' },
  { value: 'PRICE_DESC', label: 'Цена ↓' },
] as const

export const PRICE_OPTIONS = [
  { value: 'ALL', label: 'Все' },
  { value: 'LT_10K', label: 'До 10 000 ₽' },
  { value: 'BETWEEN_10K_15K', label: '10 000 - 15 000 ₽' },
  { value: 'GT_15K', label: 'От 15 000 ₽' },
] as const

export const COLOR_OPTIONS = [
  { value: '', label: 'Все' },
  { value: 'black', label: 'Черный', previewColor: '#000' },
  { value: 'pink', label: 'Розовый', previewColor: '#FFC0CB ' },
  { value: 'red', label: 'Красный', previewColor: '#ed0000' },
  { value: 'green', label: 'Зеленый', previewColor: '#127a00' },
] as const

export const SIZES = [36, 37, 38, 39, 40, 41, 42] as const
