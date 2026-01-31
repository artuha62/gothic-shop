import { useCartProducts, useCartSummary } from '@/entities/cart/model/hooks'
import { useCartStore } from '@/entities/cart/store/useCartStore'
import { createOrder } from '@/entities/order/api/order.ts'
import type { CheckoutFormData } from '@/entities/order/model/types.ts'
import { usePromoCodeStore } from '@/features/apply-promocode/store/usePromoCodeStore'
import { useMutation } from '@tanstack/react-query'

export const useCheckout = () => {
  const cartItems = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)
  const { code, clearPromoCode } = usePromoCodeStore()

  const { products } = useCartProducts()
  const { subtotal, discountAmount, totalWithDiscount, delivery } =
    useCartSummary()

  const mutation = useMutation({
    mutationFn: async (formData: CheckoutFormData) => {
      const items = cartItems.map((item) => {
        const product = products.find(
          (product) => product.id === item.productId
        )

        return {
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
          price: product?.price ?? 0,
        }
      })

      return createOrder({
        customer: formData,
        items,
        subtotal,
        discount: discountAmount,
        discountCode: code ?? undefined,
        deliveryCost: delivery,
        total: totalWithDiscount,
      })
    },

    onSuccess: () => {
      clearCart()
      clearPromoCode()
    },
  })

  const errorMessage =
    mutation.error instanceof Error
      ? mutation.error.message
      : mutation.error
        ? 'Произошла ошибка при оформлении заказа'
        : null

  return {
    submitOrder: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    orderData: mutation.data,
    errorMessage,
  }
}
