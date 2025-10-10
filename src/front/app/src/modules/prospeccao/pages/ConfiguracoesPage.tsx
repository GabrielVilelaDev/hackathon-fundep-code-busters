import { Card, Button } from '@design-system'
import { Save, Plus, Edit, Trash2 } from 'lucide-react'

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Configurações e Automações</h1>
          <p className="text-sm text-muted-foreground">Gerencie regras automáticas e configurações do sistema</p>
        </div>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Salvar Configurações
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-8">
          <button className="border-b-2 border-primary pb-3 text-sm font-medium text-primary">
            Automações
          </button>
          <button className="pb-3 text-sm font-medium text-muted-foreground hover:text-foreground">
            Mapeamentos
          </button>
          <button className="pb-3 text-sm font-medium text-muted-foreground hover:text-foreground">
            Validações
          </button>
          <button className="pb-3 text-sm font-medium text-muted-foreground hover:text-foreground">
            Notificações
          </button>
        </div>
      </div>

      {/* Automation Rules Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Regras de Automação</h2>
            <p className="text-sm text-muted-foreground">Configure regras automáticas de alocação e processamento</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Regra
          </Button>
        </div>

        {/* Rules Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Nome da Regra
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Condição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Ação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-background">
                <tr className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="peer sr-only" defaultChecked />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20"></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">Auto-atribuição por unidade</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Unidade = Bio-Manguinhos</td>
                  <td className="px-6 py-4 text-sm">Atribuir a Maria Santos</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="rounded p-1 hover:bg-muted">
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="rounded p-1 hover:bg-muted">
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>

                <tr className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="peer sr-only" defaultChecked />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20"></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">Validação de documentos obrigatórios</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Tipo = Pesquisa</td>
                  <td className="px-6 py-4 text-sm">Exigir TAP e Plano de Trabalho</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="rounded p-1 hover:bg-muted">
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="rounded p-1 hover:bg-muted">
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>

                <tr className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="peer sr-only" defaultChecked />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20"></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">Aprovação extra para alto valor</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Valor &gt; R$ 1.000.000</td>
                  <td className="px-6 py-4 text-sm">Adicionar aprovação da diretoria</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="rounded p-1 hover:bg-muted">
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="rounded p-1 hover:bg-muted">
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Automatic Assignment Section */}
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Atribuição Automática de Analistas</h2>
        <p className="mb-6 text-sm text-muted-foreground">Configure regras de distribuição por unidade e tipo</p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium">Unidade</label>
            <select className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>Selecione a unidade</option>
              <option>Bio-Manguinhos</option>
              <option>ENSP</option>
              <option>IOC</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Tipo</label>
            <select className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>Selecione o tipo</option>
              <option>Pesquisa</option>
              <option>Extensão</option>
              <option>Ensino</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Analista Responsável</label>
            <select className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>Selecione o analista</option>
              <option>Maria Santos</option>
              <option>Pedro Oliveira</option>
              <option>Ana Silva</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Adicionar
          </Button>
        </div>
      </Card>
    </div>
  )
}
