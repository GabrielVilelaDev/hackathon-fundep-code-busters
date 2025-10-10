import { Card } from '@design-system'
import { DollarSign, Clock, TrendingUp, Users, Download } from 'lucide-react'
import { Button } from '@design-system'

export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Relatórios e Indicadores</h1>
          <p className="text-sm text-muted-foreground">Análise de desempenho e métricas dos projetos</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none">
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span>Total Investido</span>
              </div>
              <h3 className="mt-3 text-3xl font-bold">R$ 5,32M</h3>
              <p className="mt-2 text-xs text-green-600">+12% vs ano anterior</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Tempo Médio Cadastro</span>
              </div>
              <h3 className="mt-3 text-3xl font-bold">3,2 dias</h3>
              <p className="mt-2 text-xs text-red-600">-15% vs mês anterior</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>Taxa de Retrabalho</span>
              </div>
              <h3 className="mt-3 text-3xl font-bold">8%</h3>
              <p className="mt-2 text-xs text-green-600">-3% vs mês anterior</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Analistas Ativos</span>
              </div>
              <h3 className="mt-3 text-3xl font-bold">12</h3>
              <p className="mt-2 text-xs text-muted-foreground">Em 4 unidades</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Projects by Status */}
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Projetos por Status</h3>
          <p className="mb-6 text-sm text-muted-foreground">Distribuição atual dos projetos</p>
          
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">Em Execução</span>
                <span className="text-muted-foreground">20%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-muted">
                <div className="h-3 rounded-full bg-primary" style={{ width: '20%' }}></div>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">Em Validação</span>
                <span className="text-muted-foreground">20%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-muted">
                <div className="h-3 rounded-full bg-orange-500" style={{ width: '20%' }}></div>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">Aprovado</span>
                <span className="text-muted-foreground">20%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-muted">
                <div className="h-3 rounded-full bg-green-500" style={{ width: '20%' }}></div>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">Rascunho</span>
                <span className="text-muted-foreground">20%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-muted">
                <div className="h-3 rounded-full bg-gray-500" style={{ width: '20%' }}></div>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">Em Prospecção</span>
                <span className="text-muted-foreground">20%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-muted">
                <div className="h-3 rounded-full bg-blue-500" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Projects by Type */}
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Projetos por Tipo</h3>
          <p className="mb-6 text-sm text-muted-foreground">Categorização por tipo de projeto</p>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="mb-2 flex h-24 items-end justify-center">
                <div className="w-12 rounded-t-lg bg-primary" style={{ height: '80%' }}></div>
              </div>
              <p className="text-xs font-medium">Pesquisa</p>
              <p className="text-xs text-muted-foreground">2</p>
            </div>

            <div className="text-center">
              <div className="mb-2 flex h-24 items-end justify-center">
                <div className="w-12 rounded-t-lg bg-primary" style={{ height: '40%' }}></div>
              </div>
              <p className="text-xs font-medium">Extensão</p>
              <p className="text-xs text-muted-foreground">1</p>
            </div>

            <div className="text-center">
              <div className="mb-2 flex h-24 items-end justify-center">
                <div className="w-12 rounded-t-lg bg-primary" style={{ height: '40%' }}></div>
              </div>
              <p className="text-xs font-medium">Ensino</p>
              <p className="text-xs text-muted-foreground">1</p>
            </div>

            <div className="text-center">
              <div className="mb-2 flex h-24 items-end justify-center">
                <div className="w-12 rounded-t-lg bg-primary" style={{ height: '40%' }}></div>
              </div>
              <p className="text-xs font-medium">Outro</p>
              <p className="text-xs text-muted-foreground">1</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Stats */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Desempenho por Unidade</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Unidade</th>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Projetos Ativos</th>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Taxa Aprovação</th>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Tempo Médio</th>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Investimento</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 text-sm font-medium">Bio-Manguinhos</td>
                <td className="py-3 text-sm">5</td>
                <td className="py-3 text-sm">
                  <span className="text-green-600">92%</span>
                </td>
                <td className="py-3 text-sm">2.8 dias</td>
                <td className="py-3 text-sm font-medium">R$ 2.1M</td>
              </tr>
              <tr>
                <td className="py-3 text-sm font-medium">ENSP</td>
                <td className="py-3 text-sm">3</td>
                <td className="py-3 text-sm">
                  <span className="text-green-600">88%</span>
                </td>
                <td className="py-3 text-sm">3.2 dias</td>
                <td className="py-3 text-sm font-medium">R$ 1.8M</td>
              </tr>
              <tr>
                <td className="py-3 text-sm font-medium">IOC</td>
                <td className="py-3 text-sm">4</td>
                <td className="py-3 text-sm">
                  <span className="text-green-600">95%</span>
                </td>
                <td className="py-3 text-sm">2.5 dias</td>
                <td className="py-3 text-sm font-medium">R$ 1.4M</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
