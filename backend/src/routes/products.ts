import { Router } from 'express'
import * as productController from '../controllers/productController'

const router = Router()

// GET routes
router.get('/', productController.getAllProducts)
router.get('/featured', productController.getFeaturedProducts)
router.get('/slug/:slug', productController.getProductBySlug)
router.get('/sku/:sku', productController.getProductBySku)
router.get('/:id', productController.getProductById)

// POST routes
router.post('/', productController.createProduct)

// PUT routes
router.put('/:id', productController.updateProduct)

// DELETE routes
router.delete('/:id', productController.deleteProduct)

export default router
