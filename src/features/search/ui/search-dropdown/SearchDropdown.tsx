import { SearchInput } from '@/features/search'
import { useSearchStore } from '@/features/search/store/useSearchStore'
import { IconButton } from '@/shared/ui/icon-button'
import cn from 'classnames'
import { X } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import styles from './SearchDropdown.module.scss'

export const SearchDropdown = () => {
  const isSearchOpen = useSearchStore((state) => state.isSearchOpen)
  const closeSearch = useSearchStore((state) => state.closeSearch)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeSearch()
      }
    }

    if (isSearchOpen) {
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside)
      }, 0)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchOpen, closeSearch])

  const searchValue = searchParams.get('search') ?? ''

  const handleSearchChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams)

      if (value.trim()) {
        params.set('search', value)
      } else {
        params.delete('search')
      }

      if (location.pathname !== '/catalog') {
        navigate(`/catalog?${params.toString()}`)
      } else {
        setSearchParams(params)
      }
    },
    [searchParams, setSearchParams, navigate, location.pathname]
  )

  if (!isSearchOpen) return null

  return (
    <div className={cn(styles.searchDropdown)} ref={dropdownRef}>
      <div className={styles.searchContainer}>
        <SearchInput
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Поиск товаров..."
        />
        <IconButton
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
