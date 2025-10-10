using System.Collections.Concurrent;
using Hackathon.InscricaoEvento.Domain.Entities;
using Hackathon.InscricaoEvento.Domain.Interfaces;

namespace Hackathon.InscricaoEvento.Infrastructure.Repositories;

public class EventoRepositoryInMemory : IEventoRepository
{
    private readonly ConcurrentDictionary<Guid, Evento> _eventos = new();

    public Task AdicionarAsync(Evento evento)
    {
        _eventos.TryAdd(evento.Id, evento);
        return Task.CompletedTask;
    }

    public Task<Evento?> ObterPorIdAsync(Guid id)
    {
        _eventos.TryGetValue(id, out var evento);
        return Task.FromResult(evento);
    }

    public Task<List<Evento>> ObterTodosAsync()
    {
        return Task.FromResult(_eventos.Values.ToList());
    }

    public Task AtualizarAsync(Evento evento)
    {
        _eventos.TryUpdate(evento.Id, evento, _eventos[evento.Id]);
        return Task.CompletedTask;
    }
}