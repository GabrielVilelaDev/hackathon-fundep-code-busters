using FluentAssertions;
using Hackathon.IniciarProjeto.Application.DTOs;
using Hackathon.IniciarProjeto.Application.Validators;
using Hackathon.IniciarProjeto.Domain.Enums;
using Xunit;

namespace Hackathon.IniciarProjeto.Application.Test.Validators;

public class RubricaDtoValidatorTests
{
    private readonly RubricaDtoValidator _validator;

    public RubricaDtoValidatorTests()
    {
        _validator = new RubricaDtoValidator();
    }

    [Fact]
    public async Task DeveTerValidacaoValida_QuandoDtoEstaCompleto()
    {
        // Arrange
        var dto = CriarRubricaDtoValida();

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeTrue();
        result.Errors.Should().BeEmpty();
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public async Task DeveRetornarErro_QuandoCodigoEstaVazio(string codigo)
    {
        // Arrange
        var dto = CriarRubricaDtoValida() with { Codigo = codigo };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => e.PropertyName == nameof(RubricaDto.Codigo));
    }

    [Fact]
    public async Task DeveRetornarErro_QuandoCodigoExcedeTamanhoMaximo()
    {
        // Arrange
        var dto = CriarRubricaDtoValida() with 
        { 
            Codigo = new string('A', 21) 
        };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => 
            e.PropertyName == nameof(RubricaDto.Codigo) &&
            e.ErrorMessage.Contains("máximo 20 caracteres"));
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public async Task DeveRetornarErro_QuandoDescricaoEstaVazia(string descricao)
    {
        // Arrange
        var dto = CriarRubricaDtoValida() with { Descricao = descricao };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => e.PropertyName == nameof(RubricaDto.Descricao));
    }

    [Fact]
    public async Task DeveRetornarErro_QuandoDescricaoExcedeTamanhoMaximo()
    {
        // Arrange
        var dto = CriarRubricaDtoValida() with 
        { 
            Descricao = new string('A', 501) 
        };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => 
            e.PropertyName == nameof(RubricaDto.Descricao) &&
            e.ErrorMessage.Contains("máximo 500 caracteres"));
    }

    [Fact]
    public async Task DeveRetornarErro_QuandoTipoEhInvalido()
    {
        // Arrange
        var dto = CriarRubricaDtoValida() with { Tipo = (TipoRubrica)999 };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => 
            e.PropertyName == nameof(RubricaDto.Tipo) &&
            e.ErrorMessage.Contains("deve ser válido"));
    }

    [Fact]
    public async Task DeveRetornarErro_QuandoOrigemEhInvalida()
    {
        // Arrange
        var dto = CriarRubricaDtoValida() with { Origem = (OrigemRubrica)999 };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => 
            e.PropertyName == nameof(RubricaDto.Origem) &&
            e.ErrorMessage.Contains("deve ser válida"));
    }

    [Theory]
    [InlineData(TipoRubrica.Servico)]
    [InlineData(TipoRubrica.Material)]
    public async Task DeveSerValido_QuandoTipoEhValido(TipoRubrica tipo)
    {
        // Arrange
        var dto = CriarRubricaDtoValida() with { Tipo = tipo };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeTrue();
    }

    [Theory]
    [InlineData(OrigemRubrica.Nacional)]
    [InlineData(OrigemRubrica.Importado)]
    public async Task DeveSerValido_QuandoOrigemEhValida(OrigemRubrica origem)
    {
        // Arrange
        var dto = CriarRubricaDtoValida() with { Origem = origem };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeTrue();
    }

    private static RubricaDto CriarRubricaDtoValida()
    {
        return new RubricaDto
        {
            Codigo = "101",
            Descricao = "Serviços Técnicos Especializados",
            Tipo = TipoRubrica.Servico,
            Origem = OrigemRubrica.Nacional,
            Patrimoniavel = PatrimoniaveRubrica.Nao,
            RepresentaTaxa = RepresentaTaxaRubrica.Direta,
            Servico = ServicoRubrica.Pessoal,
            ReceitaFundep = true
        };
    }
}