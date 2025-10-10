
namespace Hackathon.AnalisarEAprovarProposta.Domain.Entities
{
    public class Analise
    {
        public string Acao { get; set; } // Aprovar / Devolver
        public string Comentario { get; set; }
        public DateTime DataHora { get; set; } = DateTime.UtcNow;
    }

}
