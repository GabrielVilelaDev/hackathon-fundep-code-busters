using Hackathon.IniciarProjeto.Domain.Events;
using Hackathon.IniciarProjeto.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Hackathon.IniciarProjeto.Infrastructure.EventHandlers;

public class LogarStatusAtualizadoHandler : IEventHandler<ProjetoStatusAtualizadoEvent>
{
    private readonly ILogger<LogarStatusAtualizadoHandler> _logger;

    public LogarStatusAtualizadoHandler(ILogger<LogarStatusAtualizadoHandler> logger)
    {
        _logger = logger;
    }

    public async Task HandleAsync(ProjetoStatusAtualizadoEvent evento)
    {
        _logger.LogInformation("Status do projeto {ProjetoId} foi alterado para {NovaEtapa} em {DataAtualizacao}", 
            evento.ProjetoId, evento.NovaEtapa, evento.DataAtualizacao);

        await Task.CompletedTask;
    }
}

public class LogarDocumentoAdicionadoHandler : IEventHandler<DocumentoAdicionadoEvent>
{
    private readonly ILogger<LogarDocumentoAdicionadoHandler> _logger;

    public LogarDocumentoAdicionadoHandler(ILogger<LogarDocumentoAdicionadoHandler> logger)
    {
        _logger = logger;
    }

    public async Task HandleAsync(DocumentoAdicionadoEvent evento)
    {
        _logger.LogInformation("Documento {NomeDocumento} foi adicionado ao projeto {ProjetoId} em {DataUpload}", 
            evento.NomeDocumento, evento.ProjetoId, evento.DataUpload);

        await Task.CompletedTask;
    }
}