using FluentAssertions;
using Hackathon.IniciarProjeto.Application.DTOs;
using Hackathon.IniciarProjeto.Application.Validators;
using Xunit;

namespace Hackathon.IniciarProjeto.Application.Test.Validators;

public class AtualizarProjetoDtoValidatorTests
{
    private readonly AtualizarProjetoDtoValidator _validator;

    public AtualizarProjetoDtoValidatorTests()
    {
        _validator = new AtualizarProjetoDtoValidator();
    }

    [Fact]
    public async Task DeveTerValidacaoValida_QuandoDtoEstaCompleto()
    {
        // Arrange
        var dto = CriarAtualizarProjetoDtoValido();

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeTrue();
        result.Errors.Should().BeEmpty();
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public async Task DeveRetornarErro_QuandoTituloEstaVazio(string titulo)
    {
        // Arrange
        var dto = CriarAtualizarProjetoDtoValido() with { Titulo = titulo };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => e.PropertyName == nameof(AtualizarProjetoDto.Titulo));
    }

    [Fact]
    public async Task DeveRetornarErro_QuandoTituloExcedeTamanhoMaximo()
    {
        // Arrange
        var dto = CriarAtualizarProjetoDtoValido() with 
        { 
            Titulo = new string('A', 501) 
        };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => 
            e.PropertyName == nameof(AtualizarProjetoDto.Titulo) &&
            e.ErrorMessage.Contains("máximo 500 caracteres"));
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public async Task DeveRetornarErro_QuandoResumoEstaVazio(string resumo)
    {
        // Arrange
        var dto = CriarAtualizarProjetoDtoValido() with { Resumo = resumo };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => e.PropertyName == nameof(AtualizarProjetoDto.Resumo));
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public async Task DeveRetornarErro_QuandoObjetoEstaVazio(string objeto)
    {
        // Arrange
        var dto = CriarAtualizarProjetoDtoValido() with { Objeto = objeto };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => e.PropertyName == nameof(AtualizarProjetoDto.Objeto));
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public async Task DeveRetornarErro_QuandoCoordenadorEstaVazio(string coordenador)
    {
        // Arrange
        var dto = CriarAtualizarProjetoDtoValido() with { Coordenador = coordenador };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => e.PropertyName == nameof(AtualizarProjetoDto.Coordenador));
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    [InlineData(-100.50)]
    public async Task DeveRetornarErro_QuandoValorEhMenorOuIgualAZero(decimal valor)
    {
        // Arrange
        var dto = CriarAtualizarProjetoDtoValido() with { Valor = valor };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => 
            e.PropertyName == nameof(AtualizarProjetoDto.Valor) &&
            e.ErrorMessage.Contains("maior que zero"));
    }

    [Fact]
    public async Task DeveRetornarErro_QuandoTerminoEhAnteriorAoInicio()
    {
        // Arrange
        var dataInicio = DateTime.Today.AddDays(10);
        var dataTermino = DateTime.Today.AddDays(5);
        
        var dto = CriarAtualizarProjetoDtoValido() with 
        { 
            InicioPrevisto = dataInicio,
            TerminoPrevisto = dataTermino
        };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => 
            e.PropertyName == nameof(AtualizarProjetoDto.TerminoPrevisto) &&
            e.ErrorMessage.Contains("posterior ao início"));
    }

    [Fact]
    public async Task DeveRetornarErro_QuandoProrrogacaoEhAnteriorAoTermino()
    {
        // Arrange
        var dataTermino = DateTime.Today.AddDays(30);
        var dataProrrogacao = DateTime.Today.AddDays(20);
        
        var dto = CriarAtualizarProjetoDtoValido() with 
        { 
            TerminoPrevisto = dataTermino,
            AguardandoProrrogacaoPara = dataProrrogacao
        };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => 
            e.PropertyName == nameof(AtualizarProjetoDto.AguardandoProrrogacaoPara) &&
            e.ErrorMessage.Contains("posterior ao término"));
    }

    [Fact]
    public async Task DeveRetornarErro_QuandoDataLimiteDespesasEhAnteriorAoInicio()
    {
        // Arrange
        var dataInicio = DateTime.Today.AddDays(10);
        var dataLimite = DateTime.Today.AddDays(5);
        
        var dto = CriarAtualizarProjetoDtoValido() with 
        { 
            InicioPrevisto = dataInicio,
            DataLimiteDespesas = dataLimite
        };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => 
            e.PropertyName == nameof(AtualizarProjetoDto.DataLimiteDespesas) &&
            e.ErrorMessage.Contains("igual ou posterior ao início"));
    }

    [Fact]
    public async Task DeveSerValido_ComCoExecutorNull()
    {
        // Arrange
        var dto = CriarAtualizarProjetoDtoValido() with { CoExecutor = null };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeTrue();
    }

    [Fact]
    public async Task DeveSerValido_ComCoFinanciadorNull()
    {
        // Arrange
        var dto = CriarAtualizarProjetoDtoValido() with { CoFinanciador = null };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeTrue();
    }

    [Fact]
    public async Task DeveRetornarErro_QuandoCoExecutorExcedeTamanho()
    {
        // Arrange
        var dto = CriarAtualizarProjetoDtoValido() with 
        { 
            CoExecutor = new string('A', 201) 
        };

        // Act
        var result = await _validator.ValidateAsync(dto);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(e => 
            e.PropertyName == nameof(AtualizarProjetoDto.CoExecutor) &&
            e.ErrorMessage.Contains("máximo 200 caracteres"));
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
            DataLimiteDespesas = DateTime.Today.AddDays(300),
            InicioPrevisto = DateTime.Today.AddDays(1),
            TerminoPrevisto = DateTime.Today.AddDays(365),
            AguardandoProrrogacaoPara = DateTime.Today.AddDays(400)
        };
    }
}