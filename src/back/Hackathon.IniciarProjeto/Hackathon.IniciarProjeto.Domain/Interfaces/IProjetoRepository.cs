using Hackathon.IniciarProjeto.Domain.Entities;

namespace Hackathon.IniciarProjeto.Domain.Interfaces;

public interface IProjetoRepository
{
    Task AdicionarAsync(Projeto projeto);
    Task<Projeto?> ObterPorIdAsync(Guid id);
    Task<List<Projeto>> ObterTodosAsync();
    Task AtualizarAsync(Projeto projeto);
}