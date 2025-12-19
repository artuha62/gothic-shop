import { useCallback, useState } from 'react'

export const useCartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  return {
    isOpen,
    openCart,
    closeCart,
  }
}
