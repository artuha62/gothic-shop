import { AddToFavoritesButton } from '@/features/add-to-favorites'
import { formatPrice } from '@/shared/lib/format-price/formatPrice.ts'
import { IconButton } from '@/shared/ui/icon-button'
import { ShoppingCart } from 'lucide-react'
import React, { memo } from 'react'
import { Link } from 'react-router'
import styles from './ProductCard.module.scss'

interface ProductCardProps {
  product: {
    id: string
    slug: string
    images: string[]
    name: string
    price: number
  }
  actions?: React.ReactNode
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { slug, images, name, price, id } = product

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Link to={`/product/${slug}`}>
          <img
            src={images[0]}
            alt={name}
            className={`${styles.image} ${styles.front}`}
            loading="lazy"
          />
          <img
            src={images[1]}
            alt={name}
            className={`${styles.image} ${styles.back}`}
            loading="lazy"
          />
        </Link>
        <div className={styles.actions}>
          <AddToFavoritesButton productId={id} />
          <Link to={`/product/${slug}`}>
            <IconButton variant="card" aria-label="Добавить в корзину">
              <ShoppingCart strokeWidth={1.25} size={24} />
            </IconButton>
          </Link>
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{name.toUpperCase()}</h3>
          <p className={styles.price}>{formatPrice(price)}</p>
        </div>
      </div>
    </div>
  )
}

export default memo(ProductCard)
