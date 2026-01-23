import type { Product } from '@/entities/product/model/types'
import { Button } from '@/shared/ui/button'
import { contacts } from '@/widgets/footer/ui/constants.ts'
import {
  ProductGallery,
  ProductHeader,
  ProductSizeSelector,
} from '@/widgets/product-details/ui/components'
import styles from './ProductDetails.module.scss'

interface ProductLayoutProps {
  product: Product
}

const ProductDetails = ({ product }: ProductLayoutProps) => {
  const { telegramUrl } = contacts
  const { id, images, name, price, sizeStock } = product

  return (
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
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
