import { SkeletonElement } from '@/shared/ui/skeleton'
import styles from '@/widgets/product-details/ui/ProductDetails.module.scss'
import galleryStyles from '@/widgets/product-details/ui/components/ProductGallery.module.scss'
import skeletonStyles from './ProductDetailsSkeleton.module.scss'

export const ProductDetailsSkeleton = () => {
  return (
    <div className={styles.content}>
      <section className={styles.productDetails}>
        <div className={styles.inner}>
          {/* Галерея */}
          <div className={galleryStyles.gallery}>
            {/* Миниатюры */}
            <div className={`${galleryStyles.thumbs} ${skeletonStyles.thumbs}`}>
              <SkeletonElement
                variant="image"
                width={50}
                height={67}
                count={7}
              />
            </div>

            {/* Главное изображение */}
            <div className={galleryStyles.main}>
              <SkeletonElement
                variant="image"
                width={810}
                height={1080}
                className={galleryStyles.mainImage}
                loadingLine
              />
            </div>
          </div>

          {/* Инфо */}
          <div className={styles.info}>
            {/* Шапка с названием и иконкой */}
            <div className={styles.productHeader}>
              <div className={styles.titleRow}>
                <SkeletonElement width="60%" height={39} />
                <SkeletonElement square={39} />
              </div>

              {/* Цена */}
              <div className={styles.price}>
                <SkeletonElement width="25%" height={39} />
              </div>
            </div>

            {/* Размеры */}
            <div className={styles.sizesBlock}>
              <SkeletonElement width="20%" height={20} />
              <div className={skeletonStyles.sizeBoxes}>
                <SkeletonElement square={36} count={7} />
              </div>
            </div>

            {/* Наличие */}
            <SkeletonElement width="55%" height={30} />

            {/* Кнопка в корзину */}
            <SkeletonElement height={47} />

            {/* Кнопка телеграм */}
            <SkeletonElement height={47} className={styles.tgButton} />

            {/* Описание */}
            <SkeletonElement width="20%" height={20} />
          </div>
        </div>
      </section>
    </div>
  )
}
