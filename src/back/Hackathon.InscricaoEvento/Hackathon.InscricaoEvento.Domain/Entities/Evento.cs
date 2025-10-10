using Hackathon.InscricaoEvento.Domain.Enums;

namespace Hackathon.InscricaoEvento.Domain.Entities;

public class Evento
{
    public Guid Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public string Local { get; set; } = string.Empty;
    public string Ministrantes { get; set; } = string.Empty;
    public DateTime DataInicioMatricula { get; set; }
    public DateTime DataFimMatricula { get; set; }
    public DateTime DataInicioEvento { get; set; }
    public DateTime DataFimEvento { get; set; }
    public int NumeroMaximoInscritos { get; set; }
    public decimal Valor { get; set; }
    public DateTime DataCriacao { get; set; }
    
    public List<Matricula> Matriculas { get; set; } = new();
}