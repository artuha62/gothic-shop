export const pluralizeRu = (
  count: number,
  form1: string, // 1 товар
  form2: string, // 2-4 товара
  form5: string // 5+ товаров (и 0 товаров)
) => {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  // 11–14 всегда "товаров"
  const isTeen = lastTwoDigits >= 11 && lastTwoDigits <= 14
  if (isTeen) return form5

  // 1 → "товар"
  if (lastDigit === 1) return form1

  // 2–4 → "товара"
  const isFew = lastDigit >= 2 && lastDigit <= 4
  if (isFew) return form2

  // 0, 5–9 → "товаров"
  return form5
}
