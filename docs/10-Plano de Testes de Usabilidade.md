# Plano de Testes de Usabilidade

Os testes de usabilidade permitem avaliar a qualidade da interface com o usuário da aplicação interativa.

Um plano de teste de usabilidade deverá conter:

## Definição do(s) objetivo(s)

Os principais objetivos deste teste de usabilidade para o sistema SOS Dog são:
- Verificar se os usuários conseguem registrar a ocorrência de um animal de forma rápida utilizando os botões da tela principal.
- Avaliar a clareza da navegação entre as visualizações (Mapa, Feed e Pets Perdidos) e a utilização do filtro do mapa.
- Identificar a facilidade com que o usuário consegue registrar ações de cuidado (fornecer água/comida) através do painel de detalhes.
- Validar o fluxo de criação de conta, garantindo que as etapas de preenchimento e confirmação por e-mail sejam compreendidas.

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
- **Tarefa(s):**
  - Acessar a tela principal do sistema.
  - Localizar e clicar no botão "Reportar Animal" (flutuante no mapa) ou no botão "Urgente" (na barra inferior da sidebar).
  - Arrastar o pin vermelho para a localização do animal no mapa.
  - Preencher os dados solicitados na ficha de ocorrência.
- **Critério(s) de Sucesso:**
  - O usuário identifica os botões de ação rapidamente na interface principal.
  - Compreende a diferença entre reportar uma ocorrência comum e uma urgente.
  - Conclui o registro sem precisar de auxílio.

### Cenário 2: Navegação entre visualizações e uso do filtro
- **Objetivo:** Testar a usabilidade da alternância entre as seções da plataforma e a clareza do filtro do mapa.
- **Contexto:** Uma protetora deseja visualizar apenas os animais com um estado de saúde específico no mapa, e depois navegar para o feed de casos.
- **Tarefa(s):**
  - Na tela principal, localizar o botão "Filtrar" no canto superior esquerdo do mapa.
  - Expandir o painel de filtros e selecionar um critério (ex: Estado de Saúde).
  - Observar a atualização dos marcadores no mapa e dos cards na lista lateral.
  - Limpar os filtros e navegar para a visualização em "Feed de Casos" usando o menu superior.
- **Critério(s) de Sucesso:**
  - O usuário encontra e utiliza o botão de filtro sem auxílio.
  - Compreende que o filtro atualiza simultaneamente o mapa e a lista lateral.
  - Consegue alternar para o feed de casos pela navegação superior.

### Cenário 3: Interação e Cuidados Básicos (Painel de Detalhes)
- **Objetivo:** Verificar se os usuários entendem como registrar ações de cuidado em um animal já cadastrado.
- **Contexto:** Um voluntário passa pelo local onde um cão comunitário vive. Ele dá água para o animal e quer registrar isso no sistema para que outros saibam que ele já foi atendido hoje.
- **Tarefa(s):**
  - Selecionar o card de um animal na lista lateral ou clicar no seu marcador no mapa.
  - Observar o painel lateral direito com os detalhes do animal.
  - Na seção "Registro de Ações", clicar no botão "Água".
  - Verificar se a data, hora e nome do cuidador foram atualizados no painel.
- **Critério(s) de Sucesso:**
  - O usuário encontra facilmente as opções de "Água" e "Comida" no painel de detalhes.
  - Conclui o registro de cuidado sem precisar de auxílio.
  - Percebe o feedback visual de confirmação após a ação.

### Cenário 4: Busca por Animais Perdidos e Comentários
- **Objetivo:** Avaliar o acesso à seção de pets perdidos e a área de comentários da plataforma.
- **Contexto:** Um usuário viu um cartaz físico de um cão perdido e quer checar no sistema se há atualizações sobre o caso ou deixar um comentário dizendo que o viu pela região.
- **Tarefa(s):**
  - Na navegação superior, acessar a seção "Pets Perdidos".
  - Localizar um animal na listagem exibida.
  - Voltar para o mapa, selecionar uma ocorrência qualquer e localizar a seção "Comentários" no painel lateral direito.
  - Digitar e enviar um comentário.
- **Critério(s) de Sucesso:**
  - O usuário percebe que a seção de pets perdidos é dedicada a animais desaparecidos, diferente das ocorrências de rua.
  - Encontra a área de comentários no painel direito sem dificuldades.
  - Consegue enviar o comentário com sucesso.

### Cenário 5: Criação de Nova Conta
- **Objetivo:** Avaliar o fluxo de cadastro e a compreensão da etapa de confirmação por e-mail.
- **Contexto:** Um morador de bairro decide criar uma conta para poder reportar e acompanhar ocorrências próximas à sua casa.
- **Tarefa(s):**
  - Clicar no ícone de login no canto superior direito do header.
  - No modal, localizar e clicar no link "Cadastrar".
  - Preencher os campos obrigatórios (Nome, E-mail, Telefone, Senha e Confirmação de Senha) e fazer upload de uma foto de perfil.
  - Clicar em "Finalizar Cadastro" e identificar o próximo passo indicado pelo sistema.
- **Critério(s) de Sucesso:**
  - O usuário localiza o link de cadastro sem confundi-lo com o formulário de login.
  - Compreende que precisa confirmar o e-mail antes de acessar a plataforma.
  - Conclui o preenchimento do formulário sem dúvidas sobre os campos obrigatórios.

## Métodos de coleta de dados

Durante as sessões de teste (que podem ser moderadas remotamente via chamada de vídeo com compartilhamento de tela ou presencialmente), os seguintes métodos serão aplicados:

- **Observação Direta e Think Aloud (Pensar Alto):** Será solicitado ao participante que narre o que está pensando e fazendo enquanto executa as tarefas para identificar frustrações em tempo real.
- **Métricas Quantitativas:**
  - Tempo médio de conclusão de cada tarefa.
  - Taxa de sucesso (quantos conseguiram concluir a tarefa sem ajuda).
  - Número de cliques extras ou caminhos errados tomados.
- **Métricas Qualitativas (Questionário Pós-Teste):** Ao final das 5 tarefas, o usuário responderá a um breve questionário:
  - *Numa escala de 1 a 5, quão fácil foi navegar na interface e encontrar as funções?*
  - *O botão de filtro no mapa foi fácil de localizar e utilizar?*
  - *O painel de detalhes do animal foi claro o suficiente para registrar as ações de cuidado?*
  - *O fluxo de cadastro e a etapa de confirmação por e-mail foram claros?*
  - *Você adicionaria, mudaria ou removeria alguma coisa na disposição da tela?*

> **Links Úteis**:
> - [Teste De Usabilidade: O Que É e Como Fazer Passo a Passo (neilpatel.com)](https://neilpatel.com/br/blog/teste-de-usabilidade/)
> - [Teste de usabilidade: tudo o que você precisa saber! | by Jon Vieira | Aela.io | Medium](https://medium.com/aela/teste-de-usabilidade-o-que-voc%C3%AA-precisa-saber-39a36343d9a6/)
> - [Planejando testes de usabilidade: o que (e o que não) fazer | iMasters](https://imasters.com.br/design-ux/planejando-testes-de-usabilidade-o-que-e-o-que-nao-fazer/)
> - [Ferramentas de Testes de Usabilidade](https://www.usability.gov/how-to-and-tools/resources/templates.html)
