/**
 * Types e Schemas para o módulo de Eventos
 * Baseado na OpenAPI spec fornecida
 */

// ============================================
// Enums
// ============================================

export enum TipoPagamento {
  Cartao = 1,
}

export const TipoPagamentoLabels: Record<TipoPagamento, string> = {
  [TipoPagamento.Cartao]: "Cartão",
};

// ============================================
// DTOs - Request
// ============================================

export interface CadastrarEventoDto {
  titulo: string;
  descricao: string;
  local: string;
  ministrantes: string;
  dataInicioMatricula: string; // ISO date string
  dataFimMatricula: string; // ISO date string
  dataInicioEvento: string; // ISO date string
  dataFimEvento: string; // ISO date string
  numeroMaximoInscritos: number;
  valor: number;
}

export interface RealizarMatriculaDto {
  codigoAluno: string;
  eventoId: string;
  tipoPagamento: TipoPagamento;
}

// ============================================
// DTOs - Response
// ============================================

export interface EventoResponse {
  id: string;
  titulo: string;
  descricao: string;
  local: string;
  ministrantes: string;
  dataInicioMatricula: string;
  dataFimMatricula: string;
  dataInicioEvento: string;
  dataFimEvento: string;
  numeroMaximoInscritos: number;
  numeroAtualInscritos?: number;
  valor: number;
  criadoEm?: string;
  atualizadoEm?: string;
}

export interface MatriculaResponse {
  id: string;
  codigoAluno: string;
  eventoId: string;
  tipoPagamento: TipoPagamento;
  evento?: EventoResponse;
  status?: string;
  dataMatricula?: string;
  criadoEm?: string;
}

// ============================================
// Helpers
// ============================================

/**
 * Verifica se as inscrições estão abertas
 */
export function isInscricaoAberta(evento: EventoResponse): boolean {
  const now = new Date();
  const inicio = new Date(evento.dataInicioMatricula);
  const fim = new Date(evento.dataFimMatricula);
  return now >= inicio && now <= fim;
}

/**
 * Verifica se o evento está lotado
 */
export function isEventoLotado(evento: EventoResponse): boolean {
  if (!evento.numeroAtualInscritos) return false;
  return evento.numeroAtualInscritos >= evento.numeroMaximoInscritos;
}

/**
 * Verifica se é possível fazer matrícula
 */
export function podeRealizarMatricula(evento: EventoResponse): boolean {
  return isInscricaoAberta(evento) && !isEventoLotado(evento);
}

/**
 * Formata data para exibição
 */
export function formatarData(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Formata data e hora para exibição
 */
export function formatarDataHora(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Formata valor monetário
 */
export function formatarValor(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}
