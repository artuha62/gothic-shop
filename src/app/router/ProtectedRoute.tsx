import { useAuthStore } from '@/entities/auth/store/useAuthStore'
import { Loader } from '@/shared/ui/loader'
import { Navigate, Outlet } from 'react-router'

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isLoading = useAuthStore((state) => state.isLoading)

  if (isLoading) return <Loader style="code">загружаем</Loader>

  return isAuthenticated ? <Outlet /> : <Navigate to="/catalog" replace />
}
