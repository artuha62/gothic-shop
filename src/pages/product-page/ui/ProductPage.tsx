import { useParams } from 'react-router'
import { ProductDetails } from '@/widgets/product-details'
import { NotFound } from '@/shared/ui/not-found'
import { useProduct } from '@/entities/product/model/useProduct.ts'

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const { product, loading, error } = useProduct(slug)

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && !loading && !product && <NotFound>ТОВАР НЕ НАЙДЕН...</NotFound>}
      {!loading && product && (
        <>
          <h1 className="visually-hidden">{`Страница товара - ${product.name}`}</h1>
          <ProductDetails key={product.slug} product={product} />
        </>
      )}
    </>
  )
}

export default ProductPage
