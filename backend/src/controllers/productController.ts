import type { Prisma } from '@prisma/client'
import { Category } from '@prisma/client'
import { Request, Response } from 'express'
import prisma from '../prisma'
import {
  getSearchWords,
  normalizeForSearch,
  stemRussian,
} from '../utils/normalizeSearch'

// Вспомогательная функция для создания условий поиска
const buildSearchConditions = (searchStr: string): Prisma.ProductWhereInput => {
  const searchWords = getSearchWords(searchStr)

  if (searchWords.length === 0) {
    // Если после удаления стоп-слов ничего не осталось - ищем по оригиналу
    return {
      OR: [
        { name: { contains: searchStr, mode: 'insensitive' } },
        { description: { contains: searchStr, mode: 'insensitive' } },
        { sku: { contains: searchStr.toUpperCase(), mode: 'insensitive' } },
        { color: { contains: searchStr, mode: 'insensitive' } },
      ],
    }
  }

  // Строим AND условия - каждое слово должно быть найдено
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

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      price,
      color,
      sizes,
      sort,
      search,
      page,
      limit,
    } = req.query

    const where: Prisma.ProductWhereInput = {}

    // Category (валидация against enum)
    if (category) {
      const cat = String(category).toUpperCase()
      if ((Object.values(Category) as string[]).includes(cat)) {
        where.category = cat as Category
      } else {
        return res.status(400).json({ error: 'Invalid category' })
      }
    }

    // Price: поддерживаем канонический параметр `price` (presets)
    const pricePreset = price ? String(price) : undefined

    const setPriceRange = (gte?: number, lte?: number) => {
      where.price = {}
      if (typeof gte === 'number') where.price.gte = gte
      if (typeof lte === 'number') where.price.lte = lte
    }

    if (pricePreset) {
      if (pricePreset === 'to10') {
        setPriceRange(undefined, 9999)
      } else if (pricePreset === '10to15') {
        setPriceRange(10000, 15000)
      } else if (pricePreset === 'from15') {
        setPriceRange(15001, undefined)
      } else if (pricePreset === 'all') {
        // no-op
      } else {
        return res.status(400).json({ error: 'Invalid price filter' })
      }
    } else if (minPrice || maxPrice) {
      const gte = minPrice ? Number(minPrice) : undefined
      const lte = maxPrice ? Number(maxPrice) : undefined
      if (
        (gte !== undefined && Number.isNaN(gte)) ||
        (lte !== undefined && Number.isNaN(lte))
      ) {
        return res.status(400).json({ error: 'Invalid minPrice/maxPrice' })
      }
      setPriceRange(gte, lte)
    }

    if (color) {
      where.color = { equals: String(color), mode: 'insensitive' }
    }

    // Фильтр по размерам
    if (sizes) {
      const sizeArray = String(sizes)
        .split(',')
        .map((s) => Number(s))
        .filter((n) => Number.isFinite(n))

      if (sizeArray.length === 0) {
        return res.status(400).json({ error: 'Invalid sizes' })
      }

      where.sizeStock = {
        some: {
          size: { in: sizeArray },
          stock: { gt: 0 },
        },
      }
    }

    // Полнотекстовый поиск
    if (search) {
      const searchStr = String(search).trim()
      if (searchStr.length > 0) {
        const searchConditions = buildSearchConditions(searchStr)
        Object.assign(where, searchConditions)
      }
    }

    // Определяем сортировку
    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' }
    if (sort === 'price_asc') {
      orderBy = { price: 'asc' }
    } else if (sort === 'price_desc') {
      orderBy = { price: 'desc' }
    } else if (sort === 'name_asc') {
      orderBy = { name: 'asc' }
    } else if (sort === 'name_desc') {
      orderBy = { name: 'desc' }
    }

    const pageNumber = parseInt(page as string) || 1
    const pageSize = parseInt(limit as string) || 12
    const skip = (pageNumber - 1) * pageSize

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          sizeStock: { orderBy: { size: 'asc' } },
        },
        orderBy,
        skip,
        take: pageSize,
      }),
      prisma.product.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / pageSize)

    res.json({
      data: products,
      meta: {
        page: pageNumber,
        limit: pageSize,
        total: totalCount,
        totalPages,
        hasNext: pageNumber < totalPages,
        hasPrev: pageNumber > 1,
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
}

// Расширенный поиск с ранжированием по релевантности
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { query, limit = 20 } = req.query

    if (!query || String(query).trim().length === 0) {
      return res.json({ data: [] })
    }

    const searchStr = String(query).trim()
    const where = buildSearchConditions(searchStr)

    const products = await prisma.product.findMany({
      where,
      include: { sizeStock: { orderBy: { size: 'asc' } } },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
    })

    res.json({ data: products })
  } catch (error) {
    console.error('Error searching products:', error)
    res.status(500).json({ error: 'Failed to search products' })
  }
}

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: {
        sizeStock: {
          orderBy: { size: 'asc' },
        },
      },
    })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json(product)
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        sizeStock: {
          orderBy: { size: 'asc' },
        },
      },
    })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({ error: 'Failed to fetch product' })
  }
}

