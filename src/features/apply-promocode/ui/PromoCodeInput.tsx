import { usePromoCodeStore } from '@/features/apply-promocode/store/usePromoCodeStore.ts'
import { Button } from '@/shared/ui/button'
import { useRef, useState } from 'react'
import styles from './PromoCodeInput.module.scss'

export const PromoCodeInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')

  const code = usePromoCodeStore((state) => state.code)
  const applyPromoCode = usePromoCodeStore((state) => state.applyPromoCode)
  const clearPromoCode = usePromoCodeStore((state) => state.clearPromoCode)

  const handleApply = () => {
    const inputValue = inputRef.current?.value.trim() || ''
    if (!inputValue.trim()) {
      setError('Введите промокод')
      return
    }

    const isValid = applyPromoCode(inputValue)

    if (isValid) {
      setError('')
      if (inputRef.current) inputRef.current.value = ''
    } else {
      setError('Неверный промокод')
    }
  }

  const handleClear = () => {
    clearPromoCode()
    if (inputRef.current) inputRef.current.value = ''
    setError('')
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (code) {
        handleClear()
      } else {
        handleApply()
      }
    }
  }

  return (
    <div className={styles.promocode}>
      <h3 className={styles.title}>Промокод</h3>

      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          name="promocode"
          placeholder="Введите код купона"
          className={styles.input}
          onKeyDown={handleKeyPress}
          disabled={!!code}
          aria-label="Промокод"
        />
        <Button
          className={styles.button}
          type="button"
          variant="black"
          size="md"
          onClick={code ? handleClear : handleApply}
        >
          {code ? 'Очистить' : 'Применить'}
        </Button>
      </div>

      {code && (
        <div className={styles.success} id="promo-success" role="status">
          ✓ Промокод "{code}" применен
        </div>
      )}

      {error && (
        <div className={styles.error} id="promo-error" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}
