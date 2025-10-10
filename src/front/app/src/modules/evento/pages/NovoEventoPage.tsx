/**
 * Página de cadastro de novo evento
 */

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  Button,
  Card,
  CardContent,
  InputForm,
  Form,
  TextareaForm,
  DataPicker,
} from '@design-system';
import { useCadastrarEvento } from '../hooks/useEventos';
import type { CadastrarEventoDto } from '../types/evento.types';

// Schema de validação com Zod
const eventoSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  local: z.string().min(1, 'Local é obrigatório'),
  ministrantes: z.string().min(1, 'Ministrantes são obrigatórios'),
  dataInicioMatricula: z.date({ message: 'Data de início da matrícula é obrigatória' }),
  dataFimMatricula: z.date({ message: 'Data de fim da matrícula é obrigatória' }),
  dataInicioEvento: z.date({ message: 'Data de início do evento é obrigatória' }),
  dataFimEvento: z.date({ message: 'Data de fim do evento é obrigatória' }),
  numeroMaximoInscritos: z.number().min(1, 'Número máximo de inscritos deve ser maior que zero'),
  valor: z.number().min(0, 'Valor deve ser maior ou igual a zero'),
}).refine(
  (data) => data.dataFimMatricula >= data.dataInicioMatricula,
  {
    message: 'Data de fim da matrícula deve ser posterior à data de início',
    path: ['dataFimMatricula'],
  }
).refine(
  (data) => data.dataInicioEvento >= data.dataInicioMatricula,
  {
    message: 'Data de início do evento deve ser posterior à data de início da matrícula',
    path: ['dataInicioEvento'],
  }
).refine(
  (data) => data.dataFimEvento >= data.dataInicioEvento,
  {
    message: 'Data de fim do evento deve ser posterior à data de início',
    path: ['dataFimEvento'],
  }
);

type EventoFormData = z.infer<typeof eventoSchema>;

export function NovoEventoPage() {
  const navigate = useNavigate();
  const { mutateAsync: cadastrarEvento, isPending } = useCadastrarEvento();

  const form = useForm<EventoFormData>({
    resolver: zodResolver(eventoSchema),
    defaultValues: {
      titulo: '',
      descricao: '',
      local: '',
      ministrantes: '',
      numeroMaximoInscritos: 0,
      valor: 0,
    },
  });

  const handleSubmit = async (data: EventoFormData) => {
    try {
      // Formatar datas para string no formato ISO
      const formatDate = (date: Date) => {
        return date.toISOString();
      };

      const dataToSubmit: CadastrarEventoDto = {
        ...data,
        dataInicioMatricula: formatDate(data.dataInicioMatricula),
        dataFimMatricula: formatDate(data.dataFimMatricula),
        dataInicioEvento: formatDate(data.dataInicioEvento),
        dataFimEvento: formatDate(data.dataFimEvento),
      };

      const result = await cadastrarEvento(dataToSubmit);
      toast.success('Evento cadastrado com sucesso!');
      navigate(`/eventos/${result.id}`);
    } catch (err) {
      toast.error('Erro ao cadastrar evento. Tente novamente.');
      console.error('Erro ao criar evento:', err);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate('/eventos')}
          className="mb-2 -ml-3"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Novo Evento</h1>
        <p className="text-muted-foreground">
          Cadastrar novo evento no sistema
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardContent className="pt-6 space-y-6">
              <h2 className="text-xl font-semibold">Informações Básicas</h2>

              <InputForm
                name="titulo"
                label="Título do Evento"
                control={form.control}
                placeholder="Digite o título do evento"
                required
                disabled={isPending}
              />

              <TextareaForm
                name="descricao"
                label="Descrição"
                control={form.control}
                placeholder="Descreva o evento"
                required
                rows={4}
                disabled={isPending}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <InputForm
                  name="local"
                  label="Local"
                  control={form.control}
                  placeholder="Local onde será realizado"
                  required
                  disabled={isPending}
                />

                <InputForm
                  name="ministrantes"
                  label="Ministrantes"
                  control={form.control}
                  placeholder="Nome dos ministrantes"
                  required
                  disabled={isPending}
                />
              </div>
            </CardContent>
          </Card>

          {/* Período de Matrícula */}
          <Card>
            <CardContent className="pt-6 space-y-6">
              <h2 className="text-xl font-semibold">Período de Matrícula</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <DataPicker
                  name="dataInicioMatricula"
                  label="Data de Início da Matrícula"
                  control={form.control}
                  required
                  disabled={isPending}
                />

                <DataPicker
                  name="dataFimMatricula"
                  label="Data de Fim da Matrícula"
                  control={form.control}
                  required
                  disabled={isPending}
                />
              </div>
            </CardContent>
          </Card>

          {/* Período do Evento */}
          <Card>
            <CardContent className="pt-6 space-y-6">
              <h2 className="text-xl font-semibold">Período do Evento</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <DataPicker
                  name="dataInicioEvento"
                  label="Data de Início do Evento"
                  control={form.control}
                  required
                  disabled={isPending}
                />

                <DataPicker
                  name="dataFimEvento"
                  label="Data de Fim do Evento"
                  control={form.control}
                  required
                  disabled={isPending}
                />
              </div>
            </CardContent>
          </Card>

          {/* Informações Adicionais */}
          <Card>
            <CardContent className="pt-6 space-y-6">
              <h2 className="text-xl font-semibold">Informações Adicionais</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <InputForm
                  name="numeroMaximoInscritos"
                  label="Número Máximo de Inscritos"
                  type="number"
                  control={form.control}
                  placeholder="0"
                  required
                  disabled={isPending}
                />

                <InputForm
                  name="valor"
                  label="Valor (R$)"
                  type="number"
                  step="0.01"
                  control={form.control}
                  placeholder="0.00"
                  required
                  disabled={isPending}
                />
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/eventos')}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cadastrando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Cadastrar Evento
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default NovoEventoPage;
