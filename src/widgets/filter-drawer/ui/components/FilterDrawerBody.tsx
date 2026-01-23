import {
  CATEGORY,
  COLOR_OPTIONS,
  PRICE_OPTIONS,
  SIZES,
  SORT_OPTIONS,
} from '@/entities/filters/model/constants.ts'
import { useFilters } from '@/entities/filters/model/useFilters.ts'
import styles from '@/widgets/filter-drawer/ui/FilterDrawer.module.scss'
import { FilterBlock, RadioOptions, SizeOptions } from './index'

const FilterDrawerBody = () => {
  const { filters, setFilter, toggleSize } = useFilters()
  const { category, sort, priceRange, sizes, color } = filters

  return (
    <div className={styles.body}>
      <div className={styles.filters}>
        <FilterBlock title="СОРТИРОВКА">
          <RadioOptions
            name="Сортировка"
            options={SORT_OPTIONS}
            value={sort}
            onChange={(value) => setFilter('sort', value)}
          />
        </FilterBlock>

        <FilterBlock title="КАТЕГОРИИ">
          <RadioOptions
            name="Категории"
            options={CATEGORY}
            value={category ?? ''}
            onChange={(value) => setFilter('category', value || null)}
          />
        </FilterBlock>

        <FilterBlock title="ЦЕНА">
          <RadioOptions
            name="Ценовой диапазон"
            options={PRICE_OPTIONS}
            value={priceRange}
            onChange={(value) => setFilter('priceRange', value)}
          />
        </FilterBlock>

        <FilterBlock title="ЦВЕТ">
          <RadioOptions
            name="Цвет"
            options={COLOR_OPTIONS}
            value={color ?? ''}
            onChange={(value) => setFilter('color', value)}
          />
        </FilterBlock>

        <FilterBlock title="РАЗМЕР">
          <SizeOptions
            name="Размеры"
            sizes={SIZES}
            selected={sizes}
            onToggle={toggleSize}
          />
        </FilterBlock>
      </div>
    </div>
  )
}

export default FilterDrawerBody
