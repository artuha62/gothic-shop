import { NextFunction, Request, Response } from 'express'
import authService from '../services/AuthService'
import { AppError } from '../utils/AppError'

declare module 'express' {
  interface Request {
    user?: {
      id: string
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return next(new AppError('No token provided', 401))
    }
    const token = authHeader.substring(7)
    const decoded = await authService.verifyAccessToken(token)
    req.user = { id: decoded.userId }
    next()
  } catch {
    next(new AppError('Invalid or expired token', 401))
  }
}
