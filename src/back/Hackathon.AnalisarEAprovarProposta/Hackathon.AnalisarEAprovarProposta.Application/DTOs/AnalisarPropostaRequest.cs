using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hackathon.AnalisarEAprovarProposta.Application.DTOs
{
    public class AnalisarPropostaRequest
    {
        public string Responsavel { get; set; } = string.Empty;
        public string Acao { get; set; } = string.Empty;
        public string Justificativa { get; set; } = string.Empty;
    }
}
