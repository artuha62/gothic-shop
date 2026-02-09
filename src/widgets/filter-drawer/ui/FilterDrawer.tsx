import { FilterList } from '@/features/filter-products'
import { useScrollLock } from '@/shared/hooks/useScrollLock'
import { Overlay } from '@/shared/ui/overlay'
import { useFilterDrawerStore } from '@/widgets/filter-drawer/store/useFilterDrawerStore.ts'
import FilterDrawerFooter from './components/FilterDrawerFooter'
import FilterDrawerHeader from './components/FilterDrawerHeader'
import styles from './FilterDrawer.module.scss'

export const FilterDrawer = () => {
  const isFiltersOpen = useFilterDrawerStore((state) => state.isFiltersOpen)
  const closeFilters = useFilterDrawerStore((state) => state.closeFilters)

  useScrollLock(isFiltersOpen)

  if (!isFiltersOpen) return null

  return (
    <div className={styles.filterDrawer}>
      <Overlay onClick={closeFilters} />
      <aside
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filters-title"
      >
        <FilterDrawerHeader />
        <div className={styles.body}>
          <FilterList />
        </div>
        <FilterDrawerFooter />
      </aside>
    </div>
  )
}
