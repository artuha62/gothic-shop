import { useFiltersStore } from '@/entities/filters/store/useFiltersStore.ts'
import styles from '@/widgets/filter-drawer/ui/FilterDrawer.module.scss'
import { X } from 'lucide-react'

const FilterDrawerHeader = () => {
  const closeFilters = useFiltersStore((state) => state.closeFilters)
  return (
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
  )
}

export default FilterDrawerHeader
