import { Request, Response } from 'express'
import prisma from '../prisma'
import { Category } from '@prisma/client'
import type { Prisma } from '@prisma/client'

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query

    const where: Prisma.ProductWhereInput = {}

    if (category) {
      where.category = category as Category
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseInt(minPrice as string)
      if (maxPrice) where.price.lte = parseInt(maxPrice as string)
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { sku: { contains: search as string, mode: 'insensitive' } },
      ]
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        sizeStock: {
          orderBy: { size: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    res.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
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

    // Если переданы размеры, обновляем их
    if (sizeStock) {
      // Удаляем старые размеры
      await prisma.sizeStock.deleteMany({
        where: { productId: id },
      })

      // Создаем новые
      await prisma.sizeStock.createMany({
        data: sizeStock.map((item: { size: number; stock: number }) => ({
          productId: id,
          size: item.size,
          stock: item.stock,
        })),
      })
    }

    // Обновляем продукт
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

// Новые эндпоинты для работы с размерами

export const updateSizeStock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params // id продукта
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
