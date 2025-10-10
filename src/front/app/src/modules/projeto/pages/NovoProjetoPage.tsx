import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Save, Loader2 } from "lucide-react";
import {
  TipoOrcamento,
  TipoAplicacaoPermitida,
  type ImportarProjetoDto,
  type SubprojetoDto,
} from "../types/projeto.types";
import { useProjetoMutations } from "../hooks/useProjetoMutations";

export function NovoProjetoPage() {
  const navigate = useNavigate();
  const { importarProjeto, loading } = useProjetoMutations();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ImportarProjetoDto>>({
    tipoOrcamento: TipoOrcamento.Oficial,
    tipoAplicacaoPermitida: TipoAplicacaoPermitida.AplicacaoLivre,
    coordenadorAcessaInternet: true,
    implantacaoProvisoria: false,
    razaoMultiplo: false,
    absorcaoTarifaFundep: false,
    mostrarOrcamentoMesmoSemLiberacao045: false,
    subprojetos: [],
  });

  const totalSteps = 4;

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const result = await importarProjeto(formData as ImportarProjetoDto);
      navigate(`/projetos/${result.id}`);
    } catch (err) {
      console.error("Erro ao criar projeto:", err);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Informações Básicas</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Código do Projeto *
                </label>
                <input
                  type="text"
                  value={formData.codigoProjeto || ""}
                  onChange={(e) => updateFormData("codigoProjeto", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Centro de Custo *
                </label>
                <input
                  type="text"
                  value={formData.centroCusto || ""}
                  onChange={(e) => updateFormData("centroCusto", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Referência FUNDEP *
                </label>
                <input
                  type="text"
                  value={formData.referenciaFundep || ""}
                  onChange={(e) => updateFormData("referenciaFundep", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Título do Projeto *
              </label>
              <input
                type="text"
                value={formData.titulo || ""}
                onChange={(e) => updateFormData("titulo", e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Resumo *
              </label>
              <textarea
                value={formData.resumo || ""}
                onChange={(e) => updateFormData("resumo", e.target.value)}
                rows={3}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Objeto *
              </label>
              <textarea
                value={formData.objeto || ""}
                onChange={(e) => updateFormData("objeto", e.target.value)}
                rows={3}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Responsáveis e Instituições</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Coordenador *
                </label>
                <input
                  type="text"
                  value={formData.coordenador || ""}
                  onChange={(e) => updateFormData("coordenador", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Executor *
                </label>
                <input
                  type="text"
                  value={formData.executor || ""}
                  onChange={(e) => updateFormData("executor", e.target.value)}
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
                  onChange={(e) => updateFormData("coExecutor", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Referência Executor *
                </label>
                <input
                  type="text"
                  value={formData.referenciaExecutor || ""}
                  onChange={(e) => updateFormData("referenciaExecutor", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Financiador *
                </label>
                <input
                  type="text"
                  value={formData.financiador || ""}
                  onChange={(e) => updateFormData("financiador", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Co-Financiador
                </label>
                <input
                  type="text"
                  value={formData.coFinanciador || ""}
                  onChange={(e) => updateFormData("coFinanciador", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Origem do Recurso *
                </label>
                <input
                  type="text"
                  value={formData.origemRecurso || ""}
                  onChange={(e) => updateFormData("origemRecurso", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Referência Financiador *
                </label>
                <input
                  type="text"
                  value={formData.referenciaFinanciador || ""}
                  onChange={(e) => updateFormData("referenciaFinanciador", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Informações Financeiras</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Valor Total (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.valor || ""}
                  onChange={(e) => updateFormData("valor", parseFloat(e.target.value))}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Moeda *
                </label>
                <input
                  type="text"
                  value={formData.moeda || "BRL"}
                  onChange={(e) => updateFormData("moeda", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  AMF (%) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amf || ""}
                  onChange={(e) => updateFormData("amf", parseFloat(e.target.value))}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Tipo de Orçamento *
                </label>
                <select
                  value={formData.tipoOrcamento}
                  onChange={(e) =>
                    updateFormData("tipoOrcamento", parseInt(e.target.value))
                  }
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                >
                  <option value={TipoOrcamento.Oficial}>Oficial</option>
                  <option value={TipoOrcamento.Provisorio}>Provisório</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Conta *
                </label>
                <input
                  type="text"
                  value={formData.conta || ""}
                  onChange={(e) => updateFormData("conta", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Banco *
                </label>
                <input
                  type="text"
                  value={formData.banco || ""}
                  onChange={(e) => updateFormData("banco", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Agência *
                </label>
                <input
                  type="text"
                  value={formData.agencia || ""}
                  onChange={(e) => updateFormData("agencia", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Conta Bancária *
                </label>
                <input
                  type="text"
                  value={formData.contaBancaria || ""}
                  onChange={(e) => updateFormData("contaBancaria", e.target.value)}
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
                value={formData.custoAdministrativo || ""}
                onChange={(e) => updateFormData("custoAdministrativo", e.target.value)}
                rows={2}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Prazos e Datas</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Data de Implantação *
                </label>
                <input
                  type="date"
                  value={formData.dataImplantacao || ""}
                  onChange={(e) => updateFormData("dataImplantacao", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Data de Assinatura *
                </label>
                <input
                  type="date"
                  value={formData.dataAssinatura || ""}
                  onChange={(e) => updateFormData("dataAssinatura", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Início Previsto *
                </label>
                <input
                  type="date"
                  value={formData.inicioPrevisto || ""}
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
                  value={formData.terminoPrevisto || ""}
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
                  onChange={(e) => updateFormData("dataLimiteDespesas", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Cronograma de Liberação *
              </label>
              <textarea
                value={formData.cronogramaLiberacao || ""}
                onChange={(e) => updateFormData("cronogramaLiberacao", e.target.value)}
                rows={3}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Bloqueios e Movimentações *
              </label>
              <textarea
                value={formData.bloqueiosMovimentacoes || ""}
                onChange={(e) => updateFormData("bloqueiosMovimentacoes", e.target.value)}
                rows={3}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Moeda para Orçar *
              </label>
              <input
                type="text"
                value={formData.moedaParaOrcar || "BRL"}
                onChange={(e) => updateFormData("moedaParaOrcar", e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Saldo Adiantamento *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.saldoAdiantamento || 0}
                onChange={(e) =>
                  updateFormData("saldoAdiantamento", parseFloat(e.target.value))
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="implantacao-provisoria"
                checked={formData.implantacaoProvisoria || false}
                onChange={(e) =>
                  updateFormData("implantacaoProvisoria", e.target.checked)
                }
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-ring"
              />
              <label
                htmlFor="implantacao-provisoria"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Implantação Provisória
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate("/projetos")}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>
        <h1 className="text-3xl font-bold tracking-tight">Novo Projeto</h1>
        <p className="text-muted-foreground">
          Importar novo projeto para o sistema
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center flex-1">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  step === currentStep
                    ? "bg-primary text-primary-foreground"
                    : step < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step}
              </div>
              {step < totalSteps && (
                <div
                  className={`h-0.5 w-full ${
                    step < currentStep ? "bg-green-500" : "bg-muted"
                  }`}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="rounded-lg border p-6">{renderStep()}</div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 disabled:pointer-events-none disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Anterior
        </button>

        {currentStep < totalSteps ? (
          <button
            onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2"
          >
            Próximo
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Criar Projeto
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
export default NovoProjetoPage;
