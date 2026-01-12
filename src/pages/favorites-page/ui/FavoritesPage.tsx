import { ProductGrid } from '@/widgets/product-grid'
import { useProducts } from '@/entities/product/model/useProducts'
import { useFavoritesContext } from '@/features/favorites/model/FavoritesContext'
import { NotFound } from '@/shared/ui/not-found'
import { Button } from '@/shared/ui/button'
import { Link } from 'react-router'
import { Heart } from 'lucide-react'
import { Loader } from '@/shared/ui/loader'
import styles from './FavoritesPage.module.scss'

const FavoritesPage = () => {
  const { products, loading } = useProducts()
  const { favoritesIds } = useFavoritesContext()

  const favoriteProducts = products.filter(({ id }) =>
    favoritesIds.includes(id)
  )

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <h1 className="visually-hidden">Избранные товары</h1>
      <ProductGrid
        view="favorites"
        variant="favorites"
        products={favoriteProducts}
      />

      {favoritesIds.length === 0 && (
        <div className="container">
          <div className={styles.noFavorites}>
            <NotFound size="sm">Твоя коллекция пока пуста...</NotFound>
            <span>
              Найди подходящие артефакты и нажми{' '}
              <Heart strokeWidth={1.5} size={16} />, чтобы сохранить их.
            </span>
            <Link to="/catalog">
              <Button variant="black" size="lg">
                В КАТАЛОГ
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default FavoritesPage
