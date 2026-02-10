import { useAuthStore } from '@/entities/auth/store/useAuthStore'
import { useState } from 'react'

interface VerifyParams {
  email: string
  code: string
  rememberMe: boolean
}

export const useVerifyLoginCode = () => {
  const login = useAuthStore((state) => state.login)
  const isLoading = useAuthStore((state) => state.isLoading)
  const [error, setError] = useState<string | null>(null)

  const verify = async ({ email, code, rememberMe }: VerifyParams) => {
    try {
      setError(null)
      await login({ email, code, rememberMe })
      return true
    } catch (err) {
      const isTokenError =
        err instanceof Error &&
        (err.message.includes('Refresh token') ||
          err.message.includes('token') ||
          err.message.includes('Invalid code'))

      setError(
        isTokenError
          ? 'Неверный код. Попробуйте снова.'
          : 'Ошибка входа. Попробуйте позже.'
      )
      return false
    }
  }

  const clearError = () => setError(null)

  return { verify, isLoading, error, clearError }
}
