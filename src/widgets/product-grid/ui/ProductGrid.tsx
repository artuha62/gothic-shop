import { ProductCard } from '@/entities/product/ui/product-card'
import type { Product } from '@/entities/product/model/types'
import styles from './ProductGrid.module.scss'
import { AddToFavoritesButton } from '@/features/add-to-favorites'
import type { GridView } from '@/shared/types/grid'
import { ShoppingCart } from 'lucide-react'
import { IconButton } from '@/shared/ui/icon-button'
import { Link } from 'react-router'

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
              key={product.id}
              product={product}
              view={view}
              actions={
                <>
                  <AddToFavoritesButton productId={product.id} />
                  <Link to={`/product/${product.slug}`}>
                    <IconButton variant="card" aria-label="Добавить в корзину">
                      <ShoppingCart strokeWidth={1.25} size={24} />
                    </IconButton>
                  </Link>
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
