export interface Product {
  id: string
  name: string
  slug: string
  price: number
  oldPrice?: number
  category: string
  images: string[]
  description: string
  sizeStock: SizeStock[]
  color: string
  stock: number
}

export interface SizeStock {
  id: string
  productId: string
  size: number
  stock: number
  createdAt: string
  updatedAt: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}
