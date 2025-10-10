import { useState, useEffect } from "react";
import { toast } from "sonner";
import { projetoApi } from "../services/projetoApi";
import type { ProjetoResponse } from "../types/projeto.types";

export function useProjeto(id: string | undefined) {
  const [projeto, setProjeto] = useState<ProjetoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjeto = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await projetoApi.obterProjeto(id);
      setProjeto(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao carregar projeto";
      setError(errorMessage);
      setProjeto(null);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjeto();
  }, [id]);

  return {
    projeto,
    loading,
    error,
    refetch: fetchProjeto,
  };
}
