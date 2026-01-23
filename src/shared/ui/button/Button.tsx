import cn from 'classnames'
import type { ElementType, ReactNode } from 'react'
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

const Button = <T extends ElementType = 'button'>({
  variant = 'white',
  size = 'md',
  fullWidth = false,
  className,
  children,
  as,
  ...props
}: ButtonProps<T> & React.ComponentPropsWithoutRef<T>) => {
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

export default Button
