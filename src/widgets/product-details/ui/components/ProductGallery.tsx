import cn from 'classnames'
import type { TouchEvent } from 'react'
import { useState } from 'react'
import styles from './ProductGallery.module.scss'

interface ProductGalleryProps {
  images: string[]
  name: string
}

export const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1))
  }

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    event.currentTarget.dataset.startX = String(event.touches[0].clientX)
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startX = Number(event.currentTarget.dataset.startX)
    const endX = event.changedTouches[0].clientX
    const diff = startX - endX

    const SWIPE_THRESHOLD = 50

    if (diff > SWIPE_THRESHOLD) {
      handleNext()
    } else if (diff < -SWIPE_THRESHOLD) {
      handlePrev()
    }
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbs}>
        {images.map((image, index) => (
          <img
            onClick={() => setCurrentIndex(index)}
            className={styles.thumb}
            key={image}
            src={image}
            alt={`${name} - превью ${index + 1}`}
            width={810}
            height={1080}
            loading="lazy"
          />
        ))}
      </div>

      <div
        className={styles.main}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          className={styles.mainImage}
          src={images[currentIndex]}
          alt={name}
          width={810}
          height={1080}
          loading="eager"
        />

        <div className={styles.indicators}>
          {images.map((_, index) => (
            <span
              key={index}
              className={cn(
                styles.indicator,
                index === currentIndex && styles.active
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
