import { Router } from 'express'
import * as authController from '../controllers/AuthController'
import { authMiddleware } from '../middleware/AuthMiddleware'

const router = Router()

// Публичные роуты
router.post('/send-code', authController.sendCode) // Вместо старого register
router.post('/login', authController.login) // Проверка кода
router.post('/refresh', authController.refresh) // Обновление токена

// Защищённые роуты
router.get('/me', authMiddleware, authController.getMe)

export default router
