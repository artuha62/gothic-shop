import { useSearchParams } from 'react-router'
import {
  apiParamsToFilters,
  filtersToApiParams,
} from '../utils/convertFilters.ts'
import type { Filters } from './types'

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = apiParamsToFilters(searchParams)

  const setFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    const newFilters = { ...filters, [key]: value }
    const apiParams = filtersToApiParams(newFilters)

    const params = new URLSearchParams()
    Object.entries(apiParams).forEach(([key, value]) => {
      if (value !== undefined) params.set(key, String(value))
    })
    setSearchParams(params)
  }

  const toggleSize = (size: number) => {
    const sizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size]
    setFilter('sizes', sizes)
  }

  const clearFilters = () => {
    setSearchParams({})
  }

  return { filters, setFilter, toggleSize, clearFilters }
}
