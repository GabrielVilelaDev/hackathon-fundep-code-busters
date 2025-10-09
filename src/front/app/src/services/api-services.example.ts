/**
 * Exemplo de serviços usando múltiplas APIs
 * Este arquivo demonstra como usar as diferentes instâncias de API
 */

import { authApi, projectsApi, reportsApi, prospeccaoApi } from '@/lib/axios'

// ============================================
// AUTH API (3001) - Serviços de Autenticação
// ============================================

export const authService = {
  // Login
  async login(credentials: { email: string; password: string }) {
    const response = await authApi.post('/auth/login', credentials)
    return response.data
  },

  // Logout
  async logout() {
    const response = await authApi.post('/auth/logout')
    return response.data
  },

  // Verificar token
  async verifyToken() {
    const response = await authApi.get('/auth/verify')
    return response.data
  },

  // Buscar perfil do usuário
  async getProfile() {
    const response = await authApi.get('/auth/profile')
    return response.data
  },
}

// ============================================
// PROJECTS API (3002) - Gestão de Projetos
// ============================================

export const projectsService = {
  // Listar todos os projetos
  async getAll(filters?: {
    status?: string
    unidade?: string
    tipo?: string
    page?: number
    limit?: number
  }) {
    const response = await projectsApi.get('/projects', { params: filters })
    return response.data
  },

  // Buscar projeto por ID
  async getById(id: string) {
    const response = await projectsApi.get(`/projects/${id}`)
    return response.data
  },

  // Criar novo projeto
  async create(data: any) {
    const response = await projectsApi.post('/projects', data)
    return response.data
  },

  // Atualizar projeto
  async update(id: string, data: any) {
    const response = await projectsApi.put(`/projects/${id}`, data)
    return response.data
  },

  // Deletar projeto
  async delete(id: string) {
    const response = await projectsApi.delete(`/projects/${id}`)
    return response.data
  },

  // Buscar documentos do projeto
  async getDocuments(projectId: string) {
    const response = await projectsApi.get(`/projects/${projectId}/documents`)
    return response.data
  },

  // Upload de documento
  async uploadDocument(projectId: string, file: File) {
    const formData = new FormData()
    formData.append('file', file)
    const response = await projectsApi.post(`/projects/${projectId}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
}

// ============================================
// REPORTS API (3003) - Relatórios e Métricas
// ============================================

export const reportsService = {
  // Dashboard geral
  async getDashboard(year?: number) {
    const response = await reportsApi.get('/reports/dashboard', {
      params: { year },
    })
    return response.data
  },

  // Métricas principais
  async getMetrics(period: { startDate: string; endDate: string }) {
    const response = await reportsApi.get('/reports/metrics', {
      params: period,
    })
    return response.data
  },

  // Projetos por status
  async getProjectsByStatus(year?: number) {
    const response = await reportsApi.get('/reports/projects-by-status', {
      params: { year },
    })
    return response.data
  },

  // Projetos por tipo
  async getProjectsByType(year?: number) {
    const response = await reportsApi.get('/reports/projects-by-type', {
      params: { year },
    })
    return response.data
  },

  // Desempenho por unidade
  async getPerformanceByUnit(year?: number) {
    const response = await reportsApi.get('/reports/performance-by-unit', {
      params: { year },
    })
    return response.data
  },

  // Exportar relatório
  async exportReport(type: string, format: 'pdf' | 'excel', filters?: any) {
    const response = await reportsApi.post(
      '/reports/export',
      { type, format, filters },
      { responseType: 'blob' }
    )
    return response.data
  },

  // Tempo médio de cadastro
  async getAverageTime(period: { startDate: string; endDate: string }) {
    const response = await reportsApi.get('/reports/average-time', {
      params: period,
    })
    return response.data
  },

  // Taxa de retrabalho
  async getReworkRate(period: { startDate: string; endDate: string }) {
    const response = await reportsApi.get('/reports/rework-rate', {
      params: period,
    })
    return response.data
  },
}

// ============================================
// PROSPECCAO API (3004) - Prospecção
// ============================================

export const prospeccaoService = {
  // Listar propostas
  async getPropostas(filters?: {
    status?: string
    search?: string
    page?: number
    limit?: number
  }) {
    const response = await prospeccaoApi.get('/propostas', { params: filters })
    return response.data
  },

  // Buscar proposta por ID
  async getPropostaById(id: string) {
    const response = await prospeccaoApi.get(`/propostas/${id}`)
    return response.data
  },

  // Criar nova proposta
  async createProposta(data: any) {
    const response = await prospeccaoApi.post('/propostas', data)
    return response.data
  },

  // Atualizar proposta
  async updateProposta(id: string, data: any) {
    const response = await prospeccaoApi.put(`/propostas/${id}`, data)
    return response.data
  },

  // Buscar aprovações pendentes
  async getPendingApprovals() {
    const response = await prospeccaoApi.get('/approvals/pending')
    return response.data
  },

  // Aprovar proposta
  async approve(id: string, comment?: string) {
    const response = await prospeccaoApi.post(`/approvals/${id}/approve`, { comment })
    return response.data
  },

  // Rejeitar proposta
  async reject(id: string, reason: string) {
    const response = await prospeccaoApi.post(`/approvals/${id}/reject`, { reason })
    return response.data
  },
}

// ============================================
// CONFIGURAÇÕES (pode usar qualquer API)
// ============================================

export const configService = {
  // Buscar regras de automação
  async getAutomationRules() {
    const response = await projectsApi.get('/config/automation-rules')
    return response.data
  },

  // Criar regra de automação
  async createAutomationRule(data: any) {
    const response = await projectsApi.post('/config/automation-rules', data)
    return response.data
  },

  // Atualizar regra
  async updateAutomationRule(id: string, data: any) {
    const response = await projectsApi.put(`/config/automation-rules/${id}`, data)
    return response.data
  },

  // Deletar regra
  async deleteAutomationRule(id: string) {
    const response = await projectsApi.delete(`/config/automation-rules/${id}`)
    return response.data
  },

  // Ativar/Desativar regra
  async toggleAutomationRule(id: string, enabled: boolean) {
    const response = await projectsApi.patch(`/config/automation-rules/${id}/toggle`, {
      enabled,
    })
    return response.data
  },
}

// ============================================
// Exemplo de uso nos componentes
// ============================================

/*
// Em um componente React:

import { useEffect, useState } from 'react'
import { projectsService, reportsService } from '@/services/api-services'

function DashboardPage() {
  const [projects, setProjects] = useState([])
  const [metrics, setMetrics] = useState(null)
  
  useEffect(() => {
    loadData()
  }, [])
  
  async function loadData() {
    try {
      // Carregar projetos da API de projetos (3002)
      const projectsData = await projectsService.getAll({
        status: 'active',
        limit: 10
      })
      setProjects(projectsData.projects)
      
      // Carregar métricas da API de relatórios (3003)
      const metricsData = await reportsService.getDashboard(2025)
      setMetrics(metricsData)
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    }
  }
  
  return (
    <div>
      {/* Renderizar dados *\/}
    </div>
  )
}
*/
