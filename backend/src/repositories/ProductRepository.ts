import type { Prisma } from '@prisma/client'
import prisma from '../prisma'

export class ProductRepository {
  // Получить все продукты (фильтрация, пагинация)
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

  async count(where: Prisma.ProductWhereInput) {
    return prisma.product.count({ where })
  }

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

  // Найти продукты по массиву ID
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

  async create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({
      data,
      include: {
        sizeStock: true,
      },
    })
  }

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

  async delete(id: string) {
    return prisma.product.delete({
      where: { id },
    })
  }

  // Избранные продукты
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

  // Удалить все размеры продукта
  async deleteSizeStock(productId: string) {
    return prisma.sizeStock.deleteMany({
      where: { productId },
    })
  }

  // Создать размеры продукта
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

  // Обновить или создать размер
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
