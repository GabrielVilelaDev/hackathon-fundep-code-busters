using Hackathon.AnalisarEAprovarProposta.Domain.Enums;

namespace Hackathon.AnalisarEAprovarProposta.Domain.Entities;

public class Proposta
{
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public decimal Orcamento { get; set; }
        public StatusProposta Status { get; set; } = StatusProposta.EmAnalise;
        public List<string> Anexos { get; set; } = new();
        public List<Analise> Historico { get; set; } = new();
    }
