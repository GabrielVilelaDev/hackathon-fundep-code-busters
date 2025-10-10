import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  RefreshCw,
  Upload,
  Calendar,
  DollarSign,
  Building,
  User,
  FileText,
} from "lucide-react";
import { LoadingSpinner } from "@design-system";
import { useProjeto } from "../hooks/useProjeto";
import { EtapaProjetoLabels, TipoOrcamentoLabels } from "../types/projeto.types";
import { StatusUpdateModal } from "../components/StatusUpdateModal";
import { DocumentUpload } from "../components/DocumentUpload";
import { useProjetoMutations } from "../hooks/useProjetoMutations";

export function ProjetoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projeto, loading, error, refetch } = useProjeto(id);
  const { adicionarDocumento } = useProjetoMutations();
  
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"geral" | "subprojetos" | "documentos">("geral");
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);

  const handleDocumentUpload = async (fileName: string, base64Content: string) => {
    if (!id) return;
    
    try {
      await adicionarDocumento(id, {
        nomeDocumento: fileName,
        conteudoBase64: base64Content,
      });
      refetch();
      setShowDocumentUpload(false);
    } catch (err) {
      console.error("Erro ao fazer upload:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !projeto) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="rounded-lg border border-red-500 bg-red-50 p-6 text-center dark:border-red-700 dark:bg-red-900/20">
          <p className="text-red-700 dark:text-red-300">
            {error || "Projeto não encontrado"}
          </p>
          <button
            onClick={() => navigate("/projetos")}
            className="mt-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            Voltar para Lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <button
            onClick={() => navigate("/projetos")}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
          <h1 className="text-3xl font-bold tracking-tight">{projeto.titulo}</h1>
          <p className="text-muted-foreground">{projeto.codigoProjeto}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold">
            {EtapaProjetoLabels[projeto.etapaAtual]}
          </span>
          <button
            onClick={() => setShowStatusModal(true)}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3"
          >
            <RefreshCw className="h-4 w-4" />
            Atualizar Status
          </button>
          <button
            onClick={() => navigate(`/projetos/${id}/editar`)}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-3"
          >
            <Edit className="h-4 w-4" />
            Editar
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="-mb-px flex gap-6">
          <button
            onClick={() => setActiveTab("geral")}
            className={`border-b-2 py-2 px-1 text-sm font-medium transition-colors ${
              activeTab === "geral"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Informações Gerais
          </button>
          <button
            onClick={() => setActiveTab("subprojetos")}
            className={`border-b-2 py-2 px-1 text-sm font-medium transition-colors ${
              activeTab === "subprojetos"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Subprojetos ({projeto.subprojetos.length})
          </button>
          <button
            onClick={() => setActiveTab("documentos")}
            className={`border-b-2 py-2 px-1 text-sm font-medium transition-colors ${
              activeTab === "documentos"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Documentos ({projeto.documentos?.length || 0})
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === "geral" && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Resumo */}
          <div className="rounded-lg border p-6 space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Resumo</h2>
            </div>
            <p className="text-sm text-muted-foreground">{projeto.resumo}</p>
            <div className="pt-2">
              <h3 className="text-sm font-medium mb-1">Objeto</h3>
              <p className="text-sm text-muted-foreground">{projeto.objeto}</p>
            </div>
          </div>

          {/* Financeiro */}
          <div className="rounded-lg border p-6 space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Informações Financeiras</h2>
            </div>
            <div className="grid gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: projeto.moeda || "BRL",
                  }).format(projeto.valor)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs text-muted-foreground">AMF</p>
                  <p className="text-sm font-medium">{projeto.amf}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tipo Orçamento</p>
                  <p className="text-sm font-medium">
                    {TipoOrcamentoLabels[projeto.tipoOrcamento]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Responsáveis */}
          <div className="rounded-lg border p-6 space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Responsáveis</h2>
            </div>
            <div className="grid gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Coordenador</p>
                <p className="text-sm font-medium">{projeto.coordenador}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Executor</p>
                <p className="text-sm font-medium">{projeto.executor}</p>
              </div>
              {projeto.coExecutor && (
                <div>
                  <p className="text-xs text-muted-foreground">Co-Executor</p>
                  <p className="text-sm font-medium">{projeto.coExecutor}</p>
                </div>
              )}
            </div>
          </div>

          {/* Prazos */}
          <div className="rounded-lg border p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Prazos</h2>
            </div>
            <div className="grid gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Início Previsto</p>
                <p className="text-sm font-medium">
                  {new Date(projeto.inicioPrevisto).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Término Previsto</p>
                <p className="text-sm font-medium">
                  {new Date(projeto.terminoPrevisto).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Data Implantação</p>
                <p className="text-sm font-medium">
                  {new Date(projeto.dataImplantacao).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "subprojetos" && (
        <div className="space-y-4">
          {projeto.subprojetos.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              Nenhum subprojeto cadastrado
            </p>
          ) : (
            projeto.subprojetos.map((sub, index) => (
              <div key={index} className="rounded-lg border p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{sub.nome}</h3>
                  <p className="text-sm text-muted-foreground">
                    {sub.codigoSubprojeto}
                  </p>
                </div>
                <p className="text-sm">{sub.objeto}</p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Início: </span>
                    {new Date(sub.inicioPrevisto).toLocaleDateString("pt-BR")}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Término: </span>
                    {new Date(sub.terminoPrevisto).toLocaleDateString("pt-BR")}
                  </div>
                </div>
                {sub.rubricas.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Rubricas ({sub.rubricas.length})
                    </p>
                    <div className="grid gap-2">
                      {sub.rubricas.map((rub, ridx) => (
                        <div
                          key={ridx}
                          className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                        >
                          <span>{rub.descricao}</span>
                          <span className="text-muted-foreground">{rub.codigo}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "documentos" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowDocumentUpload(!showDocumentUpload)}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-3"
            >
              <Upload className="h-4 w-4" />
              {showDocumentUpload ? "Cancelar" : "Adicionar Documento"}
            </button>
          </div>

          {showDocumentUpload && (
            <div className="rounded-lg border p-6">
              <DocumentUpload onFileSelect={handleDocumentUpload} />
            </div>
          )}

          <div className="space-y-2">
            {!projeto.documentos || projeto.documentos.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">
                Nenhum documento anexado
              </p>
            ) : (
              projeto.documentos.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{doc.nomeDocumento}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(doc.dataUpload).toLocaleDateString("pt-BR")} •{" "}
                        {(doc.tamanho / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      <StatusUpdateModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        projetoId={projeto.id}
        currentEtapa={projeto.etapaAtual}
        onSuccess={refetch}
      />
    </div>
  );
}
export default ProjetoDetailPage;
