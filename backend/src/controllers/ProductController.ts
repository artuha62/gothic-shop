import { Request, Response } from 'express'
import productService from '../services/ProductService'
import { AppError } from '../utils/AppError'
import { asyncHandler } from '../utils/AsyncHandler'

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await productService.getProducts(req.query)
    res.json(result)
  }
)

export const searchProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const { query, limit } = req.query
    const result = await productService.searchProducts({
      query: String(query || ''),
      limit: limit ? Number(limit) : undefined,
    })
    res.json(result)
  }
)

export const getProductBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await productService.getProductBySlug(req.params.slug)
    if (!product) {
      throw new AppError('ProductRepository not found', 404)
    }
    res.json(product)
  }
)

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await productService.getProductById(req.params.id)
    if (!product) {
      throw new AppError('ProductRepository not found', 404)
    }
    res.json(product)
  }
)

export const getProductsByIds = asyncHandler(
  async (req: Request, res: Response) => {
    const { ids } = req.query

    if (!ids || typeof ids !== 'string') {
      throw new AppError('ids parameter is required', 400)
    }

    const products = await productService.getProductsByIds(ids)
    res.json(products)
  }
)

export const getProductBySku = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await productService.getProductBySku(req.params.sku)
    if (!product) {
      throw new AppError('ProductRepository not found', 404)
    }
    res.json(product)
  }
)

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await productService.createProduct(req.body)
    res.status(201).json(product)
  }
)

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await productService.updateProduct(req.params.id, req.body)
    res.json(product)
  }
)

export const getFeaturedProducts = asyncHandler(async (_, res: Response) => {
  const products = await productService.getFeaturedProducts()
  res.json(products)
})

export const getSizeStock = asyncHandler(
  async (req: Request, res: Response) => {
    const { id, size } = req.params
    const stock = await productService.getSizeStock(id, Number(size))
    if (!stock) throw new AppError('Size not found', 404)
    res.json(stock)
  }
)

export const updateSizeStock = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const { size, stock } = req.body
    const updated = await productService.updateSizeStock(
      id,
      Number(size),
      Number(stock)
    )
    res.json(updated)
  }
)

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    await productService.deleteProduct(req.params.id)
    res.status(204).send()
  }
)
