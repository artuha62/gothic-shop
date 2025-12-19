import type { Product } from '@/entities/product/model/types'

export const API_URL = 'http://localhost:3001/api/products'

export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(API_URL)

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
