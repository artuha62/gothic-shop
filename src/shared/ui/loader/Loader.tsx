import cn from 'classnames'
import type { ReactNode } from 'react'
import styles from './Loader.module.scss'

interface LoaderProps {
  children: ReactNode
  variant?: 'withPadding' | 'withoutPadding'
  style?: 'default' | 'code'
  className?: string
}

export const Loader = ({
  children,
  variant = 'withPadding',
  style = 'default',
  className,
}: LoaderProps) => {
  return (
    <div
      className={cn(
        styles.loaderWrapper,
        styles[variant],
        styles[style],
        className
      )}
    >
      <span className={cn(styles.loader, style === 'code' && styles.code)}>
        {children}
      </span>
    </div>
  )
}
