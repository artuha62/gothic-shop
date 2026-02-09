import { useEffect } from 'react'

let lockCount = 0

export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      lockCount++
      document.documentElement.style.overflow = 'hidden'
    }

    return () => {
      if (isLocked) {
        lockCount--
        if (lockCount <= 0) {
          lockCount = 0
          document.documentElement.style.overflow = ''
        }
      }
    }
  }, [isLocked])
}
