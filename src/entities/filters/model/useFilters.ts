import { useSearchParams } from 'react-router'
import {
  apiParamsToFilters,
  filtersToApiParams,
} from '../utils/convertFilters.ts'
import type { Filters } from './types'

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = apiParamsToFilters(searchParams)

  const updateParams = (nextFilters: Filters) => {
    const apiParams = filtersToApiParams(nextFilters)
    const params = new URLSearchParams(searchParams)

    Object.entries(apiParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === 'all') {
        params.delete(key)
      } else {
        params.set(key, String(value))
      }
    })

    setSearchParams(params, { replace: true })
  }

  const setFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    const nextFilters = apiParamsToFilters(searchParams)
    nextFilters[key] = value

    updateParams(nextFilters)
  }

  const toggleSize = (size: number) => {
    const nextFilters = apiParamsToFilters(searchParams)

    nextFilters.sizes = nextFilters.sizes.includes(size)
      ? nextFilters.sizes.filter((s) => s !== size)
      : [...nextFilters.sizes, size]

    updateParams(nextFilters)
  }

  const clearFilters = () => {
    setSearchParams({})
  }

  return { filters, setFilter, toggleSize, clearFilters }
}
