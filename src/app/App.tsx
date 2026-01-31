import { useAuthStore } from '@/entities/auth/store/useAuthStore'
import { useEffect } from 'react'
import { AppRouter } from './router'

export const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return <AppRouter />
}
