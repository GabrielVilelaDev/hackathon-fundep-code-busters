using Hackathon.IniciarProjeto.Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Hackathon.IniciarProjeto.Infrastructure.Events;

public class LocalEventPublisher : IEventPublisher
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<LocalEventPublisher> _logger;

    public LocalEventPublisher(IServiceProvider serviceProvider, ILogger<LocalEventPublisher> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    public async Task PublishAsync<TEvent>(TEvent evento) where TEvent : class
    {
        _logger.LogInformation("Publicando evento: {EventoTipo}", typeof(TEvent).Name);

        var handlers = _serviceProvider.GetServices<IEventHandler<TEvent>>();
        
        foreach (var handler in handlers)
        {
            try
            {
                await handler.HandleAsync(evento);
                _logger.LogInformation("Evento processado com sucesso pelo handler: {HandlerTipo}", handler.GetType().Name);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao processar evento no handler: {HandlerTipo}", handler.GetType().Name);
            }
        }
    }
}