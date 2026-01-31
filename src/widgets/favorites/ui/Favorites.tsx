import { useFavoritesStore } from '@/entities/favorites/store/useFavoritesStore.ts'
import { useProductsByIds } from '@/entities/product/model/useProductsByIds.ts'
import { ProductGrid } from '@/entities/product/ui/product-grid'
import { EmptyState } from '@/shared/ui/empty-state'
import { ErrorState } from '@/shared/ui/error-state'
import { Skeleton } from '@/shared/ui/skeleton'
import { Heart } from 'lucide-react'

export const Favorites = () => {
  const favoritesIds = useFavoritesStore((state) => state.favoritesIds)
  const { products, isLoading, isError, refetch } = useProductsByIds(
    favoritesIds.map(String)
  )

  const isEmpty = !isLoading && !isError && favoritesIds.length === 0

  const favoriteProducts = products.filter(({ id }) =>
    favoritesIds.includes(id)
  )

  if (isLoading) return <Skeleton variant="favorites" />

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
    <ProductGrid
      view="favorites"
      variant="favorites"
      products={favoriteProducts}
      hasNext={true}
    />
  )
}
