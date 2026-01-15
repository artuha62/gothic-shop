import { getProductBySlug } from '@/entities/product/api/products'
import { useQuery } from '@tanstack/react-query'

export const useProduct = (slug: string | undefined) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => {
      if (!slug) throw new Error('Slug is required')
      return getProductBySlug(slug)
    },
    enabled: !!slug,
  })

  return {
    product: data,
    isLoading,
    isError,
    refetch,
  }
}
