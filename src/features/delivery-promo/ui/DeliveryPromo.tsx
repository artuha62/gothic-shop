import { useCartTotal } from '@/entities/cart/model/hooks.ts'
import { PromoMini } from '@/shared/ui/promo-mini'
import { FREE_DELIVERY_THRESHOLD } from '@/widgets/checkout/model/constants.ts'

export const DeliveryPromo = () => {
  const { total } = useCartTotal()

  const isFree = total >= FREE_DELIVERY_THRESHOLD
  const needToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - total)

  return (
    <PromoMini>
      {isFree
        ? 'Доставка бесплатна!'
        : `Добавь артефактов на ${needToFreeDelivery} ₽  и получи бесплатную доставку!`}
    </PromoMini>
  )
}
