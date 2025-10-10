# 🐳 Docker Compose - Guia Técnico

Este diretório contém a configuração do Docker Compose para executar todas as aplicações do projeto.

## 📁 Estrutura

```
src/
├── docker-compose.yml          # Configuração principal
├── back/                       # APIs Backend
│   ├── Hackathon.IniciarProjeto/      # API de Projetos
│   │   └── iniciarProjeto-dockerfile
│   └── Hackathon.InscricaoEvento/     # API de Eventos  
│       └── inscricaoEvento-dockerfile
└── front/                      # Frontend
    └── app/
        └── Dockerfile
```

## ⚙️ Configuração dos Serviços

### 🌐 Frontend (projetos-web)
- **Container**: `fundep-projetos-web`
- **Porta**: `3000:80`
- **Base**: React + Vite + TypeScript
- **Build Context**: `./front/`
- **Dockerfile**: `./front/app/Dockerfile`
- **Dependências**: projetos-api

### 🔧 API Projetos (projetos-api)
- **Container**: `fundep-projetos-api`
- **Porta**: `8080:8080`
- **Base**: .NET 8 + ASP.NET Core
- **Build Context**: `./back/Hackathon.IniciarProjeto/`
- **Dockerfile**: `iniciarProjeto-dockerfile`
- **Swagger**: http://localhost:8080/swagger

### 📝 API Eventos (inscricao-evento-api)
- **Container**: `fundep-inscricao-evento-api`
- **Porta**: `8081:8080`
- **Base**: .NET 8 + ASP.NET Core
- **Build Context**: `./back/Hackathon.InscricaoEvento/`
- **Dockerfile**: `inscricaoEvento-dockerfile`
- **Swagger**: http://localhost:8081/swagger

## 🌐 Rede

```yaml
networks:
  fundep-network:
    driver: bridge
    name: fundep-network
```

Todos os serviços estão conectados à mesma rede `fundep-network` para comunicação interna.

## 🔍 Health Checks

### APIs Backend (.NET)
```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8080/health"]  
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 30s
```

### Frontend (React)
```yaml
healthcheck:
  test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:80/health"]
  interval: 30s  
  timeout: 10s
  retries: 3
  start_period: 10s
```

## 🏷️ Labels

Todos os containers possuem labels para identificação:

```yaml
labels:
  - "com.fundep.service=nome-do-servico"
  - "com.fundep.version=1.0.0"  
  - "com.fundep.description=Descrição do serviço"
```

## 🚀 Comandos Avançados

### Builds Paralelos
```bash
# Build paralelo de todos os serviços
docker-compose build --parallel

# Build com cache desabilitado
docker-compose build --no-cache
```

### Scaling (Réplicas)
```bash
# Executar múltiplas instâncias da API
docker-compose up --scale projetos-api=2
```

### Logs Estruturados
```bash
# Logs em formato JSON
docker-compose --log-level DEBUG up

# Logs com filtro por serviço
docker-compose logs --tail=50 projetos-api
```

### Override Configurations
```bash
# Usar arquivo de override para desenvolvimento
docker-compose -f docker-compose.yml -f docker-compose.override.yml up
```

## 📊 Recursos Recomendados

### Limites de Recursos (Opcional)

Você pode adicionar limites no `docker-compose.yml`:

```yaml
services:
  projetos-api:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'  
          memory: 512M
```

### Volumes para Desenvolvimento

Para desenvolvimento, monte volumes locais:

```yaml
volumes:
  - ./back/Hackathon.IniciarProjeto:/app/source
  - ./front/app/src:/app/src
```

## 🔐 Segurança

### Usuários Não-Root

Os containers executam com usuários não-root conforme configurado nos Dockerfiles:

```dockerfile
RUN addgroup --system --gid 1001 appgroup
RUN adduser --system --uid 1001 appuser --ingroup appgroup
USER appuser
```

### Variáveis Sensíveis

Para produção, use arquivos `.env`:

```bash
# .env
DATABASE_CONNECTION_STRING=sua-connection-string
JWT_SECRET=seu-jwt-secret
```

## 🎯 Performance

### Multi-stage Builds

Os Dockerfiles usam multi-stage builds para otimização:

```dockerfile
# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
# ... build steps

# Runtime stage  
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
# ... runtime setup
```

### Cache Layers

Otimize o cache copiando `package.json`/`.csproj` primeiro:

```dockerfile
# Copy project files first (better caching)
COPY ["*.csproj", "./"]
RUN dotnet restore

# Copy source code last  
COPY . .
```

## 🐛 Debug Mode

Para habilitar debug:

```yaml
environment:
  - ASPNETCORE_ENVIRONMENT=Development
  - ASPNETCORE_LOGGING__LOGLEVEL__DEFAULT=Debug
```

## 📈 Monitoramento

### Container Stats
```bash
# Recursos em tempo real
docker stats $(docker-compose ps -q)

# Informações detalhadas
docker-compose exec projetos-api cat /proc/meminfo
```

### Health Status
```bash
# Verificar health de todos os serviços
docker-compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Health}}"
```

---

## 🚨 Importante

- **Primeira execução**: Pode levar 5-10 minutos para build completo
- **Portas**: Certifique-se que 3000, 8080 e 8081 estão disponíveis  
- **Recursos**: Recomendado 8GB RAM e 4GB espaço em disco
- **Docker**: Versão 20.10+ e Compose 2.0+