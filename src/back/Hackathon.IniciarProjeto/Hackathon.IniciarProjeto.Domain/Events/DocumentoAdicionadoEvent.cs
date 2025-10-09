namespace Hackathon.IniciarProjeto.Domain.Events;

public record DocumentoAdicionadoEvent(Guid ProjetoId, string NomeDocumento, DateTime DataUpload);