export const getProductBySku = async (req: Request, res: Response) => {
  try {
    const { sku } = req.params

    const product = await prisma.product.findUnique({
      where: { sku },
      include: {
        sizeStock: {
          orderBy: { size: 'asc' },
        },
      },
    })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({ error: 'Failed to fetch product' })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { sizeStock, ...productData } = req.body

    const product = await prisma.product.create({
      data: {
        ...productData,
        searchName: normalizeForSearch(productData.name),
        sizeStock: {
          create: sizeStock || [],
        },
      },
      include: {
        sizeStock: true,
      },
    })

    res.status(201).json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({ error: 'Failed to create product' })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { sizeStock, ...productData } = req.body

    // Обновляем searchName если изменилось имя
    if (productData.name) {
      productData.searchName = normalizeForSearch(productData.name)
    }

    // Если переданы размеры, обновляем их
    if (sizeStock) {
      await prisma.sizeStock.deleteMany({
        where: { productId: id },
      })

      await prisma.sizeStock.createMany({
        data: sizeStock.map((item: { size: number; stock: number }) => ({
          productId: id,
          size: item.size,
          stock: item.stock,
        })),
      })
    }

    const product = await prisma.product.update({
      where: { id },
      data: productData,
      include: {
        sizeStock: {
          orderBy: { size: 'asc' },
        },
      },
    })

    res.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    res.status(500).json({ error: 'Failed to update product' })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await prisma.product.delete({
      where: { id },
    })

    res.status(204).send()
  } catch (error) {
    console.error('Error deleting product:', error)
    res.status(500).json({ error: 'Failed to delete product' })
  }
}

export const getFeaturedProducts = async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: { featured: true },
      take: 8,
      include: {
        sizeStock: {
          orderBy: { size: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    res.json(products)
  } catch (error) {
    console.error('Error fetching featured products:', error)
    res.status(500).json({ error: 'Failed to fetch featured products' })
  }
}

export const updateSizeStock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { size, stock } = req.body

    const sizeStock = await prisma.sizeStock.upsert({
      where: {
        productId_size: {
          productId: id,
          size: parseInt(size),
        },
      },
      update: {
        stock: parseInt(stock),
      },
      create: {
        productId: id,
        size: parseInt(size),
        stock: parseInt(stock),
      },
    })

    res.json(sizeStock)
  } catch (error) {
    console.error('Error updating size stock:', error)
    res.status(500).json({ error: 'Failed to update size stock' })
  }
}

export const getSizeStock = async (req: Request, res: Response) => {
  try {
    const { id, size } = req.params

    const sizeStock = await prisma.sizeStock.findUnique({
      where: {
        productId_size: {
          productId: id,
          size: parseInt(size),
        },
      },
    })

    if (!sizeStock) {
      return res.status(404).json({ error: 'Size not found' })
    }

    res.json(sizeStock)
  } catch (error) {
    console.error('Error fetching size stock:', error)
    res.status(500).json({ error: 'Failed to fetch size stock' })
  }
}
