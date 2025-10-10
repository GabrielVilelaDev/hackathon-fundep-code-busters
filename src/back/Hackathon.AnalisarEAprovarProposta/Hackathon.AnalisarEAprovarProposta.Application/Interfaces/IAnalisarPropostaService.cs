using Hackathon.AnalisarEAprovarProposta.Application.DTOs;
using Hackathon.AnalisarEAprovarProposta.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hackathon.AnalisarEAprovarProposta.Application.Interfaces
{
    public interface IAnalisarPropostaService
    {
        Task<PropostaResponse> CriarPropostaAsync(PropostaRequest request);
        Task<List<PropostaResponse>> ListarPropostasAsync(StatusProposta? status = null);
        Task<PropostaResponse?> ObterPorIdAsync(long id);
        Task<PropostaResponse> AnalisarAsync(long id, AnalisarPropostaRequest request);
        Task<PropostaResponse> AprovarAsync(long id, AprovarPropostaRequest request);
        Task<PropostaResponse> DevolverAsync(long id, DevolverPropostaRequest request);
        Task<PropostaResponse> AdicionarComentarioAsync(long id, string responsavel, string comentario);
    }
}
