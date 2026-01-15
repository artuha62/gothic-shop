import cn from 'classnames'
import { CircleAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import styles from './PromoMini.module.scss'

type PromoMiniSize = 'sm' | 'md'

interface PromoMiniProps {
  size?: PromoMiniSize
  children: ReactNode
}

const PromoMini = ({ size = 'md', children }: PromoMiniProps) => {
  return (
    <div className={cn(styles.promoMini, styles[size])}>
      <CircleAlert strokeWidth={2} size={18} />
      <span>{children}</span>
    </div>
  )
}

export default PromoMini
