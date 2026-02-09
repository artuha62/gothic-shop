import { useProduct } from '@/entities/product/model/useProduct'
import { ErrorState } from '@/widgets/error-state'
import { ProductDetails } from '@/widgets/product-details'
import { ProductDetailsSkeleton } from '@/widgets/product-details/ui/ProductDetailsSkeleton'
import { useEffect } from 'react'
import { useParams } from 'react-router'

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const { product, isLoading, isError, refetch } = useProduct(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isLoading) return <ProductDetailsSkeleton />

  if (isError || !product) {
    return <ErrorState title="Товар не найден" onRetry={refetch} />
  }

  return <ProductDetails product={product} />
}

export default ProductPage
