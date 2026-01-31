import cn from 'classnames'
import type { ReactNode } from 'react'
import styles from './Loader.module.scss'

interface LoaderProps {
  children: ReactNode
  variant?: 'withPadding' | 'withoutPadding'
  style?: 'default' | 'code'
}

export const Loader = ({
  children,
  variant = 'withPadding',
  style = 'default',
}: LoaderProps) => {
  return (
    <div className={cn(styles.loaderWrapper, styles[variant], styles[style])}>
      <span className={cn(styles.loader, style === 'code' && styles.code)}>
        {children}
      </span>
    </div>
  )
}
