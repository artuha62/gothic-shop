export const validateSearchInput = (
  value: string,
  minLength: number
): string | null => {
  if (value === '' || value.length >= minLength) {
    return null
  }
  return `Введите минимум ${minLength} символа`
}
