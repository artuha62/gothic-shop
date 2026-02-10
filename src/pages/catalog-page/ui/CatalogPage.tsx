import { useProducts } from '@/entities/product/model/useProducts'
import { ProductCardSkeleton } from '@/entities/product/ui/product-card-skeleton'
import { ProductGrid } from '@/entities/product/ui/product-grid'
import {
  filtersCounter,
  hasActiveFilters,
} from '@/features/filter-products/lib/filtersCounter'
import { useFilters } from '@/features/filter-products/model/useFilters'
import { useGridViewFromURL } from '@/features/switch-grid-view/model/useGridViewFromURL'
import { useTitle } from '@/shared/hooks/useTitle'
import { Button } from '@/shared/ui/button'
import { Loader } from '@/shared/ui/loader'
import { CatalogBar } from '@/widgets/catalog-bar'
import { EmptyState } from '@/widgets/empty-state'
import { ErrorState } from '@/widgets/error-state'
import { FilterDrawer } from '@/widgets/filter-drawer'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import styles from './CatalogPage.module.scss'

const CatalogPage = () => {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [searchParams])

  useTitle('Каталог')

  const { filters, clearFilters } = useFilters()
  const { gridView, setGridView } = useGridViewFromURL()
  const {
    products,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isSuccess,
    isPaginationError,
    refetch,
  } = useProducts({ filters })

  const filtersCount = filtersCounter(filters)
  const isFiltered = hasActiveFilters(filters)
  const isEmpty = !isLoading && !isError && products.length === 0
  const noResultsFound = isEmpty && isFiltered
  const isCompletelyEmpty = isEmpty && !isFiltered

  const handleLoadMore = () => {
    fetchNextPage().catch((error) => {
      console.error('Failed to fetch next page:', error)
    })
  }

  return (
    <>
      <h1 className="visually-hidden">Каталог обуви</h1>

      <CatalogBar
        filtersCount={filtersCount}
        currentView={gridView}
        onChangeGrid={setGridView}
      />
      <FilterDrawer />

      {isLoading && <ProductCardSkeleton view={gridView} />}

      {isError && (
        <ErrorState title="Ошибка загрузки артефактов" onRetry={refetch} />
      )}

      {isCompletelyEmpty && (
        <EmptyState title="Артефакты скоро будут загружены" />
      )}

      {noResultsFound && (
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
            <>
              {isFetchingNextPage ? (
                <Loader variant="withoutPadding">Загружаем еще</Loader>
              ) : isPaginationError ? (
                <ErrorState
                  title="Не удалось загрузить артефакты"
                  onRetry={handleLoadMore}
                />
              ) : (
                <div className={styles.buttonWrapper}>
                  <Button
                    onClick={handleLoadMore}
                    variant="white"
                    disabled={isFetchingNextPage}
                    className={styles.loadButton}
                  >
                    Загрузить еще
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default CatalogPage
