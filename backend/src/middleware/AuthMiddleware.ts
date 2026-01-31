import { NextFunction, Request, Response } from 'express'
import authService from '../services/AuthService'
import { AppError } from '../utils/AppError'

// Расширяем тип Request для TypeScript
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
      }
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

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401)
    }

    const token = authHeader.substring(7)
    const decoded = await authService.verifyAccessToken(token)

    req.user = { id: decoded.userId }
    next()
  } catch (error) {
    next(new AppError('Invalid or expired token', 401))
  }
}
