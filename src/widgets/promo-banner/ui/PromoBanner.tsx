import styles from './PromoBanner.module.scss'
import type { ReactNode } from 'react'
import cn from 'classnames'

type PromoBannerVariant = 'black' | 'green'
type PromoBannerPadding = 'sm' | 'lg'

interface PromoBannerProps {
  variant?: PromoBannerVariant
  padding?: PromoBannerPadding
  repeat?: number
  children: ReactNode
}

const PromoBanner = ({
  variant = 'black',
  padding = 'sm',
  repeat = 10,
  children,
}: PromoBannerProps) => {
  return (
    <div className={cn(styles.promo, styles[variant])}>
      <div className={styles.inner}>
        {Array.from({ length: repeat }).map((_, index) => (
          <span key={index} className={cn(styles.text, styles[padding])}>
            {children}
          </span>
        ))}
      </div>
    </div>
  )
}

export default PromoBanner
