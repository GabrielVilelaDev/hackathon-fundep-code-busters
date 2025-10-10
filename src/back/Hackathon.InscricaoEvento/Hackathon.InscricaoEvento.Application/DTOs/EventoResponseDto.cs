using Hackathon.InscricaoEvento.Domain.Enums;

namespace Hackathon.InscricaoEvento.Application.DTOs;

public record EventoResponseDto
{
    public Guid Id { get; init; }
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
    public DateTime DataCriacao { get; init; }
    public int TotalMatriculasConfirmadas { get; init; }
}

public record MatriculaResponseDto
{
    public Guid Id { get; init; }
    public string CodigoAluno { get; init; } = string.Empty;
    public Guid EventoId { get; init; }
    public string TituloEvento { get; init; } = string.Empty;
    public StatusMatricula Status { get; init; }
    public TipoPagamento TipoPagamento { get; init; }
    public DateTime DataMatricula { get; init; }
}