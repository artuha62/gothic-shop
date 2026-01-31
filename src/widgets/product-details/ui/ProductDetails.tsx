import { useProduct } from '@/entities/product/model/useProduct'
import { Button } from '@/shared/ui/button'
import { ErrorState } from '@/shared/ui/error-state'
import { Skeleton } from '@/shared/ui/skeleton'
import { contacts } from '@/widgets/footer/ui/constants.ts'
import {
  ProductFooter,
  ProductGallery,
  ProductHeader,
  ProductSizeSelector,
} from '@/widgets/product-details/ui/components'
import { useLayoutEffect } from 'react'
import styles from './ProductDetails.module.scss'

interface ProductDetailsProps {
  slug?: string
}

const ProductDetails = ({ slug }: ProductDetailsProps) => {
  const { product, isLoading, isError, refetch } = useProduct(slug)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isLoading) {
    return (
      <>
        <Skeleton variant="details" />
      </>
    )
  }

  if (isError || !product) {
    return <ErrorState title="Товар не найден" onRetry={refetch} />
  }

  const { telegramUrl } = contacts
  const { id, images, name, price, sizeStock, description } = product

  return (
    <>
      <h1 className="visually-hidden">{`Страница товара - ${product.name}`}</h1>
      <section className={`${styles.productDetails} container`}>
        <div className={styles.inner}>
          <ProductGallery images={images} name={name} />
          <div className={styles.info}>
            <ProductHeader name={name} id={id} price={price} />
            <ProductSizeSelector id={id} sizeStock={sizeStock} />
            <Button
              as="a"
              href={telegramUrl}
              target="_blank"
              rel="noreferrer"
              variant="white"
              className={styles.tgButton}
            >
              Написать менеджеру
            </Button>
            <ProductFooter description={description} />
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductDetails
