using Hackathon.IniciarProjeto.Application.DTOs;
using Hackathon.IniciarProjeto.Domain.Events;
using Hackathon.IniciarProjeto.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Hackathon.IniciarProjeto.Application.Handlers;

public class AdicionarDocumentoHandler
{
    private readonly IProjetoRepository _projetoRepository;
    private readonly IEventPublisher _eventPublisher;
    private readonly ILogger<AdicionarDocumentoHandler> _logger;

    public AdicionarDocumentoHandler(
        IProjetoRepository projetoRepository,
        IEventPublisher eventPublisher,
        ILogger<AdicionarDocumentoHandler> logger)
    {
        _projetoRepository = projetoRepository;
        _eventPublisher = eventPublisher;
        _logger = logger;
    }

    public async Task<bool> ExecutarAsync(Guid projetoId, AdicionarDocumentoDto dto)
    {
        _logger.LogInformation("Adicionando documento ao projeto: {ProjetoId} - {NomeDocumento}", projetoId, dto.NomeDocumento);

        var projeto = await _projetoRepository.ObterPorIdAsync(projetoId);
        if (projeto == null)
        {
            _logger.LogWarning("Projeto não encontrado: {ProjetoId}", projetoId);
            return false;
        }

        // Simula o processamento do documento
        _logger.LogInformation("Documento processado com sucesso: {NomeDocumento}", dto.NomeDocumento);

        var evento = new DocumentoAdicionadoEvent(projetoId, dto.NomeDocumento, DateTime.UtcNow);
        await _eventPublisher.PublishAsync(evento);

        return true;
    }
}