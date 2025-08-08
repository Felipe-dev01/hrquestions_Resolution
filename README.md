# Interview Exam: Paginated Todo List

## Descrição

Este repositório contém a implementação de um sistema de lista de tarefas (Todo List) com paginação, desenvolvido como parte de um teste técnico. O projeto utiliza AngularJS no front-end e .NET 4.6 Web API no back-end.

---

## Funcionalidades Implementadas

### Front-end (AngularJS)

- **Componente/Diretiva de Paginação Reutilizável:** Permite navegação entre páginas e seleção do número de itens por página (10/20 (padrão)/30/todos).
- **Navegação Completa:** Botões para anterior, próximo, primeira e última página.
- **Entrada de Página Arbitrária:** Permite inserir manualmente um número de página para navegação.
- **Exibição de Informações:** Mostra número da página atual, total de páginas e total de itens.
- **Integração com Lista de Tarefas:** A lista de tarefas utiliza o componente de paginação para buscar e renderizar os itens conforme a página selecionada.
- **Ordenação:** Permite ordenar a lista por qualquer propriedade ao clicar nos cabeçalhos da tabela, alternando a ordem (ascendente/descendente) e limitando a uma propriedade por vez.

### Back-end (.NET 4.6 Web API)

- **API Paginada:** Implementa o contrato client-server, incluindo DTOs da camada de serviço e assinaturas de métodos para fornecer os dados paginados conforme solicitado pelo front-end.

---

## Dificuldades e Facilidades

- **Mais Fácil:** Desenvolver o back-end em C# (.NET 4.6)
- **Mais Difícil:** AngularJS, principalmente por ser menos familiar, demandando mais tempo para compreender e implementar as funcionalidades.

---

## Tempo Empenhado

- **Segunda (04/08):** 17:30 às 20:00 — Entendimento da estrutura do projeto e pesquisa de conteúdo online.
- **Terça-feira (05/08):** 06:30 às 21:00 — Aprendizado de funções básicas de AngularJS e primeiras tentativas de implementação.
- **Quarta-feira (06/08):** 06:30 às 19:00 — Implementação das primeiras funções de paginação.
- **Quinta-feira (07/08):** 14:00 às 21:00 — Funcionalidades de entrada manual da página e exibição de todas as tarefas ("All"), além de ajustes finais.
- **Sexta-feira (07/08):** 14:00 às 17:30 — Correções de bugs, revisão de código, adição de documentação como comentários e um README.

---

## Estrutura dos Arquivos

```
InterviewTestPagination/
│
├───index.html               # Página única da aplicação
│
├───app/                     # Código AngularJS
│   ├───app.module.js        # Definição do módulo Angular
│   ├───main.js              # Código principal dos componentes
│   ├───styles/
│   │   └───styles.css       # Estilo da aplicação
│   └───templates/
│       ├───pagination.html          # Template da diretiva de paginação
│       └───todo.list.paginated.html # Template da diretiva da lista de tarefas
│
├───App_Start/
│   └───WebApiConfig.cs      # Configuração Web API
│
├───Controllers/
│   └───TodoController.cs    # Controller da API para o Modelo Todo
│
├───Models/
│   ├───IModelRepository.cs 
│   ├───IModelService.cs
│   ├───PagedResult.cs
│   └───Todo/
│       ├───Todo.cs
│       ├───TodoRepository.cs
│       └───TodoService.cs
│
├───Scripts/                 # Scripts de terceiros (apenas AngularJS)
│
├───InterviewTestPagination.Tests/   # Testes automatizados
```

---

## Pergunta de arquitetura: Sistema de gerenciamento de ativos offline

## Como o sistema vai funcionar?

- **Back-end:** Será um serviço que busca os dados da tabela no banco de dados e entrega para o app quando solicitado. Também será responsável por mesclar os dados que estavam offline com os que estão online, além de manter um histórico de versões.

- **Front-end:** Será o aplicativo utilizado pelo cliente, onde ele baixa os dados do back-end ao acessar online e os armazena no próprio aparelho para funcionar offline.

---

## Passo a Passo do Funcionamento do sistema

**Quando o cliente abrir o APP online**

- O app solicita todos os dados da tabela Asset ao back-end (API).
- O back-end pega os dados do banco SQL e envia para o app.
- O app salva os dados no dispositivo móvel através de um JSON ou até mesmo um SQLite.

**Quando o cliente abrir o APP offline**

- O app mostra os dados que já estão salvos localmente da última vez em que esteve online.
- O usuário pode navegar e consultar tudo normalmente.
- O usuário pode até mesmo fazer alterações, que serão sincronizadas quando estiver online novamente.

**Quando o cliente tiver internet novamente:**

- O app solicita ao back-end apenas os dados novos ou atualizados (Através do Campo `rowstamp`).
- Após atualizar sua versão, sincroniza suas alterações com o back-end.
- Assim, só baixa o que mudou, economizando tempo e dados.

---

## Stack de Tecnologias

- **Front-End:** React Native
- **Back-End:** .NET 4.6 usando Web API 2 com C# 6

---

## Resumindo

- O app obtém os dados do back-end quando online e os armazena no aparelho.
- Depois, pode ser utilizado sem internet.
- Quando houver conexão novamente, só atualiza o que mudou e envia as alterações.