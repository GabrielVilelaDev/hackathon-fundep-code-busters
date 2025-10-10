using Hackathon.AnalisarEAprovarProposta.Domain.Entities;
using Hackathon.AnalisarEAprovarProposta.Domain.Enums;

namespace Hackathon.AnalisarEAprovarProposta.Domain.Interfaces
{
    public interface IPropostaRepository
    {
        Task<Proposta?> ObterPorIdAsync(long id);
        Task<List<Proposta>> ListarTodasAsync(StatusProposta? status = null);
        Task AtualizarAsync(Proposta proposta);
    }

}
