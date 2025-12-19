import { useEffect, useState } from 'react'
import type { Product } from '@/entities/product/model/types'
import { getProductById } from '@/entities/product/api/products'

export const useProductsByIds = (ids: string[]) => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    if (ids.length === 0) {
      setProducts([])
      return
    }

    Promise.all(ids.map(getProductById)).then(setProducts).catch(console.error)
  }, [ids.join(',')])

  return { products }
}
