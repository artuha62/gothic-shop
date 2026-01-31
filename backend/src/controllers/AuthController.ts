import { Request, Response } from 'express'
import authService from '../services/AuthService'
import { AppError } from '../utils/AppError'
import { asyncHandler } from '../utils/AsyncHandler'

// 1. Запрос кода на Email
export const sendCode = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body

  if (!email) {
    throw new AppError('Email is required', 400)
  }

  const result = await authService.sendOtp(email)
  res.json(result)
})

// 2. Ввод кода и получение токенов
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, code, rememberMe } = req.body // rememberMe приходит с фронта (true/false)

  if (!email || !code) {
    throw new AppError('Email and code are required', 400)
  }

  const result = await authService.verifyOtp(email, code, !!rememberMe)

  // Опционально: можно отправлять refresh token в httpOnly cookie для безопасности
  // res.cookie('refreshToken', result.refreshToken, { httpOnly: true, secure: true })

  res.json(result)
})

// 3. Обновление токена (когда Access истек)
export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body

  const result = await authService.refresh(refreshToken)
  res.json(result)
})

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id
  if (!userId) throw new AppError('Unauthorized', 401)

  const user = await authService.getUserById(userId) // Этот метод нужно вернуть/адаптировать в AuthService если он удален, или использовать repo
  res.json(user)
})
