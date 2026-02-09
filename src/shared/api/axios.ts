import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/entities/auth/api/auth'
import axios from 'axios'
import Cookies from 'js-cookie'

export const BASE_URL = import.meta.env.VITE_API_URL

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = Cookies.get(ACCESS_TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true
      try {
        const refreshToken = Cookies.get(REFRESH_TOKEN_KEY)
        if (!refreshToken) {
          throw new Error('Refresh token not found')
        }
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        })
        Cookies.set(ACCESS_TOKEN_KEY, data.accessToken, { expires: 1 / 96 })
        Cookies.set(REFRESH_TOKEN_KEY, data.refreshToken, { expires: 30 })
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        Cookies.remove(ACCESS_TOKEN_KEY)
        Cookies.remove(REFRESH_TOKEN_KEY)

        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
