using Hackathon.IniciarProjeto.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Hackathon.IniciarProjeto.Infrastructure.Services;

public class EmailServiceSimulado : IEmailService
{
    private readonly ILogger<EmailServiceSimulado> _logger;

    public EmailServiceSimulado(ILogger<EmailServiceSimulado> logger)
    {
        _logger = logger;
    }

    public async Task EnviarAsync(string destinatario, string assunto, string corpo)
    {
        _logger.LogInformation("Simulando envio de email para: {Destinatario}", destinatario);
        _logger.LogInformation("Assunto: {Assunto}", assunto);
        _logger.LogInformation("Corpo: {Corpo}", corpo);
        
        // Simula latência de envio
        await Task.Delay(100);
        
        _logger.LogInformation("Email enviado com sucesso para: {Destinatario}", destinatario);
    }
}