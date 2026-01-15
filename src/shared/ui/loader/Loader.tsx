import cn from 'classnames'
import type { ReactNode } from 'react'
import styles from './Loader.module.scss'

interface LoaderProps {
  children: ReactNode
  variant?: 'withPadding' | 'withoutPadding'
}

const Loader = ({ children, variant = 'withPadding' }: LoaderProps) => {
  return (
    <div className={cn(styles.loaderWrapper, styles[variant])}>
      <p className={styles.loader}>{children}</p>
    </div>
  )
}

export default Loader
