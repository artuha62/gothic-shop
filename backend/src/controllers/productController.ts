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
    const product = await prisma.product.create({
      data: req.body,
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

    const product = await prisma.product.update({
      where: { id },
      data: req.body,
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
      orderBy: { createdAt: 'desc' },
    })

    res.json(products)
  } catch (error) {
    console.error('Error fetching featured products:', error)
    res.status(500).json({ error: 'Failed to fetch featured products' })
  }
}
