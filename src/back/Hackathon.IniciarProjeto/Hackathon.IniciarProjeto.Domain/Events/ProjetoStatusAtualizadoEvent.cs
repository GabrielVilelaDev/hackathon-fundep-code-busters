using Hackathon.IniciarProjeto.Domain.Enums;

namespace Hackathon.IniciarProjeto.Domain.Events;

public record ProjetoStatusAtualizadoEvent(Guid ProjetoId, EtapaProjeto NovaEtapa, DateTime DataAtualizacao);