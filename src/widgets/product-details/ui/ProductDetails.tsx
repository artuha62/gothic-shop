import { useState } from 'react'
import { formatPrice } from '@/shared/lib/format-price/formatPrice'
import type { Product } from '@/entities/product/model/types'
import styles from './ProductDetails.module.scss'

interface ProductLayoutProps {
  product: Product
}

const ProductDetails = ({ product }: ProductLayoutProps) => {
  const { images, name, price, sizes } = product
  const [currentImage, setCurrentImage] = useState<string | null>(null)

  const mainImage = currentImage ?? images[0]

  return (
    <div className="container">
      <div className={styles.inner}>
        <div>
          <h1>{name}</h1>
        </div>

        <div>
          <h2>{formatPrice(price)}</h2>
        </div>

        <div>
          {sizes.map((size) => (
            <button key={size}>{size}</button>
          ))}
        </div>

        <div className={styles.gallery}>
          <div className={styles.thumbs}>
            {images.map((image) => (
              <img
                className={styles.thumb}
                key={image}
                src={image}
                alt={name}
                loading="lazy"
                onClick={() => setCurrentImage(image)}
              />
            ))}
          </div>

          <div className={styles.main}>
            <img
              className={styles.mainImage}
              src={mainImage}
              alt=""
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
