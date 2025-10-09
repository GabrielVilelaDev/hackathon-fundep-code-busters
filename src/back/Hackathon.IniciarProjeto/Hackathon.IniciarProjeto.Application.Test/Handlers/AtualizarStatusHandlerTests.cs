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

public class AtualizarStatusHandlerTests
{
    private readonly Mock<IProjetoRepository> _projetoRepositoryMock;
    private readonly Mock<IEventPublisher> _eventPublisherMock;
    private readonly Mock<ILogger<AtualizarStatusHandler>> _loggerMock;
    private readonly AtualizarStatusHandler _handler;

    public AtualizarStatusHandlerTests()
    {
        _projetoRepositoryMock = new Mock<IProjetoRepository>();
        _eventPublisherMock = new Mock<IEventPublisher>();
        _loggerMock = new Mock<ILogger<AtualizarStatusHandler>>();

        _handler = new AtualizarStatusHandler(
            _projetoRepositoryMock.Object,
            _eventPublisherMock.Object,
            _loggerMock.Object);
    }

    [Fact]
    public async Task ExecutarAsync_DeveAtualizarStatus_QuandoProjetoExiste()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        var dto = new AtualizarStatusDto { NovaEtapa = EtapaProjeto.Execucao };

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        var resultado = await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        resultado.Should().BeTrue();
        projeto.Etapa.Should().Be(EtapaProjeto.Execucao);
        
        _projetoRepositoryMock.Verify(x => x.AtualizarAsync(projeto), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DevePublicarEvento_AposAtualizarStatus()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        var dto = new AtualizarStatusDto { NovaEtapa = EtapaProjeto.PrestacaoDeContas };

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        var dataAntes = DateTime.UtcNow;
        await _handler.ExecutarAsync(projetoId, dto);
        var dataDepois = DateTime.UtcNow;

        // Assert
        _eventPublisherMock.Verify(x => x.PublishAsync(It.Is<ProjetoStatusAtualizadoEvent>(e =>
            e.ProjetoId == projetoId &&
            e.NovaEtapa == EtapaProjeto.PrestacaoDeContas &&
            e.DataAtualizacao >= dataAntes &&
            e.DataAtualizacao <= dataDepois
        )), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveRetornarFalse_QuandoProjetoNaoExiste()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var dto = new AtualizarStatusDto { NovaEtapa = EtapaProjeto.Execucao };

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync((Projeto?)null);

        // Act
        var resultado = await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        resultado.Should().BeFalse();
        
        _projetoRepositoryMock.Verify(x => x.AtualizarAsync(It.IsAny<Projeto>()), Times.Never);
        _eventPublisherMock.Verify(x => x.PublishAsync(It.IsAny<ProjetoStatusAtualizadoEvent>()), Times.Never);
    }

    [Theory]
    [InlineData(EtapaProjeto.Iniciacao)]
    [InlineData(EtapaProjeto.Execucao)]
    [InlineData(EtapaProjeto.PrestacaoDeContas)]
    public async Task ExecutarAsync_DeveAtualizarParaQualquerEtapa(EtapaProjeto novaEtapa)
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        var dto = new AtualizarStatusDto { NovaEtapa = novaEtapa };

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        var resultado = await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        resultado.Should().BeTrue();
        projeto.Etapa.Should().Be(novaEtapa);
    }

    [Fact]
    public async Task ExecutarAsync_DeveLogInformacoes_QuandoProjetoExiste()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        var dto = new AtualizarStatusDto { NovaEtapa = EtapaProjeto.Execucao };

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString()!.Contains("Atualizando status do projeto")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception?, string>>()),
            Times.Once);

        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString()!.Contains("Status do projeto atualizado com sucesso")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception?, string>>()),
            Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveLogWarning_QuandoProjetoNaoExiste()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var dto = new AtualizarStatusDto { NovaEtapa = EtapaProjeto.Execucao };

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
    public async Task ExecutarAsync_DeveChamarRepositorioParaBuscar_ComIdCorreto()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var dto = new AtualizarStatusDto { NovaEtapa = EtapaProjeto.Execucao };

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync((Projeto?)null);

        // Act
        await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        _projetoRepositoryMock.Verify(x => x.ObterPorIdAsync(projetoId), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveManterOutrasPropriedades_AposAtualizacao()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        var tituloOriginal = projeto.Titulo;
        var coordenadorOriginal = projeto.Coordenador;
        var valorOriginal = projeto.Valor;
        var dto = new AtualizarStatusDto { NovaEtapa = EtapaProjeto.Execucao };

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        projeto.Titulo.Should().Be(tituloOriginal);
        projeto.Coordenador.Should().Be(coordenadorOriginal);
        projeto.Valor.Should().Be(valorOriginal);
        projeto.Etapa.Should().Be(EtapaProjeto.Execucao); // Apenas esta propriedade deve ter mudado
    }

    private static Projeto CriarProjetoValido(Guid id)
    {
        return new Projeto
        {
            Id = id,
            CodigoProjeto = "1/25",
            Titulo = "FUNDEP 1/25",
            Coordenador = "JAIME ARTURO RAMIREZ [96007]",
            Valor = 46928224.51m,
            Etapa = EtapaProjeto.Iniciacao,
            DataCriacao = DateTime.UtcNow.AddDays(-1),
            CentroCusto = "ASSESSORIA (6.11)",
            ReferenciaFundep = "FUNDEP 1/25",
            Resumo = "FUNDEP 1/25 - Projeto de gestão interna",
            Objeto = "Gestão administrativa e execução interna da fundação.",
            Executor = "SUP-SUPERINTENDENCIA (FUNDEP-FUND.DESEN)",
            ReferenciaExecutor = "001",
            Financiador = "FUNDAÇÃO DE DESENVOLVIMENTO DA PESQUISA",
            OrigemRecurso = "FUNDAÇÃO DE DESENVOLVIMENTO DA PESQUISA",
            ReferenciaFinanciador = "0177",
            TipoOrcamento = TipoOrcamento.Oficial,
            CoordenadorAcessaInternet = true,
            Amf = 0.0m,
            Moeda = "REAL [R$]",
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
            Subprojetos = new List<Subprojeto>()
        };
    }
}