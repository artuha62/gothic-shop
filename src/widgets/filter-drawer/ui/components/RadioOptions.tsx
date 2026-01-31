import cn from 'classnames'
import styles from '../FilterDrawer.module.scss'

export type RadioOption<T extends string> = {
  value: T
  label: string
  previewColor?: string
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
        const isWhiteColor = option.value === 'white'

        return (
          <label key={option.value} className={styles.option}>
            <input
              className={styles.radio}
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={() => onChange(option.value)}
              tabIndex={isSelected ? 0 : -1}
            />

            <span className={styles.optionBox}>
              {option.previewColor && (
                <span
                  className={cn(
                    styles.colorPreview,
                    isWhiteColor && styles.whitePreview
                  )}
                  style={{ backgroundColor: option.previewColor }}
                  aria-hidden="true"
                />
              )}
              {option.label}
            </span>
          </label>
        )
      })}
    </fieldset>
  )
}

export default RadioOptions
