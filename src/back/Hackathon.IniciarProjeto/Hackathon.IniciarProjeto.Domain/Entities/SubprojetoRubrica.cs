namespace Hackathon.IniciarProjeto.Domain.Entities;

public class SubprojetoRubrica
{
    public Guid SubprojetoId { get; set; }
    public Guid RubricaId { get; set; }
    public Subprojeto Subprojeto { get; set; } = null!;
    public Rubrica Rubrica { get; set; } = null!;
}