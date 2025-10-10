using Hackathon.IniciarProjeto.Application.DTOs;
using Hackathon.IniciarProjeto.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Hackathon.IniciarProjeto.Application.Handlers;

public class ListarProjetosHandler
{
    private readonly IProjetoRepository _projetoRepository;
    private readonly ILogger<ListarProjetosHandler> _logger;

    public ListarProjetosHandler(
        IProjetoRepository projetoRepository,
        ILogger<ListarProjetosHandler> logger)
    {
        _projetoRepository = projetoRepository;
        _logger = logger;
    }

    public async Task<List<ProjetoResponseDto>> ExecutarAsync()
    {
        _logger.LogInformation("Iniciando listagem de todos os projetos");

        var projetos = await _projetoRepository.ObterTodosAsync();
        
        _logger.LogInformation("Encontrados {TotalProjetos} projetos para retornar", projetos.Count);

        var result = projetos.Select(projeto => new ProjetoResponseDto
        {
            Id = projeto.Id,
            CodigoProjeto = projeto.CodigoProjeto,
            CentroCusto = projeto.CentroCusto,
            ReferenciaFundep = projeto.ReferenciaFundep,
            Titulo = projeto.Titulo,
            Resumo = projeto.Resumo,
            Objeto = projeto.Objeto,
            
            Executor = projeto.Executor,
            CoExecutor = projeto.CoExecutor,
            ReferenciaExecutor = projeto.ReferenciaExecutor,
            Coordenador = projeto.Coordenador,
            Financiador = projeto.Financiador,
            CoFinanciador = projeto.CoFinanciador,
            OrigemRecurso = projeto.OrigemRecurso,
            ReferenciaFinanciador = projeto.ReferenciaFinanciador,
            
            TipoOrcamento = projeto.TipoOrcamento,
            CoordenadorAcessaInternet = projeto.CoordenadorAcessaInternet,
            Amf = projeto.Amf,
            Moeda = projeto.Moeda,
            Valor = projeto.Valor,
            Conta = projeto.Conta,
            CustoAdministrativo = projeto.CustoAdministrativo,
            CronogramaLiberacao = projeto.CronogramaLiberacao,
            BloqueiosMovimentacoes = projeto.BloqueiosMovimentacoes,
            TipoAplicacaoPermitida = projeto.TipoAplicacaoPermitida,
            SaldoAdiantamento = projeto.SaldoAdiantamento,
            RazaoMultiplo = projeto.RazaoMultiplo,
            Banco = projeto.Banco,
            Agencia = projeto.Agencia,
            ContaBancaria = projeto.ContaBancaria,
            MoedaParaOrcar = projeto.MoedaParaOrcar,
            AbsorcaoTarifaFundep = projeto.AbsorcaoTarifaFundep,
            MostrarOrcamentoMesmoSemLiberacao045 = projeto.MostrarOrcamentoMesmoSemLiberacao045,
            
            DataImplantacao = projeto.DataImplantacao,
            ImplantacaoProvisoria = projeto.ImplantacaoProvisoria,
            DataAssinatura = projeto.DataAssinatura,
            DataLimiteDespesas = projeto.DataLimiteDespesas,
            InicioPrevisto = projeto.InicioPrevisto,
            TerminoPrevisto = projeto.TerminoPrevisto,
            AguardandoProrrogacaoPara = projeto.AguardandoProrrogacaoPara,
            ExecucaoEncerrada = projeto.ExecucaoEncerrada,
            TerminoReal = projeto.TerminoReal,
            
            Etapa = projeto.Etapa,
            DataCriacao = projeto.DataCriacao,
            Subprojetos = projeto.Subprojetos.Select(sub => new SubprojetoResponseDto
            {
                Id = sub.Id,
                CodigoSubprojeto = sub.CodigoSubprojeto,
                Nome = sub.Nome,
                Objeto = sub.Objeto,
                Observacoes = sub.Observacoes,
                Resumo = sub.Resumo,
                PropostaNumero = sub.PropostaNumero,
                InicioPrevisto = sub.InicioPrevisto,
                TerminoPrevisto = sub.TerminoPrevisto,
                TerminoReal = sub.TerminoReal,
                ExecucaoEncerrada = sub.ExecucaoEncerrada,
                ValidadeGestaoDe = sub.ValidadeGestaoDe,
                ValidadeGestaoAte = sub.ValidadeGestaoAte,
                LocacaoCebas = sub.LocacaoCebas,
                SubprojetoSubstituto = sub.SubprojetoSubstituto,
                Rubricas = sub.Rubricas.Select(sr => new RubricaResponseDto
                {
                    Id = sr.Rubrica.Id,
                    Codigo = sr.Rubrica.Codigo,
                    Descricao = sr.Rubrica.Descricao,
                    Tipo = sr.Rubrica.Tipo,
                    Origem = sr.Rubrica.Origem,
                    Patrimoniavel = sr.Rubrica.Patrimoniavel,
                    RepresentaTaxa = sr.Rubrica.RepresentaTaxa,
                    Servico = sr.Rubrica.Servico,
                    ReceitaFundep = sr.Rubrica.ReceitaFundep
                }).ToList()
            }).ToList(),
            Documentos = projeto.Documentos.Select(doc => new DocumentoResponseDto
            {
                Id = doc.Id,
                NomeDocumento = doc.NomeDocumento,
                TipoConteudo = doc.TipoConteudo,
                Tamanho = doc.Tamanho,
                DataUpload = doc.DataUpload,
                UsuarioUpload = doc.UsuarioUpload
            }).ToList()
        }).ToList();

        _logger.LogInformation("Listagem de projetos concluída com sucesso");

        return result;
    }
}