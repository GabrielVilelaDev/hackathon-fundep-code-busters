using Hackathon.AnalisarEAprovarProposta.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hackathon.AnalisarEAprovarProposta.Application.DTOs
{
    public class PropostaResponse
    {
        public long Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public StatusProposta Status { get; set; }
        public decimal Orcamento { get; set; }
        public string Solicitante { get; set; } = string.Empty;
    }
}
