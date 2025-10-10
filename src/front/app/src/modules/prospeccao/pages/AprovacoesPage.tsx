import { Card, Button } from '@design-system'
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react'

export default function AprovacoesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Aprovações</h1>
          <p className="text-sm text-muted-foreground">Gerencie aprovações de projetos e documentos</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pendentes</p>
              <h3 className="mt-2 text-3xl font-bold text-orange-500">3</h3>
              <p className="mt-1 text-xs text-muted-foreground">Aguardando sua aprovação</p>
            </div>
            <div className="rounded-full bg-orange-500/10 p-3">
              <Clock className="h-6 w-6 text-orange-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Aprovados</p>
              <h3 className="mt-2 text-3xl font-bold text-green-500">12</h3>
              <p className="mt-1 text-xs text-muted-foreground">Este mês</p>
            </div>
            <div className="rounded-full bg-green-500/10 p-3">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rejeitados</p>
              <h3 className="mt-2 text-3xl font-bold text-red-500">2</h3>
              <p className="mt-1 text-xs text-muted-foreground">Necessitam correções</p>
            </div>
            <div className="rounded-full bg-red-500/10 p-3">
              <XCircle className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex gap-2">
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Todos (3)
          </button>
          <button className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
            Alta Prioridade (1)
          </button>
          <button className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
            Vencendo Hoje (0)
          </button>
        </div>
      </Card>

      {/* Pending Approvals List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Pendentes de Aprovação</h2>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-500">
                  Alta Prioridade
                </span>
                <span className="text-xs text-muted-foreground">Valor: R$ 1.500.000</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold">PRJ-2025-003 - Pesquisa de Desenvolvimento de Vacinas</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Coordenador: Dr. Carlos Alberto | Unidade: Bio-Manguinhos
              </p>
              <div className="mt-4 flex items-center gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Solicitado por:</span>{' '}
                  <span className="font-medium">Maria Santos</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Data:</span>{' '}
                  <span className="font-medium">09/10/2025</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Prazo:</span>{' '}
                  <span className="font-medium text-orange-500">2 dias</span>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm">
                  <span className="font-medium">Motivo:</span> Projeto com valor superior a R$ 1.000.000 requer aprovação da diretoria
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                Ver Detalhes
              </Button>
              <Button variant="outline" size="sm" className="gap-2 border-red-500 text-red-500 hover:bg-red-50">
                <XCircle className="h-4 w-4" />
                Rejeitar
              </Button>
              <Button size="sm" className="gap-2 bg-green-500 hover:bg-green-600">
                <CheckCircle className="h-4 w-4" />
                Aprovar
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Normal
                </span>
                <span className="text-xs text-muted-foreground">Valor: R$ 450.000</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold">PRJ-2025-004 - Estudo de Saúde Pública</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Coordenador: Dra. Juliana Lima | Unidade: ENSP
              </p>
              <div className="mt-4 flex items-center gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Solicitado por:</span>{' '}
                  <span className="font-medium">Pedro Oliveira</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Data:</span>{' '}
                  <span className="font-medium">08/10/2025</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Prazo:</span>{' '}
                  <span className="font-medium">5 dias</span>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm">
                  <span className="font-medium">Motivo:</span> Documentação completa, aguardando validação final
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                Ver Detalhes
              </Button>
              <Button variant="outline" size="sm" className="gap-2 border-red-500 text-red-500 hover:bg-red-50">
                <XCircle className="h-4 w-4" />
                Rejeitar
              </Button>
              <Button size="sm" className="gap-2 bg-green-500 hover:bg-green-600">
                <CheckCircle className="h-4 w-4" />
                Aprovar
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Normal
                </span>
                <span className="text-xs text-muted-foreground">Valor: R$ 320.000</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold">PRJ-2025-005 - Extensão Comunitária em Saúde</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Coordenador: Prof. Roberto Mendes | Unidade: IOC
              </p>
              <div className="mt-4 flex items-center gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Solicitado por:</span>{' '}
                  <span className="font-medium">Ana Silva</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Data:</span>{' '}
                  <span className="font-medium">07/10/2025</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Prazo:</span>{' '}
                  <span className="font-medium">7 dias</span>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm">
                  <span className="font-medium">Motivo:</span> Tipo de projeto "Extensão" requer aprovação adicional
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                Ver Detalhes
              </Button>
              <Button variant="outline" size="sm" className="gap-2 border-red-500 text-red-500 hover:bg-red-50">
                <XCircle className="h-4 w-4" />
                Rejeitar
              </Button>
              <Button size="sm" className="gap-2 bg-green-500 hover:bg-green-600">
                <CheckCircle className="h-4 w-4" />
                Aprovar
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
