import { useEffect, useState } from 'react'
import styles from './Toast.module.scss'

interface ToastProps {
  message: string
  duration?: number
  onClose?: () => void
}

export const Toast = ({ message, duration = 5000, onClose }: ToastProps) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!visible) return null

  return <div className={styles.toast}>{message}</div>
}
