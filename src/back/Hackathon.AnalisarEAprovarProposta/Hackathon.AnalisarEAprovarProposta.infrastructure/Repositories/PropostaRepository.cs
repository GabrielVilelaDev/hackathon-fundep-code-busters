using Hackathon.AnalisarEAprovarProposta.Domain.Entities;
using Hackathon.AnalisarEAprovarProposta.Domain.Enums;
using Hackathon.AnalisarEAprovarProposta.Domain.Interfaces;

namespace Hackathon.AnalisarEAprovarProposta.Infrastructure.Repositories;
public class PropostaRepository : IPropostaRepository
{
    private readonly List<Proposta> _propostas = new();

    public Task<Proposta?> ObterPorIdAsync(long id)
    {
        var proposta = _propostas.FirstOrDefault(p => p.Id == id);
        return Task.FromResult(proposta);
    }

    public Task<List<Proposta>> ListarTodasAsync(StatusProposta? status = null)
    {
        var result = status.HasValue
            ? _propostas.Where(p => p.Status == status.Value).ToList()
            : _propostas.ToList();
        return Task.FromResult(result);
    }

    public Task CriarAsync(Proposta proposta)
    {
        _propostas.Add(proposta);
        return Task.CompletedTask;
    }

    public Task AtualizarAsync(Proposta proposta)
    {
        var index = _propostas.FindIndex(p => p.Id == proposta.Id);
        if (index >= 0)
            _propostas[index] = proposta;
        return Task.CompletedTask;
    }

    public Task<bool> TentarLockAsync(long propostaId)
    {
        var proposta = _propostas.FirstOrDefault(p => p.Id == propostaId);
        if (proposta == null || proposta.EmProcesso)
            return Task.FromResult(false);

        proposta.EmProcesso = true;
        return Task.FromResult(true);
    }

    public Task LiberarLockAsync(long propostaId)
    {
        var proposta = _propostas.FirstOrDefault(p => p.Id == propostaId);
        if (proposta != null)
            proposta.EmProcesso = false;
        return Task.CompletedTask;
    }
}
