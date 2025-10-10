# 🚀 Fluxo de Desenvolvimento da Squad

## 🧭 Visão Geral

Este documento descreve o fluxo de desenvolvimento adotado pela squad, que visa **agilidade, padronização e escalabilidade** no ciclo de entrega de software.  
O processo combina **trabalho humano e inteligência artificial**, utilizando IA para apoiar a **análise de requisitos, geração de código, testes e integração entre sistemas**.

---

## 👥 Papéis e Responsabilidades

### 🧩 Analistas de Requisitos
- Leem e interpretam a documentação funcional e técnica de cada processo.
- Criam **cards no Planner (Microsoft Teams)** com histórias e critérios de aceite.
- Utilizam o **ChatGPT** para traduzir a documentação em **requisitos técnicos claros** e gerar prompts para os desenvolvedores.

### 💻 Desenvolvedores Back-End
- Implementam regras de negócio, APIs e integrações com base nos requisitos.
- Trabalham **em paralelo** aos desenvolvedores front-end, sem dependência direta.
- Utilizam o **GitHub Copilot (modelo Claude)** no **Visual Studio 2022** para gerar código a partir de prompts detalhados.
- Ajustam e refinam o código gerado para garantir aderência à arquitetura.

### 🎨 Desenvolvedores Front-End
- Implementam interfaces e fluxos de usuário com base nos requisitos e layout padrão.
- Utilizam o **Copilot (Claude)** para gerar componentes e integrações.
- Trabalham paralelamente ao back-end, baseando-se na documentação e nos endpoints.

---

## ⚙️ Arquitetura Técnica

### 🐳 Execução em Containers
Todas as aplicações — front-end e back-end — são executadas via **Docker** e **Docker Compose**, garantindo:
- Reprodutibilidade entre ambientes;
- Facilidade de escalonamento horizontal;
- Padronização e isolamento de dependências.

### 🧱 Back-End (.NET 8)
O back-end adota uma **arquitetura modular distribuída** baseada em **Clean Architecture** e **princípios SOLID**.  
Cada módulo possui quatro camadas bem definidas:

| Camada | Descrição |
|--------|------------|
| **API (Presenters)** | Ponto de entrada da aplicação (endpoints HTTP). |
| **Application** | Orquestra a lógica de negócio e coordena casos de uso. |
| **Domain** | Contém as entidades e regras puras do domínio, sem dependências externas. |
| **Infrastructure** | Implementa detalhes externos como persistência, serviços e integrações. |

**Destaques técnicos:**
- Banco de dados **em memória** (In-Memory Database);
- Comunicação com banco abstraída por **interfaces (repositories)**;
- Estrutura e padrões definidos via **prompts detalhados no ChatGPT**;
- Geração de código automatizada com **GitHub Copilot (modelo Claude)**.

### 🧩 Front-End
- Desenvolvido **em paralelo** ao back-end;
- Baseado em prompts gerados e ajustados no **Copilot (Claude)**;
- Layout unificado e reutilizável em todos os módulos;
- Comunicação com APIs feita automaticamente a partir do **Swagger**.

---

## 🤖 Fluxo de Uso de IA na Implementação

O desenvolvimento segue um fluxo contínuo de colaboração entre **ChatGPT (GPT)** e **Copilot (modelo Claude)**:

```text
1️⃣ Contextualizar a IA (GPT) sobre arquitetura e padrões de codificação  
2️⃣ Passar os requisitos dos cards para a IA (GPT) gerar um prompt para o agente  
3️⃣ Enviar o prompt gerado para o agente (Copilot com modelo Claude)  
4️⃣ Validar e ajustar a implementação feita pelo agente  
5️⃣ Testar o fluxo gerado pelo agente  
6️⃣ Solicitar ao agente a escrita de testes unitários  
7️⃣ Validar e ajustar os testes gerados  
8️⃣ Executar os testes unitários e finalizar o ciclo
🧩 Resumo do papel das IAs no processo:

ChatGPT (GPT): responsável por gerar prompts técnicos com base na documentação e arquitetura.

GitHub Copilot (Claude): responsável por gerar o código e testes unitários, a partir dos prompts recebidos.

Desenvolvedor: atua como validador e refinador do código, garantindo aderência à arquitetura e aos padrões de qualidade.

📘 O diagrama abaixo representa visualmente o ciclo completo de uso da IA:


(A imagem pode ser atualizada para o arquivo “Diagrama em branco (2).png” dentro do diretório /docs do repositório.)

🔗 Integração Front-End e Back-End
Após a implementação de cada módulo:

O Swagger gera o JSON da documentação da API, contendo endpoints, DTOs e métodos HTTP.

Esse JSON é enviado à IA (ChatGPT) para gerar automaticamente o código de integração no front-end:

Criação dos serviços HTTP;

Mapeamento de DTOs;

Tratamento de erros e respostas;

Configuração de endpoints e métodos.

💡 Esse processo elimina etapas manuais de integração e garante sincronização entre front-end e back-end.

🧠 Benefícios do Processo
🚀 Agilidade — Desenvolvimento paralelo e assistido por IA.

🧩 Padronização — Arquitetura uniforme entre todos os módulos.

⚡ Automação — Menos tarefas manuais e mais foco em regras de negócio.

🐳 Escalabilidade — Execução isolada e consistente via Docker.

🧱 Reprodutibilidade — Mesma experiência em qualquer ambiente.

🤖 Integração IA-Humana — IA auxilia, mas o desenvolvedor mantém o controle e refina o resultado.

🌿 Versionamento e GitFlow
O versionamento é feito via GitHub, seguindo o fluxo GitFlow simplificado, garantindo organização e rastreabilidade entre entregas.

Estrutura de Branches
main → contém a versão estável e homologada do sistema.

nome_do_dev → branch criada por cada desenvolvedor para sua tarefa ou módulo específico.

Fluxo
O desenvolvedor cria uma branch a partir da main.

Implementa e testa a funcionalidade.

Realiza commit e push para o GitHub.

Abre um Pull Request para revisão e merge na main.

Após aprovação, o código é integrado e versionado automaticamente.

🧰 Ferramentas Utilizadas
Categoria	Ferramenta	Finalidade
Planejamento	Microsoft Planner (Teams)	Organização e controle de tarefas
Análise de Requisitos	ChatGPT	Tradução de documentação em requisitos técnicos
IDE	Visual Studio 2022	Desenvolvimento e integração do Copilot
Assistente de IA	GitHub Copilot (Claude)	Geração automatizada de código
Containerização	Docker / Docker Compose	Execução e orquestração dos módulos
Documentação de API	Swagger	Geração do JSON e documentação automática
Versionamento	GitHub com GitFlow	Controle de versões e integração contínua
Linguagem Back-End	.NET 8 (C#)	Implementação da lógica e APIs
Linguagem Front-End	(Angular / React – conforme o módulo)	Desenvolvimento das interfaces

🧩 Fluxo Resumido
text
Copy code
📘 Analistas → ChatGPT → Copilot → Desenvolvedores → Docker → Swagger → ChatGPT → Front-End → GitHub
📜 Conclusão
Esse fluxo alia inteligência artificial, arquitetura limpa e modularização para acelerar o desenvolvimento, manter qualidade técnica e permitir entregas contínuas e consistentes.
O resultado é um ciclo de desenvolvimento moderno, colaborativo e altamente escalável — onde cada módulo é independente, mas trabalha em perfeita harmonia dentro do ecossistema.