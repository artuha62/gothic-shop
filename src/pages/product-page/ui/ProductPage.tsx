import { useParams } from 'react-router'
import { ProductDetails } from '@/widgets/product-details'
import { NotFound } from '@/shared/ui/not-found'
import { useProduct } from '@/entities/product/model/useProduct.ts'
import { Loader } from '@/shared/ui/loader'

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const { product, loading, error } = useProduct(slug)

  if (loading) {
    return <Loader />
  }

  if (error || !product) {
    return <NotFound>Товар не найден...</NotFound>
  }

  return (
    <>
      <h1 className="visually-hidden">{`Страница товара - ${product.name}`}</h1>
      <ProductDetails product={product} />
    </>
  )
}

export default ProductPage
