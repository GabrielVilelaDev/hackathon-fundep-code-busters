using Hackathon.InscricaoEvento.Domain.Enums;

namespace Hackathon.InscricaoEvento.Application.DTOs;

public record RealizarMatriculaDto
{
    public string CodigoAluno { get; init; } = string.Empty;
    public Guid EventoId { get; init; }
    public TipoPagamento TipoPagamento { get; init; }
}