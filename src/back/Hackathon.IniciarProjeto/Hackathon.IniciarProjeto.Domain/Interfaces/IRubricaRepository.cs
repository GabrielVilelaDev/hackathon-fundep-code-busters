using Hackathon.IniciarProjeto.Domain.Entities;

namespace Hackathon.IniciarProjeto.Domain.Interfaces;

public interface IRubricaRepository
{
    Task AdicionarAsync(Rubrica rubrica);
    Task<Rubrica?> ObterPorIdAsync(Guid id);
    Task<Rubrica?> ObterPorCodigoAsync(string codigo);
    Task<List<Rubrica>> ObterTodosAsync();
    Task AtualizarAsync(Rubrica rubrica);
}