import type { ButtonHTMLAttributes, ReactNode } from 'react'
import cn from 'classnames'
import styles from './Button.module.scss'

type ButtonVariant = 'white' | 'black' | 'green' | 'tsgreen'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  children: ReactNode
}

const Button = ({
  variant = 'white',
  size = 'lg',
  fullWidth = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        {
          [styles.fullWidth]: fullWidth,
          [styles.disabled]: disabled,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
