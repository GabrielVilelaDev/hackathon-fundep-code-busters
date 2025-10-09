using System.Collections.Concurrent;
using Hackathon.IniciarProjeto.Domain.Entities;
using Hackathon.IniciarProjeto.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Hackathon.IniciarProjeto.Infrastructure.Repositories;

public class ProjetoRepositoryInMemory : IProjetoRepository
{
    private readonly ConcurrentDictionary<Guid, Projeto> _projetos = new();
    private readonly ILogger<ProjetoRepositoryInMemory> _logger;

    public ProjetoRepositoryInMemory(ILogger<ProjetoRepositoryInMemory> logger)
    {
        _logger = logger;
    }

    public async Task AdicionarAsync(Projeto projeto)
    {
        _logger.LogInformation("Adicionando projeto ao repositório: {ProjetoId}", projeto.Id);
        
        _projetos.TryAdd(projeto.Id, projeto);
        
        await Task.CompletedTask;
    }

    public async Task<Projeto?> ObterPorIdAsync(Guid id)
    {
        _logger.LogInformation("Buscando projeto no repositório: {ProjetoId}", id);
        
        _projetos.TryGetValue(id, out var projeto);
        
        return await Task.FromResult(projeto);
    }

    public async Task AtualizarAsync(Projeto projeto)
    {
        _logger.LogInformation("Atualizando projeto no repositório: {ProjetoId}", projeto.Id);
        
        _projetos.TryUpdate(projeto.Id, projeto, _projetos[projeto.Id]);
        
        await Task.CompletedTask;
    }
}