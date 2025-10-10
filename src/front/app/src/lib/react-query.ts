import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Retry failed queries
      retry: 1,
      
      // Refetch on window focus
      refetchOnWindowFocus: false,
      
      // Stale time - data considered fresh for 5 minutes
      staleTime: 5 * 60 * 1000,
      
      // Cache time - data kept in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      
      // Refetch interval
      refetchInterval: false,
    },
    mutations: {
      // Retry failed mutations
      retry: 1,
      
      // Error handling
      onError: (error) => {
        console.error('Mutation error:', error)
      },
    },
  },
})

// Query keys factory
export const queryKeys = {
  // Auth module
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    permissions: () => [...queryKeys.auth.all, 'permissions'] as const,
  },
  
  // Prospeccao module
  prospeccao: {
    all: ['prospeccao'] as const,
    propostas: () => [...queryKeys.prospeccao.all, 'propostas'] as const,
    proposta: (id: string) => [...queryKeys.prospeccao.all, 'proposta', id] as const,
    list: (filters?: Record<string, unknown>) => 
      [...queryKeys.prospeccao.propostas(), filters] as const,
  },
  
  // Projetos module
  projetos: {
    all: ['projetos'] as const,
    list: (filters?: Record<string, unknown>) => 
      [...queryKeys.projetos.all, 'list', filters] as const,
    detail: (id: string) => [...queryKeys.projetos.all, 'detail', id] as const,
    solicitacoes: (projetoId: string) => 
      [...queryKeys.projetos.all, 'solicitacoes', projetoId] as const,
  },
  
  // Add more modules as needed
}
