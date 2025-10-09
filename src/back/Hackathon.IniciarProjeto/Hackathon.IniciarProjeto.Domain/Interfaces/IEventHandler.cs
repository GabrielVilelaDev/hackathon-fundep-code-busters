namespace Hackathon.IniciarProjeto.Domain.Interfaces;

public interface IEventHandler<TEvent>
{
    Task HandleAsync(TEvent evento);
}