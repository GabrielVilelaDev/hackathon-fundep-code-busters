namespace Hackathon.IniciarProjeto.Application.DTOs;

public record DocumentoResponseDto
{
    public Guid Id { get; init; }
    public string NomeDocumento { get; init; } = string.Empty;
    public string TipoConteudo { get; init; } = string.Empty;
    public long Tamanho { get; init; }
    public DateTime DataUpload { get; init; }
    public string UsuarioUpload { get; init; } = string.Empty;
}