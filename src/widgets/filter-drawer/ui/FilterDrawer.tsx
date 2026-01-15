import {
  CATEGORY,
  COLOR_OPTIONS,
  PRICE_OPTIONS,
  SIZES,
  SORT_OPTIONS,
} from '@/entities/filters/model/constants'
import { useFiltersDrawerContext } from '@/entities/filters/model/FiltersDrawerContext'
import type { Filters } from '@/entities/filters/model/types'
import { pluralizeRu } from '@/shared/lib/pluralize-ru/pluralizeRu'
import { Button } from '@/shared/ui/button'
import {
  FilterBlock,
  RadioOptions,
  SizeOptions,
} from '@/widgets/filter-drawer/ui/components'
import { X } from 'lucide-react'
import styles from './FilterDrawer.module.scss'

type Props = {
  onClear: () => void
  filters: Filters
  setFilters: (filters: Filters) => void
  filteredProductsCount: number
}

const FilterDrawer = ({
  onClear,
  filters,
  setFilters,
  filteredProductsCount,
}: Props) => {
  const { category, sort, priceRange, sizes, color } = filters
  const { isOpen, closeFilters } = useFiltersDrawerContext()

  const updateFilter = <T extends keyof Filters>(key: T, value: Filters[T]) => {
    setFilters({ ...filters, [key]: value })
  }

  const toggleSize = (size: number) => {
    const checked = filters.sizes.includes(size)
    setFilters({
      ...filters,
      sizes: checked
        ? filters.sizes.filter((s) => s !== size)
        : [...filters.sizes, size],
    })
  }

  const productWord = pluralizeRu(
    filteredProductsCount,
    'АРТЕФАКТ',
    'АРТЕФАКТА',
    'АРТЕФАКТОВ'
  )

  return (
    <div className={`${styles.filterDrawer} ${isOpen ? styles.isOpen : ''}`}>
      <div onClick={closeFilters} className={styles.overlay}></div>
      <aside
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filters-title"
      >
        <header className={styles.header}>
          <h2 className={styles.title} id="filters-title">
            ФИЛЬТРЫ
          </h2>
          <button
            onClick={closeFilters}
            className={styles.close}
            type="button"
            aria-label="Закрыть фильтры"
          >
            <X className={styles.cross} strokeWidth={0.75} size={36} />
          </button>
        </header>
        <div className={styles.body}>
          <div className={styles.filters}>
            <FilterBlock title="СОРТИРОВКА">
              <RadioOptions
                name="Сортировка"
                options={SORT_OPTIONS}
                value={sort}
                onChange={(value) => updateFilter('sort', value)}
              />
            </FilterBlock>

            <FilterBlock title="КАТЕГОРИИ">
              <RadioOptions
                name="Категории"
                options={CATEGORY}
                value={category ?? ''}
                onChange={(value) => updateFilter('category', value || null)}
              />
            </FilterBlock>

            <FilterBlock title="ЦЕНА">
              <RadioOptions
                name="Ценовой диапазон"
                options={PRICE_OPTIONS}
                value={priceRange}
                onChange={(value) => updateFilter('priceRange', value)}
              />
            </FilterBlock>

            <FilterBlock title="ЦВЕТ">
              <RadioOptions
                name="Цвет"
                options={COLOR_OPTIONS}
                value={color ?? ''}
                onChange={(value) => updateFilter('color', value)}
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
        <footer className={styles.footer}>
          <Button onClick={onClear} fullWidth>
            СБРОСИТЬ
          </Button>
          <Button onClick={closeFilters} fullWidth>
            {filteredProductsCount === 0
              ? 'НЕТ АРТЕФАКТОВ'
              : `${filteredProductsCount} ${productWord}`}
          </Button>
        </footer>
      </aside>
    </div>
  )
}

export default FilterDrawer
