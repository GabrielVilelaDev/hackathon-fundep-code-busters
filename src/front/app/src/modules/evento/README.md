# Módulo de Eventos e Inscrições

Módulo completo para gerenciamento de eventos e matrículas de alunos.

## 📁 Estrutura do Módulo

```
evento/
├── components/          # Componentes reutilizáveis
│   └── MatriculaModal.tsx
├── hooks/              # React Query hooks
│   ├── useEventos.ts
│   └── useMatriculas.ts
├── pages/              # Páginas do módulo
│   ├── EventosListPage.tsx
│   ├── NovoEventoPage.tsx
│   ├── EventoDetailPage.tsx
│   └── MinhasMatriculasPage.tsx
├── services/           # Chamadas à API
│   └── eventos.service.ts
└── types/              # Types e interfaces
    └── evento.types.ts
```

## 🚀 Funcionalidades

### Gerenciamento de Eventos

- ✅ **Listagem de Eventos**: Visualização em cards responsivos com filtros de busca
- ✅ **Cadastro de Evento**: Formulário completo com validação Zod
- ✅ **Detalhes do Evento**: Visualização completa com informações de matrícula
- ✅ **Status de Inscrição**: Badge visual indicando disponibilidade

### Matrículas

- ✅ **Realizar Matrícula**: Modal com validação e confirmação
- ✅ **Consultar Matrículas**: Busca por código do aluno
- ✅ **Listagem de Matrículas**: Cards com informações do evento e status

## 🎨 Componentes

### MatriculaModal

Modal para realizar matrícula em eventos com:
- Validação de formulário com Zod
- Feedback visual de sucesso
- Integração com React Query

## 🔌 API Endpoints

### Eventos

```typescript
POST   /eventos              # Cadastrar evento
GET    /eventos              # Listar eventos
GET    /eventos/:id          # Obter evento específico
```

### Matrículas

```typescript
POST   /matriculas                  # Realizar matrícula
GET    /matriculas/:codigoAluno     # Listar matrículas do aluno
```

## 📝 Schemas de Validação

### CadastrarEventoDto

```typescript
{
  titulo: string;
  descricao: string;
  local: string;
  ministrantes: string;
  dataInicioMatricula: Date;
  dataFimMatricula: Date;
  dataInicioEvento: Date;
  dataFimEvento: Date;
  numeroMaximoInscritos: number;
  valor: number;
}
```

### RealizarMatriculaDto

```typescript
{
  codigoAluno: string;
  eventoId: string;
  tipoPagamento: TipoPagamento;
}
```

## 🎯 Rotas

```
/eventos                 # Listagem de eventos
/eventos/novo            # Cadastrar novo evento
/eventos/:id             # Detalhes do evento
/matriculas              # Consultar matrículas por aluno
```

## 🛠️ Tecnologias Utilizadas

- **React**: Biblioteca de UI
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de schemas
- **React Query**: Gerenciamento de estado e cache
- **React Router**: Roteamento
- **Lucide React**: Ícones
- **Design System**: Componentes base customizados

## 📱 Responsividade

Todas as telas são totalmente responsivas e se adaptam a:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1440px+)

## 🔍 Funcionalidades de UX

- **Feedback Visual**: Badges de status, loading states, mensagens de sucesso/erro
- **Busca e Filtros**: Busca em tempo real na listagem
- **Cards Informativos**: Design claro e intuitivo
- **Validação de Formulários**: Feedback imediato de erros
- **Navegação Intuitiva**: Breadcrumbs e botões de voltar
- **Estados de Loading**: Spinners em todas as operações assíncronas
- **Tratamento de Erros**: Mensagens amigáveis e ações de retry

## 🎨 Padrões de Design

O módulo segue os mesmos padrões do módulo "Projeto":
- Estrutura de pastas consistente
- Nomenclatura padronizada
- Uso exclusivo de componentes do Design System
- Hooks React Query para todas as operações
- Validação com Zod em todos os formulários
- TypeScript strict mode

## 🚦 Como Usar

### Cadastrar um Evento

1. Navegue para `/eventos`
2. Clique em "Novo Evento"
3. Preencha o formulário com as informações
4. Clique em "Cadastrar Evento"

### Realizar Matrícula

1. Navegue para `/eventos` ou `/eventos/:id`
2. Clique em "Realizar Matrícula" (se disponível)
3. Preencha o código do aluno
4. Selecione o tipo de pagamento
5. Confirme a matrícula

### Consultar Matrículas

1. Navegue para `/matriculas`
2. Digite o código do aluno
3. Clique em "Buscar Matrículas"
4. Visualize todas as matrículas do aluno

## 🔒 Validações

- Datas de matrícula devem ser coerentes
- Data de início do evento deve ser após início da matrícula
- Número máximo de inscritos deve ser maior que zero
- Todos os campos obrigatórios são validados
- Verificação de vagas disponíveis antes da matrícula

## 📊 Estados de Evento

- **Inscrições Abertas**: Badge verde, matrícula habilitada
- **Lotado**: Badge vermelho, matrícula desabilitada
- **Em Breve**: Badge cinza, matrícula desabilitada

## 🎁 Helpers Úteis

```typescript
isInscricaoAberta(evento)    # Verifica se inscrições estão abertas
isEventoLotado(evento)       # Verifica se evento está lotado
podeRealizarMatricula(evento) # Verifica se pode matricular
formatarData(dateString)     # Formata data para exibição
formatarValor(valor)         # Formata valor monetário
```

## 🧪 Próximos Passos

- [ ] Adicionar testes unitários
- [ ] Adicionar testes de integração
- [ ] Implementar paginação na listagem
- [ ] Adicionar filtros avançados
- [ ] Implementar exportação de relatórios
- [ ] Adicionar cancelamento de matrícula
- [ ] Implementar edição de eventos
