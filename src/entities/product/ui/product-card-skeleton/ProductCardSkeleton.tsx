import styles from '@/entities/product/ui/product-card/ProductCard.module.scss'
import gridStyles from '@/entities/product/ui/product-grid/ProductGrid.module.scss'
import { SkeletonElement } from '@/shared/ui/skeleton'
import cn from 'classnames'

interface ProductCardSkeletonProps {
  count?: number
  variant?: 'catalog' | 'favorites'
  view?: 'grid3' | 'grid4' | 'grid8' | 'favorites'
  hasNext?: boolean
}

export const ProductCardSkeleton = ({
  variant = 'catalog',
  view = 'grid3',
}: ProductCardSkeletonProps) => {
  const defaultCount = {
    catalog: 12,
    favorites: 4,
  }[variant]

  return (
    <section className={cn(gridStyles.productsGrid)}>
      <div
        className={cn(gridStyles.grid, gridStyles[view], gridStyles[variant])}
      >
        {Array.from({ length: defaultCount }).map((_, index) => (
          <div
            key={index}
            className={styles.card}
            style={{ borderColor: '#a9a9a9' }}
          >
            <div className={styles.imageWrapper}>
              {/* Изображение */}
              <SkeletonElement
                variant="image"
                width={810}
                height={1080}
                color="#cdcdcd"
                loadingLine
              />

              {/* Кнопки действий */}
              <div className={styles.actions}>
                <SkeletonElement square={26} />
                <SkeletonElement square={26} />
              </div>

              {/* Информация */}
              <div className={styles.info}>
                <SkeletonElement width="50%" height={28} />
                <SkeletonElement width="25%" height={28} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
