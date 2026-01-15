import { getProductById } from '@/entities/product/api/products'
import { useQuery } from '@tanstack/react-query'

export const useProductsByIds = (ids: string[]) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['products', 'byIds', ids],
    queryFn: () => Promise.all(ids.map(getProductById)),
    enabled: ids.length > 0,
  })

  return {
    products: data ?? [],
    isLoading,
    isError,
    refetch,
  }
}
