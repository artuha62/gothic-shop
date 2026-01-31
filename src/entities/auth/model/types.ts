export interface User {
  id: string
  email: string
  name?: string
  role: string
}

export interface SendCodeRequest {
  email: string
}

export interface LoginRequest {
  email: string
  code: string
  rememberMe: boolean
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}
