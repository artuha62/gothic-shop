import type {
  AuthResponse,
  LoginRequest,
  SendCodeRequest,
  User,
} from '@/entities/auth/model/types'
import { api } from '@/shared/api/axios'
import Cookies from 'js-cookie'

export const ACCESS_TOKEN_KEY = 'accessToken'
export const REFRESH_TOKEN_KEY = 'refreshToken'

export async function sendCode(data: SendCodeRequest) {
  return api.post<{ message: string }>('/auth/send-code', data)
}

export async function loginUser(loginData: LoginRequest) {
  const { data } = await api.post<AuthResponse>('/auth/login', loginData)

  Cookies.set(ACCESS_TOKEN_KEY, data.accessToken, { expires: 1 / 96 })

  const refreshExpires = loginData.rememberMe ? 30 : 1 / 24
  Cookies.set(REFRESH_TOKEN_KEY, data.refreshToken, { expires: refreshExpires })

  return data.user
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>('/auth/me')
  return data
}

export async function logoutUser() {
  Cookies.remove(ACCESS_TOKEN_KEY)
  Cookies.remove(REFRESH_TOKEN_KEY)
}
