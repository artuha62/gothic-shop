import { getProductsByIds } from '@/entities/product/api/products'
import { useQuery } from '@tanstack/react-query'

export const useProductsByIds = (ids: string[]) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['products', 'byIds', [...ids].sort()],
    queryFn: () => {
      return getProductsByIds(ids)
    },
    enabled: ids.length > 0,
    staleTime: 5 * 60 * 1000,
    //FIXME: убрать для финала(отключает авто refetch tanstack query)
    retry: false,
  })

  return {
    products: data ?? [],
    isLoading,
    isError,
    refetch,
  }
}
