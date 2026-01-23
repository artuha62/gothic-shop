import type { Filters } from '@/entities/filters/model/types.ts'
import type { PaginatedResponse, Product } from '@/entities/product/model/types'

export const API_URL = 'http://localhost:3001/api/products'

const FETCH_DELAY = 2000

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getAllProducts(
  page: number = 1,
  limit: number = 12,
  filters?: Filters
): Promise<PaginatedResponse<Product>> {
  const url = new URL(API_URL)
  url.searchParams.append('page', String(page))
  url.searchParams.append('limit', String(limit))

  if (filters) {
    if (filters.category) {
      url.searchParams.append('category', filters.category)
    }

    if (filters.priceRange && filters.priceRange !== 'all') {
      url.searchParams.append('price', filters.priceRange)
    }

    if (filters.color) {
      url.searchParams.append('color', filters.color)
    }

    if (filters.sizes.length > 0) {
      url.searchParams.append('sizes', filters.sizes.join(','))
    }

    if (filters.sort !== 'all') {
      url.searchParams.append('sort', filters.sort)
    }

    if (filters.search) {
      url.searchParams.append('search', filters.search)
    }
  }

  if (FETCH_DELAY) {
    await delay(FETCH_DELAY)
  }

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  return response.json()
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const response = await fetch(`${API_URL}/slug/${slug}`)

  if (!response.ok) {
    throw new Error('Product not found')
  }

  return response.json()
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) {
    throw new Error('Product not found')
  }

  return response.json()
}
