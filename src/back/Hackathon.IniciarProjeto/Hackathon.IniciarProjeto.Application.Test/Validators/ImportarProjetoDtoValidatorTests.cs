using FluentAssertions;
using Hackathon.IniciarProjeto.Application.DTOs;
using Hackathon.IniciarProjeto.Application.Validators;
using Hackathon.IniciarProjeto.Domain.Enums;
using Xunit;

namespace Hackathon.IniciarProjeto.Application.Test.Validators;

public class ImportarProjetoDtoValidatorTests
{
    private readonly ImportarProjetoDtoValidator _validator;

    public ImportarProjetoDtoValidatorTests()
    {
        _validator = new ImportarProjetoDtoValidator();
    }

    [Fact]
    public async Task DeveTerValidacaoValida_QuandoDtoEstaCompleto()
    {
        // Arrange
        var dto = CriarImportarProjetoDtoValido();

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeTrue();
        result.Errors.Should().BeEmpty();
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public async Task DeveRetornarErro_QuandoCodigoProjetoEstaVazio(string codigoProjeto)
    {
        // Arrange
        var dto = CriarImportarProjetoDtoValido() with { CodigoProjeto = codigoProjeto };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => e.PropertyName == nameof(ImportarProjetoDto.CodigoProjeto));
    }

    [Fact]
    public async Task DeveRetornarErro_QuandoCodigoProjetoExcedeTamanhoMaximo()
    {
        // Arrange
        var dto = CriarImportarProjetoDtoValido() with 
        { 
            CodigoProjeto = new string('A', 51) 
        };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => 
            e.PropertyName == nameof(ImportarProjetoDto.CodigoProjeto) &&
            e.ErrorMessage.Contains("máximo 50 caracteres"));
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public async Task DeveRetornarErro_QuandoTituloEstaVazio(string titulo)
    {
        // Arrange
        var dto = CriarImportarProjetoDtoValido() with { Titulo = titulo };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => e.PropertyName == nameof(ImportarProjetoDto.Titulo));
    }

    [Fact]
    public async Task DeveRetornarErro_QuandoTituloExcedeTamanhoMaximo()
    {
        // Arrange
        var dto = CriarImportarProjetoDtoValido() with 
        { 
            Titulo = new string('A', 501) 
        };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => 
            e.PropertyName == nameof(ImportarProjetoDto.Titulo) &&
            e.ErrorMessage.Contains("máximo 500 caracteres"));
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public async Task DeveRetornarErro_QuandoCoordenadorEstaVazio(string coordenador)
    {
        // Arrange
        var dto = CriarImportarProjetoDtoValido() with { Coordenador = coordenador };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => e.PropertyName == nameof(ImportarProjetoDto.Coordenador));
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public async Task DeveRetornarErro_QuandoExecutorEstaVazio(string executor)
    {
        // Arrange
        var dto = CriarImportarProjetoDtoValido() with { Executor = executor };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => e.PropertyName == nameof(ImportarProjetoDto.Executor));
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public async Task DeveRetornarErro_QuandoFinanciadorEstaVazio(string financiador)
    {
        // Arrange
        var dto = CriarImportarProjetoDtoValido() with { Financiador = financiador };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => e.PropertyName == nameof(ImportarProjetoDto.Financiador));
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    [InlineData(-100.50)]
    public async Task DeveRetornarErro_QuandoValorEhMenorOuIgualAZero(decimal valor)
    {
        // Arrange
        var dto = CriarImportarProjetoDtoValido() with { Valor = valor };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => 
            e.PropertyName == nameof(ImportarProjetoDto.Valor) &&
            e.ErrorMessage.Contains("maior que zero"));
    }

    [Fact]
    public async Task DeveRetornarErro_QuandoTerminoEhAnteriorAoInicio()
    {
        // Arrange
        var dataInicio = DateTime.Today.AddDays(10);
        var dataTermino = DateTime.Today.AddDays(5);
        
        var dto = CriarImportarProjetoDtoValido() with 
        { 
            InicioPrevisto = dataInicio,
            TerminoPrevisto = dataTermino
        };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => 
            e.PropertyName == nameof(ImportarProjetoDto.TerminoPrevisto) &&
            e.ErrorMessage.Contains("posterior ao início"));
    }

    [Fact]
    public async Task DeveRetornarErro_QuandoSubprojetosEstaVazio()
    {
        // Arrange
        var dto = CriarImportarProjetoDtoValido() with { Subprojetos = new List<SubprojetoDto>() };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => 
            e.PropertyName == nameof(ImportarProjetoDto.Subprojetos) &&
            e.ErrorMessage.Contains("pelo menos um subprojeto"));
    }

    [Fact]
    public async Task DeveValidarSubprojetos_QuandoSubprojetosTemErros()
    {
        // Arrange
        var subprojetoInvalido = new SubprojetoDto
        {
            CodigoSubprojeto = "",
            Nome = "",
            Objeto = "",
            InicioPrevisto = DateTime.Today.AddDays(10),
            TerminoPrevisto = DateTime.Today.AddDays(5),
            Rubricas = new List<RubricaDto>()
        };

        var dto = CriarImportarProjetoDtoValido() with 
        { 
            Subprojetos = new List<SubprojetoDto> { subprojetoInvalido }
        };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().HaveCountGreaterThan(1);
        result.Errors.Should().Contain(e => e.PropertyName.Contains("CodigoSubprojeto"));
        result.Errors.Should().Contain(e => e.PropertyName.Contains("Nome"));
        result.Errors.Should().Contain(e => e.PropertyName.Contains("Objeto"));
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