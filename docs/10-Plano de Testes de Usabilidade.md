# Plano de Testes de Usabilidade

Os testes de usabilidade permitem avaliar a qualidade da interface com o usuário da aplicação interativa.

Um plano de teste de usabilidade deverá conter: 

## Definição do(s) objetivo(s)

Os principais objetivos deste teste de usabilidade para o sistema SOS Dog são:
- Verificar se os usuários conseguem registrar a ocorrência de um animal de forma rápida utilizando os atalhos da tela principal.
- Avaliar a clareza da navegação entre as visualizações (Mapa vs. Feed) e a utilização de filtros de estado.
- Identificar a facilidade com que o usuário consegue registrar ações de cuidado (fornecer água/comida) e validar a localização de um animal através do painel de detalhes.
- Validar o fluxo de criação de conta, garantindo que a escolha de perfis (Adotante, Voluntário, ONG, etc.) seja compreendida.

## Seleção dos participantes

O teste será realizado com **6 a 8 participantes**, garantindo a diversidade necessária para cobrir as personas do projeto, respeitando o anonimato (LGPD).

**Critérios para selecionar participantes:**
- **Perfil 1 (Representando Tutores):** Pessoas que possuem animais de estimação, com conhecimentos básicos ou medianos de tecnologia.
- **Perfil 2 (Representando Protetores/ONGs):** Pessoas envolvidas com a causa animal (voluntários ou apenas simpatizantes), que usariam a plataforma com mais frequência.
- **Perfil 3 (Comunidade Geral):** Usuários comuns, motoristas ou comerciantes, que usariam o sistema esporadicamente ao ver um animal na rua.

**Quantidade recomendada:**
Mínimo: 5 participantes. Ideal: Entre 8 e 12 para maior diversidade.

## Definição de cenários de teste

### Cenário 1: Registro de Ocorrência
- **Objetivo:** Avaliar a facilidade e agilidade em iniciar o registro de um animal encontrado na rua.
- **Contexto:** O usuário avista um cachorro abandonado e deseja reportá-lo rapidamente no sistema para que alguém possa ajudar.
- **Tarefa(s):** - Acessar a tela principal do sistema.
  - Localizar e clicar no botão "Reportar Cachorro" ou "Urgente" (localizados no canto inferior esquerdo da área de listagem).
  - Preencher os dados solicitados na tela seguinte.
- **Critério(s) de Sucesso(s):**
  - O usuário identifica os botões de ação rapidamente na interface principal.
  - Compreende a diferença entre reportar uma ocorrência comum e uma urgente.

### Cenário 2: Navegação e Filtros no Feed
- **Objetivo:** Testar a usabilidade da alternância de visualizações e a clareza do botão de filtros.
- **Contexto:** Uma protetora deseja visualizar apenas os animais de um estado/condição específica no formato de lista, em vez do mapa.
- **Tarefa(s):** - Na barra superior central, alternar de "Mapa dos Casos" para "Feed de Casos".
  - Clicar no botão "Selecionar Estado" (acima dos cards de animais).
  - Aplicar um filtro e observar a mudança no feed de notícias.
- **Critério(s) de Sucesso(s):**
  - O usuário compreende que o menu central altera a forma de visualização da tela.
  - Consegue aplicar um filtro com sucesso sem precisar de auxílio.

### Cenário 3: Interação e Cuidados Básicos (Painel de Detalhes)
- **Objetivo:** Verificar se os usuários entendem como registrar interações e validar a localização de um animal já cadastrado.
- **Contexto:** Um voluntário passa pelo local onde um cão comunitário vive. Ele dá água para o animal e quer registrar isso no sistema para que outros saibam que ele já foi alimentado hoje.
- **Tarefa(s):** - Selecionar o card de um animal no "Feed de Notícias".
  - Observar o painel lateral direito ("ID do Cachorro").
  - Na seção "Registro de Ações", clicar no botão verde "Água".
  - Logo abaixo, clicar em "Verificar localização" para confirmar que o animal continua ali.
