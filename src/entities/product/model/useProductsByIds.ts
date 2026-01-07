import { useEffect } from 'react'
import { getProductById } from '@/entities/product/api/products'
import { useFetching } from '@/shared/hooks/useFetching'

export const useProductsByIds = (ids: string[]) => {
  const idsString = ids.join(',')

  const { data, loading, error, fetching, reset } = useFetching(() =>
    Promise.all(ids.map(getProductById))
  )

  useEffect(() => {
    if (ids.length === 0) {
      reset()
      return
    }

    fetching().catch(console.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsString])

  return {
    products: data ?? [],
    loading,
    error,
    retry: fetching,
  }
}
