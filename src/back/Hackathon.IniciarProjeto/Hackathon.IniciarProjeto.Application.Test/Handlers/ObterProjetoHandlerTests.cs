using FluentAssertions;
using Hackathon.IniciarProjeto.Application.Handlers;
using Hackathon.IniciarProjeto.Domain.Entities;
using Hackathon.IniciarProjeto.Domain.Enums;
using Hackathon.IniciarProjeto.Domain.Interfaces;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace Hackathon.IniciarProjeto.Application.Test.Handlers;

public class ObterProjetoHandlerTests
{
    private readonly Mock<IProjetoRepository> _projetoRepositoryMock;
    private readonly Mock<ILogger<ObterProjetoHandler>> _loggerMock;
    private readonly ObterProjetoHandler _handler;

    public ObterProjetoHandlerTests()
    {
        _projetoRepositoryMock = new Mock<IProjetoRepository>();
        _loggerMock = new Mock<ILogger<ObterProjetoHandler>>();

        _handler = new ObterProjetoHandler(
            _projetoRepositoryMock.Object,
            _loggerMock.Object);
    }

    [Fact]
    public async Task ExecutarAsync_DeveRetornarProjeto_QuandoProjetoExiste()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        
        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        var resultado = await _handler.ExecutarAsync(projetoId);

