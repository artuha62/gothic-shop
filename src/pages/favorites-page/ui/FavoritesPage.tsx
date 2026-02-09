import { useFavoritesStore } from '@/entities/favorites/store/useFavoritesStore.ts'
import { useProductsByIds } from '@/entities/product/model/useProductsByIds.ts'
import { ProductCardSkeleton } from '@/entities/product/ui/product-card-skeleton'
import { ProductGrid } from '@/entities/product/ui/product-grid'
import { EmptyState } from '@/widgets/empty-state'
import { ErrorState } from '@/widgets/error-state'
import { Heart } from 'lucide-react'

const FavoritesPage = () => {
  const favoritesIds = useFavoritesStore((state) => state.favoritesIds)
  const { products, isLoading, isError, refetch } = useProductsByIds(
    favoritesIds.map(String)
  )

  const isEmpty = !isLoading && !isError && favoritesIds.length === 0

  const favoriteProducts = products.filter(({ id }) =>
    favoritesIds.includes(id)
  )

  if (isLoading)
    return <ProductCardSkeleton view="favorites" variant="favorites" />

  if (isError)
    return (
      <ErrorState
        title="Не удалось загрузить избранные артефакты"
        onRetry={refetch}
      />
    )

  if (isEmpty)
    return (
      <EmptyState
        title="Твоя коллекция пока пуста..."
        description={
          <>
            Найди подходящие артефакты и нажми{' '}
            <Heart strokeWidth={1.5} size={16} />, чтобы сохранить их.
          </>
        }
      />
    )

  return (
    <>
      <h1 className="visually-hidden">Избранные товары</h1>
      <ProductGrid
        view="favorites"
        variant="favorites"
        products={favoriteProducts}
        hasNext={true}
      />
    </>
  )
}

export default FavoritesPage
