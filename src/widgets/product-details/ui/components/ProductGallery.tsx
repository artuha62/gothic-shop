import styles from '@/widgets/product-details/ui/ProductDetails.module.scss'
import { useState } from 'react'

interface ProductGalleryProps {
  images: string[]
  name: string
}

const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const mainImage = currentImage ?? images[0]

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbs}>
        {images.map((image) => (
          <img
            className={styles.thumb}
            key={image}
            src={image}
            alt={name}
            loading="lazy"
            onClick={() => setCurrentImage(image)}
          />
        ))}
      </div>

      <div className={styles.main}>
        <img
          className={styles.mainImage}
          src={mainImage}
          alt=""
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default ProductGallery
