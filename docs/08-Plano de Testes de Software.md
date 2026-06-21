# Plano de Testes de Software

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos.

Não deixe de enumerar os casos de teste de forma sequencial e de garantir que o(s) requisito(s) associado(s) a cada um deles está(ão) correto(s) - de acordo com o que foi definido na seção "2 - Especificação do Projeto".

| **Caso de Teste** | **CT01 – Cadastrar nova conta de usuário** |
|:---:|:---|
| Requisito Associado | RF-014 - Cadastrar nova conta de usuário. |
| Objetivo do Teste | Verificar se um novo usuário consegue criar um perfil no sistema com sucesso. |
| Passos | - Abrir o site do SOS Dog <br> - Clicar no ícone de login no canto superior direito <br> - No modal, clicar no link "Cadastrar" <br> - Preencher os campos obrigatórios (Nome, E-mail, Telefone, Senha e Confirmação de Senha) <br> - Fazer upload de uma foto de perfil <br> - Clicar em "Finalizar Cadastro" |
| Critério de Êxito | - O sistema exibe uma mensagem informando que um e-mail de confirmação foi enviado. Após clicar no link recebido, a conta é ativada e o usuário consegue realizar login. |
| | |
| **Caso de Teste** | **CT02 – Realizar login e logout** |
|:---:|:---|
| Requisito Associado | RF-016 - Encerrar a sessão ativa do usuário de forma segura. |
| Objetivo do Teste | Verificar se o usuário consegue autenticar-se no sistema e encerrar a sessão corretamente. |
| Passos | - Clicar no ícone de login no canto superior direito <br> - Preencher e-mail e senha de uma conta já confirmada <br> - Clicar em "Entrar" <br> - Após autenticado, clicar em "Sair" no menu do usuário |
| Critério de Êxito | - Após o login, o nome do usuário aparece no header e as funcionalidades restritas são liberadas. Após o logout, o usuário é redirecionado para a tela principal sem acesso às funcionalidades restritas. |
| | |
| **Caso de Teste** | **CT03 – Registrar ocorrência de animal de rua** |
|:---:|:---|
| Requisito Associado | RF-001 - Marcar a localização de um animal via GPS, diferenciando o seu status de avistamento. <br> RF-005 - Exigir a seleção do estado atual do animal durante o registro de uma marcação. <br> RF-007 - Anexar fotos para facilitar a identificação visual do animal. |
| Objetivo do Teste | Verificar se o usuário consegue registrar um animal de rua preenchendo todos os campos obrigatórios, incluindo foto e estado de saúde. |
| Passos | - Realizar login no sistema <br> - Na tela do mapa, clicar no botão flutuante "Reportar Animal" <br> - Arrastar o pin vermelho para a localização do animal <br> - Clicar em "Preencher Ficha" no popup <br> - Preencher os campos obrigatórios (tipo, estado de saúde, descrição, endereço) <br> - Fazer upload da foto do animal <br> - Clicar em "Registrar Ocorrência" |
| Critério de Êxito | - O registro é salvo, o sistema exibe mensagem de sucesso e um novo marcador aparece no mapa na localização indicada. Caso o estado de saúde não seja selecionado, o sistema deve impedir o envio. |
| | |
| **Caso de Teste** | **CT04 – Filtrar ocorrências no mapa** |
|:---:|:---|
| Requisito Associado | RF-003 - Filtrar os animais no mapa por estado de saúde, tipo de ocorrência, idade, sexo e porte do animal. |
| Objetivo do Teste | Validar se a funcionalidade de filtro atualiza simultaneamente o mapa e a lista lateral exibindo apenas as ocorrências que correspondem aos critérios selecionados. |
| Passos | - Acessar a tela principal (Mapa) <br> - Clicar no botão "Filtrar" no canto superior esquerdo do mapa <br> - Selecionar um valor em um ou mais dos seletores disponíveis (Tipo, Saúde, Porte, Sexo, Idade) <br> - Observar a atualização do mapa e da lista lateral <br> - Clicar em "Limpar" para remover os filtros |
| Critério de Êxito | - O mapa e a lista lateral são atualizados em tempo real, exibindo apenas as ocorrências que correspondem aos filtros aplicados. O contador de resultados reflete a quantidade correta. Ao limpar, todas as ocorrências voltam a ser exibidas. |
| | |
| **Caso de Teste** | **CT05 – Registrar ação de cuidado (água e comida)** |
|:---:|:---|
| Requisito Associado | RF-006 - Registrar o fornecimento recente de cuidados básicos aos animais marcados. |
| Objetivo do Teste | Verificar se o usuário consegue registrar que forneceu água ou comida a um animal, e se o sistema salva corretamente a data, hora e nome do cuidador. |
| Passos | - Realizar login no sistema <br> - Clicar em um card de ocorrência na lista lateral <br> - No painel de detalhes à direita, localizar a seção "Registro de Ações" <br> - Clicar no botão "Água" ou "Comida" |
| Critério de Êxito | - O sistema registra a ação e atualiza imediatamente o painel exibindo a data e hora do registro e o nome do usuário logado como último cuidador. |
| | |
| **Caso de Teste** | **CT06 – Adicionar comentário em uma ocorrência** |
|:---:|:---|
| Requisito Associado | RF-009 - Adicionar comentários nas marcações para atualizar o status do animal. |
| Objetivo do Teste | Verificar se um usuário consegue adicionar um comentário a uma ocorrência existente. |
| Passos | - Realizar login no sistema <br> - Clicar em um card de ocorrência na lista lateral <br> - No painel de detalhes à direita, localizar a seção "Comentários" <br> - Digitar uma mensagem no campo de texto <br> - Clicar no botão de enviar |
| Critério de Êxito | - O comentário é exibido imediatamente na seção de comentários da ocorrência, com o nome do usuário e a data e hora do registro. |
| | |
| **Caso de Teste** | **CT07 – Favoritar e desfavoritar uma ocorrência** |
|:---:|:---|
| Requisito Associado | RF-017 - Permitir que usuários autenticados favoritam ou desfavoritam uma ocorrência. |
| Objetivo do Teste | Verificar se o usuário consegue favoritar e desfavoritar uma ocorrência sem recarregar a página. |
| Passos | - Realizar login no sistema <br> - Na lista lateral, localizar o ícone de coração em um card de ocorrência <br> - Clicar no ícone para favoritar <br> - Clicar novamente para desfavoritar |
| Critério de Êxito | - Ao favoritar, o ícone muda para vermelho sem recarregar a página. Ao desfavoritar, o ícone volta ao estado original. |
| | |
| **Caso de Teste** | **CT08 – Editar ocorrência própria** |
|:---:|:---|
| Requisito Associado | RF-004 - Permitir que o criador da ocorrência edite ou exclua seu próprio registro. |
| Objetivo do Teste | Verificar se o criador da ocorrência consegue editar seus dados e se usuários não autorizados não têm acesso à edição. |
| Passos | - Realizar login com o usuário criador da ocorrência <br> - Clicar na ocorrência no mapa ou na lista lateral <br> - No painel de detalhes, clicar no ícone de edição <br> - Alterar um ou mais campos no modal de edição <br> - Clicar em "Salvar" |
| Critério de Êxito | - Os dados são atualizados com sucesso e o sistema exibe mensagem de confirmação. O ícone de edição não deve ser exibido para usuários que não são o criador da ocorrência. |
| | |
| **Caso de Teste** | **CT09 – Gerar cartaz digital de busca (PDF)** |
|:---:|:---|
| Requisito Associado | RF-010 - Gerar cartaz digital de busca para animais perdidos (PDF). |
| Objetivo do Teste | Garantir que o usuário consiga gerar um cartaz de busca em PDF para um animal perdido. |
| Passos | - Realizar login no sistema <br> - Acessar a seção "Pets Perdidos" na navegação superior <br> - Localizar o card de um animal perdido <br> - Clicar no botão "Gerar Cartaz" |
| Critério de Êxito | - O sistema compila as informações do animal (foto, código, contato do tutor) e inicia o download de um arquivo PDF formatado para impressão ou compartilhamento. |
| | |
| **Caso de Teste** | **CT10 – Redefinir senha de acesso** |
|:---:|:---|
| Requisito Associado | RF-015 - Redefinir a senha de acesso da conta. |
| Objetivo do Teste | Verificar se o usuário consegue redefinir sua senha através do fluxo de recuperação por e-mail. |
| Passos | - Acessar a tela de login <br> - Clicar em "Esqueci minha senha" <br> - Inserir o e-mail cadastrado e clicar em "Enviar" <br> - Acessar o e-mail recebido e inserir o token de 6 dígitos <br> - Digitar e confirmar a nova senha <br> - Clicar em "Redefinir Senha" |
| Critério de Êxito | - O sistema aceita o token válido, atualiza a senha e permite o login com as novas credenciais. Tokens expirados ou inválidos devem ser rejeitados. |
| | |
| **Caso de Teste** | **CT11 – Editar e excluir perfil do usuário** |
|:---:|:---|
| Requisito Associado | RF-012 - Editar os dados de perfil do usuário. <br> RF-013 - Excluir permanentemente a conta e os dados pessoais do usuário. |
| Objetivo do Teste | Verificar se o usuário consegue editar seus dados de perfil e excluir sua conta permanentemente. |
| Passos | - Realizar login no sistema <br> - Acessar o perfil do usuário <br> - Alterar um campo (ex: nome ou telefone) e salvar <br> - Acessar a opção de excluir conta e confirmar a exclusão |
| Critério de Êxito | - As alterações do perfil são salvas com sucesso. Após a exclusão, a conta não deve mais ser acessível e os dados pessoais devem ser removidos do sistema. |

> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> - [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
