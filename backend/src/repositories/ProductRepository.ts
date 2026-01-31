import type { Prisma } from '@prisma/client'
import prisma from '../prisma'

/**
 * Repository для работы с продуктами в БД
 */
export class ProductRepository {
  /**
   * Получить все продукты с фильтрацией и пагинацией
   */
  async findAll(
    where: Prisma.ProductWhereInput,
    orderBy: Prisma.ProductOrderByWithRelationInput,
    skip: number,
    take: number
  ) {
    return prisma.product.findMany({
      where,
      include: {
        sizeStock: { orderBy: { size: 'asc' } },
      },
      orderBy,
      skip,
      take,
    })
  }

  /**
   * Подсчитать количество продуктов по условию
   */
  async count(where: Prisma.ProductWhereInput) {
    return prisma.product.count({ where })
  }

  /**
   * Найти продукт по slug
   */
  async findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        sizeStock: {
          orderBy: { size: 'asc' },
        },
      },
    })
  }

  /**
   * Найти продукт по ID
   */
  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        sizeStock: {
          orderBy: { size: 'asc' },
        },
      },
    })
  }

  /**
   * Найти продукты по массиву ID
   */
  async findByIds(ids: string[]) {
    return prisma.product.findMany({
      where: {
        id: { in: ids },
      },
      include: {
        sizeStock: {
          orderBy: { size: 'asc' },
        },
      },
    })
  }

  /**
   * Найти продукт по SKU
   */
  async findBySku(sku: string) {
    return prisma.product.findUnique({
      where: { sku },
      include: {
        sizeStock: {
          orderBy: { size: 'asc' },
        },
      },
    })
  }

  /**
   * Создать новый продукт
   */
  async create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({
      data,
      include: {
        sizeStock: true,
      },
    })
  }

  /**
   * Обновить продукт
   */
  async update(id: string, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({
      where: { id },
      data,
      include: {
        sizeStock: {
          orderBy: { size: 'asc' },
        },
      },
    })
  }

  /**
   * Удалить продукт
   */
  async delete(id: string) {
    return prisma.product.delete({
      where: { id },
    })
  }

  /**
   * Получить избранные продукты
   */
  async findFeatured(limit: number = 8) {
    return prisma.product.findMany({
      where: { featured: true },
      take: limit,
      include: {
        sizeStock: {
          orderBy: { size: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  /**
   * Удалить все размеры для продукта
   */
  async deleteSizeStock(productId: string) {
    return prisma.sizeStock.deleteMany({
      where: { productId },
    })
  }

  /**
   * Создать размеры для продукта
   */
  async createSizeStock(
    productId: string,
    sizeStock: Array<{ size: number; stock: number }>
  ) {
    return prisma.sizeStock.createMany({
      data: sizeStock.map((item) => ({
        productId,
        size: item.size,
        stock: item.stock,
      })),
    })
  }

  /**
   * Обновить или создать размер для продукта
   */
  async upsertSizeStock(productId: string, size: number, stock: number) {
    return prisma.sizeStock.upsert({
      where: {
        productId_size: {
          productId,
          size,
        },
      },
      update: {
        stock,
      },
      create: {
        productId,
        size,
        stock,
      },
    })
  }

  /**
   * Получить информацию о размере
   */
  async findSizeStock(productId: string, size: number) {
    return prisma.sizeStock.findUnique({
      where: {
        productId_size: {
          productId,
          size,
        },
      },
    })
  }
}

export default new ProductRepository()
