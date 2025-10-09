using Hackathon.IniciarProjeto.Application.DTOs;
using Hackathon.IniciarProjeto.Domain.Events;
using Hackathon.IniciarProjeto.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Hackathon.IniciarProjeto.Application.Handlers;

public class AtualizarStatusHandler
{
    private readonly IProjetoRepository _projetoRepository;
    private readonly IEventPublisher _eventPublisher;
    private readonly ILogger<AtualizarStatusHandler> _logger;

    public AtualizarStatusHandler(
        IProjetoRepository projetoRepository,
        IEventPublisher eventPublisher,
        ILogger<AtualizarStatusHandler> logger)
    {
        _projetoRepository = projetoRepository;
        _eventPublisher = eventPublisher;
        _logger = logger;
    }

    public async Task<bool> ExecutarAsync(Guid projetoId, AtualizarStatusDto dto)
    {
        _logger.LogInformation("Atualizando status do projeto: {ProjetoId} para {NovaEtapa}", projetoId, dto.NovaEtapa);

        var projeto = await _projetoRepository.ObterPorIdAsync(projetoId);
        if (projeto == null)
        {
            _logger.LogWarning("Projeto não encontrado: {ProjetoId}", projetoId);
            return false;
        }

        projeto.Etapa = dto.NovaEtapa;
        await _projetoRepository.AtualizarAsync(projeto);

        var evento = new ProjetoStatusAtualizadoEvent(projetoId, dto.NovaEtapa, DateTime.UtcNow);
        await _eventPublisher.PublishAsync(evento);

        _logger.LogInformation("Status do projeto atualizado com sucesso: {ProjetoId}", projetoId);

        return true;
    }
}