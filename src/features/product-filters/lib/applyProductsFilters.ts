import type { Product } from '@/entities/product/model/types'
import type { Filters } from '@/features/product-filters/model/types'

export const applyProductsFilters = (
  products: Product[],
  filters: Filters
): Product[] => {
  return products.filter((product) => {
    // Category
    if (filters.category && product.category !== filters.category) return false

    //Price
    if (filters.priceRange === 'LT_10K' && product.price >= 10000) return false
    if (
      filters.priceRange === 'BETWEEN_10K_15K' &&
      (product.price < 10000 || product.price > 15000)
    )
      return false
    if (filters.priceRange === 'GT_15K' && product.price <= 15000) return false

    // Color
    if (filters.color) {
      const c = filters.color.toLowerCase().trim()
      if (product.color?.toLowerCase().trim() !== c) return false
    }

    // Sizes
    return !(
      filters.sizes.length > 0 &&
      !filters.sizes.some((size) => product.sizes.includes(size))
    )
  })
}
