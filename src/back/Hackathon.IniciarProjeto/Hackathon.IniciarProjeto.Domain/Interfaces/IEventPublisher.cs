namespace Hackathon.IniciarProjeto.Domain.Interfaces;

public interface IEventPublisher
{
    Task PublishAsync<TEvent>(TEvent evento) where TEvent : class;
}