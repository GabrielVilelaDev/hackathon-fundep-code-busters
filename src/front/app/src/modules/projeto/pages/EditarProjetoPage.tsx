import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  InputForm,
  Form,
  TextareaForm,
  DataPicker,
  LoadingSpinner,
} from "@design-system";
import { useProjeto } from "../hooks/useProjeto";
import { useProjetoMutations } from "../hooks/useProjetoMutations";
import { AdicionarSubprojetoModal } from "../components/AdicionarSubprojetoModal";
import type { SubprojetoDto } from "../types/projeto.types";

// Schema de validação com Zod
const projetoSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  resumo: z.string().min(1, "Resumo é obrigatório"),
  objeto: z.string().min(1, "Objeto é obrigatório"),
  coordenador: z.string().min(1, "Coordenador é obrigatório"),
  coExecutor: z.string().optional(),
  coFinanciador: z.string().optional(),
  valor: z.coerce.number().min(0, "Valor deve ser maior ou igual a zero"),
  custoAdministrativo: z.string().min(1, "Custo administrativo é obrigatório"),
  cronogramaLiberacao: z.string().min(1, "Cronograma de liberação é obrigatório"),
  bloqueiosMovimentacoes: z.string().min(1, "Bloqueios e movimentações é obrigatório"),
  inicioPrevisto: z.date({ message: "Início previsto é obrigatório" }),
  terminoPrevisto: z.date({ message: "Término previsto é obrigatório" }),
  dataLimiteDespesas: z.date().optional(),
  aguardandoProrrogacaoPara: z.date().optional(),
});

type ProjetoFormData = z.infer<typeof projetoSchema>;

