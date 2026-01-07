import { useEffect } from 'react'
import { getAllProducts } from '@/entities/product/api/products'
import { useFetching } from '@/shared/hooks/useFetching'

export const useProducts = () => {
  const { data, loading, error, fetching } = useFetching(getAllProducts)

  useEffect(() => {
    fetching().catch(console.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    products: data ?? [],
    loading,
    error,
    retry: fetching,
  }
}
