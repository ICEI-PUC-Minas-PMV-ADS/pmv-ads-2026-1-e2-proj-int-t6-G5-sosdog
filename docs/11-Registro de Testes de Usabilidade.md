# Registro de Testes de Usabilidade

O registro de testes de usabilidade é um documento ou planilha onde são coletadas e organizadas as informações sobre a experiência dos usuários ao interagir com um sistema. Ele inclui dados como tempo de execução de tarefas, taxa de sucesso, dificuldades encontradas, erros cometidos e _feedback_ dos usuários. Esse registro permite identificar padrões de uso, obstáculos/dificuldades encontrados na interface e oportunidades de melhoria, fornecendo _insights_ quantitativos e qualitativos para otimizar a experiência do usuário. Além disso, serve como base para análises, correções e futuras iterações do sistema, garantindo que ele atenda às necessidades do público-alvo de forma eficiente.

## Perfil dos usuários que participaram do teste

- Usuário 1: 34 anos, nível superior completo (Administração), conhecimento intermediário de tecnologia, tutora de dois cachorros
- Usuário 2: 22 anos, nível superior incompleto (Sistemas de Informação), conhecimento avançado de tecnologia, voluntária em ONG de resgate animal
- Usuário 3: 58 anos, nível médio completo, conhecimento básico de tecnologia, comerciante que frequentemente avista animais abandonados próximo ao seu estabelecimento
- Usuário 4: 27 anos, nível superior completo (Veterinária), conhecimento intermediário de tecnologia, protetora independente
- Usuário 5: 19 anos, nível superior incompleto (Design), conhecimento avançado de tecnologia, nunca interagiu com plataformas de causa animal

## Registro dos testes por cenário

Para registrar os indicadores de cada cenário, é preciso manter a coerência com os critérios quantitativos e qualitativos que foram definidos no plano de testes de usabilidade.

**Cenário 1: Registro de Ocorrência**
O usuário avista um cachorro abandonado e deseja reportá-lo no sistema. Deve localizar o botão "Reportar Animal" ou "Urgente", arrastar o pin para a localização e preencher a ficha de ocorrência.

| **Usuário** | **Tempo Total (seg)** | **Quantidade de cliques** | **Tarefa foi concluída?** (Sim/Não) | **Erros Cometidos** | **Feedback do Usuário** |
|---|---|---|---|---|---|
| Usuário 1 | 97 | 9 | Sim | Tentou clicar no botão "Urgente" antes do "Reportar Animal" | "Achei intuitivo depois que entendi o pin. No início fiquei confusa com os dois botões." |
| Usuário 2 | 54 | 7 | Sim | Nenhum | "Muito fácil, o pin no mapa é prático." |
| Usuário 3 | 143 | 14 | Sim | Não encontrou o botão de imediato; precisou de um minuto para localizar o pin | "Demorei um pouco, mas consegui. Achei que seria mais difícil." |
| Usuário 4 | 61 | 8 | Sim | Nenhum | "Fluxo bem direto. Gostei de poder arrastar o pin." |
| Usuário 5 | 48 | 6 | Sim | Nenhum | "Super simples, completei rápido." |

**Cenário 2: Navegação entre visualizações e uso do filtro**
O usuário deve localizar o botão "Filtrar" no mapa, aplicar um critério de filtro, observar a atualização dos marcadores e da lista lateral, limpar os filtros e navegar para o feed de casos.

| **Usuário** | **Tempo Total (seg)** | **Quantidade de cliques** | **Tarefa foi concluída?** (Sim/Não) | **Erros Cometidos** | **Feedback do Usuário** |
|---|---|---|---|---|---|
| Usuário 1 | 82 | 10 | Sim | Não percebeu de imediato que a lista lateral também atualizava | "O filtro funciona bem. Não tinha notado que a lista mudava junto com o mapa." |
| Usuário 2 | 39 | 6 | Sim | Nenhum | "Rápido e claro. O badge mostrando filtros ativos é um bom detalhe." |
| Usuário 3 | 178 | 18 | Sim | Tentou procurar o filtro na barra superior antes de encontrá-lo no mapa | "Não esperava que o filtro ficasse dentro do mapa. Mas depois que achei foi fácil." |
| Usuário 4 | 55 | 8 | Sim | Nenhum | "Filtro bem completo. Gostei de ter opção por estado de saúde." |
| Usuário 5 | 44 | 7 | Sim | Nenhum | "Achei o botão rapidinho. O dropdown é bem organizado." |

**Cenário 3: Interação e Cuidados Básicos (Painel de Detalhes)**
O usuário deve selecionar o card de um animal, localizar a seção "Registro de Ações" no painel lateral direito e clicar no botão "Água", verificando a atualização da data, hora e nome do cuidador.

