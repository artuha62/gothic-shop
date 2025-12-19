import { IconButton } from '@/shared/ui/icon-button/index.js'
import { ShoppingCart } from 'lucide-react'
import { useCartContext } from '@/features/cart/model/CartContext'
import { useCartDrawerContext } from '@/features/cart/model/CartDrawerContext'

interface Props {
  productId: string
}

const AddToCartIcon = ({ productId }: Props) => {
  const { addToCart } = useCartContext()
  const { openCart } = useCartDrawerContext()

  return (
    <IconButton
      onClick={() => {
        addToCart(productId)
        openCart()
      }}
      variant="card"
      aria-label="Добавить в корзину"
    >
      <ShoppingCart strokeWidth={1.25} size={24} />
    </IconButton>
  )
}

export default AddToCartIcon
