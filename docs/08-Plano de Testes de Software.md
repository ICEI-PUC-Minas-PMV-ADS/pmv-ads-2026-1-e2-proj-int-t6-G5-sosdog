# Plano de Testes de Software

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos.

Não deixe de enumerar os casos de teste de forma sequencial e de garantir que o(s) requisito(s) associado(s) a cada um deles está(ão) correto(s) - de acordo com o que foi definido na seção "2 - Especificação do Projeto". 

| **Caso de Teste** | **CT01 – Cadastrar nova conta de usuário** |
|:---:|:---|
| Requisito Associado | RF-021 - Cadastrar nova conta de usuário. |
| Objetivo do Teste | Verificar se um novo usuário consegue criar um perfil no sistema com sucesso. |
| Passos | - Abrir o aplicativo/site do SOS Dog <br> - Clicar no botão "Cadastrar" na tela inicial <br> - Preencher os campos obrigatórios (Nome, E-mail, Senha, Confirmação de Senha) <br> - Selecionar o tipo de perfil (Ex: Tutor de Pet) <br> - Aceitar os Termos de Uso <br> - Clicar em "Criar Conta" |
| Critério de Êxito | - O sistema exibe uma mensagem de "Cadastro realizado com sucesso" e redireciona o usuário para a tela de Login ou Mapa principal. |
| | |
| **Caso de Teste** | **CT02 – Registrar ocorrência de animal de rua com foto e estado de saúde** |
| Requisito Associado | RF-001 - Marcar a localização de um animal via GPS, diferenciando o seu status de avistamento. <br> RF-005 - Exigir a seleção do estado atual do animal durante o registro de uma marcação. <br> RF-007 - Anexar fotos para facilitar a identificação visual do animal. |
| Objetivo do Teste | Verificar se o usuário consegue registrar um animal de rua, anexando foto, classificando obrigatoriamente o estado de saúde e capturando a localização atual do GPS. |
| Passos | - Realizar login no sistema <br> - Na tela do Mapa, clicar no botão flutuante "Registrar Ocorrência" <br> - Selecionar a opção "Animal de Rua" <br> - Permitir o acesso ao GPS (se solicitado) <br> - Clicar no ícone de câmera para fazer upload da foto do animal <br> - Selecionar obrigatoriamente o estado de saúde do animal (Ex: Saudável, Ferido) <br> - Clicar em "Salvar Registro" |
| Critério de Êxito | - O registro é salvo, o sistema confirma a ação e um novo marcador (pin) aparece no mapa na localização exata capturada pelo GPS. Se o estado de saúde não for selecionado, o sistema deve impedir o envio e alertar o usuário. |
| | |
| **Caso de Teste** | **CT03 – Filtrar animais no mapa por estado de saúde** |
| Requisito Associado | RF-003 - Filtrar os animais no mapa por estado de saúde, tempo de avistamento e porte. |
| Objetivo do Teste | Validar se a funcionalidade de filtro atualiza o mapa exibindo apenas os animais que correspondem ao critério selecionado. |
| Passos | - Realizar login e acessar a tela principal (Mapa) <br> - Clicar no ícone de "Filtros" <br> - Na seção "Estado de Saúde", selecionar a opção "Crítico" <br> - Clicar no botão "Aplicar Filtros" |
| Critério de Êxito | - O mapa é atualizado instantaneamente, ocultando marcações irrelevantes e exibindo apenas os animais com estado de saúde "Crítico" num raio de 5km. |
| | |
| **Caso de Teste** | **CT04 – Gerar cartaz digital de busca (PDF)** |
| Requisito Associado | RF-010 - Gerar cartaz digital de busca para animais perdidos.(PDF) |
| Objetivo do Teste | Garantir que o tutor consiga gerar um cartaz de busca formatado automaticamente em PDF para impressão. |
| Passos | - Realizar login com um perfil de "Tutor de Pet" <br> - Acessar a aba "Meus Registros" ou clicar em uma ocorrência de "Animal Perdido" criada pelo usuário <br> - Na página de detalhes do animal, clicar no botão "Gerar Cartaz de Busca" |
| Critério de Êxito | - O sistema compila as informações (foto, nome do animal, contato do tutor) e inicia o download de um arquivo PDF pronto para ser impresso ou compartilhado. |
| | |
| **Caso de Teste** | **CT05 – Adicionar comentário em ocorrência para atualizar status** |
| Requisito Associado | RF-009 - Adicionar comentários nas marcações para atualizar o status do animal. |
| Objetivo do Teste | Verificar se um usuário consegue interagir com uma marcação existente, adicionando um comentário para confirmar o status atual ou a localização do animal. |
| Passos | - Realizar login no sistema <br> - Clicar em um marcador existente no mapa criado por outro usuário <br> - Na janela de detalhes da ocorrência, ir até a seção de comentários <br> - Digitar uma atualização (Ex: "Acabei de passar aqui e o animal ainda está no local") <br> - Clicar em "Enviar Comentário" |
| Critério de Êxito | - O sistema registra e exibe o comentário imediatamente na timeline da ocorrência, atualizando os demais usuários sobre o status recente do animal. |
| | |
| **Caso de Teste** | **CT06 – Tentativa de registro sem permissão de GPS** |
| Requisito Associado | RNF-005 - Exigir permissão ativa de acesso ao GPS do dispositivo para a liberação das funções de mapa. |
| Objetivo do Teste | Verificar o comportamento do sistema quando o usuário tenta usar uma funcionalidade baseada em localização, mas nega o acesso ao GPS. |
| Passos | - Realizar login no sistema <br> - Clicar no botão "Registrar Ocorrência" <br> - Quando o navegador/celular exibir o pop-up pedindo permissão de Localização, clicar em "Bloquear" ou "Não Permitir" |
| Critério de Êxito | - O sistema deve interromper o fluxo de registro e exibir um aviso claro na tela (ex: "O uso do GPS é obrigatório para as funções do mapa. Por favor, habilite nas configurações."), impedindo a conclusão do cadastro sem a localização exata. |
| | |
| **Caso de Teste** | **CT07 – Bloqueio de segurança por falha no login** |
| Requisito Associado | RF-024 - Bloquear temporariamente a conta após sucessivas tentativas de login inválidas. |
| Objetivo do Teste | Validar se o mecanismo de segurança contra ataques de força bruta está funcionando corretamente. |
| Passos | - Acessar a tela de Login do SOS Dog <br> - Inserir um e-mail válido que já possua cadastro <br> - Inserir uma senha incorreta <br> - Clicar em "Entrar" <br> - Repetir o processo inserindo a senha incorreta por sucessivas vezes (ex: 5 vezes) |
| Critério de Êxito | - Na última tentativa limite falha, o sistema deve exibir uma mensagem de "Conta temporariamente bloqueada por excesso de tentativas" e desabilitar o formulário de login para aquele e-mail/usuário por um tempo determinado. |
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
