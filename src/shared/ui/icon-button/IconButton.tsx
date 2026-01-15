import cn from 'classnames'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './IconButton.module.scss'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'default' | 'card' | 'header' | 'grid'
  isActive?: boolean
}

const IconButton = ({
  children,
  className,
  variant = 'default',
  isActive,
  ...props
}: IconButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        styles.IconButton,
        styles[variant],
        isActive && styles.active,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default IconButton
