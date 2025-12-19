import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import type { Product } from '@/entities/product/model/types'
import { getProductBySlug } from '@/entities/product/api/products'
import { ProductDetails } from '@/widgets/product-details'
import { NotFound } from '@/shared/ui/not-found'

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    getProductBySlug(slug)
      .then(setProduct)
      .finally(() => setLoading(false))
  }, [slug])

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && !product && <NotFound>ТОВАР НЕ НАЙДЕН...</NotFound>}
      {!loading && product && (
        <ProductDetails key={product.slug} product={product} />
      )}
    </>
  )
}

export default ProductPage
