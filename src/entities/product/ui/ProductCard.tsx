import { formatPrice } from '@/shared/lib/format-price/formatPrice'
import { getImageURL } from '@/shared/lib/get-image-URL/getImageURL'
import { Link } from 'react-router'
import type React from 'react'
import styles from './ProductCard.module.scss'

interface ProductCardProps {
  product: {
    slug: string
    images: string[]
    name: string
    price: number
  }
  actions?: React.ReactNode
}

const ProductCard = ({ product, actions }: ProductCardProps) => {
  const { slug, images, name, price } = product

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Link to={`/product/${slug}`}>
          <img
            src={getImageURL(images[0])}
            alt={name}
            className={`${styles.image} ${styles.front}`}
            loading="lazy"
          />
          <img
            src={getImageURL(images[1])}
            alt={name}
            className={`${styles.image} ${styles.back}`}
            loading="lazy"
          />
        </Link>
        {actions && <div className={styles.actions}>{actions}</div>}
        <div className={styles.info}>
          <h3 className={styles.name}>{name.toUpperCase()}</h3>
          <p className={styles.price}>{formatPrice(price)}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
