import type { Prisma } from '@prisma/client'
import { getSearchWords, stemRussian } from './NormalizeSearch'

export const buildSearchConditions = (
  searchStr: string
): Prisma.ProductWhereInput => {
  const searchWords = getSearchWords(searchStr)

  if (searchWords.length === 0) {
    return {
      OR: [
        { name: { contains: searchStr, mode: 'insensitive' } },
        { description: { contains: searchStr, mode: 'insensitive' } },
        { sku: { contains: searchStr.toUpperCase(), mode: 'insensitive' } },
        { color: { contains: searchStr, mode: 'insensitive' } },
      ],
    }
  }

  // AND условия
  const andConditions: Prisma.ProductWhereInput[] = searchWords.map((word) => {
    const stem = stemRussian(word)
    const shouldUseStem = stem.length >= 6

    if (shouldUseStem) {
      return {
        OR: [
          { name: { contains: word, mode: 'insensitive' } },
          { name: { contains: stem, mode: 'insensitive' } },
          { description: { contains: word, mode: 'insensitive' } },
          { description: { contains: stem, mode: 'insensitive' } },
          { color: { contains: word, mode: 'insensitive' } },
        ],
      }
    } else {
      return {
        OR: [
          { name: { contains: word, mode: 'insensitive' } },
          { description: { contains: word, mode: 'insensitive' } },
          { color: { contains: word, mode: 'insensitive' } },
        ],
      }
    }
  })

  return { AND: andConditions }
}

// Диапазон цен
export const setPriceRange = (
  where: Prisma.ProductWhereInput,
  gte?: number,
  lte?: number
) => {
  where.price = {}
  if (typeof gte === 'number') where.price.gte = gte
  if (typeof lte === 'number') where.price.lte = lte
}
