import cn from 'classnames'
import type { ReactNode } from 'react'
import styles from './PromoBanner.module.scss'

type PromoBannerVariant = 'black' | 'green'
type PromoBannerPadding = 'sm' | 'lg'

interface PromoBannerProps {
  variant?: PromoBannerVariant
  padding?: PromoBannerPadding
  repeat?: number
  children: ReactNode
}

export const PromoBanner = ({
  variant = 'black',
  padding = 'sm',
  repeat = 10,
  children,
}: PromoBannerProps) => {
  const content = Array.from({ length: repeat }).map((_, index) => (
    <span key={index} className={cn(styles.text, styles[padding])}>
      {children}
    </span>
  ))

  return (
    <div className={cn(styles.promo, styles[variant])}>
      <div className={styles.inner}>
        {content}
        {content}
      </div>
    </div>
  )
}
