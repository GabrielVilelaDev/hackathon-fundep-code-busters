/**
 * Formulário completo para importar projeto
 * Usando React Hook Form + Zod + shadcn/ui
 */

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
import { useImportarProjeto } from '@/hooks/useProjetos'
import {
  ImportarProjetoDto,
  TipoOrcamento,
  TipoAplicacaoPermitida,
} from '@/types/projetos.types'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

// Schema de validação com Zod
const importarProjetoSchema = z.object({
  codigoProjeto: z.string().min(1, 'Código do projeto é obrigatório'),
  centroCusto: z.string().optional(),
  referenciaFundep: z.string().optional(),
  titulo: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  resumo: z.string().optional(),
  objeto: z.string().optional(),
  executor: z.string().optional(),
  coExecutor: z.string().optional(),
  referenciaExecutor: z.string().optional(),
  coordenador: z.string().min(1, 'Coordenador é obrigatório'),
  financiador: z.string().optional(),
  coFinanciador: z.string().optional(),
  origemRecurso: z.string().optional(),
  referenciaFinanciador: z.string().optional(),
  tipoOrcamento: z.nativeEnum(TipoOrcamento).optional(),
  coordenadorAcessaInternet: z.boolean().default(false),
  amf: z.number().min(0).optional(),
  moeda: z.string().optional(),
  valor: z.number().min(0, 'Valor deve ser maior que zero'),
  conta: z.string().optional(),
  custoAdministrativo: z.string().optional(),
  cronogramaLiberacao: z.string().optional(),
  bloqueiosMovimentacoes: z.string().optional(),
  tipoAplicacaoPermitida: z.nativeEnum(TipoAplicacaoPermitida).optional(),
  saldoAdiantamento: z.number().min(0).optional(),
  razaoMultiplo: z.boolean().default(false),
  banco: z.string().optional(),
  agencia: z.string().optional(),
  contaBancaria: z.string().optional(),
  moedaParaOrcar: z.string().optional(),
  absorcaoTarifaFundep: z.boolean().default(false),
  mostrarOrcamentoMesmoSemLiberacao045: z.boolean().default(false),
  dataImplantacao: z.string().min(1, 'Data de implantação é obrigatória'),
  implantacaoProvisoria: z.boolean().default(false),
  dataAssinatura: z.string().min(1, 'Data de assinatura é obrigatória'),
  dataLimiteDespesas: z.string().optional(),
  inicioPrevisto: z.string().min(1, 'Data de início é obrigatória'),
  terminoPrevisto: z.string().min(1, 'Data de término é obrigatória'),
  aguardandoProrrogacaoPara: z.string().optional(),
})

type ImportarProjetoFormData = z.infer<typeof importarProjetoSchema>

export const ImportarProjetoFormComplete = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { mutate: importarProjeto, isPending } = useImportarProjeto()

  const form = useForm<ImportarProjetoFormData>({
    resolver: zodResolver(importarProjetoSchema),
    defaultValues: {
      coordenadorAcessaInternet: false,
      razaoMultiplo: false,
      absorcaoTarifaFundep: false,
      mostrarOrcamentoMesmoSemLiberacao045: false,
      implantacaoProvisoria: false,
      valor: 0,
      amf: 0,
      saldoAdiantamento: 0,
    },
  })

  const onSubmit = (data: ImportarProjetoFormData) => {
    importarProjeto(data as ImportarProjetoDto, {
      onSuccess: (projeto) => {
        toast({
          title: 'Projeto importado com sucesso!',
          description: `Projeto ${projeto.codigoProjeto} foi criado.`,
        })
        navigate(`/projetos/${projeto.id}`)
      },
      onError: (error) => {
        toast({
          title: 'Erro ao importar projeto',
          description: error.message,
          variant: 'destructive',
        })
      },
    })
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Importar Novo Projeto</CardTitle>
          <CardDescription>
            Preencha os dados abaixo para importar um novo projeto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Informações Básicas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informações Básicas</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="codigoProjeto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código do Projeto *</FormLabel>
                        <FormControl>
                          <Input placeholder="PROJ-2024-001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="centroCusto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Centro de Custo</FormLabel>
                        <FormControl>
                          <Input placeholder="CC-001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título *</FormLabel>
                      <FormControl>
                        <Input placeholder="Título do projeto" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="resumo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resumo</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Breve resumo do projeto..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="objeto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objeto</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Objeto do projeto..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Pessoas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pessoas</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="coordenador"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Coordenador *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do coordenador" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="executor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Executor</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do executor" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="coExecutor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Co-Executor</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do co-executor" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="financiador"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Financiador</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do financiador" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="coordenadorAcessaInternet"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Coordenador Acessa Internet
                        </FormLabel>
                        <FormDescription>
                          O coordenador tem acesso à internet?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Valores */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Valores</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="valor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>Valor total do projeto</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="moeda"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Moeda</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a moeda" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="BRL">Real (BRL)</SelectItem>
                            <SelectItem value="USD">Dólar (USD)</SelectItem>
                            <SelectItem value="EUR">Euro (EUR)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tipoOrcamento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Orçamento</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(parseInt(value))}
                          value={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Tipo 1</SelectItem>
                            <SelectItem value="2">Tipo 2</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="saldoAdiantamento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Saldo Adiantamento</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Datas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Datas</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dataImplantacao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Implantação *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dataAssinatura"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Assinatura *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="inicioPrevisto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Início Previsto *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="terminoPrevisto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Término Previsto *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dataLimiteDespesas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data Limite de Despesas</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Informações Bancárias */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informações Bancárias</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="banco"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Banco</FormLabel>
                        <FormControl>
                          <Input placeholder="001 - Banco do Brasil" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agencia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agência</FormLabel>
                        <FormControl>
                          <Input placeholder="1234-5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contaBancaria"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conta Bancária</FormLabel>
                        <FormControl>
                          <Input placeholder="12345678-9" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Opções Adicionais */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Opções Adicionais</h3>
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="razaoMultiplo"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Razão Múltiplo</FormLabel>
                          <FormDescription>Projeto com múltiplas razões</FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="absorcaoTarifaFundep"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Absorção Tarifa Fundep
                          </FormLabel>
                          <FormDescription>
                            A Fundep absorve as tarifas bancárias
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="implantacaoProvisoria"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Implantação Provisória
                          </FormLabel>
                          <FormDescription>
                            A implantação é provisória
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/projetos')}
                  disabled={isPending}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isPending ? 'Importando...' : 'Importar Projeto'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
