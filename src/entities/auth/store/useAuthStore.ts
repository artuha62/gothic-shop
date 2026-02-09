import {
  ACCESS_TOKEN_KEY,
  getMe,
  loginUser,
  logoutUser,
  REFRESH_TOKEN_KEY,
  sendCode,
} from '@/entities/auth/api/auth'
import type { LoginRequest, User } from '@/entities/auth/model/types'
import Cookies from 'js-cookie'
import { create } from 'zustand'

interface AuthStore {
  // State
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean

  // Actions
  sendCode: (email: string) => Promise<void>
  login: (data: LoginRequest) => Promise<User>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  // State
  user: null,
  isAuthenticated: false,
  isLoading: false,

  // Actions
  sendCode: async (email) => {
    set({ isLoading: true })
    try {
      await sendCode({ email })
    } finally {
      set({ isLoading: false })
    }
  },

  login: async (data) => {
    set({ isLoading: true })
    try {
      const user = await loginUser(data)
      set({ user, isAuthenticated: true })
      return user
    } finally {
      set({ isLoading: false })
    }
  },

  logout: async () => {
    await logoutUser()
    set({ user: null, isAuthenticated: false })
  },

  checkAuth: async () => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY)
    const refreshToken = Cookies.get(REFRESH_TOKEN_KEY)

    if (!accessToken && !refreshToken) {
      set({ isLoading: false })
      return
    }
    try {
      const user = await getMe()
      set({ user, isAuthenticated: true })
    } catch (error) {
      await logoutUser()
      set({ user: null, isAuthenticated: false })
    } finally {
      set({ isLoading: false })
    }
  },
}))
