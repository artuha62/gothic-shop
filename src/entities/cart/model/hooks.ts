import { useProductsByIds } from '@/entities/product/model/useProductsByIds'
import { usePromoCodeStore } from '@/features/apply-promocode/store/usePromoCodeStore.ts'
import {
  DELIVERY_COST,
  FREE_DELIVERY_THRESHOLD,
} from '@/widgets/checkout/model/constants.ts'
import { useShallow } from 'zustand/react/shallow'
import {
  cartTotalSelector,
  productsIdsSelector,
  useCartStore,
} from '../store/useCartStore'

// Получение ID товаров
export const useCartProductIds = () => {
  return useCartStore(useShallow(productsIdsSelector))
}

// Получение товаров корзины
export const useCartProducts = () => {
  const productIds = useCartProductIds()
  return useProductsByIds(productIds)
}

// Получение общей суммы
export const useCartTotal = () => {
  const { products, isLoading } = useCartProducts()
  const total = useCartStore(useShallow(cartTotalSelector(products)))

  return { total, isLoading }
}

// Полная сводка по корзине
export const useCartSummary = () => {
  const { total, isLoading } = useCartTotal()
  const discount = usePromoCodeStore((state) => state.discount)

  // Скидка
  const subtotal = total
  const discountAmount = Math.round((subtotal * discount) / 100)

  // Доставка
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD
  const delivery = isFreeDelivery ? 0 : DELIVERY_COST

  // Итого
  const totalWithDiscount = subtotal - discountAmount + delivery

  return {
    subtotal,
    discount,
    discountAmount,
    delivery,
    totalWithDiscount,
    isFreeDelivery,
    isLoading,
  }
}
