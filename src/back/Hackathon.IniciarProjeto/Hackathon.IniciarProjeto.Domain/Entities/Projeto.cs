using Hackathon.IniciarProjeto.Domain.Enums;

namespace Hackathon.IniciarProjeto.Domain.Entities;

public class Projeto
{
    public Guid Id { get; set; }
    public string CodigoProjeto { get; set; } = string.Empty;
    public string CentroCusto { get; set; } = string.Empty;
    public string ReferenciaFundep { get; set; } = string.Empty;
    public string Titulo { get; set; } = string.Empty;
    public string Resumo { get; set; } = string.Empty;
    public string Objeto { get; set; } = string.Empty;
    
    public string Executor { get; set; } = string.Empty;
    public string? CoExecutor { get; set; }
    public string ReferenciaExecutor { get; set; } = string.Empty;
    public string Coordenador { get; set; } = string.Empty;
    public string Financiador { get; set; } = string.Empty;
    public string? CoFinanciador { get; set; }
    public string OrigemRecurso { get; set; } = string.Empty;
    public string ReferenciaFinanciador { get; set; } = string.Empty;
    
    public TipoOrcamento TipoOrcamento { get; set; }
    public bool CoordenadorAcessaInternet { get; set; }
    public decimal Amf { get; set; }
    public string Moeda { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public string Conta { get; set; } = string.Empty;
    public string CustoAdministrativo { get; set; } = string.Empty;
    public string CronogramaLiberacao { get; set; } = string.Empty;
    public string BloqueiosMovimentacoes { get; set; } = string.Empty;
    public TipoAplicacaoPermitida TipoAplicacaoPermitida { get; set; }
    public decimal SaldoAdiantamento { get; set; }
    public bool RazaoMultiplo { get; set; }
    public string Banco { get; set; } = string.Empty;
    public string Agencia { get; set; } = string.Empty;
    public string ContaBancaria { get; set; } = string.Empty;
    public string MoedaParaOrcar { get; set; } = string.Empty;
    public bool AbsorcaoTarifaFundep { get; set; }
    public bool MostrarOrcamentoMesmoSemLiberacao045 { get; set; }
    
    public DateTime DataImplantacao { get; set; }
    public bool ImplantacaoProvisoria { get; set; }
    public DateTime DataAssinatura { get; set; }
    public DateTime? DataLimiteDespesas { get; set; }
    public DateTime InicioPrevisto { get; set; }
    public DateTime TerminoPrevisto { get; set; }
    public DateTime? AguardandoProrrogacaoPara { get; set; }
    public bool ExecucaoEncerrada { get; set; }
    public DateTime? TerminoReal { get; set; }
    
    public EtapaProjeto Etapa { get; set; }
    public DateTime DataCriacao { get; set; }
    
    public List<Subprojeto> Subprojetos { get; set; } = new();
    public List<Documento> Documentos { get; set; } = new();
}