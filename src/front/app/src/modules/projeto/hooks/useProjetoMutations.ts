import { useState } from "react";
import { projetoApi } from "../services/projetoApi";
import type {
  ImportarProjetoDto,
  AtualizarProjetoDto,
  AtualizarStatusDto,
  AdicionarDocumentoDto,
} from "../types/projeto.types";

export function useProjetoMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const importarProjeto = async (dto: ImportarProjetoDto) => {
    try {
      setLoading(true);
      setError(null);
      const result = await projetoApi.importarProjeto(dto);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao importar projeto";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const atualizarProjeto = async (id: string, dto: AtualizarProjetoDto) => {
    try {
      setLoading(true);
      setError(null);
      const result = await projetoApi.atualizarProjeto(id, dto);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao atualizar projeto";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const atualizarStatus = async (id: string, dto: AtualizarStatusDto) => {
    try {
      setLoading(true);
      setError(null);
      await projetoApi.atualizarStatus(id, dto);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao atualizar status";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const adicionarDocumento = async (id: string, dto: AdicionarDocumentoDto) => {
    try {
      setLoading(true);
      setError(null);
      const result = await projetoApi.adicionarDocumento(id, dto);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao adicionar documento";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    importarProjeto,
    atualizarProjeto,
    atualizarStatus,
    adicionarDocumento,
    loading,
    error,
  };
}
