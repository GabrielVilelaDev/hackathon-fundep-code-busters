import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, ArrowRight, Save, Loader2 } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  InputForm,
  InputSelectForm,
  Form,
  TextareaForm,
  DataPicker,
} from "@design-system";
import {
  TipoOrcamento,
  TipoAplicacaoPermitida,
  type ImportarProjetoDto,
} from "../types/projeto.types";
import { useProjetoMutations } from "../hooks/useProjetoMutations";

// Schema de validação com Zod
const projetoSchema = z.object({
  // Step 1 - Informações Básicas
  codigoProjeto: z.string().min(1, "Código do projeto é obrigatório"),
  centroCusto: z.string().min(1, "Centro de custo é obrigatório"),
  referenciaFundep: z.string().min(1, "Referência FUNDEP é obrigatória"),
  titulo: z.string().min(1, "Título é obrigatório"),
  resumo: z.string().min(1, "Resumo é obrigatório"),
  objeto: z.string().min(1, "Objeto é obrigatório"),

  // Step 2 - Responsáveis e Instituições
  coordenador: z.string().min(1, "Coordenador é obrigatório"),
  executor: z.string().min(1, "Executor é obrigatório"),
  coExecutor: z.string().optional(),
  referenciaExecutor: z.string().min(1, "Referência executor é obrigatória"),
  financiador: z.string().min(1, "Financiador é obrigatório"),
  coFinanciador: z.string().optional(),
  origemRecurso: z.string().min(1, "Origem do recurso é obrigatória"),
  referenciaFinanciador: z.string().min(1, "Referência financiador é obrigatória"),

  // Step 3 - Informações Financeiras
  valor: z.number().min(0, "Valor deve ser maior ou igual a zero"),
  moeda: z.string().min(1, "Moeda é obrigatória"),
  amf: z.number().min(0, "AMF deve ser maior ou igual a zero"),
  tipoOrcamento: z.string().min(1, "Tipo de orçamento é obrigatório"),
  conta: z.string().min(1, "Conta é obrigatória"),
  banco: z.string().min(1, "Banco é obrigatório"),
  agencia: z.string().min(1, "Agência é obrigatória"),
  contaBancaria: z.string().min(1, "Conta bancária é obrigatória"),
  custoAdministrativo: z.string().min(1, "Custo administrativo é obrigatório"),

  // Step 4 - Prazos e Datas
  dataImplantacao: z.date({ message: "Data de implantação é obrigatória" }),
  dataAssinatura: z.date({ message: "Data de assinatura é obrigatória" }),
  inicioPrevisto: z.date({ message: "Início previsto é obrigatório" }),
  terminoPrevisto: z.date({ message: "Término previsto é obrigatório" }),
  dataLimiteDespesas: z.date().optional(),
  cronogramaLiberacao: z.string().min(1, "Cronograma de liberação é obrigatório"),
  bloqueiosMovimentacoes: z.string().min(1, "Bloqueios e movimentações é obrigatório"),
  moedaParaOrcar: z.string().min(1, "Moeda para orçar é obrigatória"),
  saldoAdiantamento: z.number().min(0, "Saldo adiantamento deve ser maior ou igual a zero"),
  implantacaoProvisoria: z.boolean(),

  // Campos adicionais
  tipoAplicacaoPermitida: z.number(),
  coordenadorAcessaInternet: z.boolean(),
  razaoMultiplo: z.boolean(),
  absorcaoTarifaFundep: z.boolean(),
  mostrarOrcamentoMesmoSemLiberacao045: z.boolean(),
  subprojetos: z.array(z.any()),
});

type ProjetoFormData = z.infer<typeof projetoSchema>;

