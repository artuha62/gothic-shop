import { useFiltersStore } from '@/entities/filters/store/useFiltersStore.ts'
import type { GridView } from '@/shared/types/grid'
import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'
import { Grid2x2, Square, Table } from 'lucide-react'
import styles from './FilterBar.module.scss'

type FilterBarProps = {
  filtersCount: number
  onChangeGrid: (view: GridView) => void
  currentView: GridView
}

const FilterBar = ({
  filtersCount,
  onChangeGrid,
  currentView,
}: FilterBarProps) => {
  const openFilters = useFiltersStore((state) => state.openFilters)

  return (
    <section className={`${styles.filterBar} container`}>
      <div className={styles.zaglushka}>/// КАТАЛОГ</div>

      <div className={styles.filters}>
        <div className={styles.viewControls}>
          <IconButton
            variant="grid"
            onClick={() => onChangeGrid('grid3')}
            isActive={currentView === 'grid3'}
            title="3x3"
            aria-label="Сетка 3 на 3"
          >
            <Square strokeWidth={1.5} size={24} />
          </IconButton>
          <IconButton
            variant="grid"
            onClick={() => onChangeGrid('grid4')}
            isActive={currentView === 'grid4'}
            title="4x4"
            aria-label="Сетка 4 на 4"
          >
            <Grid2x2 strokeWidth={1.5} size={24} />
          </IconButton>
          <IconButton
            variant="grid"
            onClick={() => onChangeGrid('grid8')}
            isActive={currentView === 'grid8'}
            title="8x8"
            aria-label="Сетка 8 на 8"
          >
            <Table strokeWidth={1.5} size={24} />
          </IconButton>
        </div>
        <Button onClick={openFilters}>
          <span>ФИЛЬТРЫ{filtersCount > 0 ? ` • ${filtersCount}` : ''}</span>
        </Button>
      </div>
    </section>
  )
}

export default FilterBar
