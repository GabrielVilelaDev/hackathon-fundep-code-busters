using Hackathon.IniciarProjeto.Domain.Events;
using Hackathon.IniciarProjeto.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Hackathon.IniciarProjeto.Infrastructure.EventHandlers;

public class EnviarEmailCoordenadorHandler : IEventHandler<ProjetoCadastradoEvent>
{
    private readonly IEmailService _emailService;
    private readonly ILogger<EnviarEmailCoordenadorHandler> _logger;

    public EnviarEmailCoordenadorHandler(IEmailService emailService, ILogger<EnviarEmailCoordenadorHandler> logger)
    {
        _emailService = emailService;
        _logger = logger;
    }

    public async Task HandleAsync(ProjetoCadastradoEvent evento)
    {
        _logger.LogInformation("Processando evento ProjetoCadastradoEvent para projeto: {ProjetoId}", evento.ProjetoId);

        // Simula email do coordenador baseado no nome
        var emailCoordenador = $"{evento.CoordenadorEmail.Split('[')[0].Trim().Replace(" ", ".")}@fundep.ufmg.br".ToLower();

        await _emailService.EnviarAsync(
            emailCoordenador,
            "Projeto cadastrado",
            $"O projeto {evento.Nome} foi iniciado e está pronto para execução."
        );

        _logger.LogInformation("Email de notificação enviado para coordenador: {Email}", emailCoordenador);
    }
}