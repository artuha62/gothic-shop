import styles from './ProductFooter.module.scss'

interface ProductFooterProps {
  description?: string
}

const ProductFooter = ({ description }: ProductFooterProps) => {
  return (
    <>
      <footer className={styles.footer}>
        <input type="checkbox" id="desc-toggle" className={styles.toggle} />
        <label htmlFor="desc-toggle" className={styles.checkbox}>
          Описание
        </label>
        <span className={styles.content}>{description}</span>
      </footer>
    </>
  )
}

export default ProductFooter
