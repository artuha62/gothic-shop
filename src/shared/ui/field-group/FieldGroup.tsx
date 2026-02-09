import cn from 'classnames'
import styles from './FieldGroup.module.scss'

export type FieldGroup<T extends string | number> = {
  value: T
  label: string
  previewColor?: string
  needsBorder?: boolean
}

type BaseProps<T extends string | number> = {
  name: string
  subtitle: string
  options: readonly FieldGroup<T>[]
  className?: string
}

type RadioProps<T extends string | number> = BaseProps<T> & {
  type: 'radio'
  value: T
  onChange: (next: T) => void
}

type CheckboxProps<T extends string | number> = BaseProps<T> & {
  type: 'checkbox'
  value: readonly T[]
  onChange: (next: T) => void
}

type FieldGroupProps<T extends string | number> =
  | RadioProps<T>
  | CheckboxProps<T>

export const FieldGroup = <T extends string | number>({
  name,
  options,
  value,
  onChange,
  subtitle,
  className,
  type,
}: FieldGroupProps<T>) => {
  return (
    <div className={cn(styles.fieldGroup, className)}>
      <div className={styles.subtitle}>{subtitle}</div>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{name}</legend>

        {options.map((option) => {
          const isSelected =
            type === 'radio'
              ? value === option.value
              : (value as readonly T[]).includes(option.value)

          return (
            <label key={option.value}>
              <input
                className={styles.input}
                type={type}
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                tabIndex={type === 'radio' && isSelected ? 0 : -1}
              />

              {type === 'radio' ? (
                <span className={styles.radio}>
                  {option.previewColor && (
                    <span
                      className={cn(
                        styles.colorPreview,
                        option.needsBorder && styles.borderedPreview
                      )}
                      style={{ backgroundColor: option.previewColor }}
                      aria-hidden="true"
                    />
                  )}
                  {option.label}
                </span>
              ) : (
                <span className={styles.checkbox}>{option.label}</span>
              )}
            </label>
          )
        })}
      </fieldset>
    </div>
  )
}
