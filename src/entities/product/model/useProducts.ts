import { useEffect, useState } from 'react'
import type { Product } from '@/entities/product/model/types'
import { getAllProducts } from '@/entities/product/api/products'

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return {
    products,
    loading,
    error,
  }
}
