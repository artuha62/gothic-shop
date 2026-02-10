import { useCartStore } from '@/entities/cart/store/useCartStore'

export const syncCartBetweenTabs = () => {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== 'cart-storage' || !event.newValue) return

    try {
      const parsed = JSON.parse(event.newValue)
      const nextItems = parsed.state?.items

      if (Array.isArray(nextItems)) {
        useCartStore.setState({ items: nextItems })
      }
    } catch {
      //
    }
  }

  window.addEventListener('storage', onStorage)
  return () => window.removeEventListener('storage', onStorage)
}
