import { filtersCounter } from '@/entities/filters/lib/filtersCounter.ts'
import { useFilters } from '@/entities/filters/model/useFilters.ts'
import { useGridViewFromURL } from '@/entities/filters/model/useGridViewFromURL.ts'
import { useProducts } from '@/entities/product/model/useProducts.ts'
import { ProductGrid } from '@/entities/product/ui/product-grid'
import { Button } from '@/shared/ui/button'
import { EmptyState } from '@/shared/ui/empty-state'
import { ErrorState } from '@/shared/ui/error-state'
import { Loader } from '@/shared/ui/loader'
import { Skeleton } from '@/shared/ui/skeleton'
import { FilterBar } from '@/widgets/filter-bar'
import { FilterDrawer } from '@/widgets/filter-drawer'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export const Catalog = () => {
  const { filters, clearFilters } = useFilters()
  const { gridView, setGridView } = useGridViewFromURL()
  const {
    products,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isPaginationError,
    refetch,
  } = useProducts({ filters })
  const { ref, inView } = useInView()

  const filtersCount = filtersCounter(filters)
  const isEmpty = !isLoading && !isError && products.length === 0
  const isSuccess = !isLoading && !isEmpty && !isError

  useEffect(() => {
    if (inView && !isPaginationError) {
      fetchNextPage().catch((error) => {
        console.error('Failed to fetch next page:', error)
      })
    }
  }, [inView, fetchNextPage, isPaginationError])

  return (
    <>
      <FilterBar
        filtersCount={filtersCount}
        currentView={gridView}
        onChangeGrid={setGridView}
      />
      <FilterDrawer />

      {isLoading && <Skeleton />}

      {isError && (
        <ErrorState title="Ошибка загрузки артефактов" onRetry={refetch} />
      )}

      {isEmpty && (
        <EmptyState
          title="По вашему запросу ничего не найдено"
          action={
            <Button onClick={clearFilters} variant="white">
              Сбросить фильтры
            </Button>
          }
        />
      )}

      {isSuccess && (
        <>
          <ProductGrid
            products={products}
            view={gridView}
            hasNext={hasNextPage}
          />
          {hasNextPage && (
            <div ref={ref}>
              {isFetchingNextPage && (
                <Loader variant="withoutPadding">Загружаем еще</Loader>
              )}
              {isPaginationError && !isFetchingNextPage && (
                <ErrorState
                  title="Не удалось загрузить артефакты"
                  onRetry={() => fetchNextPage()}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  )
}
