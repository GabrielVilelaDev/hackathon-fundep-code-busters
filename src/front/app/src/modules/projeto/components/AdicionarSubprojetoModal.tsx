import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Plus } from "lucide-react";
import {
  Button,
  InputForm,
  TextareaForm,
  DataPicker,
  Form,
} from "@design-system";
import type { SubprojetoDto, RubricaDto } from "../types/projeto.types";

const subprojetoSchema = z.object({
  codigoSubprojeto: z.string().min(1, "Código é obrigatório"),
  nome: z.string().min(1, "Nome é obrigatório"),
  objeto: z.string().min(1, "Objeto é obrigatório"),
  observacoes: z.string().optional(),
  resumo: z.string().optional(),
  propostaNumero: z.string().optional(),
  inicioPrevisto: z.date({ message: "Data de início é obrigatória" }),
  terminoPrevisto: z.date({ message: "Data de término é obrigatória" }),
  validadeGestaoDe: z.date().optional(),
  validadeGestaoAte: z.date().optional(),
  locacaoCebas: z.string().optional(),
  subprojetoSubstituto: z.string().optional(),
});

type SubprojetoFormData = z.infer<typeof subprojetoSchema>;

interface AdicionarSubprojetoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (subprojeto: SubprojetoDto) => void;
  rubricasDisponiveis: RubricaDto[];
}

export function AdicionarSubprojetoModal({
  isOpen,
  onClose,
  onAdd,
  rubricasDisponiveis,
}: AdicionarSubprojetoModalProps) {
  const form = useForm<SubprojetoFormData>({
    resolver: zodResolver(subprojetoSchema),
    defaultValues: {
      codigoSubprojeto: "",
      nome: "",
      objeto: "",
      observacoes: "",
      resumo: "",
      propostaNumero: "",
      locacaoCebas: "",
      subprojetoSubstituto: "",
    },
  });

  const handleSubmit = async (data: SubprojetoFormData) => {
    const formatDate = (date: Date | undefined) => {
      if (!date) return undefined;
      return date.toISOString().split('T')[0];
    };

    const subprojeto: SubprojetoDto = {
      codigoSubprojeto: data.codigoSubprojeto,
      nome: data.nome,
      objeto: data.objeto,
      observacoes: data.observacoes,
      resumo: data.resumo,
      propostaNumero: data.propostaNumero,
      inicioPrevisto: formatDate(data.inicioPrevisto)!,
      terminoPrevisto: formatDate(data.terminoPrevisto)!,
      validadeGestaoDe: formatDate(data.validadeGestaoDe),
      validadeGestaoAte: formatDate(data.validadeGestaoAte),
      locacaoCebas: data.locacaoCebas,
      subprojetoSubstituto: data.subprojetoSubstituto,
      rubricas: [], // Pode ser expandido para selecionar rubricas
    };

    onAdd(subprojeto);
    form.reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Adicionar Subprojeto</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Informações Básicas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informações Básicas</h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <InputForm
                    name="codigoSubprojeto"
                    label="Código do Subprojeto"
                    control={form.control}
                    required
                  />

                  <InputForm
                    name="nome"
                    label="Nome"
                    control={form.control}
                    required
                  />

                  <InputForm
                    name="propostaNumero"
                    label="Número da Proposta"
                    control={form.control}
                  />

                  <InputForm
                    name="subprojetoSubstituto"
                    label="Subprojeto Substituto"
                    control={form.control}
                  />
                </div>

                <TextareaForm
                  name="objeto"
                  label="Objeto"
                  control={form.control}
                  required
                  rows={3}
                />

                <TextareaForm
                  name="resumo"
                  label="Resumo"
                  control={form.control}
                  rows={3}
                />

                <TextareaForm
                  name="observacoes"
                  label="Observações"
                  control={form.control}
                  rows={2}
                />
              </div>

              {/* Datas e Prazos */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Datas e Prazos</h3>
                
                <div className="grid gap-4 md:grid-cols-2">
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
                    name="validadeGestaoDe"
                    label="Validade Gestão De"
                    control={form.control}
                    placeholder="Selecione a data"
                  />

                  <DataPicker
                    name="validadeGestaoAte"
                    label="Validade Gestão Até"
                    control={form.control}
                    placeholder="Selecione a data"
                  />
                </div>

                <InputForm
                  name="locacaoCebas"
                  label="Locação CEBAS"
                  control={form.control}
                />
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  <Plus className="h-4 w-4" />
                  Adicionar Subprojeto
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
