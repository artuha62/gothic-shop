import styles from './CodeTitle.module.scss'

interface CodeTitleProps {
  children?: string
}

export const CodeTitle = ({ children }: CodeTitleProps) => {
  return <span className={styles.code}>{children}</span>
}
