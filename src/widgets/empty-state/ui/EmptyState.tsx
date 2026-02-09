import { Button } from '@/shared/ui/button'
import { CodeTitle } from '@/shared/ui/code-title'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import styles from './EmptyState.module.scss'

type EmptyStateProps = {
  title?: string
  description?: string | ReactNode
  action?: ReactNode
}

export const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <section className={styles.emptyWrapper}>
      {title && <CodeTitle>{title}</CodeTitle>}
      {description && <span className={styles.description}>{description}</span>}
      {action ? (
        action
      ) : (
        <Button as={Link} to="/catalog" variant="black" size="lg">
          В КАТАЛОГ
        </Button>
      )}
    </section>
  )
}
