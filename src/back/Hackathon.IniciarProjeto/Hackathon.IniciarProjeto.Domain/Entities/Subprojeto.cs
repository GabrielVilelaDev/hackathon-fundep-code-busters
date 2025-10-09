namespace Hackathon.IniciarProjeto.Domain.Entities;

public class Subprojeto
{
    public Guid Id { get; set; }
    public Guid ProjetoId { get; set; }
    public string CodigoSubprojeto { get; set; } = string.Empty;
    public string Nome { get; set; } = string.Empty;
    public string Objeto { get; set; } = string.Empty;
    public string? Observacoes { get; set; }
    public string? Resumo { get; set; }
    public string? PropostaNumero { get; set; }
    public DateTime InicioPrevisto { get; set; }
    public DateTime TerminoPrevisto { get; set; }
    public DateTime? TerminoReal { get; set; }
    public bool ExecucaoEncerrada { get; set; }
    public DateTime? ValidadeGestaoDe { get; set; }
    public DateTime? ValidadeGestaoAte { get; set; }
    public string? LocacaoCebas { get; set; }
    public string? SubprojetoSubstituto { get; set; }

    public Projeto Projeto { get; set; } = null!;
    public List<SubprojetoRubrica> Rubricas { get; set; } = new();
}