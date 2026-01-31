import styles from '@/widgets/product-details/ui/ProductDetails.module.scss'
import skeletonStyles from './ProductDetailsSkeleton.module.scss'

export const ProductDetailsSkeleton = () => {
  return (
    <section className={`${styles.productDetails} container`}>
      <div className={styles.inner}>
        <div className={styles.gallery}>
          <div className={styles.thumbs}>
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className={skeletonStyles.thumb} />
            ))}
          </div>
          <div className={styles.main}>
            <div className={skeletonStyles.mainImage} />
          </div>
        </div>

        <div className={styles.info}>
          <div className={skeletonStyles.header}>
            <div className={skeletonStyles.name} />
            <div className={skeletonStyles.favoriteButton} />
          </div>

          <div className={skeletonStyles.priceBlock}>
            <div className={skeletonStyles.price} />
          </div>

          <div className={skeletonStyles.sizesBlock}>
            <div className={skeletonStyles.sizeLabel} />
            <div className={skeletonStyles.sizes}>
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className={skeletonStyles.size} />
              ))}
            </div>
          </div>

          <div className={skeletonStyles.stock} />

          <div className={skeletonStyles.button} />

          <div className={`${skeletonStyles.button} ${styles.tgButton}`} />
        </div>
      </div>
    </section>
  )
}
