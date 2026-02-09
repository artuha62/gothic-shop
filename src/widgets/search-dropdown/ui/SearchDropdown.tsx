import { useFilters } from '@/features/filter-products/model/useFilters'
import { SearchInput } from '@/features/search-products'
import { IconButton } from '@/shared/ui/icon-button'
import { useSearchDropdownStore } from '@/widgets/search-dropdown/store/useSearchDropdownStore'
import cn from 'classnames'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router'
import styles from './SearchDropdown.module.scss'

export const SearchDropdown = () => {
  const isSearchOpen = useSearchDropdownStore((state) => state.isSearchOpen)
  const closeSearch = useSearchDropdownStore((state) => state.closeSearch)
  const { filters, setSearch } = useFilters()

  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isSearchOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeSearch()
      }
    }

    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 0)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchOpen, closeSearch])

  const handleSearchChange = (value: string) => {
    if (location.pathname !== '/catalog') {
      navigate(`/catalog?search=${encodeURIComponent(value)}`)
    } else {
      setSearch(value)
    }
  }

  if (!isSearchOpen) return null

  return (
    <div className={cn(styles.searchDropdown)} ref={dropdownRef}>
      <div className={styles.searchContainer}>
        <SearchInput
          value={filters.search || ''}
          onChange={handleSearchChange}
          placeholder="Поиск товаров..."
        />
        <IconButton
          className={styles.closeButton}
          variant="default"
          aria-label="Закрыть поиск"
          onClick={closeSearch}
        >
          <X strokeWidth={0.75} size={45} />
        </IconButton>
      </div>
    </div>
  )
}
