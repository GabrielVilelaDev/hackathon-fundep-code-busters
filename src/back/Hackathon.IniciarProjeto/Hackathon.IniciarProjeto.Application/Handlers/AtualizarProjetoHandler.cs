using Hackathon.IniciarProjeto.Application.DTOs;
using Hackathon.IniciarProjeto.Domain.Events;
using Hackathon.IniciarProjeto.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Hackathon.IniciarProjeto.Application.Handlers;

public class AtualizarProjetoHandler
{
    private readonly IProjetoRepository _projetoRepository;
    private readonly IEventPublisher _eventPublisher;
    private readonly ILogger<AtualizarProjetoHandler> _logger;

    public AtualizarProjetoHandler(
        IProjetoRepository projetoRepository,
        IEventPublisher eventPublisher,
        ILogger<AtualizarProjetoHandler> logger)
    {
        _projetoRepository = projetoRepository;
        _eventPublisher = eventPublisher;
        _logger = logger;
    }

    public async Task<bool> ExecutarAsync(Guid projetoId, AtualizarProjetoDto dto)
    {
        _logger.LogInformation("Iniciando atualização do projeto: {ProjetoId}", projetoId);

        var projeto = await _projetoRepository.ObterPorIdAsync(projetoId);
        if (projeto == null)
        {
            _logger.LogWarning("Projeto não encontrado: {ProjetoId}", projetoId);
            return false;
        }

        _logger.LogInformation("Atualizando dados do projeto {ProjetoId} - Título: {TituloAntigo} -> {TituloNovo}", 
            projetoId, projeto.Titulo, dto.Titulo);

        // Atualizar os campos editáveis
        projeto.Titulo = dto.Titulo;
        projeto.Resumo = dto.Resumo;
        projeto.Objeto = dto.Objeto;
        projeto.Coordenador = dto.Coordenador;
        projeto.CoExecutor = dto.CoExecutor;
        projeto.CoFinanciador = dto.CoFinanciador;
        projeto.Valor = dto.Valor;
        projeto.CustoAdministrativo = dto.CustoAdministrativo;
        projeto.CronogramaLiberacao = dto.CronogramaLiberacao;
        projeto.BloqueiosMovimentacoes = dto.BloqueiosMovimentacoes;
        projeto.DataLimiteDespesas = dto.DataLimiteDespesas;
        projeto.InicioPrevisto = dto.InicioPrevisto;
        projeto.TerminoPrevisto = dto.TerminoPrevisto;
        projeto.AguardandoProrrogacaoPara = dto.AguardandoProrrogacaoPara;

        await _projetoRepository.AtualizarAsync(projeto);

        var evento = new ProjetoAtualizadoEvent(
            projetoId, 
            projeto.Titulo, 
            projeto.Coordenador, 
            projeto.Valor, 
            projeto.TerminoPrevisto,
            DateTime.UtcNow);

        await _eventPublisher.PublishAsync(evento);

        _logger.LogInformation("Projeto atualizado com sucesso: {ProjetoId}", projetoId);

        return true;
    }
}