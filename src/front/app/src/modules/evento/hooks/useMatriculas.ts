/**
 * Hooks do React Query para a API de Matrículas
 */

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { matriculasService } from '../services/eventos.service';
import { MatriculaResponse, RealizarMatriculaDto } from '../types/evento.types';
import { eventosKeys } from './useEventos';

// ============================================
// Query Keys
// ============================================

export const matriculasKeys = {
  all: ['matriculas'] as const,
  byAluno: (codigoAluno: string) => [...matriculasKeys.all, 'aluno', codigoAluno] as const,
};

// ============================================
// Queries
// ============================================

/**
 * Hook para listar matrículas de um aluno
 */
export const useListarMatriculasPorAluno = (
  codigoAluno: string,
  options?: Omit<UseQueryOptions<MatriculaResponse[], AxiosError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<MatriculaResponse[], AxiosError>({
    queryKey: matriculasKeys.byAluno(codigoAluno),
    queryFn: () => matriculasService.listarMatriculasPorAluno(codigoAluno),
    enabled: !!codigoAluno,
    ...options,
  });
};

// ============================================
// Mutations
// ============================================

/**
 * Hook para realizar uma matrícula
 */
export const useRealizarMatricula = () => {
  const queryClient = useQueryClient();

  return useMutation<MatriculaResponse, AxiosError, RealizarMatriculaDto>({
    mutationFn: (data: RealizarMatriculaDto) => matriculasService.realizarMatricula(data),
    onSuccess: (_data, variables) => {
      // Invalida a lista de matrículas do aluno
      queryClient.invalidateQueries({ 
        queryKey: matriculasKeys.byAluno(variables.codigoAluno) 
      });
      
      // Invalida o evento específico para atualizar o número de inscritos
      queryClient.invalidateQueries({ 
        queryKey: eventosKeys.detail(variables.eventoId) 
      });
      
      // Invalida a lista de eventos
      queryClient.invalidateQueries({ 
        queryKey: eventosKeys.all 
      });
    },
  });
};
