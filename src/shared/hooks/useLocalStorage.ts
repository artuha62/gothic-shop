import { useEffect, useState } from 'react'

export const useLocalStorage = <T>(key: string, initial: T[]) => {
  const [value, setValue] = useState<T[]>(() => {
    try {
      const saved = localStorage.getItem(key)
      const parsed = saved ? JSON.parse(saved) : initial
      return Array.isArray(parsed) ? parsed : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue] as const
}
