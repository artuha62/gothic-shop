import { getAllProducts } from '@/entities/product/api/products'
import type { Filters } from '@/features/filter-products/model/types.ts'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type UseProductsParams = {
  filters: Filters
}

export const useProducts = ({ filters }: UseProductsParams) => {
  const {
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isSuccess,
    refetch,
    data,
  } = useInfiniteQuery({
    queryKey: ['products', filters],
    queryFn: ({ pageParam = 1 }) => getAllProducts(pageParam, 24, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNext ? lastPage.meta.page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
    //FIXME: убрать для финала(отключает авто refetch tanstack query)
    retry: false,
  })

  const products = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  )

  const totalProducts = useMemo(() => data?.pages[0]?.meta?.total ?? 0, [data])

  const isInitialError = isError && products.length === 0
  const isPaginationError = isError && products.length > 0

  return {
    products,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isError: isInitialError,
    isSuccess,
    isFetchingNextPage,
    isPaginationError,
    totalProducts,
    refetch,
  }
}
