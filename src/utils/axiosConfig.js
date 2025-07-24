import axios from 'axios'
import { API_ROOT } from './constants'

// Tạo axios instance với interceptor để tự động thêm token
const apiClient = axios.create({
  baseURL: API_ROOT,
  timeout: 10000
})

// Request interceptor để thêm token vào header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor để xử lý token expired
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          const response = await axios.post(`${API_ROOT}/v1/customers/refresh-token`, {
            refreshToken
          })

          const { token } = response.data
          localStorage.setItem('accessToken', token)

          originalRequest.headers.Authorization = `Bearer ${token}`
          return apiClient(originalRequest)
        }
      } catch (refreshError) {
        // Refresh token cũng expired, logout user
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/sign-in'
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient