using Hackathon.IniciarProjeto.Domain.Events;
using Hackathon.IniciarProjeto.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Hackathon.IniciarProjeto.Infrastructure.EventHandlers;

public class LogarProjetoAtualizadoHandler : IEventHandler<ProjetoAtualizadoEvent>
{
    private readonly ILogger<LogarProjetoAtualizadoHandler> _logger;

    public LogarProjetoAtualizadoHandler(ILogger<LogarProjetoAtualizadoHandler> logger)
    {
        _logger = logger;
    }

    public async Task HandleAsync(ProjetoAtualizadoEvent evento)
    {
        _logger.LogInformation("Projeto {ProjetoId} foi atualizado em {DataAtualizacao}. " +
            "Título: {Titulo}, Coordenador: {Coordenador}, Valor: {Valor:C}, Término: {TerminoPrevisto:d}", 
            evento.ProjetoId, 
            evento.DataAtualizacao, 
            evento.Titulo, 
            evento.Coordenador, 
            evento.NovoValor, 
            evento.NovoTerminoPrevisto);

        await Task.CompletedTask;
    }
}