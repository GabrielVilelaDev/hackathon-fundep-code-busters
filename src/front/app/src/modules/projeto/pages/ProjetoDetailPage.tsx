import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  RefreshCw,
  Upload,
  Calendar,
  DollarSign,
  User,
  FileText,
  Info,
  FolderTree,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  LoadingSpinner,
} from "@design-system";
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
        <Card className="border-destructive bg-destructive/10">
          <CardContent className="pt-6">
            <p className="text-center text-destructive">
              {error || "Projeto não encontrado"}
            </p>
            <div className="flex justify-center mt-4">
              <Button onClick={() => navigate("/projetos")}>
                Voltar para Lista
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <Button
            variant="ghost"
            onClick={() => navigate("/projetos")}
            className="mb-2 -ml-3"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{projeto.titulo}</h1>
          <p className="text-muted-foreground">{projeto.codigoProjeto}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold">
            {EtapaProjetoLabels[projeto.etapa]}
          </span>
          <Button
            variant="outline"
            onClick={() => setShowStatusModal(true)}
          >
            <RefreshCw className="h-4 w-4" />
            Atualizar Status
          </Button>
          <Button
            onClick={() => navigate(`/projetos/${id}/editar`)}
          >
            <Edit className="h-4 w-4" />
            Editar
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b flex">
        <nav className="-mb-px flex gap-6">
          <button
            onClick={() => setActiveTab("geral")}
            className={`border-b-2 py-2 px-1 text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === "geral"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Info className="h-4 w-4" />
            <span className="sm:inline hidden md:inline">Informações Gerais</span>
            <span className="md:hidden">Geral</span>
          </button>
          <button
            onClick={() => setActiveTab("subprojetos")}
            className={`border-b-2 py-2 px-1 text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === "subprojetos"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <FolderTree className="h-4 w-4" />
            <span className="hidden md:inline">Subprojetos ({projeto.subprojetos.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("documentos")}
            className={`border-b-2 py-2 px-1 text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === "documentos"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Documentos ({projeto.documentos?.length || 0})</span>
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === "geral" && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Resumo */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Resumo</h2>
              </div>
              <p className="text-sm text-muted-foreground">{projeto.resumo}</p>
              <div className="pt-2">
                <h3 className="text-sm font-medium mb-1">Objeto</h3>
                <p className="text-sm text-muted-foreground">{projeto.objeto}</p>
              </div>
            </CardContent>
          </Card>

          {/* Financeiro */}
          <Card>
            <CardContent className="pt-6 space-y-4">
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
                      currency: "BRL",
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
            </CardContent>
          </Card>

          {/* Responsáveis */}
          <Card>
            <CardContent className="pt-6 space-y-4">
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
            </CardContent>
          </Card>

          {/* Prazos */}
          <Card>
            <CardContent className="pt-6 space-y-4">
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
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "subprojetos" && (
        <div className="space-y-4">
          {projeto.subprojetos.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground py-12">
                  Nenhum subprojeto cadastrado
                </p>
              </CardContent>
            </Card>
          ) : (
            projeto.subprojetos.map((sub, index) => (
              <Card key={index}>
                <CardContent className="pt-6 space-y-4">
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
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {activeTab === "documentos" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={() => setShowDocumentUpload(!showDocumentUpload)}
            >
              <Upload className="h-4 w-4" />
              {showDocumentUpload ? "Cancelar" : "Adicionar Documento"}
            </Button>
          </div>

          {showDocumentUpload && (
            <Card>
              <CardContent className="pt-6">
                <DocumentUpload onFileSelect={handleDocumentUpload} />
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            {!projeto.documentos || projeto.documentos.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground py-12">
                    Nenhum documento anexado
                  </p>
                </CardContent>
              </Card>
            ) : (
              projeto.documentos.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
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
                  </CardContent>
                </Card>
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
        currentEtapa={projeto.etapa}
        onSuccess={refetch}
      />
    </div>
  );
}
export default ProjetoDetailPage;
