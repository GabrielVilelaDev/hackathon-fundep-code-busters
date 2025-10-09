using Hackathon.IniciarProjeto.Domain.Enums;

namespace Hackathon.IniciarProjeto.Application.DTOs;

public record ProjetoResponseDto
{
    public Guid Id { get; init; }
    public string CodigoProjeto { get; init; } = string.Empty;
    public string CentroCusto { get; init; } = string.Empty;
    public string ReferenciaFundep { get; init; } = string.Empty;
    public string Titulo { get; init; } = string.Empty;
    public string Resumo { get; init; } = string.Empty;
    public string Objeto { get; init; } = string.Empty;
    
    public string Executor { get; init; } = string.Empty;
    public string? CoExecutor { get; init; }
    public string ReferenciaExecutor { get; init; } = string.Empty;
    public string Coordenador { get; init; } = string.Empty;
    public string Financiador { get; init; } = string.Empty;
    public string? CoFinanciador { get; init; }
    public string OrigemRecurso { get; init; } = string.Empty;
    public string ReferenciaFinanciador { get; init; } = string.Empty;
    
    public TipoOrcamento TipoOrcamento { get; init; }
    public bool CoordenadorAcessaInternet { get; init; }
    public decimal Amf { get; init; }
    public string Moeda { get; init; } = string.Empty;
    public decimal Valor { get; init; }
    public string Conta { get; init; } = string.Empty;
    public string CustoAdministrativo { get; init; } = string.Empty;
    public string CronogramaLiberacao { get; init; } = string.Empty;
    public string BloqueiosMovimentacoes { get; init; } = string.Empty;
    public TipoAplicacaoPermitida TipoAplicacaoPermitida { get; init; }
    public decimal SaldoAdiantamento { get; init; }
    public bool RazaoMultiplo { get; init; }
    public string Banco { get; init; } = string.Empty;
    public string Agencia { get; init; } = string.Empty;
    public string ContaBancaria { get; init; } = string.Empty;
    public string MoedaParaOrcar { get; init; } = string.Empty;
    public bool AbsorcaoTarifaFundep { get; init; }
    public bool MostrarOrcamentoMesmoSemLiberacao045 { get; init; }
    
    public DateTime DataImplantacao { get; init; }
    public bool ImplantacaoProvisoria { get; init; }
    public DateTime DataAssinatura { get; init; }
    public DateTime? DataLimiteDespesas { get; init; }
    public DateTime InicioPrevisto { get; init; }
    public DateTime TerminoPrevisto { get; init; }
    public DateTime? AguardandoProrrogacaoPara { get; init; }
    public bool ExecucaoEncerrada { get; init; }
    public DateTime? TerminoReal { get; init; }
    
    public EtapaProjeto Etapa { get; init; }
    public DateTime DataCriacao { get; init; }
    public List<SubprojetoResponseDto> Subprojetos { get; init; } = new();
}

public record SubprojetoResponseDto
{
    public Guid Id { get; init; }
    public string CodigoSubprojeto { get; init; } = string.Empty;
    public string Nome { get; init; } = string.Empty;
    public string Objeto { get; init; } = string.Empty;
    public string? Observacoes { get; init; }
    public string? Resumo { get; init; }
    public string? PropostaNumero { get; init; }
    public DateTime InicioPrevisto { get; init; }
    public DateTime TerminoPrevisto { get; init; }
    public DateTime? TerminoReal { get; init; }
    public bool ExecucaoEncerrada { get; init; }
    public DateTime? ValidadeGestaoDe { get; init; }
    public DateTime? ValidadeGestaoAte { get; init; }
    public string? LocacaoCebas { get; init; }
    public string? SubprojetoSubstituto { get; init; }
    public List<RubricaResponseDto> Rubricas { get; init; } = new();
}

public record RubricaResponseDto
{
    public Guid Id { get; init; }
    public string Codigo { get; init; } = string.Empty;
    public string Descricao { get; init; } = string.Empty;
    public TipoRubrica Tipo { get; init; }
    public OrigemRubrica Origem { get; init; }
    public PatrimoniaveRubrica Patrimoniavel { get; init; }
    public RepresentaTaxaRubrica RepresentaTaxa { get; init; }
    public ServicoRubrica Servico { get; init; }
    public bool ReceitaFundep { get; init; }
}