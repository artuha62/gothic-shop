import styles from '../FilterDrawer.module.scss'

type Props = {
  sizes: readonly number[]
  selected: readonly number[]
  name: string
  onToggle: (size: number) => void
}

const SizeOptions = ({ name, sizes, selected, onToggle }: Props) => {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{name}</legend>
      {sizes.map((size) => {
        const checked = selected.includes(size)
        return (
          <label key={size}>
            <input
              onChange={() => onToggle(size)}
              className={styles.checkbox}
              type="checkbox"
              checked={checked}
            />
            <span className={styles.sizeBox}>{size}</span>
          </label>
        )
      })}
    </fieldset>
  )
}

export default SizeOptions