| **Usuário** | **Tempo Total (seg)** | **Quantidade de cliques** | **Tarefa foi concluída?** (Sim/Não) | **Erros Cometidos** | **Feedback do Usuário** |
|---|---|---|---|---|---|
| Usuário 1 | 68 | 7 | Sim | Nenhum | "Adorei essa funcionalidade. Evita que duas pessoas deem água pro mesmo cachorro no mesmo dia." |
| Usuário 2 | 31 | 5 | Sim | Nenhum | "Muito útil para coordenar voluntários. Funcionou perfeitamente." |
| Usuário 3 | 112 | 11 | Sim | Demorou para rolar o painel e encontrar a seção de ações | "Tive que rolar bastante para achar. Talvez deixar mais no topo?" |
| Usuário 4 | 42 | 6 | Sim | Nenhum | "Prático. O registro do último cuidador com horário é exatamente o que precisamos." |
| Usuário 5 | 38 | 5 | Sim | Nenhum | "Bem simples de usar." |

**Cenário 4: Busca por Animais Perdidos e Comentários**
O usuário deve acessar a seção "Pets Perdidos" pela navegação superior, localizar um animal na listagem, voltar ao mapa, selecionar uma ocorrência e enviar um comentário pelo painel lateral direito.

| **Usuário** | **Tempo Total (seg)** | **Quantidade de cliques** | **Tarefa foi concluída?** (Sim/Não) | **Erros Cometidos** | **Feedback do Usuário** |
|---|---|---|---|---|---|
| Usuário 1 | 91 | 11 | Sim | Não percebeu de imediato a diferença entre pets perdidos e animais de rua | "Entendi a diferença depois de explorar um pouco. Poderia ser mais destacada." |
| Usuário 2 | 47 | 8 | Sim | Nenhum | "Seção de comentários bem posicionada. Fácil de enviar." |
| Usuário 3 | 159 | 16 | Sim | Tentou comentar sem estar logado e ficou confuso com o redirecionamento | "Precisei logar primeiro para comentar. Podia avisar antes de eu tentar." |
| Usuário 4 | 53 | 9 | Sim | Nenhum | "Gostei da seção de pets perdidos. O fluxo de comentários é bem simples." |
| Usuário 5 | 41 | 7 | Sim | Nenhum | "Tranquilo. Achei a navegação entre as seções clara." |

**Cenário 5: Criação de Nova Conta**
O usuário deve localizar o link de cadastro no modal de login, preencher todos os campos obrigatórios (nome, e-mail, telefone, senha e foto de perfil) e identificar o próximo passo indicado pelo sistema após o envio.

| **Usuário** | **Tempo Total (seg)** | **Quantidade de cliques** | **Tarefa foi concluída?** (Sim/Não) | **Erros Cometidos** | **Feedback do Usuário** |
|---|---|---|---|---|---|
| Usuário 1 | 104 | 12 | Sim | Tentou fazer login antes de encontrar o link de cadastro | "O link de cadastro podia ser mais visível no modal." |
| Usuário 2 | 58 | 9 | Sim | Nenhum | "Fluxo bem padrão. A confirmação por e-mail é esperada." |
| Usuário 3 | 196 | 19 | Sim | Não entendeu de imediato que precisava confirmar o e-mail para acessar | "Não sabia que precisava confirmar o e-mail. Fiquei esperando entrar direto." |
| Usuário 4 | 71 | 10 | Sim | Nenhum | "Simples e direto. Gostei de poder colocar foto de perfil já no cadastro." |
| Usuário 5 | 52 | 8 | Sim | Nenhum | "Cadastro rápido. A mensagem de confirmação por e-mail foi clara." |

## Relatório dos testes de usabilidade

O relatório de testes de usabilidade deve ser um documento claro e estruturado, contendo análises dos testes realizados, identificação de problemas, propostas de correção, melhorias e sugestões para a evolução do sistema.
Ele servirá como base para refinamentos no sistema e futuras iterações de testes.
Deve incluir:
- Taxa de sucesso por cenário
- Tempo médio para completar cada cenário
- Número médio de erros cometidos por tarefa
- Taxa de abandono (usuários que não conseguiram concluir a tarefa do cenário)
- Feedback qualitativo

A partir disso, organize os resultados e identifique padrões:
- Principais dificuldades enfrentadas pelos usuários.
- Quais tarefas foram concluídas sem problemas e quais apresentaram falhas.
- Sugestões de melhorias para interface, navegação e acessibilidade.

Dica: Agrupe problemas em níveis de prioridade:
- Crítico: Impede o uso do sistema.
- Moderado: Dificulta a experiência, mas não impede o uso.
- Leve: Pode ser melhorado, mas não compromete a usabilidade.

Apresente propostas de ações para corrigir os problemas críticos e recorrentes identificados e proponha melhorias incrementais para otimizar a experiência do usuário.

> **Links Úteis**:
> - [Ferramentas de Testes de Usabilidade](https://www.usability.gov/how-to-and-tools/resources/templates.html)
