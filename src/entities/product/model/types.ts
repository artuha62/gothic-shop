export interface Product {
  id: string
  name: string
  slug: string
  price: number
  oldPrice?: number
  category: string
  images: string[]
  description: string
  sizes: number[]
  color: string
}
