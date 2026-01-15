import {
  CATEGORY_VALUES,
  COLOR_VALUES,
  PRICE_VALUES,
  SIZES,
  SORT_VALUES,
} from '@/entities/filters/model/constants.ts'
import type { Filters } from '@/entities/filters/model/types.ts'
import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'

export const useFiltersFromURL = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo<Filters>(() => {
    const categoryParam = searchParams.get('category')?.toUpperCase()
    const priceRangeParam = searchParams.get('price')
    const colorParam = searchParams.get('color')
    const sortParam = searchParams.get('sort')
    const sizesParam = searchParams.get('sizes')

    // Validation
    const category =
      categoryParam &&
      (CATEGORY_VALUES as readonly string[]).includes(categoryParam)
        ? (categoryParam as Filters['category'])
        : null

    const priceRange =
      priceRangeParam &&
      (PRICE_VALUES as readonly string[]).includes(priceRangeParam)
        ? (priceRangeParam as Filters['priceRange'])
        : 'all'

    const color =
      colorParam && (COLOR_VALUES as readonly string[]).includes(colorParam)
        ? (colorParam as Filters['color'])
        : ''

    const sort =
      sortParam && (SORT_VALUES as readonly string[]).includes(sortParam)
        ? (sortParam as Filters['sort'])
        : 'all'

    const sizes = sizesParam
      ? sizesParam
          .split(',')
          .map(Number)
          .filter((s) => (SIZES as readonly number[]).includes(s))
      : []

    return {
      category,
      priceRange,
      color,
      sort,
      sizes,
    }
  }, [searchParams])

  const updateFilters = useCallback(
    (newFilters: Filters) => {
      setSearchParams((params) => {
        if (newFilters.category) {
          params.set('category', newFilters.category.toLowerCase())
        } else {
          params.delete('category')
        }

        if (newFilters.priceRange && newFilters.priceRange !== 'all') {
          params.set('price', newFilters.priceRange)
        } else {
          params.delete('price')
        }

        if (newFilters.color) {
          params.set('color', newFilters.color)
        } else {
          params.delete('color')
        }

        if (newFilters.sort && newFilters.sort !== 'all') {
          params.set('sort', newFilters.sort)
        } else {
          params.delete('sort')
        }

        if (newFilters.sizes.length > 0) {
          params.set('sizes', newFilters.sizes.join(','))
        } else {
          params.delete('sizes')
        }

        return params
      })
    },
    [setSearchParams]
  )

  const clearFilters = useCallback(() => {
    setSearchParams({})
  }, [setSearchParams])

  return {
    filters,
    updateFilters,
    clearFilters,
  }
}
