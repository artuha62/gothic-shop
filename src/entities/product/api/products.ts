import type { PaginatedResponse, Product } from '@/entities/product/model/types'
import type { Filters } from '@/features/filter-products/model/types.ts'
import { filtersToApiParams } from '@/features/filter-products/utils/convertFilters'
import { api } from '@/shared/api/axios'

export async function getAllProducts(
  page: number = 1,
  limit: number = 24,
  filters?: Filters
): Promise<PaginatedResponse<Product>> {
  const params: Record<string, string | number> = {
    page,
    limit,
    ...filtersToApiParams(
      filters ?? {
        category: 'all',
        priceRange: 'all',
        color: '',
        sizes: [],
        sort: 'all',
        search: '',
      }
    ),
  }

  // await new Promise((resolve) => setTimeout(resolve, 2000))

  const { data } = await api.get<PaginatedResponse<Product>>('/products', {
    params,
  })
  return data
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const { data } = await api.get<Product>(`/products/slug/${slug}`)
  return data
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (!ids.length) return []
  const { data } = await api.get<Product[]>('/products/by-ids', {
    params: { ids: ids.join(',') },
  })
  return data
}
