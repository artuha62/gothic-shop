import cn from 'classnames'
import type { ReactNode } from 'react'
import styles from './Badge.module.scss'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'green' | 'red' | 'blue'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) => {
  return (
    <span
      className={cn(styles.badge, styles[variant], styles[size], className)}
    >
      {children}
    </span>
  )
}
