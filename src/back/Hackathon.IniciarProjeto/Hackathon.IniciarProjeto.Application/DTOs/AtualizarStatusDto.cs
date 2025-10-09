using Hackathon.IniciarProjeto.Domain.Enums;

namespace Hackathon.IniciarProjeto.Application.DTOs;

public record AtualizarStatusDto
{
    public EtapaProjeto NovaEtapa { get; init; }
}