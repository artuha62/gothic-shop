import { useAuthStore } from '@/entities/auth/store/useAuthStore'
import { useState } from 'react'

export const useSendLoginCode = () => {
  const sendCode = useAuthStore((state) => state.sendCode)
  const isLoading = useAuthStore((state) => state.isLoading)
  const [error, setError] = useState<string | null>(null)

  const send = async (email: string) => {
    try {
      setError(null)
      await sendCode(email)
      return true
    } catch {
      setError('Не удалось отправить код. Проверьте правильность email.')
      return false
    }
  }

  return { send, isLoading, error }
}
