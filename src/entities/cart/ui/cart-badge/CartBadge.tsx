import {
  totalQuantitySelector,
  useCartStore,
} from '@/entities/cart/store/useCartStore'
import { Badge } from '@/shared/ui/badge'

export const CartBadge = () => {
  const totalQuantity = useCartStore(totalQuantitySelector)

  if (totalQuantity === 0) return null

  return <Badge>{totalQuantity}</Badge>
}
