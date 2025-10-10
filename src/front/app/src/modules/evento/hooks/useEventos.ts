/**
 * Hooks do React Query para a API de Eventos
 */

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { eventosService } from '../services/eventos.service';
import { CadastrarEventoDto, EventoResponse } from '../types/evento.types';

// ============================================
// Query Keys
// ============================================

export const eventosKeys = {
  all: ['eventos'] as const,
  detail: (id: string) => [...eventosKeys.all, id] as const,
};

// ============================================
// Queries
// ============================================

/**
 * Hook para listar todos os eventos
 */
export const useListarEventos = (
  options?: Omit<UseQueryOptions<EventoResponse[], AxiosError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<EventoResponse[], AxiosError>({
    queryKey: eventosKeys.all,
    queryFn: () => eventosService.listarEventos(),
    ...options,
  });
};

/**
 * Hook para obter dados de um evento específico
 */
export const useObterEvento = (
  id: string,
  options?: Omit<UseQueryOptions<EventoResponse, AxiosError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<EventoResponse, AxiosError>({
    queryKey: eventosKeys.detail(id),
    queryFn: () => eventosService.obterEvento(id),
    enabled: !!id,
    ...options,
  });
};

// ============================================
// Mutations
// ============================================

/**
 * Hook para cadastrar um novo evento
 */
export const useCadastrarEvento = () => {
  const queryClient = useQueryClient();

  return useMutation<EventoResponse, AxiosError, CadastrarEventoDto>({
    mutationFn: (data: CadastrarEventoDto) => eventosService.cadastrarEvento(data),
    onSuccess: (data) => {
      // Invalida a lista de eventos
      queryClient.invalidateQueries({ queryKey: eventosKeys.all });
      
      // Adiciona o evento ao cache
      queryClient.setQueryData(eventosKeys.detail(data.id), data);
    },
  });
};
