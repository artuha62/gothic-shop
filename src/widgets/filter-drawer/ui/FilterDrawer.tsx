import { useFiltersStore } from '@/entities/filters/store/useFiltersStore.ts'
import { Overlay } from '@/shared/ui/overlay'
import {
  FilterDrawerBody,
  FilterDrawerFooter,
  FilterDrawerHeader,
} from '@/widgets/filter-drawer/ui/components'
import styles from './FilterDrawer.module.scss'

const FilterDrawer = () => {
  const isFiltersOpen = useFiltersStore((state) => state.isFiltersOpen)
  const closeFilters = useFiltersStore((state) => state.closeFilters)

  return (
    isFiltersOpen && (
      <div className={styles.filterDrawer}>
        <Overlay onClick={closeFilters} />
        <aside
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-labelledby="filters-title"
        >
          <FilterDrawerHeader />
          <FilterDrawerBody />
          <FilterDrawerFooter />
        </aside>
      </div>
    )
  )
}

export default FilterDrawer
