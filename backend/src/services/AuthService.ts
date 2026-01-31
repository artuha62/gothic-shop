import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import authRepository from '../repositories/AuthRepository'
import { AppError } from '../utils/AppError'

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret'

// Настройка почты
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export class AuthService {
  /**
   * 1. Отправка OTP кода
   */
  async sendOtp(email: string) {
    // Проверяем, есть ли юзер. Если нет — создаем (регистрация без пароля)
    let user = await authRepository.findByEmail(email)

    if (!user) {
      // Вызываем create без password, так как мы его удалили из схемы и репозитория
      user = await authRepository.create({ email })
    }

    // Генерируем 6-значный код
    const otp = crypto.randomInt(100000, 999999).toString()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000) // 5 минут

    // Сохраняем код в БД
    await authRepository.saveOtp(email, otp, expiresAt)

    // Логирование или отправка
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔑 [DEV] OTP для ${email}: ${otp}`)
    } else {
      try {
        await transporter.sendMail({
          from: '"Gothic Shop" <noreply@gothicshop.com>',
          to: email,
          subject: 'Код подтверждения входа',
          text: `Ваш код для входа: ${otp}. Он действителен 5 минут.`,
        })
      } catch (error) {
        console.error('Email send error:', error)
        // В продакшене тут лучше бросить ошибку, если почта не ушла
      }
    }

    return { message: 'Код успешно отправлен на вашу почту' }
  }

  /**
   * 2. Проверка OTP и выдача токенов (Cookies/JWT)
   */
  async verifyOtp(email: string, code: string, rememberMe: boolean) {
    const user = await authRepository.findByEmail(email)

    if (!user || !user.otpCode || !user.otpExpiresAt) {
      throw new AppError('Запрос на код не найден', 400)
    }

    // Проверка срока годности кода
    if (new Date() > user.otpExpiresAt) {
      throw new AppError('Срок действия кода истек', 401)
    }

    // Проверка совпадения кода
    if (user.otpCode !== code) {
      throw new AppError('Неверный код подтверждения', 401)
    }

    // Сбрасываем код в БД, чтобы его нельзя было использовать второй раз
    await authRepository.saveOtp(email, null, null)

    // Генерируем Access и Refresh токены
    return this.generateTokens(user.id, user.email, user.role, rememberMe)
  }

  /**
   * 3. Обновление пары токенов (Refresh)
   */
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

    // Проверка: токен должен совпадать с тем, что хранится в базе для этого юзера
    if (!user || user.refreshToken !== refreshToken) {
      throw new AppError('Доступ запрещен (токен не совпадает)', 401)
    }

    // При обновлении обычно выдаем новую пару.
    // Здесь rememberMe = true, чтобы выдать стандартный длинный токен.
    return this.generateTokens(user.id, user.email, user.role, true)
  }

  /**
   * Вспомогательный метод для JWT
   */
  private async generateTokens(
    userId: string,
    email: string,
    role: string,
    rememberMe: boolean
  ) {
    // Access всегда короткий (15 мин)
    const accessToken = jwt.sign({ userId, email, role }, JWT_ACCESS_SECRET, {
      expiresIn: '15m',
    })

    // Длина Refresh зависит от галочки "Запомнить меня"
    const refreshLifetime = rememberMe ? '30d' : '1h'

    const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, {
      expiresIn: refreshLifetime,
    })

    // Записываем refresh токен в базу юзеру
    await authRepository.updateRefreshToken(userId, refreshToken)

    return {
      accessToken,
      refreshToken,
      user: { id: userId, email, role },
    }
  }

  /**
   * Проверка Access токена (используется в Middleware)
   */
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
