# Sistema de Gestão - Aplicação Principal

Aplicação React moderna com TypeScript, Vite, TailwindCSS, React Query, React Router e arquitetura modular.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Arquitetura](#arquitetura)
- [Módulos](#módulos)
- [Desenvolvimento](#desenvolvimento)
- [Build](#build)

## 🎯 Visão Geral

Esta é a aplicação principal do sistema de gestão, construída com as melhores práticas de desenvolvimento moderno:

- **React 18.2** com TypeScript para type-safety
- **Vite 5.0** para build rápido e HMR
- **TailwindCSS 3.4** para estilização
- **TanStack Query** para gerenciamento de estado do servidor
- **React Router 6** para roteamento com lazy loading
- **Zustand** para estado global do cliente
- **React Hook Form** para formulários performáticos
- **Design System** próprio com Shadcn/UI

## 🚀 Tecnologias

### Core
- React 18.2.0
- TypeScript 5.3.3
- Vite 5.0.12

### Estado e Dados
- @tanstack/react-query 5.17.19
- zustand 4.4.7
- axios 1.6.5

### Roteamento
- react-router-dom 6.21.3

### Formulários
- react-hook-form 7.49.3

### Estilização
- tailwindcss 3.4.1
- tailwindcss-animate 1.0.7

### Design System
- @design-system/components (workspace local)

## 📁 Estrutura do Projeto

```
app/
├── src/
│   ├── modules/              # Módulos de negócio
│   │   ├── auth/            # Autenticação
│   │   │   ├── components/  # Componentes do módulo
│   │   │   ├── pages/       # Páginas do módulo
│   │   │   ├── services/    # Serviços API
│   │   │   ├── store/       # Estado Zustand
│   │   │   └── types/       # TypeScript types
│   │   └── prospeccao/      # Prospecção de propostas
│   │       ├── pages/
│   │       └── ...
│   │
│   ├── shared/              # Código compartilhado
│   │   ├── components/      # Componentes reutilizáveis
│   │   │   └── layout/      # Layouts da aplicação
│   │   ├── hooks/           # Custom hooks
│   │   ├── types/           # Tipos compartilhados
│   │   └── utils/           # Utilitários
│   │
│   ├── routes/              # Configuração de rotas
│   │   ├── index.tsx        # Router principal
│   │   └── PrivateRoute.tsx # Proteção de rotas
│   │
│   ├── lib/                 # Configurações de libs
│   │   ├── react-query.ts   # Setup React Query
│   │   └── axios.ts         # Setup Axios
│   │
│   ├── styles/              # Estilos globais
│   │   └── globals.css      # CSS global + Tailwind
│   │
│   ├── App.tsx              # Componente raiz
│   ├── main.tsx             # Entry point
│   └── vite-env.d.ts        # Tipos do Vite
│
├── index.html               # HTML template
├── package.json             # Dependências
├── tsconfig.json            # Config TypeScript
├── vite.config.ts           # Config Vite
├── tailwind.config.js       # Config Tailwind
└── .env.example             # Variáveis de ambiente

```

## 🔧 Instalação

### Pré-requisitos
- Node.js 18+ 
- pnpm 8+ (recomendado) ou npm

### Passo a passo

1. **Clone o repositório** (se ainda não o fez)

2. **Instale as dependências**
   ```bash
   cd app
   pnpm install
   # ou
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   
   Edite o arquivo `.env` com suas configurações:
   ```env
   VITE_API_BASE_URL=http://localhost:3001/api
   VITE_ENV=development
   ```

4. **Instale o Design System** (se ainda não instalado)
   ```bash
   cd ../design-system
   pnpm install
   pnpm build
   ```

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento - inicia servidor dev em http://localhost:3000
pnpm dev

# Build - cria build de produção otimizado
pnpm build

# Preview - visualiza build de produção localmente
pnpm preview

# Lint - verifica código com ESLint
pnpm lint

# Type check - verifica tipos TypeScript
pnpm type-check
```

## 🏗️ Arquitetura

### Arquitetura Modular

A aplicação segue uma arquitetura modular onde cada módulo representa um domínio de negócio:

```
modules/
├── auth/           # Autenticação e autorização
├── prospeccao/     # Prospecção de propostas
├── projetos/       # Gestão de projetos (futuro)
├── financeiro/     # Gestão financeira (futuro)
└── ...
```

#### Estrutura de um Módulo

Cada módulo segue a mesma estrutura:

```
module-name/
├── components/     # Componentes específicos do módulo
├── pages/          # Páginas/rotas do módulo
├── services/       # Chamadas de API
├── hooks/          # Custom hooks do módulo
├── store/          # Estado Zustand (se necessário)
├── types/          # TypeScript types
└── utils/          # Utilitários do módulo
```

### Gerenciamento de Estado

1. **Estado do Servidor** → React Query
   - Cache automático
   - Refetch inteligente
   - Loading e error states
   - Mutações otimistas

2. **Estado Global do Cliente** → Zustand
   - Auth state
   - UI state global
   - Preferências do usuário

3. **Estado Local** → React useState/useReducer
   - Forms
   - UI temporário
   - Estados de componentes

### Roteamento

- **React Router 6** com lazy loading
- **Rotas protegidas** com PrivateRoute
- **Layouts** com Outlet para nested routes

### Requisições HTTP

- **Axios** com interceptors
- **Autenticação** automática via token
- **Error handling** centralizado
- **Base URL** configurável

## 📦 Módulos

### Auth Module

Gerencia autenticação e autorização:

- **LoginForm**: Formulário de login com validação
- **AuthStore**: Estado global de autenticação (Zustand)
- **AuthService**: Serviços de API (login, logout, refresh token)
- **PrivateRoute**: Proteção de rotas privadas

**Recursos:**
- Login com email/senha
- Persistência de sessão
- Verificação de permissões
- Redirecionamento automático

### Prospeccao Module

Gerencia prospecção de propostas:

- **Dashboard**: Visão geral de propostas
- **PropostasListPage**: Lista todas as propostas
- **PropostaDetailPage**: Detalhes de uma proposta
- **NovaPropostaPage**: Criar nova proposta

## 🛠️ Desenvolvimento

### Criando um Novo Módulo

1. Crie a estrutura de pastas:
   ```bash
   mkdir -p src/modules/nome-modulo/{components,pages,services,hooks,store,types,utils}
   ```

2. Crie os tipos TypeScript:
   ```typescript
   // src/modules/nome-modulo/types/nome-modulo.types.ts
   export interface MinhaEntidade {
     id: string
     // ...
   }
   ```

3. Crie o serviço de API:
   ```typescript
   // src/modules/nome-modulo/services/nomeModuloService.ts
   import { api } from '@/lib/axios'
   
   export const nomeModuloService = {
     async buscarTodos() {
       const response = await api.get('/endpoint')
       return response.data
     }
   }
   ```

4. Crie as páginas:
   ```typescript
   // src/modules/nome-modulo/pages/ListaPage.tsx
   export default function ListaPage() {
     // ...
   }
   ```

5. Adicione as rotas em `src/routes/index.tsx`

### Path Aliases

Utilize os path aliases configurados:

```typescript
// Ao invés de:
import { Button } from '../../../shared/components/Button'

// Use:
import { Button } from '@/shared/components/Button'

// Para módulos:
import { authService } from '@/modules/auth/services/authService'
```

### React Query

#### Query (GET)
```typescript
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/react-query'

function MeuComponente() {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.prospeccao.list(),
    queryFn: () => prospecaoService.buscarTodos(),
  })
}
```

#### Mutation (POST/PUT/DELETE)
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'

function MeuComponente() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: (data) => service.criar(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.prospeccao.list() })
    },
  })
}
```

### Formulários com React Hook Form

```typescript
import { useForm } from 'react-hook-form'

function MeuForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const onSubmit = (data) => {
    // ...
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('campo', { required: true })} />
      {errors.campo && <span>Campo obrigatório</span>}
    </form>
  )
}
```

## 🚢 Build

### Build de Produção

```bash
pnpm build
```

Gera build otimizado em `dist/`:
- Code splitting automático
- Tree shaking
- Minificação
- Assets otimizados

### Preview do Build

```bash
pnpm preview
```

Serve o build de produção localmente para testes.

## 📝 Convenções

### Nomenclatura

- **Componentes**: PascalCase (`LoginForm.tsx`)
- **Hooks**: camelCase com prefixo `use` (`useAuth.ts`)
- **Services**: camelCase com sufixo `Service` (`authService.ts`)
- **Types**: PascalCase com sufixo `Types` ou interfaces (`User`, `LoginCredentials`)
- **Utils**: camelCase (`formatCurrency`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Estrutura de Arquivos

- Um componente por arquivo
- Exportações default para páginas e layouts
- Exportações nomeadas para utilitários e hooks
- Index files apenas para barrel exports

### TypeScript

- Sempre tipar props, states e retornos de funções
- Usar interfaces para objetos
- Usar types para unions e utilities
- Evitar `any`, use `unknown` se necessário

## 🔐 Segurança

- Tokens JWT armazenados em localStorage
- Interceptor Axios adiciona token automaticamente
- Rotas protegidas com PrivateRoute
- Logout automático em 401
- Validação de permissões por rota

## 🎨 Estilização

- **TailwindCSS** para utilitários
- **CSS Variables** para temas
- **Design System** para componentes
- **Responsive design** mobile-first

## 📚 Recursos Adicionais

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TanStack Query Documentation](https://tanstack.com/query)
- [React Router Documentation](https://reactrouter.com)
- [TailwindCSS Documentation](https://tailwindcss.com)

---

**Desenvolvido com ❤️ usando React + TypeScript + Vite**
