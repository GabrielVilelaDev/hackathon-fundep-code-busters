import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { API_ENDPOINTS, ApiEndpoint } from './api-config'

// Function to create an axios instance with common configuration
const createApiInstance = (endpoint: ApiEndpoint): AxiosInstance => {
  return axios.create({
    baseURL: endpoint.baseURL,
    timeout: endpoint.timeout || 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// Create instances for each API endpoint
export const authApi = createApiInstance(API_ENDPOINTS.auth)
export const projectsApi = createApiInstance(API_ENDPOINTS.projects)
export const reportsApi = createApiInstance(API_ENDPOINTS.reports)
export const prospeccaoApi = createApiInstance(API_ENDPOINTS.prospeccao)

// Default API instance (for backwards compatibility)
export const api = authApi

// List of all API instances to apply interceptors
const apiInstances = [authApi, projectsApi, reportsApi, prospeccaoApi]

// Request interceptor - Add auth token to all instances
apiInstances.forEach(instance => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('auth_token')
      
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )
})

// Response interceptor - Handle errors for all instances
apiInstances.forEach(instance => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    (error: AxiosError) => {
      // Handle specific error codes
      if (error.response) {
        const { status } = error.response
        
        switch (status) {
          case 401:
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem('auth_token')
            window.location.href = '/login'
            break
            
          case 403:
            // Forbidden - user doesn't have permission
            console.error('Acesso negado: Você não tem permissão para acessar este recurso')
            break
            
          case 404:
            // Not found
            console.error('Recurso não encontrado')
            break
            
          case 500:
            // Server error
            console.error('Erro interno do servidor')
            break
            
          default:
            console.error('Erro na requisição:', error.message)
        }
      } else if (error.request) {
        // Request made but no response
        console.error('Erro de rede: Sem resposta do servidor')
      } else {
        // Something else happened
        console.error('Erro:', error.message)
      }
      
      return Promise.reject(error)
    }
  )
})

// API Error class for better error handling
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Helper function to handle API errors
export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message
    const statusCode = error.response?.status
    const data = error.response?.data

    return new ApiError(message, statusCode, data)
  }

  if (error instanceof Error) {
    return new ApiError(error.message)
  }

  return new ApiError('Erro desconhecido')
}
