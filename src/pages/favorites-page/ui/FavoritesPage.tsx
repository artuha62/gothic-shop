import { ProductGrid } from '@/widgets/product-grid'
import { useProducts } from '@/entities/product/model/useProducts'
import { useFavoritesContext } from '@/features/favorites/model/FavoritesContext'
import { NotFound } from '@/shared/ui/not-found'
import { Button } from '@/shared/ui/button'
import styles from './FavoritesPage.module.scss'
import { Link } from 'react-router'

const FavoritesPage = () => {
  const { products, loading } = useProducts()
  const { favoritesIds } = useFavoritesContext()

  if (loading) return <div>Loading...</div>

  const favoriteProducts = products.filter(({ id }) =>
    favoritesIds.includes(id)
  )

  return (
    <>
      <h1 className="visually-hidden">Избранные товары</h1>
      <ProductGrid variant="favorites" products={favoriteProducts} />
      {favoritesIds.length === 0 && (
        <>
          <div className="container">
            <div className={styles.noFavorites}>
              <NotFound size="sm">ТВОЯ КОЛЛЕКЦИЯ ПОКА ПУСТА...</NotFound>
              <span>
                Найди подходящие артефакты и нажми ❤️, чтобы сохранить их.
              </span>
              <Link to="/catalog">
                <Button variant="black" size="lg">
                  В КАТАЛОГ
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default FavoritesPage
