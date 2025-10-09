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

public class AdicionarDocumentoHandlerTests  
{
    private readonly Mock<IProjetoRepository> _projetoRepositoryMock;
    private readonly Mock<IEventPublisher> _eventPublisherMock;
    private readonly Mock<ILogger<AdicionarDocumentoHandler>> _loggerMock;
    private readonly AdicionarDocumentoHandler _handler;

    public AdicionarDocumentoHandlerTests()
    {
        _projetoRepositoryMock = new Mock<IProjetoRepository>();
        _eventPublisherMock = new Mock<IEventPublisher>();
        _loggerMock = new Mock<ILogger<AdicionarDocumentoHandler>>();

        _handler = new AdicionarDocumentoHandler(
            _projetoRepositoryMock.Object,
            _eventPublisherMock.Object,
            _loggerMock.Object);
    }

    [Fact]
    public async Task ExecutarAsync_DeveRetornarTrue_QuandoProjetoExiste()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        var dto = new AdicionarDocumentoDto 
        { 
            NomeDocumento = "contrato.pdf",
            ConteudoBase64 = "base64content"
        };

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        var resultado = await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        resultado.Should().BeTrue();
    }

    [Fact]
    public async Task ExecutarAsync_DevePublicarEvento_QuandoDocumentoEhAdicionado()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        var dto = new AdicionarDocumentoDto 
        { 
            NomeDocumento = "proposta.pdf",
            ConteudoBase64 = "base64content"
        };

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        var dataAntes = DateTime.UtcNow;
        await _handler.ExecutarAsync(projetoId, dto);
        var dataDepois = DateTime.UtcNow;

        // Assert
        _eventPublisherMock.Verify(x => x.PublishAsync(It.Is<DocumentoAdicionadoEvent>(e =>
            e.ProjetoId == projetoId &&
            e.NomeDocumento == dto.NomeDocumento &&
            e.DataUpload >= dataAntes &&
            e.DataUpload <= dataDepois
        )), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveRetornarFalse_QuandoProjetoNaoExiste()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var dto = new AdicionarDocumentoDto 
        { 
            NomeDocumento = "documento.pdf",
            ConteudoBase64 = "base64content"
        };

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync((Projeto?)null);

        // Act
        var resultado = await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        resultado.Should().BeFalse();
        _eventPublisherMock.Verify(x => x.PublishAsync(It.IsAny<DocumentoAdicionadoEvent>()), Times.Never);
    }

    [Theory]
    [InlineData("contrato.pdf")]
    [InlineData("proposta.docx")]
    [InlineData("orcamento.xlsx")]
    [InlineData("apresentacao.pptx")]
    public async Task ExecutarAsync_DeveProcessarDiferentesTiposDeDocumento(string nomeDocumento)
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        var dto = new AdicionarDocumentoDto 
        { 
            NomeDocumento = nomeDocumento,
            ConteudoBase64 = "base64content"
        };

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        var resultado = await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        resultado.Should().BeTrue();
        _eventPublisherMock.Verify(x => x.PublishAsync(It.Is<DocumentoAdicionadoEvent>(e =>
            e.NomeDocumento == nomeDocumento
        )), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveLogInformacoes_QuandoDocumentoEhProcessado()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        var dto = new AdicionarDocumentoDto 
        { 
            NomeDocumento = "teste.pdf",
            ConteudoBase64 = "base64content"
        };

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString()!.Contains("Adicionando documento ao projeto")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception?, string>>()),
            Times.Once);

        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString()!.Contains("Documento processado com sucesso")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception?, string>>()),
            Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveLogWarning_QuandoProjetoNaoExiste()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var dto = new AdicionarDocumentoDto 
        { 
            NomeDocumento = "documento.pdf",
            ConteudoBase64 = "base64content"
        };

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
    public async Task ExecutarAsync_DeveChamarRepositorio_ComIdCorreto()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var dto = new AdicionarDocumentoDto 
        { 
            NomeDocumento = "documento.pdf",
            ConteudoBase64 = "base64content"
        };

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync((Projeto?)null);

        // Act
        await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        _projetoRepositoryMock.Verify(x => x.ObterPorIdAsync(projetoId), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveProcessarConteudoBase64_DeQualquerTamanho()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        var conteudoGrande = new string('A', 10000); // Simula um arquivo grande em base64
        var dto = new AdicionarDocumentoDto 
        { 
            NomeDocumento = "arquivo-grande.pdf",
            ConteudoBase64 = conteudoGrande
        };

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        var resultado = await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        resultado.Should().BeTrue();
        _eventPublisherMock.Verify(x => x.PublishAsync(It.IsAny<DocumentoAdicionadoEvent>()), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveProcessarDocumentoSemConteudo()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        var dto = new AdicionarDocumentoDto 
        { 
            NomeDocumento = "documento-vazio.txt",
            ConteudoBase64 = string.Empty
        };

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        var resultado = await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        resultado.Should().BeTrue();
        _eventPublisherMock.Verify(x => x.PublishAsync(It.Is<DocumentoAdicionadoEvent>(e =>
            e.NomeDocumento == dto.NomeDocumento
        )), Times.Once);
    }

    private static Projeto CriarProjetoValido(Guid id)
    {
        return new Projeto
        {
            Id = id,
            CodigoProjeto = "1/25",
            Titulo = "FUNDEP 1/25",
            Coordenador = "JAIME ARTURO RAMIREZ [96007]",
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
            Subprojetos = new List<Subprojeto>()
        };
    }
}