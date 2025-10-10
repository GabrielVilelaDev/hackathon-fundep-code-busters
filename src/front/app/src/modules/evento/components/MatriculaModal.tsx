/**
 * Modal para realizar matrícula em evento
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  Button,
  Modal,
  Form,
  InputSelectForm,
  Card,
  CardContent,
} from '@design-system';
import { useRealizarMatricula } from '../hooks/useMatriculas';
import { EventoResponse, TipoPagamento, TipoPagamentoLabels } from '../types/evento.types';

// Schema de validação
const matriculaSchema = z.object({
  tipoPagamento: z.string().min(1, 'Tipo de pagamento é obrigatório'),
});

type MatriculaFormData = z.infer<typeof matriculaSchema>;

interface MatriculaModalProps {
  isOpen: boolean;
  onClose: () => void;
  evento: EventoResponse;
  onSuccess?: () => void;
}

export function MatriculaModal({ isOpen, onClose, evento, onSuccess }: MatriculaModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const { mutateAsync: realizarMatricula, isPending } = useRealizarMatricula();

  const form = useForm<MatriculaFormData>({
    resolver: zodResolver(matriculaSchema),
    defaultValues: {
      tipoPagamento: String(TipoPagamento.Cartao),
    },
  });

  const handleSubmit = async (data: MatriculaFormData) => {
    try {
      await realizarMatricula({
        codigoAluno: '1', // Código fixo do aluno
        eventoId: evento.id,
        tipoPagamento: parseInt(data.tipoPagamento) as TipoPagamento,
      });

      setShowSuccess(true);
      toast.success('Matrícula realizada com sucesso!');

      setTimeout(() => {
        setShowSuccess(false);
        form.reset();
        onClose();
        onSuccess?.();
      }, 2000);
    } catch (error) {
      toast.error('Erro ao realizar matrícula. Tente novamente.');
      console.error('Erro ao realizar matrícula:', error);
    }
  };

  const handleClose = () => {
    if (!isPending && !showSuccess) {
      form.reset();
      onClose();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      title={!showSuccess ? 'Realizar Matrícula' : undefined}
      description={!showSuccess ? evento.titulo : undefined}
      content={
        <div className="space-y-4">
          {/* Success Message */}
          {showSuccess ? (
            <Card className="border-green-500 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center space-y-3 py-4">
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                  <p className="text-lg font-semibold text-green-700">
                    Matrícula realizada com sucesso!
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Informações do Evento */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Local:</span>
                      <span className="font-medium">{evento.local}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ministrantes:</span>
                      <span className="font-medium">{evento.ministrantes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valor:</span>
                      <span className="font-medium">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(evento.valor)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Formulário */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <InputSelectForm
                    name="tipoPagamento"
                    label="Tipo de Pagamento"
                    control={form.control}
                    options={Object.entries(TipoPagamentoLabels).map(([value, label]) => ({
                      value,
                      label,
                    }))}
                    required
                    disabled={isPending}
                  />

                  {/* Ações */}
                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClose}
                      disabled={isPending}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={isPending}>
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Realizando...
                        </>
                      ) : (
                        'Confirmar Matrícula'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </>
          )}
        </div>
      }
    />
  );
}
