import { useFilters } from '@/entities/filters/model/useFilters.ts'
import { useFiltersStore } from '@/entities/filters/store/useFiltersStore.ts'
import { useProducts } from '@/entities/product/model/useProducts.ts'
import { pluralizeRu } from '@/shared/lib/pluralize-ru/pluralizeRu.ts'
import { Button } from '@/shared/ui/button'
import styles from '@/widgets/filter-drawer/ui/FilterDrawer.module.scss'

const FilterDrawerFooter = () => {
  const { clearFilters, filters } = useFilters()
  const closeFilters = useFiltersStore((state) => state.closeFilters)

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
