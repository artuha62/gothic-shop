import type React from 'react'
import { X } from 'lucide-react'
import type { Filters } from '@/features/product-filters/model/types'
import { Button } from '@/shared/ui/button'
import { pluralizeRu } from '@/shared/lib/pluralize-ru/pluralizeRu'
import { RadioOptions, SizeOptions } from '@/features/product-filters/ui/ui'
import { FilterBlock } from '@/features/product-filters/ui/ui'
import styles from './FilterDrawer.module.scss'
import {
  PRICE_OPTIONS,
  SORT_OPTIONS,
  COLOR_OPTIONS,
  SIZES,
} from '@/features/product-filters/model/constants'

type Props = {
  isOpen: boolean
  onClose: () => void
  onClear: () => void
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  filteredProductsCount: number
}

const FilterDrawer = ({
  isOpen,
  onClose,
  onClear,
  filters,
  setFilters,
  filteredProductsCount,
}: Props) => {
  const { sort, priceRange, sizes, color } = filters
  const updateFilter = <TKey extends keyof Filters>(
    key: TKey,
    value: Filters[TKey]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const toggleSize = (size: number) => {
    setFilters((prev) => {
      const checked = prev.sizes.includes(size)
      return {
        ...prev,
        sizes: checked
          ? prev.sizes.filter((s) => s !== size)
          : [...prev.sizes, size],
      }
    })
  }

  const productWord = pluralizeRu(
    filteredProductsCount,
    'АРТЕФАКТ',
    'АРТЕФАКТА',
    'АРТЕФАКТОВ'
  )

  return (
    <div className={`${styles.drawer} ${isOpen ? styles.isOpen : ''}`}>
      <div onClick={onClose} className={styles.overlay}></div>
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
            onClick={onClose}
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
          <Button onClick={onClose} fullWidth>
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
