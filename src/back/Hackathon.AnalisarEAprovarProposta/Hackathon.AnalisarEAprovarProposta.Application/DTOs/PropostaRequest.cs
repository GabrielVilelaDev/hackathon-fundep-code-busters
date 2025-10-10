using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hackathon.AnalisarEAprovarProposta.Application.DTOs
{
    public class PropostaRequest
    {
        public string Titulo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public decimal Orcamento { get; set; }
        public int Prazo { get; set; } // prazo em dias
        public string Solicitante { get; set; } = string.Empty;

        // Lista de documentos enviados pelo usuário
        public List<DocumentoRequest> Documentos { get; set; } = new();
    }

    public class DocumentoRequest
    {
        public string Nome { get; set; } = string.Empty;
        // se quiser, pode adicionar tipo, tamanho, etc.
    }
}
