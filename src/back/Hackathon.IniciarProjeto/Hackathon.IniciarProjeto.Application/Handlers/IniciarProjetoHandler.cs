using Hackathon.IniciarProjeto.Application.DTOs;
using Hackathon.IniciarProjeto.Domain.Entities;
using Hackathon.IniciarProjeto.Domain.Enums;
using Hackathon.IniciarProjeto.Domain.Events;
using Hackathon.IniciarProjeto.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Hackathon.IniciarProjeto.Application.Handlers;

public class IniciarProjetoHandler
{
    private readonly IProjetoRepository _projetoRepository;
    private readonly IRubricaRepository _rubricaRepository;
    private readonly IEventPublisher _eventPublisher;
    private readonly ILogger<IniciarProjetoHandler> _logger;

    public IniciarProjetoHandler(
        IProjetoRepository projetoRepository,
        IRubricaRepository rubricaRepository,
        IEventPublisher eventPublisher,
        ILogger<IniciarProjetoHandler> logger)
    {
        _projetoRepository = projetoRepository;
        _rubricaRepository = rubricaRepository;
        _eventPublisher = eventPublisher;
        _logger = logger;
    }

    public async Task<Guid> ExecutarAsync(ImportarProjetoDto dto)
    {
        _logger.LogInformation("Iniciando criação do projeto: {Titulo}", dto.Titulo);

        var projeto = new Projeto
        {
            Id = Guid.NewGuid(),
            CodigoProjeto = dto.CodigoProjeto,
            CentroCusto = dto.CentroCusto,
            ReferenciaFundep = dto.ReferenciaFundep,
            Titulo = dto.Titulo,
            Resumo = dto.Resumo,
            Objeto = dto.Objeto,
            
            Executor = dto.Executor,
            CoExecutor = dto.CoExecutor,
            ReferenciaExecutor = dto.ReferenciaExecutor,
            Coordenador = dto.Coordenador,
            Financiador = dto.Financiador,
            CoFinanciador = dto.CoFinanciador,
            OrigemRecurso = dto.OrigemRecurso,
            ReferenciaFinanciador = dto.ReferenciaFinanciador,
            
            TipoOrcamento = dto.TipoOrcamento,
            CoordenadorAcessaInternet = dto.CoordenadorAcessaInternet,
            Amf = dto.Amf,
            Moeda = dto.Moeda,
            Valor = dto.Valor,
            Conta = dto.Conta,
            CustoAdministrativo = dto.CustoAdministrativo,
            CronogramaLiberacao = dto.CronogramaLiberacao,
            BloqueiosMovimentacoes = dto.BloqueiosMovimentacoes,
            TipoAplicacaoPermitida = dto.TipoAplicacaoPermitida,
            SaldoAdiantamento = dto.SaldoAdiantamento,
            RazaoMultiplo = dto.RazaoMultiplo,
            Banco = dto.Banco,
            Agencia = dto.Agencia,
            ContaBancaria = dto.ContaBancaria,
            MoedaParaOrcar = dto.MoedaParaOrcar,
            AbsorcaoTarifaFundep = dto.AbsorcaoTarifaFundep,
            MostrarOrcamentoMesmoSemLiberacao045 = dto.MostrarOrcamentoMesmoSemLiberacao045,
            
            DataImplantacao = dto.DataImplantacao,
            ImplantacaoProvisoria = dto.ImplantacaoProvisoria,
            DataAssinatura = dto.DataAssinatura,
            DataLimiteDespesas = dto.DataLimiteDespesas,
            InicioPrevisto = dto.InicioPrevisto,
            TerminoPrevisto = dto.TerminoPrevisto,
            AguardandoProrrogacaoPara = dto.AguardandoProrrogacaoPara,
            ExecucaoEncerrada = false,
            TerminoReal = null,
            
            Etapa = EtapaProjeto.Iniciacao,
            DataCriacao = DateTime.UtcNow,
            Subprojetos = new List<Subprojeto>()
        };

        // Processar subprojetos
        foreach (var subprojetoDto in dto.Subprojetos)
        {
            var subprojeto = new Subprojeto
            {
                Id = Guid.NewGuid(),
                ProjetoId = projeto.Id,
                CodigoSubprojeto = subprojetoDto.CodigoSubprojeto,
                Nome = subprojetoDto.Nome,
                Objeto = subprojetoDto.Objeto,
                Observacoes = subprojetoDto.Observacoes,
                Resumo = subprojetoDto.Resumo,
                PropostaNumero = subprojetoDto.PropostaNumero,
                InicioPrevisto = subprojetoDto.InicioPrevisto,
                TerminoPrevisto = subprojetoDto.TerminoPrevisto,
                TerminoReal = null,
                ExecucaoEncerrada = false,
                ValidadeGestaoDe = subprojetoDto.ValidadeGestaoDe,
                ValidadeGestaoAte = subprojetoDto.ValidadeGestaoAte,
                LocacaoCebas = subprojetoDto.LocacaoCebas,
                SubprojetoSubstituto = subprojetoDto.SubprojetoSubstituto,
                Rubricas = new List<SubprojetoRubrica>()
            };

            // Processar rubricas do subprojeto
            foreach (var rubricaDto in subprojetoDto.Rubricas)
            {
                // Verificar se a rubrica já existe
                var rubricaExistente = await _rubricaRepository.ObterPorCodigoAsync(rubricaDto.Codigo);
                
                Rubrica rubrica;
                if (rubricaExistente == null)
                {
                    // Criar nova rubrica
                    rubrica = new Rubrica
                    {
                        Id = Guid.NewGuid(),
                        Codigo = rubricaDto.Codigo,
                        Descricao = rubricaDto.Descricao,
                        Tipo = rubricaDto.Tipo,
                        Origem = rubricaDto.Origem,
                        Patrimoniavel = rubricaDto.Patrimoniavel,
                        RepresentaTaxa = rubricaDto.RepresentaTaxa,
                        Servico = rubricaDto.Servico,
                        ReceitaFundep = rubricaDto.ReceitaFundep
                    };
                    
                    await _rubricaRepository.AdicionarAsync(rubrica);
                }
                else
                {
                    rubrica = rubricaExistente;
                }

                // Associar rubrica ao subprojeto
                subprojeto.Rubricas.Add(new SubprojetoRubrica
                {
                    SubprojetoId = subprojeto.Id,
                    RubricaId = rubrica.Id,
                    Subprojeto = subprojeto,
                    Rubrica = rubrica
                });
            }

            projeto.Subprojetos.Add(subprojeto);
        }

        await _projetoRepository.AdicionarAsync(projeto);

        var evento = new ProjetoCadastradoEvent(projeto.Id, projeto.Titulo, projeto.Coordenador);
        await _eventPublisher.PublishAsync(evento);

        _logger.LogInformation("Projeto criado com sucesso. ID: {ProjetoId}", projeto.Id);

        return projeto.Id;
    }
}