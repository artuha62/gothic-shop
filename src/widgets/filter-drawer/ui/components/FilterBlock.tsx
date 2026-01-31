import React from 'react'
import styles from '../FilterDrawer.module.scss'

type Props = {
  title: string
  children: React.ReactNode
}

const FilterBlock = ({ title, children }: Props) => {
  return (
    <div className={styles.block}>
      <div className={styles.subtitle}>{title}</div>
      <div className={styles.actions}>{children}</div>
    </div>
  )
}

export default FilterBlock
