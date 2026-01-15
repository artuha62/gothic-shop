import { useProduct } from '@/entities/product/model/useProduct'
import { Loader } from '@/shared/ui/loader'
import { NotFound } from '@/shared/ui/not-found'
import { ProductDetails } from '@/widgets/product-details'
import { useParams } from 'react-router'

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const { product, isLoading, isError } = useProduct(slug)

  if (isLoading) {
    return <Loader />
  }

  if (isError || !product) {
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
