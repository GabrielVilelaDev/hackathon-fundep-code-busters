/**
 * Página de detalhes de um evento
 */

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, Clock, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import {
  LoadingSpinner,
  Button,
  Card,
  CardContent,
  CardError,
  CardNotFound,
} from '@design-system';
import { useObterEvento } from '../hooks/useEventos';
import {
  formatarData,
  formatarDataHora,
  formatarValor,
  isInscricaoAberta,
  isEventoLotado,
  podeRealizarMatricula,
} from '../types/evento.types';
import { MatriculaModal } from '../components/MatriculaModal';

export function EventoDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: evento, isLoading, error, refetch } = useObterEvento(id!);
  const [showMatriculaModal, setShowMatriculaModal] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6 px-4">
        <CardError
          title="Erro ao carregar evento"
          message="Não foi possível carregar os dados do evento. Tente novamente."
          onRetry={refetch}
        />
      </div>
    );
  }

  if (!evento) {
    return (
      <div className="container mx-auto py-6 px-4">
        <CardNotFound
          title="Evento não encontrado"
          message="O evento que você está procurando não existe ou foi removido."
          onGoBack={() => navigate('/eventos')}
        />
      </div>
    );
  }

  const handleMatriculaSuccess = () => {
    toast.success('Matrícula realizada com sucesso!');
    refetch();
  };

  const getStatusBadge = () => {
    if (isEventoLotado(evento)) {
      return (
        <span className="inline-flex items-center rounded-full border border-red-300 bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
          Lotado
        </span>
      );
    }
    
    if (isInscricaoAberta(evento)) {
      return (
        <span className="inline-flex items-center rounded-full border border-green-300 bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
          Inscrições Abertas
        </span>
      );
    }

    return (
      <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold">
        Em Breve
      </span>
    );
  };

  return (
    <div className="container mx-auto py-6 px-4 space-y-6 max-w-5xl">
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
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{evento.titulo}</h1>
            <p className="text-muted-foreground mt-2">{evento.descricao}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {getStatusBadge()}
            {podeRealizarMatricula(evento) && (
              <Button onClick={() => setShowMatriculaModal(true)}>
                <UserPlus className="h-4 w-4" />
                Realizar Matrícula
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Informações Principais */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Informações do Evento */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-lg font-semibold">Informações do Evento</h2>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">Período do Evento</p>
                  <p className="font-medium">
                    {formatarData(evento.dataInicioEvento)} até {formatarData(evento.dataFimEvento)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">Local</p>
                  <p className="font-medium">{evento.local}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">Ministrantes</p>
                  <p className="font-medium">{evento.ministrantes}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">Valor</p>
                  <p className="font-medium text-lg">{formatarValor(evento.valor)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações de Matrícula */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-lg font-semibold">Informações de Matrícula</h2>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">Período de Matrícula</p>
                  <p className="font-medium">
                    {formatarData(evento.dataInicioMatricula)} até {formatarData(evento.dataFimMatricula)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">Vagas Disponíveis</p>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-lg">
                      {evento.numeroAtualInscritos || 0} / {evento.numeroMaximoInscritos}
                    </p>
                    <span className="text-sm text-muted-foreground">
                      ({Math.round(((evento.numeroAtualInscritos || 0) / evento.numeroMaximoInscritos) * 100)}% ocupado)
                    </span>
                  </div>
                  {/* Barra de progresso */}
                  <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{
                        width: `${Math.min(((evento.numeroAtualInscritos || 0) / evento.numeroMaximoInscritos) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {!podeRealizarMatricula(evento) && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">
                  {isEventoLotado(evento)
                    ? 'Este evento está lotado. Não é mais possível realizar matrícula.'
                    : !isInscricaoAberta(evento)
                    ? 'As inscrições para este evento ainda não estão abertas ou já foram encerradas.'
                    : 'Não é possível realizar matrícula no momento.'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Datas Importantes */}
      {evento.criadoEm && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Informações Adicionais</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Cadastrado em</p>
                <p className="font-medium">{formatarDataHora(evento.criadoEm)}</p>
              </div>
              {evento.atualizadoEm && (
                <div>
                  <p className="text-sm text-muted-foreground">Última atualização</p>
                  <p className="font-medium">{formatarDataHora(evento.atualizadoEm)}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal de Matrícula */}
      {showMatriculaModal && (
        <MatriculaModal
          isOpen={showMatriculaModal}
          onClose={() => setShowMatriculaModal(false)}
          evento={evento}
          onSuccess={handleMatriculaSuccess}
        />
      )}
    </div>
  );
}

export default EventoDetailPage;
