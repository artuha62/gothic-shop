import { ProductGrid } from '@/widgets/product-grid'
import { useProducts } from '@/entities/product/model/useProducts'
import { useState } from 'react'
import { FilterDrawer } from '@/features/product-filters'
import { applyProductsFilters } from '@/features/product-filters/lib/applyProductsFilters'
import { applyProductsSort } from '@/features/product-filters/lib/applyProductsSort'
import { filtersCounter } from '@/features/product-filters/lib/filtersCounter'
import { FilterBar } from '@/widgets/filter-bar'
import { useFiltersFromURL } from '@/features/product-filters/model/useFiltersFromURL'
import { useGridViewFromURL } from '@/features/product-filters/model/useGridViewFromURL'
import { Loader } from '@/shared/ui/loader'

const CatalogPage = () => {
  const { filters, updateFilters, clearFilters } = useFiltersFromURL()
  const { gridView, setGridView } = useGridViewFromURL()
  const { products, loading } = useProducts()

  const filtered = applyProductsFilters(products, filters)
  const filteredProducts = applyProductsSort(filtered, filters.sort)
  const filtersCount = filtersCounter(filters)
  const filteredProductsCount = filteredProducts.length

  const [isOpen, setIsOpen] = useState(false)
  const openFilters = () => setIsOpen(true)
  const closeFilters = () => setIsOpen(false)

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <h1 className="visually-hidden">Каталог обуви</h1>
      <FilterBar
        filtersCount={filtersCount}
        openFilters={openFilters}
        currentView={gridView}
        onChangeGrid={setGridView}
      />
      <FilterDrawer
        isOpen={isOpen}
        onClose={closeFilters}
        onClear={clearFilters}
        filters={filters}
        setFilters={updateFilters}
        filteredProductsCount={filteredProductsCount}
      />
      <ProductGrid products={filteredProducts} view={gridView} />
    </>
  )
}

export default CatalogPage
