import { useEffect } from 'react'
import { getProductBySlug } from '@/entities/product/api/products'
import { useFetching } from '@/shared/hooks/useFetching'

export const useProduct = (slug: string | undefined) => {
  const { data, loading, error, fetching } = useFetching(() => {
    if (!slug) throw new Error('Slug is required')
    return getProductBySlug(slug)
  })

  useEffect(() => {
    if (slug) {
      fetching().catch(console.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  return {
    product: data,
    loading,
    error,
    retry: fetching,
  }
}
