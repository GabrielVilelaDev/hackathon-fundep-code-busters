using Hackathon.AnalisarEAprovarProposta.Application.DTOs;
using Hackathon.AnalisarEAprovarProposta.Domain.Entities;
using Hackathon.AnalisarEAprovarProposta.Domain.Enums;
using Hackathon.AnalisarEAprovarProposta.Domain.Interfaces;

namespace Hackathon.AnalisarEAprovarProposta.Application.Services;

public class AnalisarPropostaService
{
    private readonly IPropostaRepository _repository;

    public AnalisarPropostaService(IPropostaRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<PropostaResponse>> ListarPropostasAsync(StatusProposta? status = null)
    {
        var propostas = await _repository.ListarTodasAsync(status);
        return propostas.Select(MapToResponse).ToList();
    }

    public async Task<PropostaResponse?> ObterPorIdAsync(long id)
    {
        var proposta = await _repository.ObterPorIdAsync(id);
        return proposta == null ? null : MapToResponse(proposta);
    }

    public async Task<PropostaResponse> AnalisarAsync(long id, AnalisarPropostaRequest request)
    {
        var proposta = await _repository.ObterPorIdAsync(id)
            ?? throw new InvalidOperationException("Proposta não encontrada.");

        if (proposta.Status != StatusProposta.EmAnalise)
            throw new InvalidOperationException("A proposta não está disponível para análise.");

        switch (request.Acao)
        {
            case "Aprovar":
                return await AprovarAsync(id, new AprovarPropostaRequest
                {
                    Responsavel = request.Responsavel,
                    Justificativa = request.Justificativa
                });
            case "Devolver":
                return await DevolverAsync(id, new DevolverPropostaRequest
                {
                    Responsavel = request.Responsavel,
                    Comentario = request.Justificativa,
                    Justificativa = request.Justificativa
                });
            default:
                throw new InvalidOperationException("Ação inválida.");
        }
    }

    private async Task<PropostaResponse> AprovarAsync(long id, AprovarPropostaRequest request)
    {
        var proposta = await _repository.ObterPorIdAsync(id)!;
        proposta.Status = StatusProposta.Aprovada;
        proposta.ResponsavelUltimaAcao = request.Responsavel;
        proposta.DataUltimaAcao = DateTime.UtcNow;
        await _repository.AtualizarAsync(proposta);

        return MapToResponse(proposta);
    }

    private async Task<PropostaResponse> DevolverAsync(long id, DevolverPropostaRequest request)
    {
        var proposta = await _repository.ObterPorIdAsync(id)!;
        proposta.Status = StatusProposta.Devolvida;
        proposta.ResponsavelUltimaAcao = request.Responsavel;
        proposta.DataUltimaAcao = DateTime.UtcNow;
        await _repository.AtualizarAsync(proposta);

        return MapToResponse(proposta);
    }

    private PropostaResponse MapToResponse(Proposta proposta)
    {
        return new PropostaResponse
        {
            Id = proposta.Id,
            Titulo = proposta.Titulo,
            Status = proposta.Status,
            Orcamento = proposta.Orcamento,
            Solicitante = proposta.Solicitante,
        };
    }
}

