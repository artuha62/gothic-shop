import { useProducts } from '@/entities/product/model/useProducts.ts'
import { useFilters } from '@/features/filter-products/model/useFilters.ts'
import { pluralizeRu } from '@/shared/lib/pluralize-ru/pluralizeRu.ts'
import { Button } from '@/shared/ui/button'
import { useFilterDrawerStore } from '@/widgets/filter-drawer/store/useFilterDrawerStore.ts'
import styles from '@/widgets/filter-drawer/ui/FilterDrawer.module.scss'

const FilterDrawerFooter = () => {
  const { clearFilters, filters } = useFilters()
  const closeFilters = useFilterDrawerStore((state) => state.closeFilters)

  const { totalProducts } = useProducts({ filters })

  const productWord = pluralizeRu(
    totalProducts,
    'АРТЕФАКТ',
    'АРТЕФАКТА',
    'АРТЕФАКТОВ'
  )

  return (
    <footer className={styles.footer}>
      <Button onClick={clearFilters} fullWidth>
        СБРОСИТЬ
      </Button>
      <Button onClick={closeFilters} fullWidth>
        {totalProducts === 0
          ? 'НЕТ АРТЕФАКТОВ'
          : `${totalProducts} ${productWord}`}
      </Button>
    </footer>
  )
}

export default FilterDrawerFooter
