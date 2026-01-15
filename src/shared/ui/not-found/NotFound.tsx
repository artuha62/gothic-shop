import cn from 'classnames'
import styles from './NotFound.module.scss'

type NotFoundPadding = 'withoutPadding' | 'withPadding'
type NotFoundSize = 'sm' | 'lg'

interface NotFoundProps {
  children: string
  padding?: NotFoundPadding
  size?: NotFoundSize
}

const NotFound = ({
  children,
  padding = 'withoutPadding',
  size = 'lg',
}: NotFoundProps) => {
  return (
    <div className={cn(styles.title, styles[padding], styles[size])}>
      <div className={styles.glitch} title={children}>
        {children}
      </div>
    </div>
  )
}

export default NotFound
