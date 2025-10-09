namespace Hackathon.IniciarProjeto.Domain.Events;

public record ProjetoCadastradoEvent(Guid ProjetoId, string Nome, string CoordenadorEmail);