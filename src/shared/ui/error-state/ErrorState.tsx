import { Button } from '@/shared/ui/button'
import { CodeTitle } from '@/shared/ui/code-title'
import cn from 'classnames'
import type { ReactNode } from 'react'
import styles from './ErrorState.module.scss'

type ErrorStateProps = {
  title?: string
  description?: string | ReactNode
  action?: ReactNode
  onRetry?: () => void
}

export const ErrorState = ({
  title,
  description,
  action,
  onRetry,
}: ErrorStateProps) => {
  return (
    <section className={cn(styles.errorWrapper, 'container')}>
      {title && <CodeTitle>{title}</CodeTitle>}
      {description && <span className={styles.description}>{description}</span>}
      {action ? (
        action
      ) : (
        <Button onClick={onRetry} variant="black" size="sm">
          Попробовать еще раз
        </Button>
      )}
    </section>
  )
}
