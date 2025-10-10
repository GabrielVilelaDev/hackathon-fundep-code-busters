using Hackathon.IniciarProjeto.Domain.Entities;

namespace Hackathon.IniciarProjeto.Domain.Interfaces;

public interface IDocumentoRepository
{
    Task AdicionarAsync(Documento documento);
    Task<Documento?> ObterPorIdAsync(Guid id);
    Task<List<Documento>> ObterPorProjetoIdAsync(Guid projetoId);
    Task<List<Documento>> ObterTodosAsync();
    Task AtualizarAsync(Documento documento);
    Task RemoverAsync(Guid id);
}