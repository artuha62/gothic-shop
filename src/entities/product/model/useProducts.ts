import type { Filters } from '@/entities/filters/model/types.ts'
import { getAllProducts } from '@/entities/product/api/products'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

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

  const products = useMemo(
    () => query.data?.pages.flatMap((page) => page.data) ?? [],
    [query.data]
  )

  const totalProducts = useMemo(
    () => query.data?.pages[0]?.meta?.total ?? 0,
    [query.data]
  )

  return {
    products,
    isLoading: query.isLoading,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isError: query.isError,
    isFetchingNextPage: query.isFetchingNextPage,
    totalProducts,
  }
}
