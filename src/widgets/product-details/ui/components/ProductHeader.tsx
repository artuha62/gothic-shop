import { AddToFavoritesButton } from '@/features/add-to-favorites'
import { formatPrice } from '@/shared/lib/format-price/formatPrice.ts'
import styles from '@/widgets/product-details/ui/ProductDetails.module.scss'

interface ProductHeaderProps {
  name: string
  id: string
  price: number
}

const ProductHeader = ({ name, id, price }: ProductHeaderProps) => {
  return (
    <>
      <div className={styles.productHeader}>
        <h2 className={styles.name}>/// {name.toUpperCase()}</h2>
        <AddToFavoritesButton productId={id} />
      </div>

      <div className={styles.priceBlock}>
        <p className={styles.price}>{formatPrice(price)}</p>
      </div>
    </>
  )
}

export default ProductHeader
