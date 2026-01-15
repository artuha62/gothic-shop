import { useCartContext } from '@/entities/cart/model/CartContext.tsx'
import { useCartDrawerContext } from '@/entities/cart/model/CartDrawerContext.tsx'
import type { Product } from '@/entities/product/model/types'
import { ProductSizeOptions } from '@/entities/product/ui/product-size-options'
import { AddToFavoritesButton } from '@/features/add-to-favorites'
import { formatPrice } from '@/shared/lib/format-price/formatPrice'
import { pluralizeRu } from '@/shared/lib/pluralize-ru/pluralizeRu'
import { Button } from '@/shared/ui/button'
import { PromoMini } from '@/shared/ui/promo-mini'
import { contacts } from '@/widgets/footer/ui/constants.ts'
import { useState } from 'react'
import styles from './ProductDetails.module.scss'

interface ProductLayoutProps {
  product: Product
}

const ProductDetails = ({ product }: ProductLayoutProps) => {
  const { id, images, name, price, sizeStock } = product
  const { telegramUrl } = contacts
  const { addToCart } = useCartContext()
  const { openCart } = useCartDrawerContext()

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

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(id, selectedSize)
      openCart()
    }
  }

  return (
    <section className={`${styles.productDetails} container`}>
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
          <div className={styles.productHeader}>
            <h2 className={styles.name}>/// {name.toUpperCase()}</h2>
            <AddToFavoritesButton productId={id} />
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

          <Button
            variant="black"
            onClick={handleAddToCart}
            disabled={!selectedSize || selectedSizeStock === 0}
          >
            В КОРЗИНУ
          </Button>
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
