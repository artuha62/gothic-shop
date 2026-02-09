import { Router } from 'express'
import * as productController from '../controllers/ProductController'
import { searchProducts } from '../controllers/ProductController'

const router = Router()

router.get('/', productController.getAllProducts)
router.get('/featured', productController.getFeaturedProducts)
router.get('/search', searchProducts)
router.get('/by-ids', productController.getProductsByIds)
router.get('/slug/:slug', productController.getProductBySlug)
router.get('/sku/:sku', productController.getProductBySku)
router.get('/:id', productController.getProductById)

// Размер товара
router.get('/:id/size/:size', productController.getSizeStock)
router.put('/:id/size', productController.updateSizeStock)

router.post('/', productController.createProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

export default router
