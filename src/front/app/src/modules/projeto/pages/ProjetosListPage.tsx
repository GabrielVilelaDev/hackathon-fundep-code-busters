import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, Edit, RefreshCw, Search } from "lucide-react";
import { LoadingSpinner } from "@design-system";
import { EtapaProjetoLabels, type ProjetoResponse } from "../types/projeto.types";
import { StatusUpdateModal } from "../components/StatusUpdateModal";
import { projetoApi } from "../services/projetoApi";

export function ProjetosListPage() {
  const navigate = useNavigate();
  const [projetos, setProjetos] = useState<ProjetoResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProjeto, setSelectedProjeto] = useState<ProjetoResponse | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // Mock: Na prática, você precisaria de um endpoint para listar todos os projetos
  const loadProjetos = async () => {
    setLoading(true);
    // Simulando carregamento
    setTimeout(() => {
      setProjetos([]);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadProjetos();
  }, []);

  const filteredProjetos = projetos.filter(
    (p) =>
      p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.codigoProjeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.coordenador.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusUpdate = (projeto: ProjetoResponse) => {
    setSelectedProjeto(projeto);
    setShowStatusModal(true);
  };

  const handleStatusSuccess = () => {
    loadProjetos();
  };

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projetos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os projetos cadastrados
          </p>
        </div>
        <button
          onClick={() => navigate("/projetos/novo")}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2"
        >
          <Plus className="h-4 w-4" />
          Novo Projeto
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por título, código ou coordenador..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      {/* Tabela */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : filteredProjetos.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">
            {searchTerm
              ? "Nenhum projeto encontrado com os filtros aplicados."
              : "Nenhum projeto cadastrado. Clique em 'Novo Projeto' para começar."}
          </p>
        </div>
      ) : (
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Código
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Título
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Coordenador
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Etapa
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Valor
                  </th>
                  <th className="h-12 px-4 text-right align-middle font-medium">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProjetos.map((projeto) => (
                  <tr key={projeto.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle font-mono text-xs">
                      {projeto.codigoProjeto}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="max-w-[300px]">
                        <p className="font-medium truncate">{projeto.titulo}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {projeto.resumo}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 align-middle">{projeto.coordenador}</td>
                    <td className="p-4 align-middle">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        {EtapaProjetoLabels[projeto.etapaAtual]}
                      </span>
                    </td>
                    <td className="p-4 align-middle">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: projeto.moeda || "BRL",
                      }).format(projeto.valor)}
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/projetos/${projeto.id}`)}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                          title="Visualizar"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/projetos/${projeto.id}/editar`)}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(projeto)}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                          title="Atualizar Status"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {selectedProjeto && (
        <StatusUpdateModal
          isOpen={showStatusModal}
          onClose={() => {
            setShowStatusModal(false);
            setSelectedProjeto(null);
          }}
          projetoId={selectedProjeto.id}
          currentEtapa={selectedProjeto.etapaAtual}
          onSuccess={handleStatusSuccess}
        />
      )}
    </div>
  );
}

export default ProjetosListPage;
