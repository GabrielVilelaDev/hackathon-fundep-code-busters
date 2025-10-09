using System.Collections.Concurrent;
using Hackathon.IniciarProjeto.Domain.Entities;
using Hackathon.IniciarProjeto.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Hackathon.IniciarProjeto.Infrastructure.Repositories;

public class RubricaRepositoryInMemory : IRubricaRepository
{
    private readonly ConcurrentDictionary<Guid, Rubrica> _rubricas = new();
    private readonly ILogger<RubricaRepositoryInMemory> _logger;

    public RubricaRepositoryInMemory(ILogger<RubricaRepositoryInMemory> logger)
    {
        _logger = logger;
    }

    public async Task AdicionarAsync(Rubrica rubrica)
    {
        _logger.LogInformation("Adicionando rubrica ao repositório: {RubricaId} - {Codigo}", rubrica.Id, rubrica.Codigo);
        
        _rubricas.TryAdd(rubrica.Id, rubrica);
        
        await Task.CompletedTask;
    }

    public async Task<Rubrica?> ObterPorIdAsync(Guid id)
    {
        _logger.LogInformation("Buscando rubrica por ID no repositório: {RubricaId}", id);
        
        _rubricas.TryGetValue(id, out var rubrica);
        
        return await Task.FromResult(rubrica);
    }

    public async Task<Rubrica?> ObterPorCodigoAsync(string codigo)
    {
        _logger.LogInformation("Buscando rubrica por código no repositório: {Codigo}", codigo);
        
        var rubrica = _rubricas.Values.FirstOrDefault(r => r.Codigo == codigo);
        
        return await Task.FromResult(rubrica);
    }

    public async Task<List<Rubrica>> ObterTodosAsync()
    {
        _logger.LogInformation("Obtendo todas as rubricas do repositório");
        
        return await Task.FromResult(_rubricas.Values.ToList());
    }

    public async Task AtualizarAsync(Rubrica rubrica)
    {
        _logger.LogInformation("Atualizando rubrica no repositório: {RubricaId}", rubrica.Id);
        
        _rubricas.TryUpdate(rubrica.Id, rubrica, _rubricas[rubrica.Id]);
        
        await Task.CompletedTask;
    }
}