        // Assert
        resultado.Should().NotBeNull();
        resultado!.Id.Should().Be(projetoId);
        resultado.Titulo.Should().Be(projeto.Titulo);
        resultado.CodigoProjeto.Should().Be(projeto.CodigoProjeto);
        resultado.Coordenador.Should().Be(projeto.Coordenador);
        resultado.Etapa.Should().Be(projeto.Etapa);
        resultado.Subprojetos.Should().HaveCount(projeto.Subprojetos.Count);
    }

    [Fact]
    public async Task ExecutarAsync_DeveRetornarNull_QuandoProjetoNaoExiste()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        
        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync((Projeto?)null);

        // Act
        var resultado = await _handler.ExecutarAsync(projetoId);

        // Assert
        resultado.Should().BeNull();
    }

    [Fact]
    public async Task ExecutarAsync_DeveMapearSubprojetos_QuandoProjetoTemSubprojetos()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        
        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        var resultado = await _handler.ExecutarAsync(projetoId);

        // Assert
        resultado.Should().NotBeNull();
        resultado!.Subprojetos.Should().HaveCount(1);
        
        var subprojeto = resultado.Subprojetos.First();
        var subprojetoOriginal = projeto.Subprojetos.First();
        
        subprojeto.Id.Should().Be(subprojetoOriginal.Id);
        subprojeto.CodigoSubprojeto.Should().Be(subprojetoOriginal.CodigoSubprojeto);
        subprojeto.Nome.Should().Be(subprojetoOriginal.Nome);
        subprojeto.Objeto.Should().Be(subprojetoOriginal.Objeto);
    }

    [Fact]
    public async Task ExecutarAsync_DeveMapearRubricas_QuandoSubprojetoTemRubricas()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        
        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        var resultado = await _handler.ExecutarAsync(projetoId);

        // Assert
        resultado.Should().NotBeNull();
        resultado!.Subprojetos.First().Rubricas.Should().HaveCount(1);
        
        var rubrica = resultado.Subprojetos.First().Rubricas.First();
        var rubricaOriginal = projeto.Subprojetos.First().Rubricas.First().Rubrica;
        
        rubrica.Id.Should().Be(rubricaOriginal.Id);
        rubrica.Codigo.Should().Be(rubricaOriginal.Codigo);
        rubrica.Descricao.Should().Be(rubricaOriginal.Descricao);
        rubrica.Tipo.Should().Be(rubricaOriginal.Tipo);
        rubrica.Origem.Should().Be(rubricaOriginal.Origem);
    }

    [Fact]
    public async Task ExecutarAsync_DeveMapearTodosOsCamposFinanceiros()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        
        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        var resultado = await _handler.ExecutarAsync(projetoId);

        // Assert
        resultado.Should().NotBeNull();
        resultado!.Valor.Should().Be(projeto.Valor);
        resultado.Moeda.Should().Be(projeto.Moeda);
        resultado.Banco.Should().Be(projeto.Banco);
        resultado.Agencia.Should().Be(projeto.Agencia);
        resultado.ContaBancaria.Should().Be(projeto.ContaBancaria);
        resultado.TipoOrcamento.Should().Be(projeto.TipoOrcamento);
        resultado.TipoAplicacaoPermitida.Should().Be(projeto.TipoAplicacaoPermitida);
    }

    [Fact]
    public async Task ExecutarAsync_DeveMapearDatas()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        
        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        var resultado = await _handler.ExecutarAsync(projetoId);

        // Assert
        resultado.Should().NotBeNull();
        resultado!.DataCriacao.Should().Be(projeto.DataCriacao);
        resultado.DataImplantacao.Should().Be(projeto.DataImplantacao);
        resultado.DataAssinatura.Should().Be(projeto.DataAssinatura);
        resultado.InicioPrevisto.Should().Be(projeto.InicioPrevisto);
        resultado.TerminoPrevisto.Should().Be(projeto.TerminoPrevisto);
    }

    [Fact]
    public async Task ExecutarAsync_DeveLogInformacoes_QuandoProjetoExiste()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        
        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        await _handler.ExecutarAsync(projetoId);

        // Assert
        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString()!.Contains("Obtendo projeto")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception?, string>>()),
            Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveLogWarning_QuandoProjetoNaoExiste()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        
        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync((Projeto?)null);

        // Act
        await _handler.ExecutarAsync(projetoId);

        // Assert
        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Warning,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString()!.Contains("Projeto não encontrado")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception?, string>>()),
            Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveChamarRepositorio_ComIdCorreto()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        
        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync((Projeto?)null);

        // Act
        await _handler.ExecutarAsync(projetoId);

        // Assert
        _projetoRepositoryMock.Verify(x => x.ObterPorIdAsync(projetoId), Times.Once);
    }

    private static Projeto CriarProjetoValido(Guid id)
    {
        var rubrica = new Rubrica
        {
            Id = Guid.NewGuid(),
            Codigo = "101",
            Descricao = "Serviços Técnicos Especializados",
            Tipo = TipoRubrica.Servico,
            Origem = OrigemRubrica.Nacional,
            Patrimoniavel = PatrimoniaveRubrica.Nao,
            RepresentaTaxa = RepresentaTaxaRubrica.Direta,
            Servico = ServicoRubrica.Pessoal,
            ReceitaFundep = true
        };

        var subprojeto = new Subprojeto
        {
            Id = Guid.NewGuid(),
            ProjetoId = id,
            CodigoSubprojeto = "01",
            Nome = "Receitas",
            Objeto = "Receita",
            InicioPrevisto = DateTime.Today.AddDays(1),
            TerminoPrevisto = DateTime.Today.AddDays(365),
            Rubricas = new List<SubprojetoRubrica>
            {
                new SubprojetoRubrica
                {
                    SubprojetoId = Guid.NewGuid(),
                    RubricaId = rubrica.Id,
                    Rubrica = rubrica
                }
            }
        };

        return new Projeto
        {
            Id = id,
            CodigoProjeto = "1/25",
            CentroCusto = "ASSESSORIA (6.11)",
            ReferenciaFundep = "FUNDEP 1/25",
            Titulo = "FUNDEP 1/25",
            Resumo = "FUNDEP 1/25 - Projeto de gestão interna",
            Objeto = "Gestão administrativa e execução interna da fundação.",
            Executor = "SUP-SUPERINTENDENCIA (FUNDEP-FUND.DESEN)",
            ReferenciaExecutor = "001",
            Coordenador = "JAIME ARTURO RAMIREZ [96007]",
            Financiador = "FUNDAÇÃO DE DESENVOLVIMENTO DA PESQUISA",
            OrigemRecurso = "FUNDAÇÃO DE DESENVOLVIMENTO DA PESQUISA",
            ReferenciaFinanciador = "0177",
            TipoOrcamento = TipoOrcamento.Oficial,
            CoordenadorAcessaInternet = true,
            Amf = 0.0m,
            Moeda = "REAL [R$]",
            Valor = 46928224.51m,
            Conta = "VINCULADA",
            CustoAdministrativo = "5%",
            CronogramaLiberacao = "Mensal",
            BloqueiosMovimentacoes = "Nenhum",
            TipoAplicacaoPermitida = TipoAplicacaoPermitida.AplicacaoLivre,
            SaldoAdiantamento = 0.0m,
            RazaoMultiplo = false,
            Banco = "BANCO DO BRASIL S/A [001]",
            Agencia = "SETOR PUBLICO BHZ [001*1.615-2]",
            ContaBancaria = "480.109-1",
            MoedaParaOrcar = "REAL [R$]",
            AbsorcaoTarifaFundep = true,
            MostrarOrcamentoMesmoSemLiberacao045 = true,
            DataImplantacao = DateTime.Today.AddDays(-30),
            ImplantacaoProvisoria = false,
            DataAssinatura = DateTime.Today.AddDays(-10),
            InicioPrevisto = DateTime.Today.AddDays(1),
            TerminoPrevisto = DateTime.Today.AddDays(365),
            ExecucaoEncerrada = false,
            Etapa = EtapaProjeto.Iniciacao,
            DataCriacao = DateTime.UtcNow.AddDays(-1),
            Subprojetos = new List<Subprojeto> { subprojeto }
        };
    }
}