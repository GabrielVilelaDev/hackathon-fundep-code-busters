using FluentAssertions;
using Hackathon.IniciarProjeto.Application.Handlers;
using Hackathon.IniciarProjeto.Domain.Entities;
using Hackathon.IniciarProjeto.Domain.Enums;
using Hackathon.IniciarProjeto.Domain.Interfaces;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace Hackathon.IniciarProjeto.Application.Test.Handlers;

public class ListarProjetosHandlerTests
{
    private readonly Mock<IProjetoRepository> _projetoRepositoryMock;
    private readonly Mock<ILogger<ListarProjetosHandler>> _loggerMock;
    private readonly ListarProjetosHandler _handler;

    public ListarProjetosHandlerTests()
    {
        _projetoRepositoryMock = new Mock<IProjetoRepository>();
        _loggerMock = new Mock<ILogger<ListarProjetosHandler>>();

        _handler = new ListarProjetosHandler(
            _projetoRepositoryMock.Object,
            _loggerMock.Object);
    }

    [Fact]
    public async Task ExecutarAsync_DeveRetornarListaVazia_QuandoNaoHaProjetos()
    {
        // Arrange
        var projetosVazios = new List<Projeto>();
        _projetoRepositoryMock.Setup(x => x.ObterTodosAsync())
            .ReturnsAsync(projetosVazios);

        // Act
        var resultado = await _handler.ExecutarAsync();

        // Assert
        resultado.Should().NotBeNull();
        resultado.Should().BeEmpty();
    }

    [Fact]
    public async Task ExecutarAsync_DeveRetornarTodosOsProjetos_QuandoExistemProjetos()
    {
        // Arrange
        var projeto1 = CriarProjetoValido(Guid.NewGuid(), "Projeto 1");
        var projeto2 = CriarProjetoValido(Guid.NewGuid(), "Projeto 2");
        var projetos = new List<Projeto> { projeto1, projeto2 };

        _projetoRepositoryMock.Setup(x => x.ObterTodosAsync())
            .ReturnsAsync(projetos);

        // Act
        var resultado = await _handler.ExecutarAsync();

        // Assert
        resultado.Should().NotBeNull();
        resultado.Should().HaveCount(2);
        resultado[0].Id.Should().Be(projeto1.Id);
        resultado[0].Titulo.Should().Be(projeto1.Titulo);
        resultado[1].Id.Should().Be(projeto2.Id);
        resultado[1].Titulo.Should().Be(projeto2.Titulo);
    }

    [Fact]
    public async Task ExecutarAsync_DeveMapearTodosOsCampos_QuandoProjeto()
    {
        // Arrange
        var projeto = CriarProjetoValido(Guid.NewGuid(), "Projeto Teste");
        var projetos = new List<Projeto> { projeto };

        _projetoRepositoryMock.Setup(x => x.ObterTodosAsync())
            .ReturnsAsync(projetos);

        // Act
        var resultado = await _handler.ExecutarAsync();

        // Assert
        resultado.Should().HaveCount(1);
        var projetoResponse = resultado.First();
        
        projetoResponse.Id.Should().Be(projeto.Id);
        projetoResponse.CodigoProjeto.Should().Be(projeto.CodigoProjeto);
        projetoResponse.Titulo.Should().Be(projeto.Titulo);
        projetoResponse.Coordenador.Should().Be(projeto.Coordenador);
        projetoResponse.Valor.Should().Be(projeto.Valor);
        projetoResponse.Etapa.Should().Be(projeto.Etapa);
        projetoResponse.DataCriacao.Should().Be(projeto.DataCriacao);
    }

    [Fact]
    public async Task ExecutarAsync_DeveMapearSubprojetos_QuandoProjetoTemSubprojetos()
    {
        // Arrange
        var projeto = CriarProjetoComSubprojetos(Guid.NewGuid());
        var projetos = new List<Projeto> { projeto };

        _projetoRepositoryMock.Setup(x => x.ObterTodosAsync())
            .ReturnsAsync(projetos);

        // Act
        var resultado = await _handler.ExecutarAsync();

        // Assert
        resultado.Should().HaveCount(1);
        var projetoResponse = resultado.First();
        
        projetoResponse.Subprojetos.Should().HaveCount(1);
        var subprojetoResponse = projetoResponse.Subprojetos.First();
        var subprojetoOriginal = projeto.Subprojetos.First();
        
        subprojetoResponse.Id.Should().Be(subprojetoOriginal.Id);
        subprojetoResponse.CodigoSubprojeto.Should().Be(subprojetoOriginal.CodigoSubprojeto);
        subprojetoResponse.Nome.Should().Be(subprojetoOriginal.Nome);
        subprojetoResponse.Objeto.Should().Be(subprojetoOriginal.Objeto);
    }

