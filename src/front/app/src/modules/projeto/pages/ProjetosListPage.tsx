import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, Edit, RefreshCw, Search, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { 
  LoadingSpinner, 
  Button, 
  Card, 
  CardContent
} from "@design-system";
import { EtapaProjetoLabels, type ProjetoResponse } from "../types/projeto.types";
import { StatusUpdateModal } from "../components/StatusUpdateModal";
import { projetoApi } from "../services/projetoApi";

export function ProjetosListPage() {
  const navigate = useNavigate();
  const [projetos, setProjetos] = useState<ProjetoResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProjeto, setSelectedProjeto] = useState<ProjetoResponse | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const loadProjetos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await projetoApi.listarProjetos();
      setProjetos(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao carregar projetos";
      setError(errorMessage);
      setProjetos([]);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
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
        <Button onClick={() => navigate("/projetos/novo")}>
          <Plus className="h-4 w-4" />
          Novo Projeto
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por título, código ou coordenador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Projetos em Cards */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : filteredProjetos.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-6">
              <p className="text-muted-foreground">
                {searchTerm
                  ? "Nenhum projeto encontrado com os filtros aplicados."
                  : "Nenhum projeto cadastrado. Clique em 'Novo Projeto' para começar."}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjetos.map((projeto) => (
            <Card key={projeto.id} className="hover:shadow-md transition-shadow w-full">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header do Card */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg truncate">{projeto.titulo}</h3>
                        <p className="text-xs text-muted-foreground font-mono truncate">{projeto.codigoProjeto}</p>
                      </div>
                      <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold whitespace-nowrap shrink-0">
                        {EtapaProjetoLabels[projeto.etapa]}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{projeto.resumo}</p>
                  </div>

                  {/* Informações */}
                  <div className="space-y-2 text-sm min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-muted-foreground shrink-0">Coordenador:</span>
                      <span className="font-medium truncate">{projeto.coordenador}</span>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 min-w-0"
                      onClick={() => navigate(`/projetos/${projeto.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-1 sm:mr-2 shrink-0" />
                      <span className="truncate">Visualizar</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0"
                      onClick={() => navigate(`/projetos/${projeto.id}/editar`)}
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0"
                      onClick={() => handleStatusUpdate(projeto)}
                      title="Atualizar Status"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
          currentEtapa={selectedProjeto.etapa}
          onSuccess={handleStatusSuccess}
        />
      )}
    </div>
  );
}

export default ProjetosListPage;
