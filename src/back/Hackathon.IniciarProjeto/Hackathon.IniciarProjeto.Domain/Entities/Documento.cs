namespace Hackathon.IniciarProjeto.Domain.Entities;

public class Documento
{
    public Guid Id { get; set; }
    public Guid ProjetoId { get; set; }
    public string NomeDocumento { get; set; } = string.Empty;
    public string ConteudoBase64 { get; set; } = string.Empty;
    public string TipoConteudo { get; set; } = string.Empty;
    public long Tamanho { get; set; }
    public DateTime DataUpload { get; set; }
    public string UsuarioUpload { get; set; } = string.Empty;
    
    public Projeto Projeto { get; set; } = null!;
}