using Hackathon.IniciarProjeto.Application.DTOs;
using Hackathon.IniciarProjeto.Domain.Entities;
using Hackathon.IniciarProjeto.Domain.Events;
using Hackathon.IniciarProjeto.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Hackathon.IniciarProjeto.Application.Handlers;

public class AdicionarDocumentoHandler
{
    private readonly IProjetoRepository _projetoRepository;
    private readonly IDocumentoRepository _documentoRepository;
    private readonly IEventPublisher _eventPublisher;
    private readonly ILogger<AdicionarDocumentoHandler> _logger;

    public AdicionarDocumentoHandler(
        IProjetoRepository projetoRepository,
        IDocumentoRepository documentoRepository,
        IEventPublisher eventPublisher,
        ILogger<AdicionarDocumentoHandler> logger)
    {
        _projetoRepository = projetoRepository;
        _documentoRepository = documentoRepository;
        _eventPublisher = eventPublisher;
        _logger = logger;
    }

    public async Task<bool> ExecutarAsync(Guid projetoId, AdicionarDocumentoDto dto)
    {
        _logger.LogInformation("Adicionando documento ao projeto: {ProjetoId} - {NomeDocumento}", projetoId, dto.NomeDocumento);

        var projeto = await _projetoRepository.ObterPorIdAsync(projetoId);
        if (projeto == null)
        {
            _logger.LogWarning("Projeto não encontrado: {ProjetoId}", projetoId);
            return false;
        }

        // Criar entidade documento
        var documento = new Documento
        {
            Id = Guid.NewGuid(),
            ProjetoId = projetoId,
            NomeDocumento = dto.NomeDocumento,
            ConteudoBase64 = dto.ConteudoBase64,
            TipoConteudo = ObterTipoConteudo(dto.NomeDocumento),
            Tamanho = CalcularTamanhoBase64(dto.ConteudoBase64),
            DataUpload = DateTime.UtcNow,
            UsuarioUpload = "Sistema" // Em um cenário real, seria obtido do contexto de autenticação
        };

        // Adicionar documento ao repositório
        await _documentoRepository.AdicionarAsync(documento);

        // Adicionar documento à lista do projeto (para manter consistência)
        projeto.Documentos.Add(documento);
        await _projetoRepository.AtualizarAsync(projeto);

        _logger.LogInformation("Documento processado com sucesso: {DocumentoId} - {NomeDocumento}", 
            documento.Id, dto.NomeDocumento);

        var evento = new DocumentoAdicionadoEvent(projetoId, dto.NomeDocumento, DateTime.UtcNow);
        await _eventPublisher.PublishAsync(evento);

        return true;
    }

    private static string ObterTipoConteudo(string nomeDocumento)
    {
        var extensao = Path.GetExtension(nomeDocumento).ToLowerInvariant();
        return extensao switch
        {
            ".pdf" => "application/pdf",
            ".doc" => "application/msword",
            ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ".xls" => "application/vnd.ms-excel",
            ".xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ".jpg" or ".jpeg" => "image/jpeg",
            ".png" => "image/png",
            ".txt" => "text/plain",
            _ => "application/octet-stream"
        };
    }

    private static long CalcularTamanhoBase64(string conteudoBase64)
    {
        if (string.IsNullOrEmpty(conteudoBase64))
            return 0;

        // Cálculo aproximado do tamanho em bytes de uma string Base64
        var padding = conteudoBase64.EndsWith("==") ? 2 : conteudoBase64.EndsWith("=") ? 1 : 0;
        return (conteudoBase64.Length * 3 / 4) - padding;
    }
}