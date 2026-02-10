import { AddToFavorites } from '@/features/add-to-favorites'
import { formatPrice } from '@/shared/lib/format-price/formatPrice.ts'
import { getOptimizedURL } from '@/shared/lib/get-optimized-url/getOptimizedURL'
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

export const ProductCard = memo(({ product }: ProductCardProps) => {
  const { slug, images, name, price, id } = product

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Link to={`/product/${slug}`}>
          <img
            src={getOptimizedURL(images[0], 'f_auto,q_auto:good,w_600,c_limit')}
            alt={name}
            width={810}
            height={1080}
            className={`${styles.image} ${styles.front}`}
            loading="eager"
            fetchPriority="high"
          />
          <img
            src={getOptimizedURL(images[1], 'f_auto,q_auto:good,w_600,c_limit')}
            alt={name}
            width={810}
            height={1080}
            className={`${styles.image} ${styles.back}`}
            loading="lazy"
          />
        </Link>
        <div className={styles.actions}>
          <AddToFavorites productId={id} />
          <Link to={`/product/${slug}`}>
            <IconButton variant="card" aria-label="Добавить в корзину">
              <ShoppingCart
                className={styles.icon}
                strokeWidth={1.25}
                size={24}
              />
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
})
