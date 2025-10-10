// Enums
export enum EtapaProjeto {
  Iniciacao = 1,
  Execucao = 2,
  PrestacaoDeContas = 3,
}

export enum TipoRubrica {
  Servico = 1,
  Material = 2,
}

export enum OrigemRubrica {
  Nacional = 1,
  Importado = 2,
}

export enum PatrimoniaveRubrica {
  Nao = 1,
  Sim = 2,
}

export enum RepresentaTaxaRubrica {
  Direta = 1,
  Indireta = 2,
}

export enum ServicoRubrica {
  Pessoal = 1,
  CompraNacional = 2,
  CompraImportado = 3,
}

export enum TipoOrcamento {
  Oficial = 1,
  Provisorio = 2,
}

export enum TipoAplicacaoPermitida {
  AplicacaoLivre = 1,
  AplicacaoRestrita = 2,
}

// DTOs
export interface RubricaDto {
  codigo: string;
  descricao: string;
  tipo: TipoRubrica;
  origem: OrigemRubrica;
  patrimoniavel: PatrimoniaveRubrica;
  representaTaxa: RepresentaTaxaRubrica;
  servico: ServicoRubrica;
  receitaFundep: boolean;
}

export interface SubprojetoDto {
  codigoSubprojeto: string;
  nome: string;
  objeto: string;
  observacoes?: string;
  resumo?: string;
  propostaNumero?: string;
  inicioPrevisto: string;
  terminoPrevisto: string;
  validadeGestaoDe?: string;
  validadeGestaoAte?: string;
  locacaoCebas?: string;
  subprojetoSubstituto?: string;
  rubricas: RubricaDto[];
}

export interface ImportarProjetoDto {
  codigoProjeto: string;
  centroCusto: string;
  referenciaFundep: string;
  titulo: string;
  resumo: string;
  objeto: string;
  
  executor: string;
  coExecutor?: string;
  referenciaExecutor: string;
  coordenador: string;
  financiador: string;
  coFinanciador?: string;
  origemRecurso: string;
  referenciaFinanciador: string;
  
  tipoOrcamento: TipoOrcamento;
  coordenadorAcessaInternet: boolean;
  amf: number;
  moeda: string;
  valor: number;
  conta: string;
  custoAdministrativo: string;
  cronogramaLiberacao: string;
  bloqueiosMovimentacoes: string;
  tipoAplicacaoPermitida: TipoAplicacaoPermitida;
  saldoAdiantamento: number;
  razaoMultiplo: boolean;
  banco: string;
  agencia: string;
  contaBancaria: string;
  moedaParaOrcar: string;
  absorcaoTarifaFundep: boolean;
  mostrarOrcamentoMesmoSemLiberacao045: boolean;
  
  dataImplantacao: string;
  implantacaoProvisoria: boolean;
  dataAssinatura: string;
  dataLimiteDespesas?: string;
  inicioPrevisto: string;
  terminoPrevisto: string;
  aguardandoProrrogacaoPara?: string;
  
  subprojetos: SubprojetoDto[];
}

export interface AtualizarProjetoDto {
  titulo: string;
  resumo: string;
  objeto: string;
  
  coordenador: string;
  coExecutor?: string;
  coFinanciador?: string;
  
  valor: number;
  custoAdministrativo: string;
  cronogramaLiberacao: string;
  bloqueiosMovimentacoes: string;
  
  dataLimiteDespesas?: string;
  inicioPrevisto: string;
  terminoPrevisto: string;
  aguardandoProrrogacaoPara?: string;
}

export interface AtualizarStatusDto {
  novaEtapa: EtapaProjeto;
}

export interface AdicionarDocumentoDto {
  nomeDocumento: string;
  conteudoBase64: string;
}

// Response Types
export interface DocumentoResponse {
  id: string;
  nomeDocumento: string;
  dataUpload: string;
  tamanho: number;
}

export interface ProjetoResponse {
  id: string;
  codigoProjeto: string;
  centroCusto: string;
  referenciaFundep: string;
  titulo: string;
  resumo: string;
  objeto: string;
  
  executor: string;
  coExecutor?: string;
  referenciaExecutor: string;
  coordenador: string;
  financiador: string;
  coFinanciador?: string;
  origemRecurso: string;
  referenciaFinanciador: string;
  
  tipoOrcamento: TipoOrcamento;
  coordenadorAcessaInternet: boolean;
  amf: number;
  moeda: string;
  valor: number;
  conta: string;
  custoAdministrativo: string;
  cronogramaLiberacao: string;
  bloqueiosMovimentacoes: string;
  tipoAplicacaoPermitida: TipoAplicacaoPermitida;
  saldoAdiantamento: number;
  razaoMultiplo: boolean;
  banco: string;
  agencia: string;
  contaBancaria: string;
  moedaParaOrcar: string;
  absorcaoTarifaFundep: boolean;
  mostrarOrcamentoMesmoSemLiberacao045: boolean;
  
  dataImplantacao: string;
  implantacaoProvisoria: boolean;
  dataAssinatura: string;
  dataLimiteDespesas?: string;
  inicioPrevisto: string;
  terminoPrevisto: string;
  aguardandoProrrogacaoPara?: string;
  
  etapa: EtapaProjeto;
  dataCriacao: string;
  dataUltimaAtualizacao: string;
  
  subprojetos: SubprojetoDto[];
  documentos?: DocumentoResponse[];
}

export interface RubricaResponse {
  id: string;
  codigo: string;
  descricao: string;
  tipo: TipoRubrica;
  origem: OrigemRubrica;
  patrimoniavel: PatrimoniaveRubrica;
  representaTaxa: RepresentaTaxaRubrica;
  servico: ServicoRubrica;
  receitaFundep: boolean;
}

// Helper types
export const EtapaProjetoLabels: Record<EtapaProjeto, string> = {
  [EtapaProjeto.Iniciacao]: "Iniciação",
  [EtapaProjeto.Execucao]: "Execução",
  [EtapaProjeto.PrestacaoDeContas]: "Prestação de Contas",
};

export const TipoOrcamentoLabels: Record<TipoOrcamento, string> = {
  [TipoOrcamento.Oficial]: "Oficial",
  [TipoOrcamento.Provisorio]: "Provisório",
};

export const TipoRubricaLabels: Record<TipoRubrica, string> = {
  [TipoRubrica.Servico]: "Serviço",
  [TipoRubrica.Material]: "Material",
};

export const OrigemRubricaLabels: Record<OrigemRubrica, string> = {
  [OrigemRubrica.Nacional]: "Nacional",
  [OrigemRubrica.Importado]: "Importado",
};
