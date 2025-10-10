import { useState, useEffect } from "react";
import { projetoApi } from "../services/projetoApi";
import type { RubricaResponse } from "../types/projeto.types";

export function useRubricas() {
  const [rubricas, setRubricas] = useState<RubricaResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRubricas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projetoApi.listarRubricas();
      setRubricas(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar rubricas");
      setRubricas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRubricas();
  }, []);

  return {
    rubricas,
    loading,
    error,
    refetch: fetchRubricas,
  };
}