    [Fact]
    public async Task ExecutarAsync_DeveMapearRubricas_QuandoSubprojetoTemRubricas()
    {
        // Arrange
        var projeto = CriarProjetoComSubprojetos(Guid.NewGuid());
        var projetos = new List<Projeto> { projeto };

        _projetoRepositoryMock.Setup(x => x.ObterTodosAsync())
            .ReturnsAsync(projetos);

        // Act
        var resultado = await _handler.ExecutarAsync();

        // Assert
        resultado.Should().HaveCount(1);
        var projetoResponse = resultado.First();
        var subprojetoResponse = projetoResponse.Subprojetos.First();
        
        subprojetoResponse.Rubricas.Should().HaveCount(1);
        var rubricaResponse = subprojetoResponse.Rubricas.First();
        var rubricaOriginal = projeto.Subprojetos.First().Rubricas.First().Rubrica;
        
        rubricaResponse.Id.Should().Be(rubricaOriginal.Id);
        rubricaResponse.Codigo.Should().Be(rubricaOriginal.Codigo);
        rubricaResponse.Descricao.Should().Be(rubricaOriginal.Descricao);
        rubricaResponse.Tipo.Should().Be(rubricaOriginal.Tipo);
    }

    [Fact]
    public async Task ExecutarAsync_DeveLogInformacoes()
    {
        // Arrange
        var projetos = new List<Projeto> { CriarProjetoValido(Guid.NewGuid(), "Projeto") };
        _projetoRepositoryMock.Setup(x => x.ObterTodosAsync())
            .ReturnsAsync(projetos);

        // Act
        await _handler.ExecutarAsync();

        // Assert
        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString()!.Contains("Iniciando listagem de todos os projetos")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception?, string>>()),
            Times.Once);

        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString()!.Contains("Listagem de projetos concluída com sucesso")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception?, string>>()),
            Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveChamarRepositorio_UmaVez()
    {
        // Arrange
        var projetos = new List<Projeto>();
        _projetoRepositoryMock.Setup(x => x.ObterTodosAsync())
            .ReturnsAsync(projetos);

        // Act
        await _handler.ExecutarAsync();

        // Assert
        _projetoRepositoryMock.Verify(x => x.ObterTodosAsync(), Times.Once);
    }

    [Fact]
    public async Task ExecutarAsync_DeveRetornarProjetosNaMesmaOrdem_DoRepositorio()
    {
        // Arrange
        var projeto1 = CriarProjetoValido(Guid.NewGuid(), "Projeto Antigo");
        projeto1.DataCriacao = DateTime.UtcNow.AddDays(-2);
        
        var projeto2 = CriarProjetoValido(Guid.NewGuid(), "Projeto Novo");
        projeto2.DataCriacao = DateTime.UtcNow.AddDays(-1);
        
        var projetos = new List<Projeto> { projeto1, projeto2 };

        _projetoRepositoryMock.Setup(x => x.ObterTodosAsync())
            .ReturnsAsync(projetos);

        // Act
        var resultado = await _handler.ExecutarAsync();

        // Assert
        resultado.Should().HaveCount(2);
        // A ordem deve ser mantida conforme retornada pelo repositório
        resultado[0].DataCriacao.Should().Be(projeto1.DataCriacao);
        resultado[1].DataCriacao.Should().Be(projeto2.DataCriacao);
    }

    private static Projeto CriarProjetoValido(Guid id, string titulo)
    {
        return new Projeto
        {
            Id = id,
            CodigoProjeto = "1/25",
            CentroCusto = "ASSESSORIA (6.11)",
            ReferenciaFundep = "FUNDEP 1/25",
            Titulo = titulo,
            Resumo = "Resumo do projeto de teste",
            Objeto = "Objeto do projeto de teste",
            Executor = "SUP-SUPERINTENDENCIA (FUNDEP-FUND.DESEN)",
            ReferenciaExecutor = "001",
            Coordenador = "COORDENADOR TESTE [96007]",
            Financiador = "FUNDAÇÃO DE DESENVOLVIMENTO DA PESQUISA",
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
            TerminoPrevisto = DateTime.Today.AddDays(365),
            ExecucaoEncerrada = false,
            Etapa = EtapaProjeto.Iniciacao,
            DataCriacao = DateTime.UtcNow.AddDays(-1),
            Subprojetos = new List<Subprojeto>()
        };
    }

    private static Projeto CriarProjetoComSubprojetos(Guid id)
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
            ExecucaoEncerrada = false,
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

        var projeto = CriarProjetoValido(id, "Projeto com Subprojetos");
        projeto.Subprojetos = new List<Subprojeto> { subprojeto };
        
        return projeto;
    }
}