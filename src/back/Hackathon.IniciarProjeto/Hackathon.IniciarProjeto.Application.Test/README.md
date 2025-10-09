# Testes Unitários - Hackathon.IniciarProjeto.Application.Test

Este projeto contém os testes unitários para a camada de aplicação do sistema de gerenciamento de projetos da FUNDEP.

## ?? Estatísticas dos Testes

- **Total de testes**: 84
- **Taxa de sucesso**: 100%
- **Cobertura**: Validadores e Handlers da camada de aplicação

## ?? Estrutura dos Testes

### Validadores (Validators)

#### `ImportarProjetoDtoValidatorTests`
- ? Validação completa de DTO válido
- ? Validação de campos obrigatórios (CodigoProjeto, Titulo, Coordenador, etc.)
- ? Validação de tamanhos máximos dos campos
- ? Validação de valor financeiro positivo
- ? Validação de datas (término posterior ao início)
- ? Validação de subprojetos obrigatórios
- ? Validação cascata para subprojetos

#### `SubprojetoDtoValidatorTests`
- ? Validação completa de subprojeto válido
- ? Validação de campos obrigatórios (CodigoSubprojeto, Nome, Objeto)
- ? Validação de tamanhos máximos
- ? Validação de cronograma (datas)
- ? Validação cascata para rubricas

#### `RubricaDtoValidatorTests`
- ? Validação completa de rubrica válida
- ? Validação de campos obrigatórios (Codigo, Descricao)
- ? Validação de tamanhos máximos
- ? Validação de enums (Tipo, Origem)
- ? Casos de teste para todos os valores válidos dos enums

### Handlers

#### `IniciarProjetoHandlerTests`
- ? Criação de projeto com DTO válido
- ? Publicação de evento após criação
- ? Criação de novas rubricas quando não existem
- ? Reutilização de rubricas existentes
- ? Relacionamento correto entre Projeto > Subprojeto > Rubrica
- ? Definição automática de IDs e relacionamentos
- ? Configuração da etapa inicial (Iniciacao)
- ? Logging de informações

#### `ObterProjetoHandlerTests`
- ? Retorno de projeto existente
- ? Retorno null para projeto inexistente
- ? Mapeamento completo de subprojetos
- ? Mapeamento completo de rubricas
- ? Mapeamento de todos os campos financeiros
- ? Mapeamento correto de datas
- ? Logging adequado (Info e Warning)
- ? Chamadas corretas ao repositório

#### `AtualizarStatusHandlerTests`
- ? Atualização de status para projeto existente
- ? Publicação de evento após atualização
- ? Retorno false para projeto inexistente
- ? Suporte a todas as etapas do enum
- ? Preservação de outras propriedades
- ? Logging adequado
- ? Interação correta com repositório

#### `AdicionarDocumentoHandlerTests`
- ? Adição de documento para projeto existente
- ? Publicação de evento após adição
- ? Retorno false para projeto inexistente
- ? Suporte a diferentes tipos de documento
- ? Processamento de conteúdo Base64
- ? Tratamento de documentos grandes
- ? Tratamento de documentos vazios
- ? Logging adequado

## ??? Ferramentas Utilizadas

- **xUnit**: Framework principal de testes
- **Moq**: Framework para mocking de dependências
- **FluentAssertions**: Assertions mais expressivas e legíveis
- **Microsoft.Extensions.Logging.Abstractions**: Para testes de logging

## ??? Padrões de Teste Implementados

### Arrange-Act-Assert (AAA)
Todos os testes seguem o padrão AAA para maior legibilidade:
```csharp
// Arrange
var dto = CriarDtoValido();
var handler = new Handler(dependencies);

// Act
var resultado = await handler.ExecutarAsync(dto);

// Assert
resultado.Should().BeTrue();
```

### Mocking de Dependências
- Repositórios são mockados para testes isolados
- Event Publishers são verificados para garantir publicação
- Loggers são verificados para garantir logging adequado

### Test Data Builders
- Classe `TestDataBuilder` centraliza criação de dados de teste
- Métodos reutilizáveis para criar objetos válidos
- Flexibilidade para personalizar propriedades específicas

### Testes Parametrizados
- `[Theory]` com `[InlineData]` para testar múltiplos cenários
- Cobertura de valores de borda e casos especiais
- Testes de enums com todos os valores válidos

## ?? Como Executar os Testes

### Via linha de comando:
```bash
dotnet test Hackathon.IniciarProjeto.Application.Test
```

### Via Visual Studio:
- Menu: `Test` > `Run All Tests`
- Ou use o Test Explorer

### Com relatório detalhado:
```bash
dotnet test --verbosity normal --logger trx
```

## ?? Cobertura de Código

Os testes cobrem:
- ? Todos os validadores da aplicação
- ? Todos os handlers da aplicação  
- ? Cenários de sucesso e falha
- ? Validação de entrada
- ? Interações com dependências
- ? Logging e eventos

## ?? Exemplo de Teste

```csharp
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
        p.Etapa == EtapaProjeto.Iniciacao
    )), Times.Once);
}
```

## ?? Próximos Passos

- Adicionar testes de integração
- Implementar testes de performance
- Adicionar relatórios de cobertura de código
- Testes end-to-end da API