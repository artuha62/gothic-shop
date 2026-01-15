import type { Filters } from '@/entities/filters/model/types'
import { getAllProducts } from '@/entities/product/api/products'
import { useInfiniteQuery } from '@tanstack/react-query'

type UseProductsParams = {
  filters: Filters
}

export const useProducts = ({ filters }: UseProductsParams) => {
  const query = useInfiniteQuery({
    queryKey: ['products', filters],
    queryFn: ({ pageParam = 1 }) => getAllProducts(pageParam, 12, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNext ? lastPage.meta.page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
  })

  return {
    products: query.data?.pages.flatMap((page) => page.data) ?? [],
    isLoading: query.isLoading,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isError: query.isError,
    isFetchingNextPage: query.isFetchingNextPage,
    totalProducts: query.data?.pages[0]?.meta?.total ?? 0,
  }
}
