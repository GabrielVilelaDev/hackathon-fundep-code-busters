import { AlertCircle } from "lucide-react";
import {
  Button,
  Modal,
  InputSelectForm,
  Form,
} from "@design-system";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { EtapaProjeto, EtapaProjetoLabels } from "../types/projeto.types";
import { useProjetoMutations } from "../hooks/useProjetoMutations";

interface StatusUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  projetoId: string;
  currentEtapa: EtapaProjeto;
  onSuccess: () => void;
}

const statusSchema = z.object({
  novaEtapa: z.string(),
});

type StatusFormData = z.infer<typeof statusSchema>;

export function StatusUpdateModal({
  isOpen,
  onClose,
  projetoId,
  currentEtapa,
  onSuccess,
}: StatusUpdateModalProps) {
  const { atualizarStatus, loading, error } = useProjetoMutations();

  const form = useForm({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      novaEtapa: String(currentEtapa),
    },
  });

  const handleSubmit = async (data: StatusFormData) => {
    try {
      const etapa = Number(data.novaEtapa) as EtapaProjeto;
      await atualizarStatus(projetoId, { novaEtapa: etapa });
      onSuccess();
      onClose();
      form.reset();
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const etapaOptions = [
    { value: String(EtapaProjeto.Iniciacao), label: EtapaProjetoLabels[EtapaProjeto.Iniciacao] },
    { value: String(EtapaProjeto.Execucao), label: EtapaProjetoLabels[EtapaProjeto.Execucao] },
    { value: String(EtapaProjeto.PrestacaoDeContas), label: EtapaProjetoLabels[EtapaProjeto.PrestacaoDeContas] },
  ];

  const selectedEtapa = Number(form.watch("novaEtapa"));

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Atualizar Status do Projeto"
      content={
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium leading-none mb-2 block">
                Etapa Atual
              </label>
              <p className="text-sm text-muted-foreground">
                {EtapaProjetoLabels[currentEtapa]}
              </p>
            </div>

            <InputSelectForm
              name="novaEtapa"
              label="Nova Etapa"
              control={form.control}
              options={etapaOptions}
              required
              placeholder="Selecione a nova etapa"
            />

            {error && (
              <div className="flex items-center gap-2 rounded-md border border-destructive bg-destructive/10 px-3 py-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </form>
        </Form>
      }
      footer={
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={form.handleSubmit(handleSubmit)}
            disabled={loading || selectedEtapa === currentEtapa}
          >
            {loading ? "Atualizando..." : "Atualizar Status"}
          </Button>
        </div>
      }
    />
  );
}
