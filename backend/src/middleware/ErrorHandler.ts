import { NextFunction, Request, Response } from 'express'

interface ErrorWithStatus extends Error {
  statusCode?: number
}

export const errorHandler = (
  err: ErrorWithStatus,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  console.error(`[ERROR]: ${message}`, err)

  res.status(statusCode).json({
    status: 'error',
    message: message,
  })
}
