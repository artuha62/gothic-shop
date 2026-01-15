import { filtersCounter } from '@/entities/filters/lib/filtersCounter.ts'
import { useFiltersFromURL } from '@/entities/filters/model/useFiltersFromURL.ts'
import { useGridViewFromURL } from '@/entities/filters/model/useGridViewFromURL.ts'
import { useProducts } from '@/entities/product/model/useProducts.ts'
import { Button } from '@/shared/ui/button'
import { Loader } from '@/shared/ui/loader'
import { FilterBar } from '@/widgets/filter-bar'
import { FilterDrawer } from '@/widgets/filter-drawer'
import { ProductGrid } from '@/widgets/product-grid'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const CatalogPage = () => {
  const { filters, updateFilters, clearFilters } = useFiltersFromURL()
  const { gridView, setGridView } = useGridViewFromURL()

  const {
    products,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalProducts,
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
      return <Loader>загружаем артефакты</Loader>
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
              <Loader variant="withoutPadding">загружаем еще</Loader>
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
      <FilterDrawer
        onClear={clearFilters}
        filters={filters}
        setFilters={updateFilters}
        filteredProductsCount={totalProducts}
      />
      {renderContent()}
    </>
  )
}

export default CatalogPage
