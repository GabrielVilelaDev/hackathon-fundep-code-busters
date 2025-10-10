# 🚀 Hackathon FUNDEP - Code Busters

Sistema completo para gerenciamento de projetos e inscrições em eventos da FUNDEP, desenvolvido durante o hackathon.

## 📋 Visão Geral

Este projeto é composto por:

- **Frontend (React + Vite)**: Interface web para gerenciamento de projetos
- **API Projetos (.NET 8)**: Backend para gerenciamento de projetos
- **API Inscrição Eventos (.NET 8)**: Backend para inscrições em eventos

## 🏗️ Arquitetura

```
┌─────────────────┐    ┌─────────────────────┐    ┌─────────────────────────┐
│   Frontend      │    │   API Projetos      │    │ API Inscrição Eventos   │
│   (React)       │────│   (.NET 8)          │    │   (.NET 8)              │
│   Port: 3000    │    │   Port: 8080        │    │   Port: 8081            │
└─────────────────┘    └─────────────────────┘    └─────────────────────────┘
```

## 🛠️ Pré-requisitos

- [Docker](https://www.docker.com/get-started) 20.10+
- [Docker Compose](https://docs.docker.com/compose/install/) 2.0+
- **8GB RAM** recomendados
- **Portas disponíveis**: 3000, 8080, 8081

## 🚀 Como Executar

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/GabrielVilelaDev/hackathon-fundep-code-busters.git
cd hackathon-fundep-code-busters
```

### 2️⃣ Navegue para o Diretório src

```bash
cd src
```

### 3️⃣ Execute com Docker Compose

```bash
# Construir e executar todos os serviços
docker-compose up --build

# Ou em background (modo detached)
docker-compose up --build -d
```

### 4️⃣ Aguarde a Inicialização

Aguarde alguns minutos para que todos os serviços sejam construídos e inicializados. Você verá logs similares a:

```
✅ fundep-projetos-api     | Application started
✅ fundep-inscricao-evento-api | Application started  
✅ fundep-projetos-web     | Server running on port 80
```

## 🌐 Acessando as Aplicações

### Frontend - Interface Web
- **URL**: http://localhost:3000
- **Descrição**: Interface principal do sistema de projetos
- **Tecnologia**: React + Vite + TypeScript

### API Projetos - Swagger
- **URL**: http://localhost:8080/swagger
- **Descrição**: Documentação interativa da API de projetos
- **Health Check**: http://localhost:8080/health

### API Inscrição Eventos - Swagger  
- **URL**: http://localhost:8081/swagger
- **Descrição**: Documentação interativa da API de eventos
- **Health Check**: http://localhost:8081/health

## 📊 Monitoramento

### Health Checks

Todos os serviços possuem health checks configurados:

```bash
# Verificar status de todos os containers
docker-compose ps

# Ver logs em tempo real
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f projetos-api
docker-compose logs -f inscricao-evento-api
docker-compose logs -f projetos-web
```

### Status dos Serviços

| Serviço | Container | Status | URL |
|---------|-----------|--------|-----|
| 🌐 Frontend | `fundep-projetos-web` | ✅ Running | http://localhost:3000 |
| 🔧 API Projetos | `fundep-projetos-api` | ✅ Running | http://localhost:8080 |
| 📝 API Eventos | `fundep-inscricao-evento-api` | ✅ Running | http://localhost:8081 |

## 🛠️ Comandos Úteis

### Gerenciamento do Docker Compose

```bash
# Parar todos os serviços
docker-compose down

# Parar e remover volumes
docker-compose down -v

# Reconstruir apenas um serviço
docker-compose up --build projetos-api

# Ver recursos utilizados
docker-compose top

# Executar comando em um container
docker-compose exec projetos-api bash
```

### Logs e Debugging

```bash
# Logs de todos os serviços
docker-compose logs

# Logs com timestamp
docker-compose logs -t

# Acompanhar logs em tempo real
docker-compose logs -f --tail=100

# Logs apenas de erros
docker-compose logs | grep -i error
```

## 🔧 Desenvolvimento Local

### Executar Apenas APIs (sem Frontend)

```bash
# Executar apenas as APIs backend
docker-compose up projetos-api inscricao-evento-api
```

### Executar Frontend Localmente

Se preferir executar o frontend em modo de desenvolvimento:

```bash
# Parar apenas o frontend no Docker
docker-compose stop projetos-web

# Navegar para o diretório do frontend
cd src/front/app

# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm dev
```

## 🐛 Solução de Problemas

### Porta em Uso

```bash
# Verificar portas em uso (Windows)
netstat -an | findstr :3000
netstat -an | findstr :8080
netstat -an | findstr :8081

# Parar processo usando porta específica
# Use o Task Manager ou identifique o PID e finalize
```

### Problemas de Memória

```bash
# Limpar containers não utilizados
docker system prune -f

# Limpar imagens não utilizadas
docker image prune -f

# Ver uso de recursos
docker stats
```

### Rebuild Completo

```bash
# Limpar tudo e reconstruir
docker-compose down -v --rmi all
docker-compose up --build
```

## 📈 Métricas e Performance

- **Tempo de Build**: ~5-10 minutos (primeira vez)
- **Tempo de Start**: ~2-3 minutos
- **Uso de RAM**: ~2-4GB total
- **Uso de CPU**: ~20-40% durante build

## 🧪 Testes

### Executar Testes Unitários

```bash
# Testes da API Projetos
docker-compose exec projetos-api dotnet test

# Testes da API Eventos  
docker-compose exec inscricao-evento-api dotnet test

# Testes do Frontend (se executando localmente)
cd src/front/app && pnpm test
```

## 📝 Variáveis de Ambiente

### Configurações Principais

| Variável | Serviço | Valor Padrão | Descrição |
|----------|---------|--------------|-----------|
| `ASPNETCORE_ENVIRONMENT` | APIs | `Production` | Ambiente .NET |
| `ASPNETCORE_URLS` | APIs | `http://+:8080` | URLs da aplicação |
| `TZ` | Todos | `America/Sao_Paulo` | Timezone |
| `ENABLE_SWAGGER` | APIs | `true` | Habilitar Swagger |
| `VITE_API_URL` | Frontend | `http://localhost:8080` | URL da API |

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido durante o Hackathon FUNDEP pelos Code Busters.

---

### 🆘 Precisa de Ajuda?

- Verifique os logs: `docker-compose logs -f`
- Reinicie os serviços: `docker-compose restart`
- Limpe o cache: `docker system prune -f`

**Equipe Code Busters** 🚀