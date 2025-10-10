using Hackathon.InscricaoEvento.Domain.Enums;

namespace Hackathon.InscricaoEvento.Domain.Entities;

public class Matricula
{
    public Guid Id { get; set; }
    public string CodigoAluno { get; set; } = string.Empty;
    public Guid EventoId { get; set; }
    public StatusMatricula Status { get; set; }
    public TipoPagamento TipoPagamento { get; set; }
    public DateTime DataMatricula { get; set; }
    
    public Evento Evento { get; set; } = null!;
}