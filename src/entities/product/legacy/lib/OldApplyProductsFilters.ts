import type { Filters } from '@/entities/filters/model/types.ts'
import type { Product } from '@/entities/product/model/types.ts'

export const oldApplyProductsFilters = (
  products: Product[],
  filters: Filters
): Product[] => {
  return products.filter((product) => {
    // Category
    if (filters.category && product.category !== filters.category) return false

    //Price
    if (filters.priceRange === 'to10' && product.price >= 10000) return false
    if (
      filters.priceRange === '10to15' &&
      (product.price < 10000 || product.price > 15000)
    )
      return false
    if (filters.priceRange === 'from15' && product.price <= 15000) return false

    // Color
    if (filters.color) {
      const c = filters.color.toLowerCase().trim()
      if (product.color?.toLowerCase().trim() !== c) return false
    }

    // Sizes
    if (filters.sizes.length > 0) {
      const hasMatchingSize = filters.sizes.some((filterSize) =>
        product.sizeStock.some(
          (sizeStock) => sizeStock.size === filterSize && sizeStock.stock > 0
        )
      )

      if (!hasMatchingSize) {
        return false
      }
    }

    return true
  })
}
