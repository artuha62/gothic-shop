import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from 'react'
import cn from 'classnames'
import styles from './Button.module.scss'

type ButtonVariant = 'white' | 'black' | 'green' | 'tsgreen'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  children: ReactNode
  className?: string
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }

type ButtonAsAnchor = Omit<BaseProps, 'disabled'> &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const Button = ({
  variant = 'white',
  size = 'md',
  fullWidth = false,
  className,
  children,
  as = 'button',
  ...props
}: ButtonProps) => {
  const disabled =
    as === 'button' ? (props as ButtonAsButton).disabled : undefined
  const classes = cn(
    styles.button,
    styles[variant],
    styles[size],
    {
      [styles.fullWidth]: fullWidth,
      [styles.disabled]: disabled,
    },
    className
  )

  if (as === 'a') {
    return (
      <a
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}

export default Button