export function EditarProjetoPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projeto, loading: loadingProjeto, error } = useProjeto(id);
  const { atualizarProjeto, loading: saving } = useProjetoMutations();
  const [subprojetos, setSubprojetos] = useState<SubprojetoDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(projetoSchema),
  });

  // Preencher form quando o projeto for carregado
  useEffect(() => {
    if (projeto) {
      form.reset({
        titulo: projeto.titulo,
        resumo: projeto.resumo,
        objeto: projeto.objeto,
        coordenador: projeto.coordenador,
        coExecutor: projeto.coExecutor || undefined,
        coFinanciador: projeto.coFinanciador || undefined,
        valor: projeto.valor,
        custoAdministrativo: projeto.custoAdministrativo,
        cronogramaLiberacao: projeto.cronogramaLiberacao,
        bloqueiosMovimentacoes: projeto.bloqueiosMovimentacoes,
        inicioPrevisto: projeto.inicioPrevisto ? new Date(projeto.inicioPrevisto) : undefined,
        terminoPrevisto: projeto.terminoPrevisto ? new Date(projeto.terminoPrevisto) : undefined,
        dataLimiteDespesas: projeto.dataLimiteDespesas ? new Date(projeto.dataLimiteDespesas) : undefined,
        aguardandoProrrogacaoPara: projeto.aguardandoProrrogacaoPara ? new Date(projeto.aguardandoProrrogacaoPara) : undefined,
      });
      // Carregar subprojetos existentes
      setSubprojetos(projeto.subprojetos || []);
    }
  }, [projeto, form]);

  const handleAddSubprojeto = (subprojeto: SubprojetoDto) => {
    setSubprojetos([...subprojetos, subprojeto]);
    setIsModalOpen(false);
  };

  const handleRemoveSubprojeto = (index: number) => {
    setSubprojetos(subprojetos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (data: ProjetoFormData) => {
    if (!id) return;

    try {
      // Helper para formatar datas
      const formatDate = (date: Date | undefined): string | undefined => {
        if (!date) return undefined;
        return date.toISOString().split('T')[0]; // YYYY-MM-DD
      };

      const dataToSubmit = {
        titulo: data.titulo,
        resumo: data.resumo,
        objeto: data.objeto,
        coordenador: data.coordenador,
        coExecutor: data.coExecutor,
        coFinanciador: data.coFinanciador,
        valor: data.valor,
        custoAdministrativo: data.custoAdministrativo,
        cronogramaLiberacao: data.cronogramaLiberacao,
        bloqueiosMovimentacoes: data.bloqueiosMovimentacoes,
        inicioPrevisto: formatDate(data.inicioPrevisto)!,
        terminoPrevisto: formatDate(data.terminoPrevisto)!,
        dataLimiteDespesas: formatDate(data.dataLimiteDespesas),
        aguardandoProrrogacaoPara: formatDate(data.aguardandoProrrogacaoPara),
      };

      await atualizarProjeto(id, dataToSubmit);
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
        <Button
          variant="ghost"
          onClick={() => navigate(`/projetos/${id}`)}
          className="mb-2 -ml-3"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Editar Projeto</h1>
        <p className="text-muted-foreground">{projeto.codigoProjeto}</p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Card 1: Informações Básicas */}
          <Card>
            <CardContent className="pt-6 space-y-6">
              <h2 className="text-xl font-semibold">Informações Básicas</h2>

              <InputForm
                name="titulo"
                label="Título"
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
            </CardContent>
          </Card>

          {/* Card 2: Responsáveis */}
          <Card>
            <CardContent className="pt-6 space-y-6">
              <h2 className="text-xl font-semibold">Responsáveis</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <InputForm
                  name="coordenador"
                  label="Coordenador"
                  control={form.control}
                  required
                />

                <InputForm
                  name="coExecutor"
                  label="Co-Executor"
                  control={form.control}
                />

                <InputForm
                  name="coFinanciador"
                  label="Co-Financiador"
                  control={form.control}
                />
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Informações Financeiras */}
          <Card>
            <CardContent className="pt-6 space-y-6">
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
              </div>

              <TextareaForm
                name="custoAdministrativo"
                label="Custo Administrativo"
                control={form.control}
                required
                rows={2}
              />

              <TextareaForm
                name="cronogramaLiberacao"
                label="Cronograma de Liberação"
                control={form.control}
                required
                rows={2}
              />

              <TextareaForm
                name="bloqueiosMovimentacoes"
                label="Bloqueios e Movimentações"
                control={form.control}
                required
                rows={2}
              />
            </CardContent>
          </Card>

          {/* Card 4: Prazos e Datas */}
          <Card>
            <CardContent className="pt-6 space-y-6">
              <h2 className="text-xl font-semibold">Prazos e Datas</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <DataPicker
                  name="inicioPrevisto"
                  label="Início Previsto"
                  control={form.control}
                  required
                />

                <DataPicker
                  name="terminoPrevisto"
                  label="Término Previsto"
                  control={form.control}
                  required
                />

                <DataPicker
                  name="dataLimiteDespesas"
                  label="Data Limite de Despesas"
                  control={form.control}
                />

                <DataPicker
                  name="aguardandoProrrogacaoPara"
                  label="Aguardando Prorrogação Para"
                  control={form.control}
                />
              </div>
            </CardContent>
          </Card>

          {/* Card 5: Subprojetos */}
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Subprojetos</h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Subprojeto
                </Button>
              </div>

              {subprojetos.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Nenhum subprojeto adicionado
                </p>
              ) : (
                <div className="space-y-4">
                  {subprojetos.map((sub, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div>
                              <h3 className="font-semibold">{sub.nome}</h3>
                              <p className="text-sm text-muted-foreground">
                                {sub.codigoSubprojeto}
                              </p>
                            </div>
                            <p className="text-sm">{sub.objeto}</p>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              <span>
                                Início: {new Date(sub.inicioPrevisto).toLocaleDateString("pt-BR")}
                              </span>
                              <span>
                                Término: {new Date(sub.terminoPrevisto).toLocaleDateString("pt-BR")}
                              </span>
                            </div>
                            {sub.rubricas && sub.rubricas.length > 0 && (
                              <p className="text-sm text-muted-foreground">
                                {sub.rubricas.length} rubrica(s)
                              </p>
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveSubprojeto(index)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/projetos/${id}`)}
              disabled={saving}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
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
            </Button>
          </div>
        </form>
      </Form>

      {/* Modal de Adicionar Subprojeto */}
      <AdicionarSubprojetoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddSubprojeto}
        rubricasDisponiveis={[]}
      />
    </div>
  );
}
export default EditarProjetoPage;
