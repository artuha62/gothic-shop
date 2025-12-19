import styles from './NotFound.module.scss'
import cn from 'classnames'

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
    <div className="container">
      <div className={cn(styles.inner, styles[padding], styles[size])}>
        <div className={styles.glitch} title={children}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default NotFound
