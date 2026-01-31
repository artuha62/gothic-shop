import { useCartTotal } from '@/entities/cart/model/hooks'
import { formatPrice } from '@/shared/lib/format-price/formatPrice'
import { Loader } from '@/shared/ui/loader'

const CartSummary = () => {
  const { total, isLoading } = useCartTotal()

  if (isLoading) {
    return <Loader style="code">undefined</Loader>
  }

  return <span>{formatPrice(total)}</span>
}

export default CartSummary
