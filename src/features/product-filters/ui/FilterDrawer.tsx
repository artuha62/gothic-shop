import { X } from 'lucide-react'
import type { Filters } from '@/features/product-filters/model/types'
import type React from 'react'
import styles from './FilterDrawer.module.scss'
import { Button } from '@/shared/ui/button'
import { pluralizeRu } from '@/shared/lib/pluralize-ru/pluralizeRu'
import { RadioOptions } from '@/features/product-filters/ui/ui'
import { FilterBlock } from '@/features/product-filters/ui/ui'

type Props = {
  isOpen: boolean
  onClose: () => void
  onClear: () => void
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  filteredProductsCount: number
}

const PRICE_OPTIONS = [
  { value: 'ALL', label: 'Все' },
  { value: 'LT_10K', label: 'До 10 000 ₽' },
  { value: 'BETWEEN_10K_15K', label: '10 000 - 15 000 ₽' },
  { value: 'GT_15K', label: 'От 15 000 ₽' },
] as const

const SORT_OPTIONS = [
  { value: 'ALL', label: 'Популярные' },
  { value: 'PRICE_ASC', label: 'Цена ↑' },
  { value: 'PRICE_DESC', label: 'Цена ↓' },
] as const

const FilterDrawer = ({
  isOpen,
  onClose,
  onClear,
  filters,
  setFilters,
  filteredProductsCount,
}: Props) => {
  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
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
                value={filters.sort}
                onChange={(value) => updateFilter('sort', value)}
              />
            </FilterBlock>

            <FilterBlock title="ЦЕНА">
              <RadioOptions
                name="Ценовой диапазон"
                options={PRICE_OPTIONS}
                value={filters.priceRange}
                onChange={(value) => updateFilter('priceRange', value)}
              />
            </FilterBlock>

            <FilterBlock title="РАЗМЕР">
              {Array.from({ length: 7 }, (_, i) => 36 + i).map((size) => {
                const checked = filters.sizes.includes(size)
                return (
                  <label key={size}>
                    <input
                      onChange={() => toggleSize(size)}
                      className={styles.checkbox}
                      type="checkbox"
                      checked={checked}
                    />
                    <span className={styles.sizeBox}>{size}</span>
                  </label>
                )
              })}
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
