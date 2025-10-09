/**
 * Tipos e interfaces gerados a partir da OpenAPI da API de Projetos
 */

// ============================================
// Enums
// ============================================

export enum EtapaProjeto {
  ETAPA_1 = 1,
  ETAPA_2 = 2,
  ETAPA_3 = 3,
}

export enum TipoOrcamento {
  TIPO_1 = 1,
  TIPO_2 = 2,
}

export enum TipoAplicacaoPermitida {
  TIPO_1 = 1,
  TIPO_2 = 2,
}

export enum TipoRubrica {
  TIPO_1 = 1,
  TIPO_2 = 2,
}

export enum OrigemRubrica {
  ORIGEM_1 = 1,
  ORIGEM_2 = 2,
}

export enum PatrimoniaveRubrica {
  SIM = 1,
  NAO = 2,
}

export enum RepresentaTaxaRubrica {
  SIM = 1,
  NAO = 2,
}

export enum ServicoRubrica {
  SERVICO_1 = 1,
  SERVICO_2 = 2,
  SERVICO_3 = 3,
}

// ============================================
// DTOs e Interfaces
// ============================================

export interface AdicionarDocumentoDto {
  nomeDocumento?: string | null
  conteudoBase64?: string | null
}

export interface AtualizarProjetoDto {
  titulo?: string | null
  resumo?: string | null
  objeto?: string | null
  coordenador?: string | null
  coExecutor?: string | null
  coFinanciador?: string | null
  valor?: number
  custoAdministrativo?: string | null
  cronogramaLiberacao?: string | null
  bloqueiosMovimentacoes?: string | null
  dataLimiteDespesas?: string | null
  inicioPrevisto: string
  terminoPrevisto: string
  aguardandoProrrogacaoPara?: string | null
}

export interface AtualizarStatusDto {
  novaEtapa: EtapaProjeto
}

export interface RubricaDto {
  codigo?: string | null
  descricao?: string | null
  tipo?: TipoRubrica
  origem?: OrigemRubrica
  patrimoniavel?: PatrimoniaveRubrica
  representaTaxa?: RepresentaTaxaRubrica
  servico?: ServicoRubrica
  receitaFundep?: boolean
}

export interface SubprojetoDto {
  codigoSubprojeto?: string | null
  nome?: string | null
  objeto?: string | null
  observacoes?: string | null
  resumo?: string | null
  propostaNumero?: string | null
  inicioPrevisto: string
  terminoPrevisto: string
  validadeGestaoDe?: string | null
  validadeGestaoAte?: string | null
  locacaoCebas?: string | null
  subprojetoSubstituto?: string | null
  rubricas?: RubricaDto[] | null
}

export interface ImportarProjetoDto {
  codigoProjeto?: string | null
  centroCusto?: string | null
  referenciaFundep?: string | null
  titulo?: string | null
  resumo?: string | null
  objeto?: string | null
  executor?: string | null
  coExecutor?: string | null
  referenciaExecutor?: string | null
  coordenador?: string | null
  financiador?: string | null
  coFinanciador?: string | null
  origemRecurso?: string | null
  referenciaFinanciador?: string | null
  tipoOrcamento?: TipoOrcamento
  coordenadorAcessaInternet?: boolean
  amf?: number
  moeda?: string | null
  valor?: number
  conta?: string | null
  custoAdministrativo?: string | null
  cronogramaLiberacao?: string | null
  bloqueiosMovimentacoes?: string | null
  tipoAplicacaoPermitida?: TipoAplicacaoPermitida
  saldoAdiantamento?: number
  razaoMultiplo?: boolean
  banco?: string | null
  agencia?: string | null
  contaBancaria?: string | null
  moedaParaOrcar?: string | null
  absorcaoTarifaFundep?: boolean
  mostrarOrcamentoMesmoSemLiberacao045?: boolean
  dataImplantacao: string
  implantacaoProvisoria?: boolean
  dataAssinatura: string
  dataLimiteDespesas?: string | null
  inicioPrevisto: string
  terminoPrevisto: string
  aguardandoProrrogacaoPara?: string | null
  subprojetos?: SubprojetoDto[] | null
}

export interface ProjetoResponseDto {
  id: string
  codigoProjeto?: string | null
  centroCusto?: string | null
  referenciaFundep?: string | null
  titulo?: string | null
  resumo?: string | null
  objeto?: string | null
  executor?: string | null
  coExecutor?: string | null
  coordenador?: string | null
  financiador?: string | null
  coFinanciador?: string | null
  valor?: number
  custoAdministrativo?: string | null
  cronogramaLiberacao?: string | null
  bloqueiosMovimentacoes?: string | null
  dataLimiteDespesas?: string | null
  inicioPrevisto: string
  terminoPrevisto: string
  aguardandoProrrogacaoPara?: string | null
  etapaAtual?: EtapaProjeto
  subprojetos?: SubprojetoDto[] | null
}

export interface Rubrica {
  id: string
  codigo?: string | null
  descricao?: string | null
  tipo?: TipoRubrica
  origem?: OrigemRubrica
  patrimoniavel?: PatrimoniaveRubrica
  representaTaxa?: RepresentaTaxaRubrica
  servico?: ServicoRubrica
  receitaFundep?: boolean
}
