# Metodologia

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Documentação de Especificação</a></span>

A equipe adota uma abordagem baseada em metodologias ágeis, combinando práticas dos frameworks Scrum e Kanban para organizar as atividades do projeto. Essa escolha permite dividir o desenvolvimento em etapas incrementais, acompanhar o progresso das tarefas e manter a colaboração contínua entre os integrantes ao longo do projeto.

O gerenciamento das atividades é realizado por meio de ferramentas online que permitem registrar tarefas, definir responsáveis e visualizar o progresso do projeto. Dessa forma, o fluxo de trabalho permanece organizado e alinhado com os objetivos definidos.

## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o
[Git](https://git-scm.com/), sendo que o [GitHub](https://github.com)
foi utilizado para hospedagem do repositório e gerenciamento do código-fonte.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável e final do sistema

Quanto à gerência de issues, o projeto adota a seguinte convenção para etiquetas:

- `feature`: desenvolvimento de nova funcionalidade
- `bug`: correção de erro no sistema
- `enhancement`: melhoria em funcionalidade existente
- `documentation`: atualização ou melhoria da documentação
- `duplicate`: issue ou pull request já existente

As issues são utilizadas para organizar tarefas, correções e melhorias ao longo do desenvolvimento. Cada issue representa uma atividade específica e é vinculada ao fluxo de trabalho no GitHub Projects, permitindo acompanhar o progresso do projeto de forma estruturada e visual.

### Gerência de Commits

Os commits são realizados de forma frequente, utilizando mensagens descritivas e padronizadas, facilitando o rastreamento das alterações no projeto.

A equipe adota uma convenção baseada em prefixos, alinhada às categorias das issues, como:

- `feat`: desenvolvimento de nova funcionalidade
- `fix`: correção de erros no sistema
- `docs`: alterações na documentação
- `refactor`: melhorias internas no código sem alteração de funcionalidade

Essa padronização contribui para a organização do histórico do projeto e facilita a identificação das mudanças realizadas.

### Gerência de Branches e Merges

O desenvolvimento do projeto é realizado a partir da branch `main`, que atualmente centraliza as alterações do sistema. Para melhor organização e controle do código, a equipe adota a prática de criação de branches específicas para cada funcionalidade, correção ou melhoria, geralmente associadas a uma issue.

Essas branches são criadas a partir da `main`, seguindo um padrão de nomenclatura como `feature/nome-da-funcionalidade` ou `bug/correcao-descricao`. Após a conclusão da atividade, é aberto um *pull request* para revisão antes da integração ao código principal.

Esse processo permite maior controle sobre as alterações, melhora a rastreabilidade das funcionalidades desenvolvidas e reduz a ocorrência de conflitos durante o desenvolvimento.

## Gerenciamento de Projeto

### Divisão de Papéis

A organização do trabalho segue uma estrutura inspirada no Scrum, na qual um integrante do grupo atua como Scrum Master, sendo responsável por organizar as tarefas, acompanhar o progresso e garantir o fluxo adequado do projeto.

Os demais integrantes atuam como desenvolvedores, sendo responsáveis pela implementação das funcionalidades, testes e documentação.

### Processo

Para acompanhar o andamento das tarefas, utilizamos o GitHub Projects, que funciona como um quadro de organização baseado no método Kanban. As atividades são registradas como issues e organizadas nas seguintes etapas do fluxo de trabalho:

- `Backlog`: tarefas planejadas para o projeto
- `Ready`: tarefas prontas para serem iniciadas
- `In Progress`: tarefas em desenvolvimento
- `In Review`: tarefas em revisão pelo grupo
- `Done`: tarefas concluídas

Cada integrante seleciona as tarefas disponíveis e atualiza seu status conforme o andamento. Esse modelo permite acompanhar o progresso de forma visual e facilita a organização das atividades da equipe.

A comunicação entre os membros ocorre principalmente por meio do WhatsApp, utilizado para trocas rápidas no dia a dia. Para reuniões e alinhamentos mais detalhados, utilizamos o Microsoft Teams.

### Ferramentas

As ferramentas empregadas no projeto são:

- `Visual Studio`: ambiente de desenvolvimento utilizado para implementação e edição do código do sistema.
- `Git`: sistema de controle de versão utilizado para gerenciar as alterações no código.
- `GitHub`: plataforma utilizada para hospedagem do repositório e integração do versionamento com o gerenciamento do projeto.
- `GitHub Projects`: ferramenta utilizada para organização das tarefas, estruturada em formato de quadro Kanban, apoiando a aplicação de práticas ágeis inspiradas no Scrum.
- `Figma`: ferramenta utilizada para criação de protótipos e design das interfaces do sistema.
- `WhatsApp`: utilizado para comunicação rápida e troca de informações no dia a dia entre os integrantes.
- `Microsoft Teams`: utilizado para reuniões, alinhamentos e discussões mais detalhadas sobre o projeto.

Essas ferramentas foram escolhidas por facilitarem a organização do desenvolvimento e a colaboração entre os membros da equipe. O Visual Studio oferece um ambiente completo para desenvolvimento, enquanto o Git e o GitHub garantem controle eficiente das versões e integração das atividades.
