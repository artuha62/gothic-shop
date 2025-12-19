import { ProductGrid } from '@/widgets/product-grid'
import { useProducts } from '@/entities/product/model/useProducts'
import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { FilterDrawer } from '@/features/product-filters'
import type { Filters } from '@/features/product-filters/model/types'
import { applyProductsFilters } from '@/features/product-filters/lib/applyProductsFilters'
import { applyProductsSort } from '@/features/product-filters/lib/applyProductsSort'
import { filtersCounter } from '@/features/product-filters/lib/filtersCounter'

const CatalogPage = () => {
  const [filters, setFilters] = useState<Filters>({
    category: null,
    priceRange: 'ALL',
    sizes: [],
    color: null,
    sort: 'ALL',
  })
  const { products, loading } = useProducts()
  const filtered = applyProductsFilters(products, filters)
  const filteredProducts = applyProductsSort(filtered, filters.sort)
  const filtersCount = filtersCounter(filters)
  const filteredProductsCount = filteredProducts.length

  const clearFilters = () => {
    setFilters({
      category: null,
      priceRange: 'ALL',
      sizes: [],
      color: null,
      sort: 'ALL',
    })
  }

  const [isOpen, setIsOpen] = useState(false)
  const openFilters = () => setIsOpen(true)
  const closeFilters = () => setIsOpen(false)

  return (
    <>
      <FilterDrawer
        isOpen={isOpen}
        onClose={closeFilters}
        onClear={clearFilters}
        filters={filters}
        setFilters={setFilters}
        filteredProductsCount={filteredProductsCount}
      />
      <Button onClick={openFilters}>
        <span>ФИЛЬТРЫ{filtersCount > 0 ? ` • ${filtersCount}` : ''}</span>
      </Button>
      {loading ? (
        <div className="container">Loading...</div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </>
  )
}

export default CatalogPage
