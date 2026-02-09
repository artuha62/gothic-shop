import { GridSwitcher } from '@/features/switch-grid-view'
import type { GridView } from '@/features/switch-grid-view/model/types'
import { Button } from '@/shared/ui/button'
import { useFilterDrawerStore } from '@/widgets/filter-drawer/store/useFilterDrawerStore.ts'
import styles from './CatalogBar.module.scss'

type CatalogBarProps = {
  filtersCount: number
  onChangeGrid: (view: GridView) => void
  currentView: GridView
}

export const CatalogBar = ({
  filtersCount,
  onChangeGrid,
  currentView,
}: CatalogBarProps) => {
  const openFilters = useFilterDrawerStore((state) => state.openFilters)

  return (
    <section className={styles.filterBar}>
      <div className={styles.zaglushka}>/// КАТАЛОГ</div>

      <div className={styles.filters}>
        <GridSwitcher currentView={currentView} onChangeView={onChangeGrid} />
        <Button onClick={openFilters}>
          <span>ФИЛЬТРЫ{filtersCount > 0 ? ` • ${filtersCount}` : ''}</span>
        </Button>
      </div>
    </section>
  )
}
