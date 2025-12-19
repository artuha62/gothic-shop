import styles from '../FilterDrawer.module.scss'

export type RadioOption<T extends string> = {
  value: T
  label: string
}

type Props<T extends string> = {
  name: string
  options: readonly RadioOption<T>[]
  value: T
  onChange: (next: T) => void
}

const RadioOptions = <T extends string>({
  name,
  options,
  value,
  onChange,
}: Props<T>) => {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{name}</legend>

      {options.map((option) => {
        const isSelected = value === option.value

        return (
          <label key={option.value} className={styles.option}>
            <input
              className={styles.radio}
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={() => onChange(option.value)}
            />
            <span className={styles.optionBox}>{option.label}</span>
          </label>
        )
      })}
    </fieldset>
  )
}

export default RadioOptions
