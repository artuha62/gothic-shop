export const CATEGORY = [
  { value: 'HIGHBOOTS', label: 'САПОГИ' },
  { value: 'BOOTS', label: 'БОТИНКИ' },
  { value: 'SANDALS', label: 'ТУФЛИ' },
] as const

export const PRICE_OPTIONS = [
  { value: 'all', label: 'Все' },
  { value: 'to10', label: 'До 10 000 ₽' },
  { value: '10to15', label: '10 000 - 15 000 ₽' },
  { value: 'from15', label: 'От 15 000 ₽' },
] as const

export const COLOR_OPTIONS = [
  { value: '', label: 'Все' },
  { value: 'black', label: 'Черный', previewColor: '#000' },
  { value: 'pink', label: 'Розовый', previewColor: '#FFC0CB' },
  { value: 'red', label: 'Красный', previewColor: '#ed0000' },
  { value: 'green', label: 'Зеленый', previewColor: '#127a00' },
] as const

export const SORT_OPTIONS = [
  { value: 'all', label: 'Популярные' },
  { value: 'price_asc', label: 'Цена ↑' },
  { value: 'price_desc', label: 'Цена ↓' },
] as const

export const SIZES = [36, 37, 38, 39, 40, 41, 42] as const

// For validation
export const CATEGORY_VALUES = CATEGORY.map((c) => c.value)
export const PRICE_VALUES = PRICE_OPTIONS.map((p) => p.value)
export const COLOR_VALUES = COLOR_OPTIONS.map((c) => c.value)
export const SORT_VALUES = SORT_OPTIONS.map((s) => s.value)
