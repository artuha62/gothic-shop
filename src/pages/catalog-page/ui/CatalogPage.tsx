import { filtersCounter } from '@/entities/filters/lib/filtersCounter.ts'
import { useFilters } from '@/entities/filters/model/useFilters.ts'
import { useGridViewFromURL } from '@/entities/filters/model/useGridViewFromURL.ts'
import { useProducts } from '@/entities/product/model/useProducts.ts'
import { Button } from '@/shared/ui/button'
import { Loader } from '@/shared/ui/loader'
import { Skeleton } from '@/shared/ui/skeleton'
import { FilterBar } from '@/widgets/filter-bar'
import { FilterDrawer } from '@/widgets/filter-drawer'
import { ProductGrid } from '@/widgets/product-grid'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import styles from './CatalogPage.module.scss'

const CatalogPage = () => {
  const { filters, clearFilters } = useFilters()

  const { gridView, setGridView } = useGridViewFromURL()

  const {
    products,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts({ filters })

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  const filtersCount = filtersCounter(filters)

  const renderContent = () => {
    if (isLoading) {
      return <Skeleton />
    }

    if (products.length === 0) {
      return (
        <div
          style={{
            maxHeight: '200px',
            textAlign: 'center',
            padding: '30px 20px',
          }}
        >
          <p style={{ fontSize: '20px', marginBottom: '16px' }}>
            По вашему запросу ничего не найдено
          </p>
          <Button onClick={clearFilters} variant="white">
            Сбросить фильтры
          </Button>
        </div>
      )
    }

    return (
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
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <h1 className="visually-hidden">Каталог обуви</h1>
      <FilterBar
        filtersCount={filtersCount}
        currentView={gridView}
        onChangeGrid={setGridView}
      />

      <FilterDrawer />
      <div className={styles.content}>{renderContent()}</div>
    </>
  )
}

export default CatalogPage
