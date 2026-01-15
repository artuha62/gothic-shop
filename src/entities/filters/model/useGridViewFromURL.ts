import { GRID_VIEWS, type GridView } from '@/shared/types/grid.ts'
import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'

const DEFAULT_GRID_VIEW: GridView = 'grid3'

export const useGridViewFromURL = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const gridView = useMemo<GridView>(() => {
    const viewParam = searchParams.get('view')

    return viewParam && (GRID_VIEWS as readonly string[]).includes(viewParam)
      ? (viewParam as GridView)
      : DEFAULT_GRID_VIEW
  }, [searchParams])

  const setGridView = useCallback(
    (view: GridView) => {
      setSearchParams((params) => {
        if (view !== DEFAULT_GRID_VIEW) {
          params.set('view', view)
        } else {
          params.delete('view')
        }
        return params
      })
    },
    [setSearchParams]
  )

  return {
    gridView,
    setGridView,
  }
}
