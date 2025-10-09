using FluentAssertions;
using Hackathon.IniciarProjeto.Application.DTOs;
using Hackathon.IniciarProjeto.Application.Handlers;
using Hackathon.IniciarProjeto.Domain.Entities;
using Hackathon.IniciarProjeto.Domain.Enums;
using Hackathon.IniciarProjeto.Domain.Events;
using Hackathon.IniciarProjeto.Domain.Interfaces;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace Hackathon.IniciarProjeto.Application.Test.Handlers;

public class AtualizarProjetoHandlerTests
{
    private readonly Mock<IProjetoRepository> _projetoRepositoryMock;
    private readonly Mock<IEventPublisher> _eventPublisherMock;
    private readonly Mock<ILogger<AtualizarProjetoHandler>> _loggerMock;
    private readonly AtualizarProjetoHandler _handler;

    public AtualizarProjetoHandlerTests()
    {
        _projetoRepositoryMock = new Mock<IProjetoRepository>();
        _eventPublisherMock = new Mock<IEventPublisher>();
        _loggerMock = new Mock<ILogger<AtualizarProjetoHandler>>();

        _handler = new AtualizarProjetoHandler(
            _projetoRepositoryMock.Object,
            _eventPublisherMock.Object,
            _loggerMock.Object);
    }

    [Fact]
    public async Task ExecutarAsync_DeveAtualizarProjeto_QuandoProjetoExiste()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        var dto = CriarAtualizarProjetoDtoValido();

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        var resultado = await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        resultado.Should().BeTrue();
        
        // Verificar se os campos foram atualizados
        projeto.Titulo.Should().Be(dto.Titulo);
        projeto.Resumo.Should().Be(dto.Resumo);
        projeto.Objeto.Should().Be(dto.Objeto);
        projeto.Coordenador.Should().Be(dto.Coordenador);
        projeto.CoExecutor.Should().Be(dto.CoExecutor);
        projeto.CoFinanciador.Should().Be(dto.CoFinanciador);
        projeto.Valor.Should().Be(dto.Valor);
        projeto.CustoAdministrativo.Should().Be(dto.CustoAdministrativo);
        projeto.CronogramaLiberacao.Should().Be(dto.CronogramaLiberacao);
        projeto.BloqueiosMovimentacoes.Should().Be(dto.BloqueiosMovimentacoes);
        projeto.DataLimiteDespesas.Should().Be(dto.DataLimiteDespesas);
        projeto.InicioPrevisto.Should().Be(dto.InicioPrevisto);
        projeto.TerminoPrevisto.Should().Be(dto.TerminoPrevisto);
        projeto.AguardandoProrrogacaoPara.Should().Be(dto.AguardandoProrrogacaoPara);

        _projetoRepositoryMock.Verify(x => x.AtualizarAsync(projeto), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DevePublicarEvento_AposAtualizarProjeto()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        var dto = CriarAtualizarProjetoDtoValido();

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        var dataAntes = DateTime.UtcNow;
        await _handler.ExecutarAsync(projetoId, dto);
        var dataDepois = DateTime.UtcNow;

        // Assert
        _eventPublisherMock.Verify(x => x.PublishAsync(It.Is<ProjetoAtualizadoEvent>(e =>
            e.ProjetoId == projetoId &&
            e.Titulo == dto.Titulo &&
            e.Coordenador == dto.Coordenador &&
            e.NovoValor == dto.Valor &&
            e.NovoTerminoPrevisto == dto.TerminoPrevisto &&
            e.DataAtualizacao >= dataAntes &&
            e.DataAtualizacao <= dataDepois
        )), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveRetornarFalse_QuandoProjetoNaoExiste()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var dto = CriarAtualizarProjetoDtoValido();

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync((Projeto?)null);

        // Act
        var resultado = await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        resultado.Should().BeFalse();
        
        _projetoRepositoryMock.Verify(x => x.AtualizarAsync(It.IsAny<Projeto>()), Times.Never);
        _eventPublisherMock.Verify(x => x.PublishAsync(It.IsAny<ProjetoAtualizadoEvent>()), Times.Never);
    }

    [Fact]
    public async Task ExecutarAsync_DeveManterCamposImutaveis()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        var dto = CriarAtualizarProjetoDtoValido();

        var codigoOriginal = projeto.CodigoProjeto;
        var etapaOriginal = projeto.Etapa;
        var dataCriacaoOriginal = projeto.DataCriacao;
        var dataImplantacaoOriginal = projeto.DataImplantacao;

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        await _handler.ExecutarAsync(projetoId, dto);

        // Assert - Campos que não devem ser alterados
        projeto.CodigoProjeto.Should().Be(codigoOriginal);
        projeto.Etapa.Should().Be(etapaOriginal);
        projeto.DataCriacao.Should().Be(dataCriacaoOriginal);
        projeto.DataImplantacao.Should().Be(dataImplantacaoOriginal);
    }

