using Hackathon.IniciarProjeto.Domain.Enums;

namespace Hackathon.IniciarProjeto.Application.DTOs;

public record AtualizarProjetoDto
{
    public string Titulo { get; init; } = string.Empty;
    public string Resumo { get; init; } = string.Empty;
    public string Objeto { get; init; } = string.Empty;
    
    public string Coordenador { get; init; } = string.Empty;
    public string? CoExecutor { get; init; }
    public string? CoFinanciador { get; init; }
    
    public decimal Valor { get; init; }
    public string CustoAdministrativo { get; init; } = string.Empty;
    public string CronogramaLiberacao { get; init; } = string.Empty;
    public string BloqueiosMovimentacoes { get; init; } = string.Empty;
    
    public DateTime? DataLimiteDespesas { get; init; }
    public DateTime InicioPrevisto { get; init; }
    public DateTime TerminoPrevisto { get; init; }
    public DateTime? AguardandoProrrogacaoPara { get; init; }
}