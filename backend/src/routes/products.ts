import { Router } from 'express'
import * as productController from '../controllers/productController'
import { searchProducts } from '../controllers/productController'

const router = Router()

// GET routes
router.get('/', productController.getAllProducts)
router.get('/featured', productController.getFeaturedProducts)
router.get('/search', searchProducts)
router.get('/slug/:slug', productController.getProductBySlug)
router.get('/sku/:sku', productController.getProductBySku)
router.get('/:id', productController.getProductById)

// Получить наличие конкретного размера
router.get('/:id/size/:size', productController.getSizeStock)

// POST routes
router.post('/', productController.createProduct)

// PUT routes
router.put('/:id', productController.updateProduct)

// Обновить наличие конкретного размера
router.put('/:id/size', productController.updateSizeStock)

// DELETE routes
router.delete('/:id', productController.deleteProduct)

export default router
