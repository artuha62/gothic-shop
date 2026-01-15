import type { Sort } from '@/entities/filters/model/types.ts'
import type { Product } from '@/entities/product/model/types.ts'

export const oldApplyProductsSort = (
  products: Product[],
  sort: Sort
): Product[] => {
  if (sort === 'price_asc')
    return [...products].sort((a, b) => a.price - b.price)
  if (sort === 'price_desc')
    return [...products].sort((a, b) => b.price - a.price)
  return products
}
