namespace Hackathon.IniciarProjeto.Application.DTOs;

public record AdicionarDocumentoDto
{
    public string NomeDocumento { get; init; } = string.Empty;
    public string ConteudoBase64 { get; init; } = string.Empty;
}