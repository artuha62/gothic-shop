import type { Product } from '@/entities/product/model/types'
import { ProductCard } from '@/entities/product/ui/product-card'
import type { GridView } from '@/shared/types/grid'
import cn from 'classnames'
import styles from './ProductGrid.module.scss'

interface ProductGridProps {
  products: Product[]
  variant?: 'catalog' | 'favorites'
  view: GridView
  hasNext: boolean
}

const ProductGrid = ({
  products,
  variant = 'catalog',
  view,
  hasNext,
}: ProductGridProps) => {
  return (
    <section
      className={cn(
        styles.productsGrid,
        'container',
        !hasNext && styles.needPadding
      )}
    >
      <div className={`${styles.grid} ${styles[view]} ${styles[variant]}`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default ProductGrid
