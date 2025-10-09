namespace Hackathon.IniciarProjeto.Domain.Events;

public record ProjetoAtualizadoEvent(
    Guid ProjetoId, 
    string Titulo, 
    string Coordenador, 
    decimal NovoValor, 
    DateTime NovoTerminoPrevisto,
    DateTime DataAtualizacao);