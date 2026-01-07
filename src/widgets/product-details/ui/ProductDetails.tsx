import { useState } from 'react'
import { formatPrice } from '@/shared/lib/format-price/formatPrice'
import type { Product } from '@/entities/product/model/types'
import styles from './ProductDetails.module.scss'
import { pluralizeRu } from '@/shared/lib/pluralize-ru/pluralizeRu.ts'
import { PromoMini } from '@/shared/ui/promo-mini'
import { ProductSizeOptions } from '@/entities/product/ui/product-size-options'

interface ProductLayoutProps {
  product: Product
}

const ProductDetails = ({ product }: ProductLayoutProps) => {
  const { images, name, price, sizeStock } = product
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<number | null>(() => {
    const firstAvailableSize = sizeStock.find((item) => item.stock > 0)
    return firstAvailableSize?.size ?? null
  })

  const mainImage = currentImage ?? images[0]

  const selectedSizeStock = selectedSize
    ? (sizeStock.find((item) => item.size === selectedSize)?.stock ?? 0)
    : null

  const handleSizeToggle = (size: number) => {
    setSelectedSize(size === selectedSize ? null : size)
  }

  return (
    <div className="container">
      <div className={styles.inner}>
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

        <div className={styles.info}>
          <div>
            <h2 className={styles.name}>/// {name}</h2>
          </div>

          <div className={styles.priceBlock}>
            <p className={styles.price}>{formatPrice(price)}</p>
          </div>

          <div className={styles.sizesBlock}>
            <ProductSizeOptions
              name="РАЗМЕР"
              sizeStock={sizeStock}
              selected={selectedSize ? [selectedSize] : []}
              onToggle={handleSizeToggle}
            />
          </div>

          {selectedSizeStock !== null && (
            <PromoMini size="sm">
              {selectedSizeStock > 0
                ? `В наличии ${selectedSizeStock} ${pluralizeRu(selectedSizeStock, 'пара', 'пары', 'пар')}`
                : 'Нет в наличии'}
            </PromoMini>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
