import cn from 'classnames'
import styles from './Skeleton.module.scss'

interface SkeletonProps {
  count?: number
  view?: 'grid' | 'list'
}

const Skeleton = ({ count = 12, view = 'grid' }: SkeletonProps) => {
  return (
    <div className={cn(styles.skeleton, styles[view], 'container')}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.image} />
          <div className={styles.actions}>
            <div className={styles.action} />
            <div className={styles.action} />
          </div>
          <div className={styles.info}>
            <div className={styles.text} />
            <div className={styles.text} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Skeleton
