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

public class IniciarProjetoHandlerTests
{
    private readonly Mock<IProjetoRepository> _projetoRepositoryMock;
    private readonly Mock<IRubricaRepository> _rubricaRepositoryMock;
    private readonly Mock<IEventPublisher> _eventPublisherMock;
    private readonly Mock<ILogger<IniciarProjetoHandler>> _loggerMock;
    private readonly IniciarProjetoHandler _handler;

    public IniciarProjetoHandlerTests()
    {
        _projetoRepositoryMock = new Mock<IProjetoRepository>();
        _rubricaRepositoryMock = new Mock<IRubricaRepository>();
        _eventPublisherMock = new Mock<IEventPublisher>();
        _loggerMock = new Mock<ILogger<IniciarProjetoHandler>>();

        _handler = new IniciarProjetoHandler(
            _projetoRepositoryMock.Object,
            _rubricaRepositoryMock.Object,
            _eventPublisherMock.Object,
            _loggerMock.Object);
    }

    [Fact]
    public async Task ExecutarAsync_DeveCriarProjeto_QuandoDtoEhValido()
    {
        // Arrange
        var dto = CriarImportarProjetoDtoValido();
        _rubricaRepositoryMock.Setup(x => x.ObterPorCodigoAsync(It.IsAny<string>()))
            .ReturnsAsync((Rubrica?)null);

        // Act
        var resultado = await _handler.ExecutarAsync(dto);

        // Assert
        resultado.Should().NotBeEmpty();
        
        _projetoRepositoryMock.Verify(x => x.AdicionarAsync(It.Is<Projeto>(p => 
            p.Id == resultado && 
            p.Titulo == dto.Titulo &&
            p.CodigoProjeto == dto.CodigoProjeto &&
            p.Etapa == EtapaProjeto.Iniciacao &&
            p.Subprojetos.Count == dto.Subprojetos.Count
        )), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DevePublicarEvento_AposCriarProjeto()
    {
        // Arrange
        var dto = CriarImportarProjetoDtoValido();
        _rubricaRepositoryMock.Setup(x => x.ObterPorCodigoAsync(It.IsAny<string>()))
            .ReturnsAsync((Rubrica?)null);

        // Act
        var resultado = await _handler.ExecutarAsync(dto);

        // Assert
        _eventPublisherMock.Verify(x => x.PublishAsync(It.Is<ProjetoCadastradoEvent>(e =>
            e.ProjetoId == resultado &&
            e.Nome == dto.Titulo &&
            e.CoordenadorEmail == dto.Coordenador
        )), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveCriarNovaRubrica_QuandoRubricaNaoExiste()
    {
        // Arrange
        var dto = CriarImportarProjetoDtoValido();
        _rubricaRepositoryMock.Setup(x => x.ObterPorCodigoAsync(It.IsAny<string>()))
            .ReturnsAsync((Rubrica?)null);

        // Act
        await _handler.ExecutarAsync(dto);

        // Assert
        _rubricaRepositoryMock.Verify(x => x.AdicionarAsync(It.Is<Rubrica>(r =>
            r.Codigo == "101" &&
            r.Descricao == "Serviços Técnicos Especializados"
        )), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveReutilizarRubrica_QuandoRubricaJaExiste()
    {
        // Arrange
        var dto = CriarImportarProjetoDtoValido();
        var rubricaExistente = new Rubrica
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

        _rubricaRepositoryMock.Setup(x => x.ObterPorCodigoAsync("101"))
            .ReturnsAsync(rubricaExistente);

        // Act
        await _handler.ExecutarAsync(dto);

        // Assert
        _rubricaRepositoryMock.Verify(x => x.AdicionarAsync(It.IsAny<Rubrica>()), Times.Never);
        _projetoRepositoryMock.Verify(x => x.AdicionarAsync(It.Is<Projeto>(p =>
            p.Subprojetos.First().Rubricas.Any(sr => sr.RubricaId == rubricaExistente.Id)
        )), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveDefinirProjetoIdNosSubprojetos()
    {
        // Arrange
        var dto = CriarImportarProjetoDtoValido();
        _rubricaRepositoryMock.Setup(x => x.ObterPorCodigoAsync(It.IsAny<string>()))
            .ReturnsAsync((Rubrica?)null);

        // Act
        var resultado = await _handler.ExecutarAsync(dto);

        // Assert
        _projetoRepositoryMock.Verify(x => x.AdicionarAsync(It.Is<Projeto>(p =>
            p.Subprojetos.All(sub => sub.ProjetoId == resultado)
        )), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveDefinirSubprojetoIdNasRubricas()
    {
        // Arrange
        var dto = CriarImportarProjetoDtoValido();
        _rubricaRepositoryMock.Setup(x => x.ObterPorCodigoAsync(It.IsAny<string>()))
            .ReturnsAsync((Rubrica?)null);

        // Act
        await _handler.ExecutarAsync(dto);

        // Assert
        _projetoRepositoryMock.Verify(x => x.AdicionarAsync(It.Is<Projeto>(p =>
            p.Subprojetos.All(sub => 
                sub.Rubricas.All(sr => sr.SubprojetoId == sub.Id))
        )), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveDefinirDataCriacao()
    {
        // Arrange
        var dto = CriarImportarProjetoDtoValido();
        var dataAntes = DateTime.UtcNow;
        _rubricaRepositoryMock.Setup(x => x.ObterPorCodigoAsync(It.IsAny<string>()))
            .ReturnsAsync((Rubrica?)null);

        // Act
        await _handler.ExecutarAsync(dto);
        var dataDepois = DateTime.UtcNow;

        // Assert
        _projetoRepositoryMock.Verify(x => x.AdicionarAsync(It.Is<Projeto>(p =>
            p.DataCriacao >= dataAntes && p.DataCriacao <= dataDepois
        )), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveDefinirEtapaComoIniciacao()
    {
        // Arrange
        var dto = CriarImportarProjetoDtoValido();
        _rubricaRepositoryMock.Setup(x => x.ObterPorCodigoAsync(It.IsAny<string>()))
            .ReturnsAsync((Rubrica?)null);

        // Act
        await _handler.ExecutarAsync(dto);

        // Assert
        _projetoRepositoryMock.Verify(x => x.AdicionarAsync(It.Is<Projeto>(p =>
            p.Etapa == EtapaProjeto.Iniciacao
        )), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveLogInformacoes()
    {
        // Arrange
        var dto = CriarImportarProjetoDtoValido();
        _rubricaRepositoryMock.Setup(x => x.ObterPorCodigoAsync(It.IsAny<string>()))
            .ReturnsAsync((Rubrica?)null);

        // Act
        await _handler.ExecutarAsync(dto);

        // Assert
        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString()!.Contains("Iniciando criação do projeto")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception?, string>>()),
            Times.Once);

        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString()!.Contains("Projeto criado com sucesso")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception?, string>>()),
            Times.Once);
    }

    private static ImportarProjetoDto CriarImportarProjetoDtoValido()
    {
        return new ImportarProjetoDto
        {
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
            Subprojetos = new List<SubprojetoDto>
            {
                new SubprojetoDto
                {
                    CodigoSubprojeto = "01",
                    Nome = "Receitas",
                    Objeto = "Receita",
                    InicioPrevisto = DateTime.Today.AddDays(1),
                    TerminoPrevisto = DateTime.Today.AddDays(365),
                    Rubricas = new List<RubricaDto>
                    {
                        new RubricaDto
                        {
                            Codigo = "101",
                            Descricao = "Serviços Técnicos Especializados",
                            Tipo = TipoRubrica.Servico,
                            Origem = OrigemRubrica.Nacional,
                            Patrimoniavel = PatrimoniaveRubrica.Nao,
                            RepresentaTaxa = RepresentaTaxaRubrica.Direta,
                            Servico = ServicoRubrica.Pessoal,
                            ReceitaFundep = true
                        }
                    }
                }
            }
        };
    }
}