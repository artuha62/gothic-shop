import { formatPrice } from '@/shared/lib/format-price/formatPrice.ts'
import { getImageURL } from '@/shared/lib/get-image-URL/getImageURL.ts'
import { Link } from 'react-router'
import type React from 'react'
import type { GridView } from '@/shared/types/grid'
import styles from './ProductCard.module.scss'

interface ProductCardProps {
  product: {
    slug: string
    images: string[]
    name: string
    price: number
  }
  actions?: React.ReactNode
  view?: GridView
}

const ProductCard = ({ product, actions, view }: ProductCardProps) => {
  const { slug, images, name, price } = product

  return (
    <div className={`${styles.card} ${view ? styles[view] : ''}`}>
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
