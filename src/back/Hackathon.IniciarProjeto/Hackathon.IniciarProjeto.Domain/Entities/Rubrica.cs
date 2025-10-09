using Hackathon.IniciarProjeto.Domain.Enums;

namespace Hackathon.IniciarProjeto.Domain.Entities;

public class Rubrica
{
    public Guid Id { get; set; }
    public string Codigo { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public TipoRubrica Tipo { get; set; }
    public OrigemRubrica Origem { get; set; }
    public PatrimoniaveRubrica Patrimoniavel { get; set; }
    public RepresentaTaxaRubrica RepresentaTaxa { get; set; }
    public ServicoRubrica Servico { get; set; }
    public bool ReceitaFundep { get; set; }
}