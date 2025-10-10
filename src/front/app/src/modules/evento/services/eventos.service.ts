/**
 * Services para a API de Eventos e Matrículas
 * Baseado nos endpoints da OpenAPI
 */

import { eventosApi } from '@/lib/axios';
import {
  CadastrarEventoDto,
  RealizarMatriculaDto,
  EventoResponse,
  MatriculaResponse,
} from '../types/evento.types';

export const eventosService = {
  /**
   * POST /eventos
   * Cadastra um novo evento
   */
  async cadastrarEvento(data: CadastrarEventoDto): Promise<EventoResponse> {
    const response = await eventosApi.post('/eventos', data);
    return response.data;
  },

  /**
   * GET /eventos
   * Lista todos os eventos
   */
  async listarEventos(): Promise<EventoResponse[]> {
    const response = await eventosApi.get('/eventos');
    return response.data;
  },

  /**
   * GET /eventos/{id}
   * Obtém os dados de um evento específico
   * Nota: Endpoint não está na OpenAPI, mas geralmente existe
   */
  async obterEvento(id: string): Promise<EventoResponse> {
    const response = await eventosApi.get(`/eventos/${id}`);
    return response.data;
  },
};

export const matriculasService = {
  /**
   * POST /matriculas
   * Realiza uma matrícula em um evento
   */
  async realizarMatricula(data: RealizarMatriculaDto): Promise<MatriculaResponse> {
    const response = await eventosApi.post('/matriculas', data);
    return response.data;
  },

  /**
   * GET /matriculas/{codigoAluno}
   * Lista todas as matrículas de um aluno
   */
  async listarMatriculasPorAluno(codigoAluno: string): Promise<MatriculaResponse[]> {
    const response = await eventosApi.get(`/matriculas/${codigoAluno}`);
    return response.data;
  },
};
