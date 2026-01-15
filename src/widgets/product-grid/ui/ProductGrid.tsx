import type { Product } from '@/entities/product/model/types'
import { ProductCard } from '@/entities/product/ui/product-card'
import { AddToFavoritesButton } from '@/features/add-to-favorites'
import type { GridView } from '@/shared/types/grid'
import { IconButton } from '@/shared/ui/icon-button'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import cn from 'classnames'
import { ShoppingCart } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router'
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
  const columns = useMemo(() => {
    if (view === 'grid4') return 4
    if (view === 'grid3') return 3
    if (view === 'grid8') return 8
    return 4
  }, [view])

  const rows = useMemo(() => {
    const result = []
    for (let i = 0; i < products.length; i += columns) {
      result.push(products.slice(i, i + columns))
    }
    return result
  }, [products, columns])

  const virtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: () => 550,
    overscan: 1,
  })

  const items = virtualizer.getVirtualItems()

  //FIXME убрать логирование
  // const renderedProductsCount = items.reduce((total, item) => {
  //   return total + rows[item.index].length
  // }, 0)
  // console.log(
  //   `Всего товаров: ${products.length}|| Рендерится товаров: ${renderedProductsCount}`
  // )

  return (
    <section
      className={cn(
        styles.productsGrid,
        'container',
        !hasNext && styles.needPadding
      )}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {items.map((virtualRow) => (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={virtualizer.measureElement}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <div
              className={`${styles.grid} ${styles[view]} ${styles[variant]}`}
            >
              {rows[virtualRow.index].map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  actions={
                    <>
                      <AddToFavoritesButton productId={product.id} />
                      <Link to={`/product/${product.slug}`}>
                        <IconButton
                          variant="card"
                          aria-label="Добавить в корзину"
                        >
                          <ShoppingCart strokeWidth={1.25} size={24} />
                        </IconButton>
                      </Link>
                    </>
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductGrid
