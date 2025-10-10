/**
 * Página de listagem de eventos
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, AlertCircle, Calendar, MapPin, Users, UserPlus, ClipboardList } from 'lucide-react';
import { toast } from 'sonner';
import {
  LoadingSpinner,
  Button,
  Card,
  CardContent,
} from '@design-system';
import { useListarEventos } from '../hooks/useEventos';
import { useListarMatriculasPorAluno } from '../hooks/useMatriculas';
import {
  formatarData,
  formatarValor,
  isInscricaoAberta,
  isEventoLotado,
  podeRealizarMatricula,
  type EventoResponse,
} from '../types/evento.types';
import { MatriculaModal } from '../components/MatriculaModal';

export function EventosListPage() {
  const navigate = useNavigate();
  const { data: eventos, isLoading, error, refetch } = useListarEventos();
  const { data: matriculas } = useListarMatriculasPorAluno('1'); // Busca matrículas do aluno "1"
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvento, setSelectedEvento] = useState<EventoResponse | null>(null);
  const [showMatriculaModal, setShowMatriculaModal] = useState(false);

  const filteredEventos = eventos?.filter(
    (evento) =>
      evento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.local.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.ministrantes.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (error) {
    toast.error('Erro ao carregar eventos');
  }

  // Verifica se o aluno já está matriculado em um evento
  const isMatriculado = (eventoId: string) => {
    return matriculas?.some((matricula) => matricula.eventoId === eventoId) || false;
  };

  const handleMatriculaClick = (evento: EventoResponse, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Verifica se já está matriculado
    if (isMatriculado(evento.id)) {
      toast.info('Você já está matriculado neste evento!');
      return;
    }
    
    setSelectedEvento(evento);
    setShowMatriculaModal(true);
  };

  const handleMatriculaSuccess = () => {
    toast.success('Matrícula realizada com sucesso!');
    refetch();
  };

  const getStatusBadge = (evento: typeof filteredEventos[0]) => {
    // Se já está matriculado, mostra badge azul
    if (isMatriculado(evento.id)) {
      return (
        <span className="inline-flex items-center rounded-full border border-blue-300 bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 whitespace-nowrap shrink-0">
          Matriculado
        </span>
      );
    }
    
    if (isEventoLotado(evento)) {
      return (
        <span className="inline-flex items-center rounded-full border border-red-300 bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700 whitespace-nowrap shrink-0">
          Lotado
        </span>
      );
    }
    
    if (isInscricaoAberta(evento)) {
      return (
        <span className="inline-flex items-center rounded-full border border-green-300 bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700 whitespace-nowrap shrink-0">
          Inscrições Abertas
        </span>
      );
    }

    return (
      <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold whitespace-nowrap shrink-0">
        Em Breve
      </span>
    );
  };

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Eventos</h1>
          <p className="text-muted-foreground">
            Visualize eventos disponíveis e realize sua matrícula
          </p>
        </div>
        <Button onClick={() => navigate('/matriculas')} variant="outline">
          <ClipboardList className="h-4 w-4" />
          Minhas Matrículas
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por título, local ou ministrantes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p>Erro ao carregar eventos. Tente novamente.</p>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Tentar Novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Eventos em Cards */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : filteredEventos.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-6">
              <p className="text-muted-foreground">
                {searchTerm
                  ? 'Nenhum evento encontrado com os filtros aplicados.'
                  : 'Nenhum evento cadastrado. Clique em "Novo Evento" para começar.'}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredEventos.map((evento) => (
            <Card
              key={evento.id}
              className="hover:shadow-md transition-shadow w-full"
            >
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header do Card */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg line-clamp-2">
                          {evento.titulo}
                        </h3>
                      </div>
                      {getStatusBadge(evento)}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {evento.descricao}
                    </p>
                  </div>

                  {/* Informações */}
                  <div className="space-y-2 text-sm min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="truncate">
                        {formatarData(evento.dataInicioEvento)} - {formatarData(evento.dataFimEvento)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="truncate">{evento.local}</span>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="truncate">
                        {evento.numeroAtualInscritos || 0}/{evento.numeroMaximoInscritos} inscritos
                      </span>
                    </div>
                  </div>

                  {/* Valor e Ações */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="font-semibold text-lg">
                      {formatarValor(evento.valor)}
                    </span>
                    <Button
                      variant={
                        isMatriculado(evento.id) 
                          ? "outline" 
                          : podeRealizarMatricula(evento) 
                          ? "default" 
                          : "outline"
                      }
                      size="sm"
                      onClick={(e) => handleMatriculaClick(evento, e)}
                      disabled={isMatriculado(evento.id) || !podeRealizarMatricula(evento)}
                    >
                      <UserPlus className="h-4 w-4 mr-1 sm:mr-2 shrink-0" />
                      <span className="truncate">
                        {isMatriculado(evento.id)
                          ? 'Matriculado'
                          : isEventoLotado(evento) 
                          ? 'Lotado' 
                          : isInscricaoAberta(evento) 
                          ? 'Matricular' 
                          : 'Em Breve'}
                      </span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de Matrícula */}
      {selectedEvento && (
        <MatriculaModal
          isOpen={showMatriculaModal}
          onClose={() => {
            setShowMatriculaModal(false);
            setSelectedEvento(null);
          }}
          evento={selectedEvento}
          onSuccess={handleMatriculaSuccess}
        />
      )}
    </div>
  );
}

export default EventosListPage;
