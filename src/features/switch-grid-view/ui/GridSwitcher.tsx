import type { GridView } from '@/features/switch-grid-view/model/types'
import { IconButton } from '@/shared/ui/icon-button'
import { Grid2x2, Square, Table } from 'lucide-react'
import styles from './GridSwitcher.module.scss'

type GridSwitcherProps = {
  currentView: GridView
  onChangeView: (view: GridView) => void
}

export const GridSwitcher = ({
  currentView,
  onChangeView,
}: GridSwitcherProps) => {
  return (
    <div className={styles.gridSwitcher}>
      <IconButton
        variant="grid"
        onClick={() => onChangeView('grid3')}
        isActive={currentView === 'grid3'}
        title="3x3"
        aria-label="Сетка 3 на 3"
      >
        <Square strokeWidth={1.5} size={24} />
      </IconButton>
      <IconButton
        variant="grid"
        onClick={() => onChangeView('grid4')}
        isActive={currentView === 'grid4'}
        title="4x4"
        aria-label="Сетка 4 на 4"
      >
        <Grid2x2 strokeWidth={1.5} size={24} />
      </IconButton>
      <IconButton
        variant="grid"
        onClick={() => onChangeView('grid8')}
        isActive={currentView === 'grid8'}
        title="8x8"
        aria-label="Сетка 8 на 8"
      >
        <Table strokeWidth={1.5} size={24} />
      </IconButton>
    </div>
  )
}
