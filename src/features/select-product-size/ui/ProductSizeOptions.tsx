import cn from 'classnames'
import styles from './ProductSizeOptions.module.scss'

type SizeStock = {
  size: number
  stock: number
}

type Props = {
  sizes?: readonly number[]
  sizeStock?: SizeStock[]
  selected: readonly number[]
  name: string
  onToggle: (size: number) => void
}

export const ProductSizeOptions = ({
  name,
  sizeStock,
  selected,
  onToggle,
}: Props) => {
  return (
    <fieldset role="radiogroup" className={styles.fieldset}>
      <legend className={styles.legend}>{name}</legend>
      {sizeStock &&
        sizeStock.map(({ size, stock }) => {
          const checked = selected.includes(size)
          const isDisabled = stock === 0

          return (
            <label className={cn(isDisabled && styles.disabled)} key={size}>
              <input
                onChange={() => !isDisabled && onToggle(size)}
                className={styles.checkbox}
                type="checkbox"
                checked={checked}
                disabled={isDisabled}
              />
              <span className={styles.sizeBox}>{size}</span>
            </label>
          )
        })}
    </fieldset>
  )
}
