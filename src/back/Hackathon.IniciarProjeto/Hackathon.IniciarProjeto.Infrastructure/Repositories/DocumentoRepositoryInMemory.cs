using System.Collections.Concurrent;
using Hackathon.IniciarProjeto.Domain.Entities;
using Hackathon.IniciarProjeto.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Hackathon.IniciarProjeto.Infrastructure.Repositories;

public class DocumentoRepositoryInMemory : IDocumentoRepository
{
    private readonly ConcurrentDictionary<Guid, Documento> _documentos = new();
    private readonly ILogger<DocumentoRepositoryInMemory> _logger;

    public DocumentoRepositoryInMemory(ILogger<DocumentoRepositoryInMemory> logger)
    {
        _logger = logger;
    }

    public async Task AdicionarAsync(Documento documento)
    {
        _logger.LogInformation("Adicionando documento ao repositório: {DocumentoId} - {NomeDocumento}", 
            documento.Id, documento.NomeDocumento);
        
        _documentos.TryAdd(documento.Id, documento);
        
        await Task.CompletedTask;
    }

    public async Task<Documento?> ObterPorIdAsync(Guid id)
    {
        _logger.LogInformation("Buscando documento no repositório: {DocumentoId}", id);
        
        _documentos.TryGetValue(id, out var documento);
        
        return await Task.FromResult(documento);
    }

    public async Task<List<Documento>> ObterPorProjetoIdAsync(Guid projetoId)
    {
        _logger.LogInformation("Buscando documentos do projeto: {ProjetoId}", projetoId);
        
        var documentos = _documentos.Values
            .Where(d => d.ProjetoId == projetoId)
            .OrderBy(d => d.DataUpload)
            .ToList();
        
        _logger.LogInformation("Encontrados {TotalDocumentos} documentos para o projeto {ProjetoId}", 
            documentos.Count, projetoId);
        
        return await Task.FromResult(documentos);
    }

    public async Task<List<Documento>> ObterTodosAsync()
    {
        _logger.LogInformation("Obtendo todos os documentos do repositório. Total: {TotalDocumentos}", 
            _documentos.Count);
        
        return await Task.FromResult(_documentos.Values.ToList());
    }

    public async Task AtualizarAsync(Documento documento)
    {
        _logger.LogInformation("Atualizando documento no repositório: {DocumentoId}", documento.Id);
        
        _documentos.TryUpdate(documento.Id, documento, _documentos[documento.Id]);
        
        await Task.CompletedTask;
    }

    public async Task RemoverAsync(Guid id)
    {
        _logger.LogInformation("Removendo documento do repositório: {DocumentoId}", id);
        
        _documentos.TryRemove(id, out _);
        
        await Task.CompletedTask;
    }
}