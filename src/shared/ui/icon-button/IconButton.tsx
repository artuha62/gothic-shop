import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './IconButton.module.scss'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'default' | 'card' | 'header'
}

const IconButton = ({
  children,
  className,
  variant = 'default',
  ...props
}: IconButtonProps) => {
  return (
    <button
      type="button"
      className={[styles.IconButton, styles[variant], className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}

export default IconButton
