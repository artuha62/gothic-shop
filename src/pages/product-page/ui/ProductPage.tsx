import { ProductDetails } from '@/widgets/product-details'
import { useParams } from 'react-router'

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>()

  return <ProductDetails slug={slug} />
}

export default ProductPage
