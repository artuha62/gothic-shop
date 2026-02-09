import prisma from '../prisma'

interface CreateUserData {
  email: string
  name?: string
}

export class AuthRepository {
  // Поиск пользователя по email
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    })
  }

  // Поиск пользователя по ID
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    })
  }

  // Создание пользователя
  async create(data: CreateUserData) {
    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
      },
    })
  }

  // Сохранить или сбросить OTP-код
  async saveOtp(email: string, code: string | null, expiresAt: Date | null) {
    return prisma.user.update({
      where: { email: email.toLowerCase() },
      data: {
        otpCode: code,
        otpExpiresAt: expiresAt,
      },
    })
  }

  // Обновить refresh token
  async updateRefreshToken(userId: string, token: string | null) {
    return prisma.user.update({
      where: { id: userId },
      data: { refreshToken: token },
    })
  }
}

export default new AuthRepository()
