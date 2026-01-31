import prisma from '../prisma'

// 1. Убрали пароль из интерфейса, так как в схеме его больше нет
interface CreateUserData {
  email: string
  name?: string
}

export class AuthRepository {
  /**
   * Найти пользователя по email
   */
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    })
  }

  /**
   * Найти пользователя по ID
   */
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    })
  }

  /**
   * Создать нового пользователя (Регистрация)
   */
  async create(data: CreateUserData) {
    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        // Здесь НЕ ДОЛЖНО БЫТЬ пароля
      },
    })
  }

  /**
   * Сохранить или очистить OTP код
   */
  async saveOtp(email: string, code: string | null, expiresAt: Date | null) {
    return prisma.user.update({
      where: { email: email.toLowerCase() }, // Важно приводить к одному регистру
      data: {
        otpCode: code,
        otpExpiresAt: expiresAt,
      },
    })
  }

  /**
   * Обновить Refresh Token в базе
   */
  async updateRefreshToken(userId: string, token: string | null) {
    return prisma.user.update({
      where: { id: userId },
      data: { refreshToken: token },
    })
  }
}

export default new AuthRepository()
