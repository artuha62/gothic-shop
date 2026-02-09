import cn from 'classnames'
import styles from './CodeTitle.module.scss'

interface CodeTitleProps {
  variant?: 'default' | 'error'
  children: string
}

export const CodeTitle = ({
  children,
  variant = 'default',
}: CodeTitleProps) => {
  return <span className={cn(styles.code, styles[variant])}>{children}</span>
}
