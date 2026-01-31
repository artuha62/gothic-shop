import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import { errorHandler } from './middleware/ErrorHandler'
import prisma from './prisma'
import authRoutes from './routes/AuthRoutes'
import productRoutes from './routes/ProductRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json())

// Static files
app.use('/images', express.static(path.join(__dirname, '../public/images')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: 'connected',
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.use(errorHandler)

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('\n🔄 Shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
}

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📦 API available at http://localhost:${PORT}/api`)
  console.log(`🔐 Auth available at http://localhost:${PORT}/api/auth`)
})