- **Critério(s) de Sucesso(s):**
  - O usuário encontra facilmente as opções de "Água/Comida" no painel.
  - Conclui as ações de validação de localização e registro de cuidados intuitivamente.

### Cenário 4: Busca por Animais Perdidos e Comentários
- **Objetivo:** Avaliar o uso do carrossel inferior e a área de comentários da plataforma.
- **Contexto:** Um usuário viu um cartaz físico de um cão perdido e quer checar no sistema se há atualizações sobre o caso ou deixar um comentário dizendo que o viu pela região.
- **Tarefa(s):** - Rolar a tela até o carrossel inferior intitulado "Procura-se".
  - Utilizar as setas laterais para navegar entre os cães desaparecidos (ex: Zeus, Luke, Café, Totó).
  - Clicar em um dos animais para abrir seus detalhes.
  - Localizar a seção "Comentários" no painel direito e simular a inserção de uma mensagem.
- **Critério(s) de Sucesso(s):**
  - O usuário percebe que o carrossel inferior é dedicado a animais perdidos (diferente dos de rua).
  - Encontra a área de comentários no fim do painel direito sem dificuldades.

### Cenário 5: Criação de Nova Conta e Seleção de Perfil
- **Objetivo:** Avaliar o fluxo de cadastro e o entendimento da categorização de perfis no modal de criação de conta.
- **Contexto:** Um lojista decide se cadastrar como "Apoiador" para poder interagir com as ocorrências próximas ao seu comércio.
- **Tarefa(s):** - Clicar no ícone "login/cadastrar" no canto superior direito.
  - No modal "Entrar na sua conta", localizar e clicar no link "Cadastrar".
  - No modal "Criar Conta", preencher Nome, E-mail, WhatsApp e Senhas.
  - Clicar no botão verde "Apoiador" na seção "Selecione seu perfil".
  - Clicar em "Finalizar Cadastro".
- **Critério(s) de Sucesso(s):**
  - O usuário não tenta fazer login na tela de entrada, indo direto para a opção de cadastro.
  - Entende que os blocos coloridos (Adotante, Voluntário, Apoiador, ONG) são botões de seleção obrigatórios antes de finalizar.

## Métodos de coleta de dados

Durante as sessões de teste (que podem ser moderadas remotamente via chamada de vídeo com compartilhamento de tela ou presencialmente), os seguintes métodos serão aplicados:

- **Observação Direta e Think Aloud (Pensar Alto):** Será solicitado ao participante que narre o que está pensando e fazendo enquanto executa as tarefas para identificar frustrações em tempo real.
- **Métricas Quantitativas:**
  - Tempo médio de conclusão de cada tarefa.
  - Taxa de sucesso (quantos conseguiram concluir a tarefa sem ajuda).
  - Número de cliques extras ou caminhos errados tomados.
- **Métricas Qualitativas (Questionário Pós-Teste):** Ao final das 5 tarefas, o usuário responderá a um breve questionário:
  - *Numa escala de 1 a 5, quão fácil foi navegar na interface e encontrar as funções?*
  - *O painel de detalhes do animal ("ID do Cachorro") foi claro o suficiente?*
  - *A etapa de selecionar o seu perfil no cadastro causou alguma dúvida?*
  - *Você adicionaria, mudaria ou removeria alguma coisa na disposição da tela?*
> **Links Úteis**:
> - [Teste De Usabilidade: O Que É e Como Fazer Passo a Passo (neilpatel.com)](https://neilpatel.com/br/blog/teste-de-usabilidade/)
> - [Teste de usabilidade: tudo o que você precisa saber! | by Jon Vieira | Aela.io | Medium](https://medium.com/aela/teste-de-usabilidade-o-que-voc%C3%AA-precisa-saber-39a36343d9a6/)
> - [Planejando testes de usabilidade: o que (e o que não) fazer | iMasters](https://imasters.com.br/design-ux/planejando-testes-de-usabilidade-o-que-e-o-que-nao-fazer/)
> - [Ferramentas de Testes de Usabilidade](https://www.usability.gov/how-to-and-tools/resources/templates.html)
