import cn from 'classnames'
import { ProductDetailsSkeleton } from './ProductDetailsSkeleton'
import styles from './Skeleton.module.scss'

interface SkeletonProps {
  count?: number
  variant?: 'catalog' | 'favorites' | 'details'
}

export const Skeleton = ({ count, variant = 'catalog' }: SkeletonProps) => {
  const defaultCount = {
    catalog: 12,
    favorites: 4,
    details: 1,
  }[variant]

  const itemCount = count ?? defaultCount

  if (variant === 'details') {
    return <ProductDetailsSkeleton />
  }

  return (
    <div className={cn(styles.skeleton, styles[variant], 'container')}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.image} />
          <div className={styles.actions}>
            <div className={styles.action} />
            <div className={styles.action} />
          </div>
          <div className={styles.info}>
            <div className={styles.text} />
            <div className={styles.text} />
          </div>
        </div>
      ))}
    </div>
  )
}
