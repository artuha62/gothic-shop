import { useAuthStore } from '@/entities/auth/store/useAuthStore'
import { syncCartBetweenTabs } from '@/entities/cart/model/syncCartBetweenTabs'
import { useEffect } from 'react'
import { AppRouter } from './router'

export const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    return syncCartBetweenTabs()
  }, [])

  return <AppRouter />
}
