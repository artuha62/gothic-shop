import cn from 'classnames'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import styles from './Button.module.scss'

type ButtonVariant = 'white' | 'black' | 'green' | 'tsgreen'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps<T extends ElementType = 'button'> {
  as?: T
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  children: ReactNode
  className?: string
}

export const Button = <T extends ElementType = 'button'>({
  /* вариант кнопки */
  variant = 'white',
  /* размер кнопки */
  size = 'md',
  /* на всю ширину */
  fullWidth = false,
  /* перезаписывающие стили */
  className,
  /* контент */
  children,
  /* тип(кнопка или ссылка) */
  as,
  ...props
}: ButtonProps<T> & ComponentPropsWithoutRef<T>) => {
  const Component = as || 'button'

  const classes = cn(
    styles.button,
    styles[variant],
    styles[size],
    {
      [styles.fullWidth]: fullWidth,
      [styles.disabled]: props.disabled || props.ariaDisabled,
    },
    className
  )

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
