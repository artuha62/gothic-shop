import cn from 'classnames'
import type { CSSProperties } from 'react'
import styles from './SkeletonElement.module.scss'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  square?: string | number
  circle?: boolean
  count?: number
  className?: string
  style?: CSSProperties
  variant?: 'text' | 'image'
  color?: string
  loadingLine?: boolean
}

export const SkeletonElement = ({
  width = '100%',
  height,
  square,
  circle = false,
  count = 1,
  className,
  style,
  variant = 'text',
  color,
  loadingLine = false,
}: SkeletonProps) => {
  const finalWidth = square ?? width
  const finalHeight = square ?? height

  const defaultColor = '#a8a8a8'

  const finalColor = color ?? defaultColor

  if (variant === 'image') {
    const svgWidth = typeof finalWidth === 'number' ? finalWidth : 100
    const svgHeight = typeof finalHeight === 'number' ? finalHeight : 100

    const svgUrl = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${svgWidth}' height='${svgHeight}'%3E%3Crect width='${svgWidth}' height='${svgHeight}' fill='${encodeURIComponent(finalColor)}'/%3E%3C/svg%3E`

    const imageStyle: CSSProperties = {
      borderRadius: circle ? '50%' : undefined,
      ...style,
    }

    const elements = Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className={cn(
          styles.skeletonImageWrapper,
          loadingLine && styles.loadingLine,
          className
        )}
      >
        <img
          className={cn(styles.skeleton)}
          style={imageStyle}
          src={svgUrl}
          alt=""
          aria-hidden="true"
        />
      </div>
    ))

    return count > 1 ? <>{elements}</> : elements[0]
  }

  const skeletonStyle: CSSProperties = {
    width: typeof finalWidth === 'number' ? `${finalWidth}px` : finalWidth,
    height: typeof finalHeight === 'number' ? `${finalHeight}px` : finalHeight,
    borderRadius: circle ? '50%' : undefined,
    backgroundColor: finalColor,
    ...style,
  }

  const elements = Array.from({ length: count }, (_, i) => (
    <span
      key={i}
      className={cn(
        styles.skeleton,
        loadingLine && styles.loadingLine,
        className
      )}
      style={skeletonStyle}
    />
  ))

  return count > 1 ? <>{elements}</> : elements[0]
}
