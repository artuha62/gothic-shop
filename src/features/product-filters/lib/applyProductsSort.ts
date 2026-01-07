import type { Product } from '@/entities/product/model/types'
import type { Sort } from '@/features/product-filters/model/types'

export const applyProductsSort = (
  products: Product[],
  sort: Sort
): Product[] => {
  if (sort === 'price_asc')
    return [...products].sort((a, b) => a.price - b.price)
  if (sort === 'price_desc')
    return [...products].sort((a, b) => b.price - a.price)
  return products
}
