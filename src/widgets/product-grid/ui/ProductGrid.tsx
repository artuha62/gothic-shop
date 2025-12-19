import { ProductCard } from '@/entities/product'
import type { Product } from '@/entities/product/model/types'
import styles from './ProductGrid.module.scss'
import { AddToFavoritesButton } from '@/features/add-to-favorites'
import { AddToCartIcon } from '@/features/add-to-cart'

interface ProductGridProps {
  products: Product[]
  variant?: 'catalog' | 'favorites'
}

const ProductGrid = ({ products, variant = 'catalog' }: ProductGridProps) => {
  return (
    <div className="container">
      <div className={styles.productsGrid}>
        <div className={[styles.grid, styles.dense, styles[variant]].join(' ')}>
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              actions={
                <>
                  <AddToFavoritesButton productId={product.id} />
                  <AddToCartIcon productId={product.id} />
                </>
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductGrid
