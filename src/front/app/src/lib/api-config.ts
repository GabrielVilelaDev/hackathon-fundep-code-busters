// Configuration for multiple API endpoints
export interface ApiEndpoint {
  name: string
  baseURL: string
  timeout?: number
}

// Define multiple API endpoints
export const API_ENDPOINTS: Record<string, ApiEndpoint> = {
  auth: {
    name: 'Authentication API',
    baseURL: import.meta.env.VITE_AUTH_API_URL || 'http://localhost:3001/api',
    timeout: 30000,
  },
  projects: {
    name: 'Projects API',
    baseURL: import.meta.env.VITE_PROJECTS_API_URL || 'http://localhost:8080',
    timeout: 30000,
  },
  reports: {
    name: 'Reports API',
    baseURL: import.meta.env.VITE_REPORTS_API_URL || 'http://localhost:3003/api',
    timeout: 30000,
  },
  prospeccao: {
    name: 'Prospeccao API',
    baseURL: import.meta.env.VITE_PROSPECCAO_API_URL || 'http://localhost:3004/api',
    timeout: 30000,
  },
}

// Default API endpoint
export const DEFAULT_API = API_ENDPOINTS.auth
