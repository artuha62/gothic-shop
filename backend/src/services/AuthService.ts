import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import authRepository from '../repositories/AuthRepository'
import { AppError } from '../utils/AppError'

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret'

// Транспортер для отправки почты
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export class AuthService {
  // Отправить OTP-код на почту
  async sendOtp(email: string) {
    const user = await authRepository.findByEmail(email)
    if (!user) {
      await authRepository.create({ email })
    }
    const otp = crypto.randomInt(100000, 999999).toString()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)
    await authRepository.saveOtp(email, otp, expiresAt)

    console.log(`🔑 [DEV] OTP для ${email}: ${otp}`)

    try {
      await transporter.sendMail({
        from: 'Gothic Shop <noreply@gothicshop.com>',
        to: email,
        subject: 'Код подтверждения входа',
        text: `Ваш код для входа: ${otp}. Он действителен 5 минут.`,
      })
      console.log('✅ Email успешно отправлен на', email)
    } catch (error) {
      console.error('❌ Email send error:', error)
    }

    return { message: 'Код успешно отправлен на вашу почту' }
  }

  // Проверить OTP и выдать токены
  async verifyOtp(email: string, code: string, rememberMe: boolean) {
    const user = await authRepository.findByEmail(email)
    if (!user || !user.otpCode || !user.otpExpiresAt) {
      throw new AppError('Запрос на код не найден', 400)
    }
    if (new Date() > user.otpExpiresAt) {
      throw new AppError('Срок действия кода истек', 401)
    }
    if (user.otpCode !== code) {
      throw new AppError('Неверный код подтверждения', 401)
    }
    await authRepository.saveOtp(email, null, null)
    return this.generateTokens(user.id, user.email, user.role, rememberMe)
  }

  // Обновить пару токенов
  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new AppError('Токен обновления не предоставлен', 401)
    }
    let payload: { userId: string }
    try {
      payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
        userId: string
      }
    } catch {
      throw new AppError('Невалидный или просроченный refresh токен', 401)
    }
    const user = await authRepository.findById(payload.userId)
    if (!user || user.refreshToken !== refreshToken) {
      throw new AppError('Доступ запрещен (токен не совпадает)', 401)
    }
    return this.generateTokens(user.id, user.email, user.role, true)
  }

  // Генерация Access/Refresh токенов
  private async generateTokens(
    userId: string,
    email: string,
    role: string,
    rememberMe: boolean
  ) {
    const accessToken = jwt.sign({ userId, email, role }, JWT_ACCESS_SECRET, {
      expiresIn: '15m',
    })
    const refreshLifetime = rememberMe ? '30d' : '1h'
    const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, {
      expiresIn: refreshLifetime,
    })
    await authRepository.updateRefreshToken(userId, refreshToken)
    return {
      accessToken,
      refreshToken,
      user: { id: userId, email, role },
    }
  }

  // Проверить Access токен
  async verifyAccessToken(token: string) {
    try {
      return jwt.verify(token, JWT_ACCESS_SECRET) as {
        userId: string
        email: string
        role: string
      }
    } catch {
      throw new AppError('Невалидный токен доступа', 401)
    }
  }

  async getUserById(userId: string) {
    const user = await authRepository.findById(userId)
    if (!user) throw new AppError('Пользователь не найден', 404)
    return user
  }
}

export default new AuthService()
