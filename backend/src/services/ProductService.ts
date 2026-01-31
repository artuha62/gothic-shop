import type { Prisma } from '@prisma/client'
import { Category } from '@prisma/client'
import productRepository from '../repositories/ProductRepository'
import { normalizeForSearch } from '../utils/NormalizeSearch'
import { buildSearchConditions, setPriceRange } from '../utils/ProductUtils'

interface GetProductsParams {
  category?: string
  minPrice?: string
  maxPrice?: string
  price?: string
  color?: string
  sizes?: string
  sort?: string
  search?: string
  page?: string
  limit?: string
}

interface SearchProductsParams {
  query: string
  limit?: number
}

interface CreateProductData {
  name: string
  slug: string
  price: number
  category: Category
  color: string
  sku: string
  description?: string
  images?: string[]
  featured?: boolean
  sizeStock?: Array<{ size: number; stock: number }>
}

interface UpdateProductData {
  name?: string
  slug?: string
  price?: number
  category?: Category
  color?: string
  sku?: string
  description?: string
  images?: string[]
  featured?: boolean
  searchName?: string
  sizeStock?: Array<{ size: number; stock: number }>
}

/**
 * Сервис для бизнес-логики работы с продуктами
 */
export class ProductService {
  /**
   * Получить список продуктов с фильтрацией и пагинацией
   */
  async getProducts(params: GetProductsParams) {
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
    } = params

    const where: Prisma.ProductWhereInput = {}

    // Фильтр по категории
    if (category) {
      const cat = category.toUpperCase()
      if ((Object.values(Category) as string[]).includes(cat)) {
        where.category = cat as Category
      } else if (category !== 'all') {
        throw new Error('Invalid category')
      }
    }

    // Фильтр по цене (presets или диапазон)
    if (price) {
      if (price === 'to10') {
        setPriceRange(where, undefined, 9999)
      } else if (price === '10to15') {
        setPriceRange(where, 10000, 15000)
      } else if (price === 'from15') {
        setPriceRange(where, 15001, undefined)
      } else if (price !== 'all') {
        throw new Error('Invalid price filter')
      }
    } else if (minPrice || maxPrice) {
      const gte = minPrice ? Number(minPrice) : undefined
      const lte = maxPrice ? Number(maxPrice) : undefined

      if (
        (gte !== undefined && Number.isNaN(gte)) ||
        (lte !== undefined && Number.isNaN(lte))
      ) {
        throw new Error('Invalid minPrice/maxPrice')
      }

      setPriceRange(where, gte, lte)
    }

    // Фильтр по цвету
    if (color && color !== 'all') {
      where.color = { equals: color, mode: 'insensitive' }
    }

    // Фильтр по размерам
    if (sizes) {
      const sizeArray = sizes
        .split(',')
        .map((s) => Number(s))
        .filter((n) => Number.isFinite(n))

      if (sizeArray.length === 0) {
        throw new Error('Invalid sizes')
      }

      where.sizeStock = {
        some: {
          size: { in: sizeArray },
          stock: { gt: 0 },
        },
      }
    }

    // Поиск
    if (search) {
      const searchStr = search.trim()
      if (searchStr.length > 0) {
        const searchConditions = buildSearchConditions(searchStr)
        Object.assign(where, searchConditions)
      }
    }

    // Сортировка
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

    // Пагинация
    const pageNumber = parseInt(page || '1') || 1
    const pageSize = parseInt(limit || '12') || 12
    const skip = (pageNumber - 1) * pageSize

    // Получаем данные
    const [products, totalCount] = await Promise.all([
      productRepository.findAll(where, orderBy, skip, pageSize),
      productRepository.count(where),
    ])

    const totalPages = Math.ceil(totalCount / pageSize)

    return {
      data: products,
      meta: {
        page: pageNumber,
        limit: pageSize,
        total: totalCount,
        totalPages,
        hasNext: pageNumber < totalPages,
        hasPrev: pageNumber > 1,
      },
    }
  }

  /**
   * Поиск продуктов с ранжированием
   */
  async searchProducts(params: SearchProductsParams) {
    const { query, limit = 20 } = params

    if (!query || query.trim().length === 0) {
      return { data: [] }
    }

    const searchStr = query.trim()
    const where = buildSearchConditions(searchStr)

    const products = await productRepository.findAll(
      where,
      { createdAt: 'desc' },
      0,
      limit
    )

    return { data: products }
  }

  /**
   * Получить продукт по slug
   */
  async getProductBySlug(slug: string) {
    const product = await productRepository.findBySlug(slug)

    if (!product) {
      throw new Error('ProductRepository not found')
    }

    return product
  }

  /**
   * Получить продукт по ID
   */
  async getProductById(id: string) {
    const product = await productRepository.findById(id)

    if (!product) {
      throw new Error('ProductRepository not found')
    }

    return product
  }

  /**
   * Получить продукты по массиву ID
   */
  async getProductsByIds(idsString: string) {
    const idArray = idsString
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean)

    if (idArray.length === 0) {
      return []
    }

    if (idArray.length > 50) {
      throw new Error('Maximum 50 IDs allowed')
    }

    return productRepository.findByIds(idArray)
  }

  /**
   * Получить продукт по SKU
   */
  async getProductBySku(sku: string) {
    const product = await productRepository.findBySku(sku)

    if (!product) {
      throw new Error('ProductRepository not found')
    }

    return product
  }

  /**
   * Создать новый продукт
   */
  async createProduct(data: CreateProductData) {
    const { sizeStock, ...productData } = data

    return productRepository.create({
      ...productData,
      searchName: normalizeForSearch(productData.name),
      sizeStock: {
        create: sizeStock || [],
      },
    })
  }

  /**
   * Обновить продукт
   */
  async updateProduct(id: string, data: UpdateProductData) {
    const { sizeStock, ...productData } = data

    // Обновляем searchName если изменилось имя
    if (productData.name) {
      productData.searchName = normalizeForSearch(productData.name)
    }

    // Если переданы размеры, обновляем их
    if (sizeStock) {
      await productRepository.deleteSizeStock(id)
      await productRepository.createSizeStock(id, sizeStock)
    }

    return productRepository.update(id, productData)
  }

  /**
   * Удалить продукт
   */
  async deleteProduct(id: string) {
    return productRepository.delete(id)
  }

  /**
   * Получить избранные продукты
   */
  async getFeaturedProducts() {
    return productRepository.findFeatured(8)
  }

  /**
   * Обновить остаток размера
   */
  async updateSizeStock(id: string, size: number, stock: number) {
    return productRepository.upsertSizeStock(id, size, stock)
  }

  /**
   * Получить информацию о размере
   */
  async getSizeStock(id: string, size: number) {
    const sizeStock = await productRepository.findSizeStock(id, size)

    if (!sizeStock) {
      throw new Error('Size not found')
    }

    return sizeStock
  }
}

export default new ProductService()
