using Hackathon.InscricaoEvento.Domain.Entities;

namespace Hackathon.InscricaoEvento.Domain.Interfaces;

public interface IEventoRepository
{
    Task AdicionarAsync(Evento evento);
    Task<Evento?> ObterPorIdAsync(Guid id);
    Task<List<Evento>> ObterTodosAsync();
    Task AtualizarAsync(Evento evento);
}