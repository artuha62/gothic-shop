import { useProduct } from '@/entities/product/model/useProduct'
import { useTitle } from '@/shared/hooks/useTitle'
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

  useTitle(`${product?.name}`)

  if (isLoading) return <ProductDetailsSkeleton />

  if (isError || !product) {
    return <ErrorState title="Товар не найден" onRetry={refetch} />
  }

  return (
    <>
      <h1 className="visually-hidden">{`Страница товара - ${product.name}`}</h1>
      <ProductDetails product={product} />
    </>
  )
}

export default ProductPage
