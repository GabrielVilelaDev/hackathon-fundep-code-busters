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
    private readonly Mock<IDocumentoRepository> _documentoRepositoryMock;
    private readonly Mock<IEventPublisher> _eventPublisherMock;
    private readonly Mock<ILogger<AdicionarDocumentoHandler>> _loggerMock;
    private readonly AdicionarDocumentoHandler _handler;

    public AdicionarDocumentoHandlerTests()
    {
        _projetoRepositoryMock = new Mock<IProjetoRepository>();
        _documentoRepositoryMock = new Mock<IDocumentoRepository>();
        _eventPublisherMock = new Mock<IEventPublisher>();
        _loggerMock = new Mock<ILogger<AdicionarDocumentoHandler>>();

        _handler = new AdicionarDocumentoHandler(
            _projetoRepositoryMock.Object,
            _documentoRepositoryMock.Object,
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
    public async Task ExecutarAsync_DeveCriarDocumento_QuandoProjetoExiste()
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
        await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        _documentoRepositoryMock.Verify(x => x.AdicionarAsync(It.Is<Documento>(d =>
            d.ProjetoId == projetoId &&
            d.NomeDocumento == dto.NomeDocumento &&
            d.ConteudoBase64 == dto.ConteudoBase64 &&
            d.TipoConteudo == "application/pdf" &&
            d.UsuarioUpload == "Sistema"
        )), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveAtualizarProjeto_ComNovoDocumento()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        var dto = new AdicionarDocumentoDto 
        { 
            NomeDocumento = "documento.pdf",
            ConteudoBase64 = "base64content"
        };

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        _projetoRepositoryMock.Verify(x => x.AtualizarAsync(It.Is<Projeto>(p =>
            p.Id == projetoId &&
            p.Documentos.Count == 1 &&
            p.Documentos.Any(d => d.NomeDocumento == dto.NomeDocumento)
        )), Times.Once);
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
        _documentoRepositoryMock.Verify(x => x.AdicionarAsync(It.IsAny<Documento>()), Times.Never);
        _eventPublisherMock.Verify(x => x.PublishAsync(It.IsAny<DocumentoAdicionadoEvent>()), Times.Never);
    }

    [Theory]
    [InlineData("contrato.pdf", "application/pdf")]
    [InlineData("proposta.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document")]
    [InlineData("orcamento.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")]
    [InlineData("imagem.jpg", "image/jpeg")]
    [InlineData("texto.txt", "text/plain")]
    public async Task ExecutarAsync_DeveDefinirTipoConteudoCorreto(string nomeDocumento, string tipoConteudoEsperado)
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
        await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        _documentoRepositoryMock.Verify(x => x.AdicionarAsync(It.Is<Documento>(d =>
            d.TipoConteudo == tipoConteudoEsperado
        )), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveCalcularTamanhoCorreto()
    {
        // Arrange
        var projetoId = Guid.NewGuid();
        var projeto = CriarProjetoValido(projetoId);
        var conteudoBase64 = "SGVsbG8gV29ybGQ="; // "Hello World" em base64
        var dto = new AdicionarDocumentoDto 
        { 
            NomeDocumento = "teste.txt",
            ConteudoBase64 = conteudoBase64
        };

        _projetoRepositoryMock.Setup(x => x.ObterPorIdAsync(projetoId))
            .ReturnsAsync(projeto);

        // Act
        await _handler.ExecutarAsync(projetoId, dto);

        // Assert
        _documentoRepositoryMock.Verify(x => x.AdicionarAsync(It.Is<Documento>(d =>
            d.Tamanho == 11 // "Hello World" tem 11 bytes
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
            Subprojetos = new List<Subprojeto>(),
            Documentos = new List<Documento>()
        };
    }
}