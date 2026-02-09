import { Router } from 'express'
import * as authController from '../controllers/AuthController'
import { authMiddleware } from '../middleware/AuthMiddleware'

const router = Router()

// Публичные
router.post('/send-code', authController.sendCode)
router.post('/login', authController.login)
router.post('/refresh', authController.refresh)

// Для авторизованных
router.get('/me', authMiddleware, authController.getMe)

export default router
