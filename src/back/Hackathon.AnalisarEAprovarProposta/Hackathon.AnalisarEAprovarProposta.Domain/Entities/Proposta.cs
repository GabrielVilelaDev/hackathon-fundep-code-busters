using Hackathon.AnalisarEAprovarProposta.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hackathon.AnalisarEAprovarProposta.Domain.Entities
{
    public class Proposta
    {
        public long Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public decimal Orcamento { get; set; }
        public DateTime Prazo { get; set; }
        public string Solicitante { get; set; } = string.Empty;
        public StatusProposta Status { get; set; } = StatusProposta.EmAnalise;
        public List<Documento> Documentos { get; set; } = [];
        public DateTime DataUltimaAcao { get; set; }
        public string ResponsavelUltimaAcao { get; set; } = string.Empty;
        public string ComentarioAnalista { get; set; } = string.Empty;
        public bool EmProcesso { get; set; }
    }

    public class Documento
    {
        public string Nome { get; set; } = string.Empty;
    }
}
