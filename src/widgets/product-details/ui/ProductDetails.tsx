import type { Product } from '@/entities/product/model/types'
import { AddToCartSection } from '@/features/add-to-cart'
import { AddToFavorites } from '@/features/add-to-favorites'
import { formatPrice } from '@/shared/lib/format-price/formatPrice'
import { Button } from '@/shared/ui/button'
import { contacts } from '@/widgets/footer/model/constants.ts'
import { ProductGallery } from './components/ProductGallery'
import styles from './ProductDetails.module.scss'

interface ProductDetailsProps {
  product: Product
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { telegramUrl } = contacts
  const { id, images, name, price, sizeStock, description } = product

  return (
    <section className={styles.productDetails}>
      <h1 className="visually-hidden">{`Страница товара - ${name}`}</h1>
      <div className={styles.inner}>
        <ProductGallery images={images} name={name} />

        <div className={styles.info}>
          <div className={styles.productInfo}>
            <div className={styles.titleRow}>
              <h2 className={styles.name}>/// {name.toUpperCase()}</h2>
              <AddToFavorites productId={id} />
            </div>
            <div className={styles.price}>{formatPrice(price)}</div>
          </div>

          <AddToCartSection id={id} sizeStock={sizeStock} />

          <Button
            as="a"
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            variant="white"
          >
            Написать менеджеру
          </Button>

          {description && (
            <div className={styles.accordion}>
              <input
                type="checkbox"
                id="desc-toggle"
                className={styles.toggle}
              />
              <label htmlFor="desc-toggle" className={styles.trigger}>
                Описание
              </label>
              <span className={styles.content}>{description}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
