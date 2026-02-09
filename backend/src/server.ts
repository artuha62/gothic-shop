import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { errorHandler } from './middleware/ErrorHandler'
import prisma from './prisma'
import authRoutes from './routes/AuthRoutes'
import productRoutes from './routes/ProductRoutes'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT) || 3001

const allowedOrigins = [
  'http://localhost:5173', // dev Vite
  'https://gothic-shop.vercel.app', // prod Vercel
]

// CORS и JSON
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  })
)
app.use(express.json())

// Роуты
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

// Health check
app.get('/api/health', (_, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: 'connected',
  })
})

// 404
app.use((_, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Общий error handler
app.use(errorHandler)

// Корректное завершение
const gracefulShutdown = async () => {
  console.log('\n🔄 Shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
}

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)

// Запуск сервера
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📦 API available at http://localhost:${PORT}/api`)
  console.log(`🔐 Auth available at http://localhost:${PORT}/api/auth`)
})
