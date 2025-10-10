/**
 * Hooks do React Query para a API de Projetos
 */

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import {
  ImportarProjetoDto,
  AtualizarProjetoDto,
  AtualizarStatusDto,
  AdicionarDocumentoDto,
  ProjetoResponseDto,
  Rubrica,
} from '@/modules/projeto/services/types/projetos.types'
import { projetosService, rubricasService } from '@/modules/projeto/services/projetos.service'
import { AxiosError } from 'axios'

// ============================================
// Query Keys
// ============================================

export const projetosKeys = {
  all: ['projetos'] as const,
  detail: (id: string) => [...projetosKeys.all, id] as const,
  rubricas: ['rubricas'] as const,
}

// ============================================
// Queries
// ============================================

/**
 * Hook para obter dados de um projeto específico
 */
export const useObterProjeto = (
  id: string,
  options?: Omit<UseQueryOptions<ProjetoResponseDto, AxiosError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<ProjetoResponseDto, AxiosError>({
    queryKey: projetosKeys.detail(id),
    queryFn: () => projetosService.obterProjeto(id),
    enabled: !!id,
    ...options,
  })
}

/**
 * Hook para listar todas as rubricas
 */
export const useListarRubricas = (
  options?: Omit<UseQueryOptions<Rubrica[], AxiosError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<Rubrica[], AxiosError>({
    queryKey: projetosKeys.rubricas,
    queryFn: () => rubricasService.listarRubricas(),
    staleTime: 1000 * 60 * 5, // 5 minutos - rubricas não mudam com frequência
    ...options,
  })
}

// ============================================
// Mutations
// ============================================

/**
 * Hook para importar um novo projeto
 */
export const useImportarProjeto = () => {
  const queryClient = useQueryClient()

  return useMutation<ProjetoResponseDto, AxiosError, ImportarProjetoDto>({
    mutationFn: (data: ImportarProjetoDto) => projetosService.importarProjeto(data),
    onSuccess: (data) => {
      // Invalida a lista de projetos
      queryClient.invalidateQueries({ queryKey: projetosKeys.all })
      
      // Adiciona o projeto ao cache
      queryClient.setQueryData(projetosKeys.detail(data.id), data)
    },
  })
}

/**
 * Hook para atualizar um projeto
 */
export const useAtualizarProjeto = () => {
  const queryClient = useQueryClient()

  return useMutation<
    ProjetoResponseDto,
    AxiosError,
    { id: string; data: AtualizarProjetoDto }
  >({
    mutationFn: ({ id, data }) => projetosService.atualizarProjeto(id, data),
    onSuccess: (data, variables) => {
      // Atualiza o cache do projeto específico
      queryClient.setQueryData(projetosKeys.detail(variables.id), data)
      
      // Invalida a lista de projetos
      queryClient.invalidateQueries({ queryKey: projetosKeys.all })
    },
  })
}

/**
 * Hook para atualizar o status de um projeto
 */
export const useAtualizarStatusProjeto = () => {
  const queryClient = useQueryClient()

  return useMutation<
    ProjetoResponseDto,
    AxiosError,
    { id: string; data: AtualizarStatusDto }
  >({
    mutationFn: ({ id, data }) => projetosService.atualizarStatusProjeto(id, data),
    onSuccess: (data, variables) => {
      // Atualiza o cache do projeto específico
      queryClient.setQueryData(projetosKeys.detail(variables.id), data)
      
      // Invalida a lista de projetos
      queryClient.invalidateQueries({ queryKey: projetosKeys.all })
    },
  })
}

/**
 * Hook para adicionar um documento a um projeto
 */
export const useAdicionarDocumento = () => {
  const queryClient = useQueryClient()

  return useMutation<void, AxiosError, { id: string; data: AdicionarDocumentoDto }>({
    mutationFn: ({ id, data }) => projetosService.adicionarDocumento(id, data),
    onSuccess: (_data, variables) => {
      // Invalida o cache do projeto para recarregar com o novo documento
      queryClient.invalidateQueries({ queryKey: projetosKeys.detail(variables.id) })
    },
  })
}

// ============================================
// Hooks Compostos
// ============================================

/**
 * Hook que retorna todas as operações de um projeto
 * Útil para páginas de detalhes do projeto
 */
export const useProjetoOperations = (id: string) => {
  const projeto = useObterProjeto(id)
  const atualizarProjeto = useAtualizarProjeto()
  const atualizarStatus = useAtualizarStatusProjeto()
  const adicionarDocumento = useAdicionarDocumento()

  return {
    // Query
    projeto: projeto.data,
    isLoading: projeto.isLoading,
    isError: projeto.isError,
    error: projeto.error,
    refetch: projeto.refetch,

    // Mutations
    atualizarProjeto: (data: AtualizarProjetoDto) =>
      atualizarProjeto.mutateAsync({ id, data }),
    atualizarStatus: (data: AtualizarStatusDto) =>
      atualizarStatus.mutateAsync({ id, data }),
    adicionarDocumento: (data: AdicionarDocumentoDto) =>
      adicionarDocumento.mutateAsync({ id, data }),

    // Mutation states
    isUpdating: atualizarProjeto.isPending || atualizarStatus.isPending,
    isAddingDocument: adicionarDocumento.isPending,
  }
}