export function NovoProjetoPage() {
  const navigate = useNavigate();
  const { importarProjeto, loading } = useProjetoMutations();
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<ProjetoFormData>({
    resolver: zodResolver(projetoSchema),
    defaultValues: {
      tipoOrcamento: String(TipoOrcamento.Oficial),
      tipoAplicacaoPermitida: TipoAplicacaoPermitida.AplicacaoLivre,
      coordenadorAcessaInternet: true,
      implantacaoProvisoria: false,
      razaoMultiplo: false,
      absorcaoTarifaFundep: false,
      mostrarOrcamentoMesmoSemLiberacao045: false,
      subprojetos: [],
      moeda: "BRL",
      moedaParaOrcar: "BRL",
      saldoAdiantamento: 0,
    },
  });

  const totalSteps = 4;

  const handleSubmit = async (data: ProjetoFormData) => {
    try {
      // Formatar datas para string no formato ISO
      const formatDate = (date: Date | undefined) => {
        if (!date) return undefined;
        return date.toISOString().split('T')[0]; // YYYY-MM-DD
      };

      // Converter tipoOrcamento de string para número e formatar datas
      const dataToSubmit = {
        ...data,
        tipoOrcamento: parseInt(data.tipoOrcamento),
        dataImplantacao: formatDate(data.dataImplantacao),
        dataAssinatura: formatDate(data.dataAssinatura),
        inicioPrevisto: formatDate(data.inicioPrevisto),
        terminoPrevisto: formatDate(data.terminoPrevisto),
        dataLimiteDespesas: formatDate(data.dataLimiteDespesas),
      };
      
      const result = await importarProjeto(dataToSubmit as unknown as ImportarProjetoDto);
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
              <InputForm
                name="codigoProjeto"
                label="Código do Projeto"
                control={form.control}
                required
              />

              <InputForm
                name="centroCusto"
                label="Centro de Custo"
                control={form.control}
                required
              />

              <InputForm
                name="referenciaFundep"
                label="Referência FUNDEP"
                control={form.control}
                required
              />
            </div>

            <InputForm
              name="titulo"
              label="Título do Projeto"
              control={form.control}
              required
            />

            <TextareaForm
              name="resumo"
              label="Resumo"
              control={form.control}
              required
              rows={3}
            />

            <TextareaForm
              name="objeto"
              label="Objeto"
              control={form.control}
              required
              rows={3}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Responsáveis e Instituições</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <InputForm
                name="coordenador"
                label="Coordenador"
                control={form.control}
                required
              />

              <InputForm
                name="executor"
                label="Executor"
                control={form.control}
                required
              />

              <InputForm
                name="coExecutor"
                label="Co-Executor"
                control={form.control}
              />

              <InputForm
                name="referenciaExecutor"
                label="Referência Executor"
                control={form.control}
                required
              />

              <InputForm
                name="financiador"
                label="Financiador"
                control={form.control}
                required
              />

              <InputForm
                name="coFinanciador"
                label="Co-Financiador"
                control={form.control}
              />

              <InputForm
                name="origemRecurso"
                label="Origem do Recurso"
                control={form.control}
                required
              />

              <InputForm
                name="referenciaFinanciador"
                label="Referência Financiador"
                control={form.control}
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Informações Financeiras</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <InputForm
                name="valor"
                label="Valor Total (R$)"
                type="number"
                control={form.control}
                required
                step="0.01"
              />

              <InputForm
                name="moeda"
                label="Moeda"
                control={form.control}
                required
              />

              <InputForm
                name="amf"
                label="AMF (%)"
                type="number"
                control={form.control}
                required
                step="0.01"
              />

              <InputSelectForm
                name="tipoOrcamento"
                label="Tipo de Orçamento"
                control={form.control}
                required
                options={[
                  { label: "Oficial", value: String(TipoOrcamento.Oficial) },
                  { label: "Provisório", value: String(TipoOrcamento.Provisorio) },
                ]}
              />

              <InputForm
                name="conta"
                label="Conta"
                control={form.control}
                required
              />

              <InputForm
                name="banco"
                label="Banco"
                control={form.control}
                required
              />

              <InputForm
                name="agencia"
                label="Agência"
                control={form.control}
                required
              />

              <InputForm
                name="contaBancaria"
                label="Conta Bancária"
                control={form.control}
                required
              />
            </div>

            <TextareaForm
              name="custoAdministrativo"
              label="Custo Administrativo"
              control={form.control}
              required
              rows={2}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Prazos e Datas</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <DataPicker
                name="dataImplantacao"
                label="Data de Implantação"
                control={form.control}
                required
                placeholder="Selecione a data"
              />

              <DataPicker
                name="dataAssinatura"
                label="Data de Assinatura"
                control={form.control}
                required
                placeholder="Selecione a data"
              />

              <DataPicker
                name="inicioPrevisto"
                label="Início Previsto"
                control={form.control}
                required
                placeholder="Selecione a data"
              />

              <DataPicker
                name="terminoPrevisto"
                label="Término Previsto"
                control={form.control}
                required
                placeholder="Selecione a data"
              />

              <DataPicker
                name="dataLimiteDespesas"
                label="Data Limite de Despesas"
                control={form.control}
                placeholder="Selecione a data"
              />
            </div>

            <TextareaForm
              name="cronogramaLiberacao"
              label="Cronograma de Liberação"
              control={form.control}
              required
              rows={3}
            />

            <TextareaForm
              name="bloqueiosMovimentacoes"
              label="Bloqueios e Movimentações"
              control={form.control}
              required
              rows={3}
            />

            <InputForm
              name="moedaParaOrcar"
              label="Moeda para Orçar"
              control={form.control}
              required
            />

            <InputForm
              name="saldoAdiantamento"
              label="Saldo Adiantamento"
              type="number"
              control={form.control}
              required
              step="0.01"
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="implantacao-provisoria"
                {...form.register("implantacaoProvisoria")}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-ring"
              />
              <label
                htmlFor="implantacao-provisoria"
                className="text-sm font-medium cursor-pointer"
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
        <Button
          variant="ghost"
          onClick={() => navigate("/projetos")}
          className="mb-2 -ml-3"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Form */}
          <Card>
            <CardContent className="pt-6">{renderStep()}</CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4" />
              Anterior
            </Button>

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
              >
                Próximo
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={loading}
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
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
export default NovoProjetoPage;
