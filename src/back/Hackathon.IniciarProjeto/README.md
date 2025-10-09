# Sistema de Gerenciamento de Projetos - FUNDEP

Este é um sistema de cadastramento de projetos desenvolvido em .NET 8 com Minimal API, seguindo os princípios da Clean Architecture.

## ??? Arquitetura

O projeto está organizado em 4 camadas principais:

- **Hackathon.IniciarProjeto.Api**: Camada de apresentação com Minimal API
- **Hackathon.IniciarProjeto.Application**: Casos de uso, DTOs e handlers
- **Hackathon.IniciarProjeto.Domain**: Entidades, enums e interfaces
- **Hackathon.IniciarProjeto.Infrastructure**: Repositórios, serviços e implementações

## ?? Como Executar

1. **Pré-requisitos**:
   - .NET 8 SDK instalado
   - Visual Studio 2022 ou VS Code

2. **Executar a aplicação**:
   ```bash
   cd Hackathon.IniciarProjeto.Api
   dotnet run
   ```

3. **Acessar a API**:
   - Swagger UI: `https://localhost:7XXX/swagger` (porta pode variar)
   - API Base URL: `https://localhost:7XXX`

## ?? Endpoints Disponíveis

### Projetos

- **POST /projetos/importar**: Criar um novo projeto
- **GET /projetos/{id}**: Obter projeto por ID
- **PATCH /projetos/{id}/status**: Atualizar status do projeto
- **POST /projetos/{id}/documentos**: Adicionar documento ao projeto

### Rubricas

- **GET /rubricas**: Listar todas as rubricas cadastradas

## ?? Testando a API

### Criar um Projeto

Use o arquivo `exemplo-projeto.json` como exemplo de payload para o endpoint POST `/projetos/importar`.

**Exemplo de requisição:**
```bash
curl -X POST "https://localhost:7XXX/projetos/importar" \
  -H "Content-Type: application/json" \
  -d @exemplo-projeto.json
```

### Consultar um Projeto

```bash
curl -X GET "https://localhost:7XXX/projetos/{id}"
```

### Atualizar Status do Projeto

```bash
curl -X PATCH "https://localhost:7XXX/projetos/{id}/status" \
  -H "Content-Type: application/json" \
  -d '{"novaEtapa": 2}'
```

## ?? Estrutura de Dados

### Projeto
Contém todas as informações financeiras, administrativas e de cronograma do projeto, incluindo:
- Dados básicos (código, título, objeto)
- Informações de execução (coordenador, executor, financiador)
- Configurações financeiras (valor, moeda, conta bancária)
- Cronograma (datas de início e término)
- Lista de subprojetos

### Subprojeto
Representa uma divisão do projeto principal com:
- Código e nome específicos
- Objeto e observações
- Cronograma próprio
- Lista de rubricas associadas

### Rubrica
Define categorias de gastos/receitas com:
- Código e descrição
- Tipo (Serviço/Material)
- Origem (Nacional/Importado)
- Características específicas (patrimoniável, tipo de taxa)

## ?? Funcionalidades Implementadas

- ? Cadastro completo de projetos com subprojetos e rubricas
- ? Validação de dados com FluentValidation
- ? Sistema de eventos local (preparado para mensageria futura)
- ? Repositório in-memory (preparado para banco de dados)
- ? Logs estruturados
- ? Swagger/OpenAPI para documentação
- ? Notificações por email (simuladas)

## ?? Eventos do Sistema

O sistema publica eventos para as seguintes ações:
- **ProjetoCadastradoEvent**: Quando um projeto é criado
- **ProjetoStatusAtualizadoEvent**: Quando o status é alterado
- **DocumentoAdicionadoEvent**: Quando um documento é adicionado

## ?? Próximos Passos

- Integração com banco de dados (Entity Framework)
- Implementação de mensageria real (RabbitMQ/Azure Service Bus)
- Autenticação e autorização
- Testes unitários e de integração
- CI/CD pipeline

## ??? Tecnologias Utilizadas

- .NET 8
- Minimal API
- FluentValidation
- Swagger/OpenAPI
- Dependency Injection nativa
- Microsoft.Extensions.Logging

## ?? Enums Utilizados

### EtapaProjeto
- 1 = Iniciacao
- 2 = Execucao  
- 3 = PrestacaoDeContas

### TipoRubrica
- 1 = Servico
- 2 = Material

### OrigemRubrica
- 1 = Nacional
- 2 = Importado

E outros enums para configurações específicas do projeto.