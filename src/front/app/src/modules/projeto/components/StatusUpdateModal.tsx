import React, { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { EtapaProjeto, EtapaProjetoLabels } from "../types/projeto.types";
import { useProjetoMutations } from "../hooks/useProjetoMutations";

interface StatusUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  projetoId: string;
  currentEtapa: EtapaProjeto;
  onSuccess: () => void;
}

export function StatusUpdateModal({
  isOpen,
  onClose,
  projetoId,
  currentEtapa,
  onSuccess,
}: StatusUpdateModalProps) {
  const [selectedEtapa, setSelectedEtapa] = useState<EtapaProjeto>(currentEtapa);
  const { atualizarStatus, loading, error } = useProjetoMutations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await atualizarStatus(projetoId, { novaEtapa: selectedEtapa });
      onSuccess();
      onClose();
    } catch (err) {
      // Error is handled by the hook
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Atualizar Status do Projeto</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="text-sm font-medium leading-none mb-2 block">
              Etapa Atual
            </label>
            <p className="text-sm text-muted-foreground">
              {EtapaProjetoLabels[currentEtapa]}
            </p>
          </div>

          <div>
            <label htmlFor="nova-etapa" className="text-sm font-medium leading-none mb-2 block">
              Nova Etapa *
            </label>
            <select
              id="nova-etapa"
              value={selectedEtapa}
              onChange={(e) => setSelectedEtapa(Number(e.target.value) as EtapaProjeto)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value={EtapaProjeto.Iniciacao}>
                {EtapaProjetoLabels[EtapaProjeto.Iniciacao]}
              </option>
              <option value={EtapaProjeto.Execucao}>
                {EtapaProjetoLabels[EtapaProjeto.Execucao]}
              </option>
              <option value={EtapaProjeto.PrestacaoDeContas}>
                {EtapaProjetoLabels[EtapaProjeto.PrestacaoDeContas]}
              </option>
            </select>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-md border border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-300">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || selectedEtapa === currentEtapa}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
            >
              {loading ? "Atualizando..." : "Atualizar Status"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
