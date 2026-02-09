import {
  CATEGORY,
  COLOR_OPTIONS,
  PRICE_OPTIONS,
  SIZE_OPTIONS,
  SORT_OPTIONS,
} from '@/features/filter-products/model/constants'
import { useFilters } from '@/features/filter-products/model/useFilters'
import { FieldGroup } from '@/shared/ui/field-group'
import styles from './FilterList.module.scss'

export const FilterList = () => {
  const { filters, setFilter, toggleSize } = useFilters()

  const { category, sort, priceRange, sizes, color } = filters

  return (
    <div className={styles.filters}>
      <FieldGroup
        type="radio"
        subtitle="Сортировка"
        name="Сортировка"
        options={SORT_OPTIONS}
        value={sort}
        onChange={(value) => setFilter('sort', value)}
      />

      <FieldGroup
        type="radio"
        subtitle="Категории"
        name="Категории"
        options={CATEGORY}
        value={category ?? ''}
        onChange={(value) => setFilter('category', value || null)}
      />

      <FieldGroup
        type="radio"
        subtitle="Цена"
        name="Ценовой диапазон"
        options={PRICE_OPTIONS}
        value={priceRange}
        onChange={(value) => setFilter('priceRange', value)}
      />

      <FieldGroup
        type="radio"
        subtitle="Цвет"
        name="Выбор цвета"
        options={COLOR_OPTIONS}
        value={color}
        onChange={(value) => setFilter('color', value)}
      />

      <FieldGroup
        type="checkbox"
        subtitle="Размер"
        name="Размеры"
        options={SIZE_OPTIONS}
        value={sizes}
        onChange={toggleSize}
      />
    </div>
  )
}
