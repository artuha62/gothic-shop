import { useSearchInput } from '@/features/search-products/model/useSearchInput'
import { IconButton } from '@/shared/ui/icon-button'
import { Delete, Search } from 'lucide-react'
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
  const { localValue, error, handleChange, handleClear } = useSearchInput({
    value,
    onChange,
  })

  return (
    <div className={styles.wrapper}>
      <Search className={styles.icon} size={18} />
      <input
        type="text"
        value={localValue}
        onChange={(event) => handleChange(event.target.value)}
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

      {error && <div className={styles.error}>{error}</div>}
    </div>
  )
}
