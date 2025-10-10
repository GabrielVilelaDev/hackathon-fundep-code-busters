using System.Collections.Concurrent;
using Hackathon.InscricaoEvento.Domain.Entities;
using Hackathon.InscricaoEvento.Domain.Enums;
using Hackathon.InscricaoEvento.Domain.Interfaces;

namespace Hackathon.InscricaoEvento.Infrastructure.Repositories;

public class MatriculaRepositoryInMemory : IMatriculaRepository
{
    private readonly ConcurrentDictionary<Guid, Matricula> _matriculas = new();
    private readonly IEventoRepository _eventoRepository;

    public MatriculaRepositoryInMemory(IEventoRepository eventoRepository)
    {
        _eventoRepository = eventoRepository;
    }

    public async Task AdicionarAsync(Matricula matricula)
    {
        // Carregar dados do evento para a navegação
        matricula.Evento = await _eventoRepository.ObterPorIdAsync(matricula.EventoId) ?? new Evento();
        _matriculas.TryAdd(matricula.Id, matricula);
    }

    public Task<Matricula?> ObterPorIdAsync(Guid id)
    {
        _matriculas.TryGetValue(id, out var matricula);
        return Task.FromResult(matricula);
    }

    public Task<List<Matricula>> ObterPorCodigoAlunoAsync(string codigoAluno)
    {
        var matriculas = _matriculas.Values
            .Where(m => m.CodigoAluno == codigoAluno)
            .ToList();
        return Task.FromResult(matriculas);
    }

    public Task<List<Matricula>> ObterPorEventoIdAsync(Guid eventoId)
    {
        var matriculas = _matriculas.Values
            .Where(m => m.EventoId == eventoId)
            .ToList();
        return Task.FromResult(matriculas);
    }

    public Task<int> ContarMatriculasConfirmadasPorEventoAsync(Guid eventoId)
    {
        var total = _matriculas.Values
            .Count(m => m.EventoId == eventoId && m.Status == StatusMatricula.Confirmada);
        return Task.FromResult(total);
    }

    public Task AtualizarAsync(Matricula matricula)
    {
        _matriculas.TryUpdate(matricula.Id, matricula, _matriculas[matricula.Id]);
        return Task.CompletedTask;
    }
}