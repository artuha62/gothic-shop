export const CATEGORY = [
  { value: 'all' as const, label: 'Все' },
  { value: 'HIGHBOOTS' as const, label: 'САПОГИ' },
  { value: 'BOOTS' as const, label: 'БОТИНКИ' },
  { value: 'SANDALS' as const, label: 'ТУФЛИ' },
] as const

export const PRICE_OPTIONS = [
  { value: 'all' as const, label: 'Все' },
  { value: 'to10' as const, label: 'До 10 000 ₽' },
  { value: '10to15' as const, label: '10 000 - 15 000 ₽' },
  { value: 'from15' as const, label: 'От 15 000 ₽' },
] as const

export const COLOR_OPTIONS = [
  { value: 'all', label: 'Все' },
  { value: 'white', label: 'Белый', previewColor: '#fff', needsBorder: true },
  { value: 'black', label: 'Черный', previewColor: '#000' },
  { value: 'pink', label: 'Розовый', previewColor: '#FFC0CB' },
  { value: 'red', label: 'Красный', previewColor: '#ed0000' },
  { value: 'green', label: 'Зеленый', previewColor: '#127a00' },
] as const

export const SORT_OPTIONS = [
  { value: 'all' as const, label: 'Все' },
  { value: 'popular' as const, label: 'Популярные' },
  { value: 'price_asc' as const, label: 'Цена ↑' },
  { value: 'price_desc' as const, label: 'Цена ↓' },
] as const

export const SIZES = [36, 37, 38, 39, 40, 41, 42] as const

export const SIZE_OPTIONS = SIZES.map((size) => ({
  value: size,
  label: String(size),
}))
