import { useDebounce } from '@/shared/hooks/useDebounce.ts'
import { IconButton } from '@/shared/ui/icon-button'
import { Delete, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import styles from './SearchInput.module.scss'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Поиск...',
}: SearchInputProps) => {
  const [localValue, setLocalValue] = useState(value)
  const debouncedValue = useDebounce(localValue, 450)

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue)
    }
  }, [debouncedValue, onChange, value])

  const handleClear = () => {
    setLocalValue('')
  }

  return (
    <div className={styles.wrapper}>
      <Search className={styles.icon} size={18} />
      <input
        type="text"
        value={localValue}
        onChange={(event) => setLocalValue(event.target.value)}
        placeholder={placeholder}
        className={styles.searchInput}
        autoFocus
      />

      {localValue && (
        <IconButton
          className={styles.clearButton}
          aria-label="Очистить"
          onClick={handleClear}
        >
          <Delete strokeWidth={0.75} size={28} />
        </IconButton>
      )}
    </div>
  )
}