    [Fact]
    public async Task ExecutarAsync_DeveLogInformacoes_QuandoProjetoExiste()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        var dto = CriarAtualizarProjetoDtoValido();

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString()!.Contains("Iniciando atualização do projeto")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception?, string>>()),
            Times.Once);

        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString()!.Contains("Projeto atualizado com sucesso")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception?, string>>()),
            Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveLogWarning_QuandoProjetoNaoExiste()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var dto = CriarAtualizarProjetoDtoValido();

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync((Projeto?)null);

        // Act
        await _handler.ExecutarAsync(projetoId, dto);

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
    public async Task ExecutarAsync_DeveTratarValoresNulosOpcionais()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        var dto = CriarAtualizarProjetoDtoValido() with 
        { 
            CoExecutor = null, 
            CoFinanciador = null,
            DataLimiteDespesas = null,
            AguardandoProrrogacaoPara = null
        };

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        var resultado = await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        resultado.Should().BeTrue();
        projeto.CoExecutor.Should().BeNull();
        projeto.CoFinanciador.Should().BeNull();
        projeto.DataLimiteDespesas.Should().BeNull();
        projeto.AguardandoProrrogacaoPara.Should().BeNull();
    }

    [Fact]
    public async Task ExecutarAsync_DeveChamarRepositorio_ComIdCorreto()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var dto = CriarAtualizarProjetoDtoValido();

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync((Projeto?)null);

        // Act
        await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        _projetoRepositoryMock.Verify(x => x.ObterPorIdAsync(projetoId), Times.Once);
    }

    private static Projeto CriarProjetoValido(Guid id)
    {
        return new Projeto
        {
            Id = id,
            CodigoProjeto = "1/25",
            CentroCusto = "ASSESSORIA (6.11)",
            ReferenciaFundep = "FUNDEP 1/25",
            Titulo = "Título Original",
            Resumo = "Resumo original do projeto",
            Objeto = "Objeto original do projeto",
            Executor = "SUP-SUPERINTENDENCIA (FUNDEP-FUND.DESEN)",
            CoExecutor = "Co-executor original",
            ReferenciaExecutor = "001",
            Coordenador = "COORDENADOR ORIGINAL [96007]",
            Financiador = "FUNDAÇÃO DE DESENVOLVIMENTO DA PESQUISA",
            CoFinanciador = "Co-financiador original",
            OrigemRecurso = "FUNDAÇÃO DE DESENVOLVIMENTO DA PESQUISA",
            ReferenciaFinanciador = "0177",
            TipoOrcamento = TipoOrcamento.Oficial,
            CoordenadorAcessaInternet = true,
            Amf = 0.0m,
            Moeda = "REAL [R$]",
            Valor = 100000.00m,
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
            DataLimiteDespesas = DateTime.Today.AddDays(300),
            InicioPrevisto = DateTime.Today.AddDays(1),
            TerminoPrevisto = DateTime.Today.AddDays(300),
            AguardandoProrrogacaoPara = null,
            ExecucaoEncerrada = false,
            TerminoReal = null,
            Etapa = EtapaProjeto.Iniciacao,
            DataCriacao = DateTime.UtcNow.AddDays(-1),
            Subprojetos = new List<Subprojeto>()
        };
    }

    private static AtualizarProjetoDto CriarAtualizarProjetoDtoValido()
    {
        return new AtualizarProjetoDto
        {
            Titulo = "Projeto Atualizado",
            Resumo = "Resumo do projeto atualizado para testes",
            Objeto = "Objeto do projeto atualizado com descrição detalhada",
            Coordenador = "JOAO DA SILVA [12345]",
            CoExecutor = "MARIA SANTOS [67890]",
            CoFinanciador = "EMPRESA PARCEIRA LTDA",
            Valor = 150000.00m,
            CustoAdministrativo = "8%",
            CronogramaLiberacao = "Trimestral",
            BloqueiosMovimentacoes = "Nenhum bloqueio",
            DataLimiteDespesas = DateTime.Today.AddDays(320),
            InicioPrevisto = DateTime.Today.AddDays(5),
            TerminoPrevisto = DateTime.Today.AddDays(365),
            AguardandoProrrogacaoPara = DateTime.Today.AddDays(400)
        };
    }
}