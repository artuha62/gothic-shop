import { validateSearchInput } from '@/features/search-products/lib/validation'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useEffect, useState } from 'react'

interface UseSearchInputProps {
  value: string
  onChange: (value: string) => void
}

const MIN_LENGTH = 3
const DEBOUNCE_DELAY = 250

export const useSearchInput = ({ value, onChange }: UseSearchInputProps) => {
  const [localValue, setLocalValue] = useState(value)
  const debouncedValue = useDebounce(localValue, DEBOUNCE_DELAY)
  const error = validateSearchInput(localValue, MIN_LENGTH)

  useEffect(() => {
    if (debouncedValue === '' || debouncedValue.length >= MIN_LENGTH) {
      if (debouncedValue !== value) {
        onChange(debouncedValue)
      }
    }
  }, [debouncedValue, onChange, value])

  const handleClear = () => {
    setLocalValue('')
  }

  const handleChange = (newValue: string) => {
    setLocalValue(newValue)
  }

  return {
    localValue,
    error,
    handleChange,
    handleClear,
  }
}
