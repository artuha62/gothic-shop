import { ProductCard } from '@/entities/product/ui/product-card'
import type { Product } from '@/entities/product/model/types'
import styles from './ProductGrid.module.scss'
import { AddToFavoritesButton } from '@/features/add-to-favorites'
import { AddToCartButton } from '@/features/add-to-cart'
import type { GridView } from '@/shared/types/grid'

interface ProductGridProps {
  products: Product[]
  variant?: 'catalog' | 'favorites'
  view: GridView
}

const ProductGrid = ({
  products,
  variant = 'catalog',
  view,
}: ProductGridProps) => {
  return (
    <div className="container">
      <section className={styles.productsGrid}>
        <div className={[styles.grid, styles[view], styles[variant]].join(' ')}>
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              view={view}
              actions={
                <>
                  <AddToFavoritesButton productId={product.id} />
                  <AddToCartButton productId={product.id} />
                </>
              }
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProductGrid
