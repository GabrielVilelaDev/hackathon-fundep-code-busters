import { Link } from 'react-router-dom'
import { Button } from '@design-system'
import { Card, CardHeader, CardTitle, CardContent } from '@design-system'

export default function ProspeccaoDashboard() {
  // Mock data - replace with actual data from API
  const stats = {
    totalPropostas: 42,
    emAnalise: 15,
    aprovadas: 20,
    rejeitadas: 7,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Prospecção</h1>
          <p className="text-muted-foreground">
            Gerencie propostas e oportunidades de negócio
          </p>
        </div>
        
        <Link to="/prospeccao/propostas/nova">
          <Button>Nova Proposta</Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total de Propostas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPropostas}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Em Análise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.emAnalise}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Aprovadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.aprovadas}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Rejeitadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejeitadas}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Link to="/prospeccao/propostas" className="block">
            <Button variant="outline" className="w-full justify-start">
              Ver todas as propostas
            </Button>
          </Link>
          <Link to="/prospeccao/propostas/nova" className="block">
            <Button variant="outline" className="w-full justify-start">
              Criar nova proposta
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
