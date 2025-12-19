import styles from '../FilterDrawer.module.scss'

export type RadioOption<TValue extends string> = {
  value: TValue
  label: string
}

type Props<TValue extends string> = {
  name: string
  options: readonly RadioOption<TValue>[]
  value: TValue
  onChange: (next: TValue) => void
}

const RadioOptions = <TValue extends string>({
  name,
  options,
  value,
  onChange,
}: Props<TValue>) => {
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
