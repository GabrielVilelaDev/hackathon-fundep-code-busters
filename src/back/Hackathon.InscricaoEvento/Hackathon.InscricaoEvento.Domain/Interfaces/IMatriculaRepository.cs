using Hackathon.InscricaoEvento.Domain.Entities;

namespace Hackathon.InscricaoEvento.Domain.Interfaces;

public interface IMatriculaRepository
{
    Task AdicionarAsync(Matricula matricula);
    Task<Matricula?> ObterPorIdAsync(Guid id);
    Task<List<Matricula>> ObterPorCodigoAlunoAsync(string codigoAluno);
    Task<List<Matricula>> ObterPorEventoIdAsync(Guid eventoId);
    Task<int> ContarMatriculasConfirmadasPorEventoAsync(Guid eventoId);
    Task AtualizarAsync(Matricula matricula);
}