import { useCartStore } from '@/entities/cart/store/useCartStore.ts'
import type { SizeStock } from '@/entities/product/model/types.ts'
import { pluralizeRu } from '@/shared/lib/pluralize-ru/pluralizeRu.ts'
import { Button } from '@/shared/ui/button'
import { PromoMini } from '@/shared/ui/promo-mini'
import { SizeSelector } from '@/shared/ui/size-selector'
import { useCartDrawerStore } from '@/widgets/cart-drawer/store/useCartDrawerStore'
import { useState } from 'react'
import styles from './AddToCartSection.module.scss'

interface AddToCartSectionProps {
  id: string
  sizeStock: SizeStock[]
}

export const AddToCartSection = ({ id, sizeStock }: AddToCartSectionProps) => {
  const addToCart = useCartStore((state) => state.addToCart)
  const openCart = useCartDrawerStore((state) => state.openCart)

  const [selectedSize, setSelectedSize] = useState<number | null>(() => {
    const firstAvailableSize = sizeStock.find((item) => item.stock > 0)
    return firstAvailableSize?.size ?? null
  })

  const selectedSizeStock = selectedSize
    ? (sizeStock.find((item) => item.size === selectedSize)?.stock ?? 0)
    : null

  const handleSizeToggle = (size: number) => {
    setSelectedSize(size === selectedSize ? null : size)
  }

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(id, selectedSize)
      openCart()
    }
  }

  return (
    <>
      <div className={styles.sizesBlock}>
        <SizeSelector
          name="РАЗМЕР"
          sizeStock={sizeStock}
          selected={selectedSize ? [selectedSize] : []}
          onToggle={handleSizeToggle}
        />
      </div>

      {selectedSizeStock !== null && (
        <PromoMini size="sm">
          {selectedSizeStock > 0
            ? `В наличии ${selectedSizeStock} ${pluralizeRu(selectedSizeStock, 'пара', 'пары', 'пар')}`
            : 'Нет в наличии'}
        </PromoMini>
      )}

      <Button
        variant="black"
        onClick={handleAddToCart}
        disabled={!selectedSize || selectedSizeStock === 0}
      >
        В КОРЗИНУ
      </Button>
    </>
  )
}
