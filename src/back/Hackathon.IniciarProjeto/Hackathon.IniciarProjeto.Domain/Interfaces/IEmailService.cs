namespace Hackathon.IniciarProjeto.Domain.Interfaces;

public interface IEmailService
{
    Task EnviarAsync(string destinatario, string assunto, string corpo);
}