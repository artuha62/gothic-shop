import cn from 'classnames'
import { CircleAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import styles from './PromoMini.module.scss'

type PromoMiniSize = 'sm' | 'md'

interface PromoMiniProps {
  size?: PromoMiniSize
  children: ReactNode
  withoutIcon?: boolean
}

export const PromoMini = ({
  size = 'md',
  children,
  withoutIcon = false,
}: PromoMiniProps) => {
  return (
    <div className={cn(styles.promoMini, styles[size])}>
      {!withoutIcon && (
        <CircleAlert strokeWidth={2} size={18} className={styles.icon} />
      )}
      <span>{children}</span>
    </div>
  )
}
