import { useDrawer } from '@/shared/hooks/useDrawer.ts'

export const useCartDrawer = () => {
  const { isOpen, open, close } = useDrawer()

  return {
    isOpen,
    openCart: open,
    closeCart: close,
  }
}
