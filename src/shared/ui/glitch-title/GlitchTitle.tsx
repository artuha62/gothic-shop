import cn from 'classnames'
import styles from './GlitchTitle.module.scss'

interface GlitchTitleProps {
  children?: string
}

export const GlitchTitle = ({ children }: GlitchTitleProps) => {
  return (
    <div className={cn(styles.title)}>
      <div className={styles.glitch} title={children}>
        {children}
      </div>
    </div>
  )
}
