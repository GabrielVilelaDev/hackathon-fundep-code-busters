namespace Hackathon.InscricaoEvento.Application.DTOs;

public record CadastrarEventoDto
{
    public string Titulo { get; init; } = string.Empty;
    public string Descricao { get; init; } = string.Empty;
    public string Local { get; init; } = string.Empty;
    public string Ministrantes { get; init; } = string.Empty;
    public DateTime DataInicioMatricula { get; init; }
    public DateTime DataFimMatricula { get; init; }
    public DateTime DataInicioEvento { get; init; }
    public DateTime DataFimEvento { get; init; }
    public int NumeroMaximoInscritos { get; init; }
    public decimal Valor { get; init; }
}