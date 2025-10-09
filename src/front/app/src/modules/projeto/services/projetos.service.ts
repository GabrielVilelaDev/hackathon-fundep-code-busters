/**
 * Services para a API de Projetos
 * Baseado nos endpoints da OpenAPI
 */

import { projectsApi } from '@/lib/axios'
import {
  ImportarProjetoDto,
  AtualizarProjetoDto,
  AtualizarStatusDto,
  AdicionarDocumentoDto,
  ProjetoResponseDto,
  Rubrica,
} from '@/modules/projeto/services/types/projetos.types'

export const projetosService = {
  /**
   * POST /projetos
   * Importa um novo projeto
   */
  async importarProjeto(data: ImportarProjetoDto): Promise<ProjetoResponseDto> {
    const response = await projectsApi.post('/projetos', data)
    return response.data
  },

  /**
   * GET /projetos/{id}
   * Obtém os dados de um projeto específico
   */
  async obterProjeto(id: string): Promise<ProjetoResponseDto> {
    const response = await projectsApi.get(`/projetos/${id}`)
    return response.data
  },

  /**
   * PUT /projetos/{id}
   * Atualiza os dados de um projeto
   */
  async atualizarProjeto(
    id: string,
    data: AtualizarProjetoDto
  ): Promise<ProjetoResponseDto> {
    const response = await projectsApi.put(`/projetos/${id}`, data)
    return response.data
  },

  /**
   * PATCH /projetos/{id}/status
   * Atualiza o status/etapa de um projeto
   */
  async atualizarStatusProjeto(
    id: string,
    data: AtualizarStatusDto
  ): Promise<ProjetoResponseDto> {
    const response = await projectsApi.patch(`/projetos/${id}/status`, data)
    return response.data
  },

  /**
   * POST /projetos/{id}/documentos
   * Adiciona um documento a um projeto
   */
  async adicionarDocumento(
    id: string,
    data: AdicionarDocumentoDto
  ): Promise<void> {
    const response = await projectsApi.post(`/projetos/${id}/documentos`, data)
    return response.data
  },
}

export const rubricasService = {
  /**
   * GET /rubricas
   * Lista todas as rubricas disponíveis
   */
  async listarRubricas(): Promise<Rubrica[]> {
    const response = await projectsApi.get('/rubricas')
    return response.data
  },
}
