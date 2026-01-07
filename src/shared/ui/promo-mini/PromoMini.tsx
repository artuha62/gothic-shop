import { CircleAlert } from 'lucide-react'
import styles from './PromoMini.module.scss'
import type { ReactNode } from 'react'
import cn from 'classnames'

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
