using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hackathon.AnalisarEAprovarProposta.Application.DTOs
{
    public class DevolverPropostaRequest
    {
        public string Responsavel { get; set; } = string.Empty;
        public string Comentario { get; set; } = string.Empty;
        public string Justificativa { get; set; } = string.Empty;
    }
}
