using FluentAssertions;
using Hackathon.IniciarProjeto.Application.DTOs;
using Hackathon.IniciarProjeto.Application.Validators;
using Hackathon.IniciarProjeto.Domain.Enums;
using Xunit;

namespace Hackathon.IniciarProjeto.Application.Test.Validators;

public class SubprojetoDtoValidatorTests
{
    private readonly SubprojetoDtoValidator _validator;

    public SubprojetoDtoValidatorTests()
    {
        _validator = new SubprojetoDtoValidator();
    }

    [Fact]
    public async Task DeveTerValidacaoValida_QuandoDtoEstaCompleto()
    {
        // Arrange
        var dto = CriarSubprojetoDtoValido();

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeTrue();
        result.Errors.Should().BeEmpty();
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public async Task DeveRetornarErro_QuandoCodigoSubprojetoEstaVazio(string codigoSubprojeto)
    {
        // Arrange
        var dto = CriarSubprojetoDtoValido() with { CodigoSubprojeto = codigoSubprojeto };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => e.PropertyName == nameof(SubprojetoDto.CodigoSubprojeto));
    }

    [Fact]
    public async Task DeveRetornarErro_QuandoCodigoSubprojetoExcedeTamanhoMaximo()
    {
        // Arrange
        var dto = CriarSubprojetoDtoValido() with 
        { 
            CodigoSubprojeto = new string('A', 21) 
        };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => 
            e.PropertyName == nameof(SubprojetoDto.CodigoSubprojeto) &&
            e.ErrorMessage.Contains("máximo 20 caracteres"));
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public async Task DeveRetornarErro_QuandoNomeEstaVazio(string nome)
    {
        // Arrange
        var dto = CriarSubprojetoDtoValido() with { Nome = nome };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => e.PropertyName == nameof(SubprojetoDto.Nome));
    }

    [Fact]
    public async Task DeveRetornarErro_QuandoNomeExcedeTamanhoMaximo()
    {
        // Arrange
        var dto = CriarSubprojetoDtoValido() with 
        { 
            Nome = new string('A', 201) 
        };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => 
            e.PropertyName == nameof(SubprojetoDto.Nome) &&
            e.ErrorMessage.Contains("máximo 200 caracteres"));
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public async Task DeveRetornarErro_QuandoObjetoEstaVazio(string objeto)
    {
        // Arrange
        var dto = CriarSubprojetoDtoValido() with { Objeto = objeto };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => e.PropertyName == nameof(SubprojetoDto.Objeto));
    }

    [Fact]
    public async Task DeveRetornarErro_QuandoObjetoExcedeTamanhoMaximo()
    {
        // Arrange
        var dto = CriarSubprojetoDtoValido() with 
        { 
            Objeto = new string('A', 1001) 
        };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => 
            e.PropertyName == nameof(SubprojetoDto.Objeto) &&
            e.ErrorMessage.Contains("máximo 1000 caracteres"));
    }

    [Fact]
    public async Task DeveRetornarErro_QuandoTerminoEhAnteriorAoInicio()
    {
        // Arrange
        var dataInicio = DateTime.Today.AddDays(10);
        var dataTermino = DateTime.Today.AddDays(5);
        
        var dto = CriarSubprojetoDtoValido() with 
        { 
            InicioPrevisto = dataInicio,
            TerminoPrevisto = dataTermino  
        };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => 
            e.PropertyName == nameof(SubprojetoDto.TerminoPrevisto) &&
            e.ErrorMessage.Contains("posterior ao início"));
    }

    [Fact]
    public async Task DeveValidarRubricas_QuandoRubricasTemErros()
    {
        // Arrange
        var rubricaInvalida = new RubricaDto
        {
            Codigo = "",
            Descricao = "",
            Tipo = (TipoRubrica)999,
            Origem = (OrigemRubrica)999,
            Patrimoniavel = PatrimoniaveRubrica.Nao,
            RepresentaTaxa = RepresentaTaxaRubrica.Direta,
            Servico = ServicoRubrica.Pessoal,
            ReceitaFundep = true
        };

        var dto = CriarSubprojetoDtoValido() with 
        { 
            Rubricas = new List<RubricaDto> { rubricaInvalida }
        };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().HaveCountGreaterThan(1);
        result.Errors.Should().Contain(e => e.PropertyName.Contains("Codigo"));
        result.Errors.Should().Contain(e => e.PropertyName.Contains("Descricao"));
    }

    private static SubprojetoDto CriarSubprojetoDtoValido()
    {
        return new SubprojetoDto
        {
            CodigoSubprojeto = "01",
            Nome = "Receitas",
            Objeto = "Receita do projeto",
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
        };
    }
}