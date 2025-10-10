import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { LoadingSpinner } from "@design-system";
import { useProjeto } from "../hooks/useProjeto";
import { useProjetoMutations } from "../hooks/useProjetoMutations";
import type { AtualizarProjetoDto } from "../types/projeto.types";

export function EditarProjetoPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projeto, loading: loadingProjeto, error } = useProjeto(id);
  const { atualizarProjeto, loading: saving } = useProjetoMutations();
  
  const [formData, setFormData] = useState<AtualizarProjetoDto>({
    titulo: "",
    resumo: "",
    objeto: "",
    coordenador: "",
    valor: 0,
    custoAdministrativo: "",
    cronogramaLiberacao: "",
    bloqueiosMovimentacoes: "",
    inicioPrevisto: "",
    terminoPrevisto: "",
  });

  useEffect(() => {
    if (projeto) {
      setFormData({
        titulo: projeto.titulo,
        resumo: projeto.resumo,
        objeto: projeto.objeto,
        coordenador: projeto.coordenador,
        coExecutor: projeto.coExecutor,
        coFinanciador: projeto.coFinanciador,
        valor: projeto.valor,
        custoAdministrativo: projeto.custoAdministrativo,
        cronogramaLiberacao: projeto.cronogramaLiberacao,
        bloqueiosMovimentacoes: projeto.bloqueiosMovimentacoes,
        dataLimiteDespesas: projeto.dataLimiteDespesas,
        inicioPrevisto: projeto.inicioPrevisto,
        terminoPrevisto: projeto.terminoPrevisto,
        aguardandoProrrogacaoPara: projeto.aguardandoProrrogacaoPara,
      });
    }
  }, [projeto]);

  const updateFormData = (field: keyof AtualizarProjetoDto, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await atualizarProjeto(id, formData);
      navigate(`/projetos/${id}`);
    } catch (err) {
      console.error("Erro ao atualizar projeto:", err);
    }
  };

  if (loadingProjeto) {
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
    <div className="container mx-auto py-6 px-4 space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(`/projetos/${id}`)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>
        <h1 className="text-3xl font-bold tracking-tight">Editar Projeto</h1>
        <p className="text-muted-foreground">{projeto.codigoProjeto}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-lg border p-6 space-y-6">
          <h2 className="text-xl font-semibold">Informações Básicas</h2>

          <div>
            <label className="text-sm font-medium mb-2 block">Título *</label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => updateFormData("titulo", e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Resumo *</label>
            <textarea
              value={formData.resumo}
              onChange={(e) => updateFormData("resumo", e.target.value)}
              rows={3}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Objeto *</label>
            <textarea
              value={formData.objeto}
              onChange={(e) => updateFormData("objeto", e.target.value)}
              rows={3}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              required
            />
          </div>
        </div>

        <div className="rounded-lg border p-6 space-y-6">
          <h2 className="text-xl font-semibold">Responsáveis</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Coordenador *
              </label>
              <input
                type="text"
                value={formData.coordenador}
                onChange={(e) => updateFormData("coordenador", e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Co-Executor
              </label>
              <input
                type="text"
                value={formData.coExecutor || ""}
                onChange={(e) => updateFormData("coExecutor", e.target.value || undefined)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Co-Financiador
              </label>
              <input
                type="text"
                value={formData.coFinanciador || ""}
                onChange={(e) =>
                  updateFormData("coFinanciador", e.target.value || undefined)
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-6 space-y-6">
          <h2 className="text-xl font-semibold">Financeiro</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Valor Total (R$) *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.valor}
                onChange={(e) => updateFormData("valor", parseFloat(e.target.value))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Custo Administrativo *
            </label>
            <textarea
              value={formData.custoAdministrativo}
              onChange={(e) =>
                updateFormData("custoAdministrativo", e.target.value)
              }
              rows={2}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Cronograma de Liberação *
            </label>
            <textarea
              value={formData.cronogramaLiberacao}
              onChange={(e) =>
                updateFormData("cronogramaLiberacao", e.target.value)
              }
              rows={2}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Bloqueios e Movimentações *
            </label>
            <textarea
              value={formData.bloqueiosMovimentacoes}
              onChange={(e) =>
                updateFormData("bloqueiosMovimentacoes", e.target.value)
              }
              rows={2}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              required
            />
          </div>
        </div>

        <div className="rounded-lg border p-6 space-y-6">
          <h2 className="text-xl font-semibold">Prazos</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Início Previsto *
              </label>
              <input
                type="date"
                value={formData.inicioPrevisto}
                onChange={(e) => updateFormData("inicioPrevisto", e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Término Previsto *
              </label>
              <input
                type="date"
                value={formData.terminoPrevisto}
                onChange={(e) => updateFormData("terminoPrevisto", e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Data Limite de Despesas
              </label>
              <input
                type="date"
                value={formData.dataLimiteDespesas || ""}
                onChange={(e) =>
                  updateFormData("dataLimiteDespesas", e.target.value || undefined)
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Aguardando Prorrogação Para
              </label>
              <input
                type="date"
                value={formData.aguardandoProrrogacaoPara || ""}
                onChange={(e) =>
                  updateFormData("aguardandoProrrogacaoPara", e.target.value || undefined)
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(`/projetos/${id}`)}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Salvar Alterações
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
export default EditarProjetoPage;
