import { Card } from '@design-system'
import { TrendingUp, Clock, AlertCircle, Users } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Em Execução</p>
              <h3 className="mt-2 text-3xl font-bold text-primary">1</h3>
              <p className="mt-1 text-xs text-muted-foreground">Projetos ativos</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Aguardando Cadastro</p>
              <h3 className="mt-2 text-3xl font-bold text-orange-500">2</h3>
              <p className="mt-1 text-xs text-muted-foreground">Pendentes de validação</p>
            </div>
            <div className="rounded-full bg-orange-500/10 p-3">
              <Clock className="h-6 w-6 text-orange-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Concluídos</p>
              <h3 className="mt-2 text-3xl font-bold text-green-500">1</h3>
              <p className="mt-1 text-xs text-muted-foreground">Finalizados</p>
            </div>
            <div className="rounded-full bg-green-500/10 p-3">
              <AlertCircle className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Projetos</p>
              <h3 className="mt-2 text-3xl font-bold">5</h3>
              <p className="mt-1 text-xs text-muted-foreground">Todos os registros</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar por número, coordenador, unidade, financiador..."
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2">
            <select className="rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none">
              <option>Todos os status</option>
              <option>Em Execução</option>
              <option>Aguardando</option>
              <option>Concluídos</option>
            </select>
            <select className="rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none">
              <option>Todas as unidades</option>
              <option>Bio-Manguinhos</option>
              <option>ENSP</option>
            </select>
            <select className="rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none">
              <option>Todos os tipos</option>
              <option>Pesquisa</option>
              <option>Extensão</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Projects List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Nº Projeto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Coordenador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Unidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Data Início
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Responsável
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-muted/50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">PRJ-2025-001</td>
                <td className="px-6 py-4 text-sm">Desenvolvimento de Vacina contra Dengue</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">Dr. João Silva</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">Bio-Manguinhos</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Em Execução
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">14/01/2025</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">Maria Santos</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <button className="text-primary hover:text-primary/80 font-medium">
                    Ver detalhes
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-muted/50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">PRJ-2025-002</td>
                <td className="px-6 py-4 text-sm">Estudo Epidemiológico COVID-19</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">Dra. Ana Paula</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">ENSP</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-500">
                    Em Validação
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">31/01/2025</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">Pedro Oliveira</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <button className="text-primary hover:text-primary/80 font-medium">
                    Ver detalhes
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
