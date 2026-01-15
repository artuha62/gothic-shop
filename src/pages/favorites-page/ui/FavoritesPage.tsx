import { useFavoritesContext } from '@/entities/favorites/model/FavoritesContext.tsx'
import { useProductsByIds } from '@/entities/product/model/useProductsByIds.ts'
import { Button } from '@/shared/ui/button'
import { Loader } from '@/shared/ui/loader'
import { NotFound } from '@/shared/ui/not-found'
import { ProductGrid } from '@/widgets/product-grid'
import { Heart } from 'lucide-react'
import { Link } from 'react-router'
import styles from './FavoritesPage.module.scss'

const FavoritesPage = () => {
  const { favoritesIds } = useFavoritesContext()
  const { products, isLoading } = useProductsByIds(favoritesIds.map(String))

  const favoriteProducts = products.filter(({ id }) =>
    favoritesIds.includes(id)
  )

  if (isLoading) {
    return <Loader>загружаем артефакты</Loader>
  }

  return (
    <>
      <h1 className="visually-hidden">Избранные товары</h1>
      <ProductGrid
        view="favorites"
        variant="favorites"
        products={favoriteProducts}
        hasNext={true}
      />

      {favoritesIds.length === 0 && (
        <section className={`${styles.noFavorites} container`}>
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
        </section>
      )}
    </>
  )
}

export default FavoritesPage
