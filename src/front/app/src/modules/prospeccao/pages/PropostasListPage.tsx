import { Link } from 'react-router-dom'
import { Button } from '@design-system'
import { Card, CardHeader, CardTitle, CardContent } from '@design-system'

export default function PropostasListPage() {
  // Mock data - replace with React Query
  const propostas = [
    { id: '1', titulo: 'Proposta A', cliente: 'Empresa X', status: 'Em Análise', valor: 50000 },
    { id: '2', titulo: 'Proposta B', cliente: 'Empresa Y', status: 'Aprovada', valor: 75000 },
    { id: '3', titulo: 'Proposta C', cliente: 'Empresa Z', status: 'Rejeitada', valor: 30000 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Propostas</h1>
          <p className="text-muted-foreground">Lista de todas as propostas</p>
        </div>
        
        <Link to="/prospeccao/propostas/nova">
          <Button>Nova Proposta</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas as Propostas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {propostas.map((proposta) => (
              <Link
                key={proposta.id}
                to={`/prospeccao/propostas/${proposta.id}`}
                className="block rounded-lg border p-4 transition-colors hover:bg-muted"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{proposta.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{proposta.cliente}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(proposta.valor)}
                    </p>
                    <p className="text-sm text-muted-foreground">{proposta.status}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
