import { useDrawer } from '@/shared/hooks/useDrawer.ts'

export const useFiltersDrawer = () => {
  const { isOpen, open, close } = useDrawer()

  return {
    isOpen,
    openFilters: open,
    closeFilters: close,
  }
}
