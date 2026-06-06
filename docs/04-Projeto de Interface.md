# Projeto de Interface

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Documentação de Especificação</a></span>

Visão geral da interação do usuário pelas telas do sistema e protótipo interativo das telas com as funcionalidades que fazem parte do sistema (wireframes).

Apresente as principais interfaces da plataforma. Discuta como ela foi elaborada de forma a atender os requisitos funcionais, não funcionais e histórias de usuário abordados nas <a href="2-Especificação do Projeto.md"> Documentação de Especificação</a>.

## Diagrama de Fluxo (Fluxograma Principal)

O fluxo abaixo representa a jornada principal do usuário dentro do **Sistema SOS Dog**, desde a autenticação até as interações com o mapa e o registro de novas ocorrências.

<img width="100%" alt="Diagrama de Fluxo SOS Dog" src="https://github.com/user-attachments/assets/80c2f34e-749c-4ac6-95f0-1753eac79fb6" />

### Entendendo o Fluxo

O diagrama ilustra os caminhos que o usuário pode percorrer no aplicativo, divididos nas seguintes etapas principais:

* **Autenticação e Permissões:** O fluxo inicia validando o acesso do usuário (Login/Cadastro) e verificando a permissão de uso do GPS. Como o sistema é baseado em geolocalização, a concessão do GPS é obrigatória para acessar a Tela Principal (Mapa).
* **Exploração do Mapa:** Na tela principal, o usuário pode explorar as ocorrências ao redor, aplicar filtros, visualizar detalhes específicos de cada animal e interagir com as publicações (favoritar ou comentar).
* **Registro de Ocorrências:** Ao optar por registrar um animal (seja de rua ou perdido), o fluxo guia o usuário pelo preenchimento de dados descritivos, upload de foto, captura automática da localização via GPS e informação sobre o estado de saúde, finalizando com o salvamento no sistema.
* **Menu Secundário:** Acesso às opções de configurações da conta e central de ajuda do aplicativo.

## Wireframes

![Exemplo de Wireframe](img/wireframe-example.png)

Os wireframes são protótipos utilizados no design de interfaces para representar a estrutura de um site e o relacionamento entre suas páginas. Eles funcionam como ilustrações do layout e da disposição dos elementos essenciais da interface.
Nesta seção, é FUNDAMENTAL indicar, para cada tela/wireframe proposto, quais requisitos do projeto estão sendo contemplados por aquela tela.


**TELA PRINCIPAL**

Visão geral e interativa da plataforma, exibindo o mapa central com a localização dos animais, opções de filtros rápidos para buscas específicas e acesso fácil aos menus de navegação do sistema.

<img width="1345" height="784" alt="TelaPrincipal" src="https://github.com/user-attachments/assets/6b514ac4-b95a-478b-a447-7e02a226de17" />


**TELA DE LOGIN**

Interface de autenticação intuitiva com campos para e-mail e senha, garantindo o acesso seguro à plataforma. Inclui também opções para recuperação de senha e um link de redirecionamento para o cadastro de novos usuários.

<img width="1487" height="1058" alt="TelaDeLogin" src="https://github.com/user-attachments/assets/157bf4fe-b74f-46a3-adbd-1df9cbc3fb53" />


**REGISTRO DE OCORRÊNCIA**

Formulário passo a passo para que o usuário possa registrar facilmente um animal perdido, encontrado ou disponível para adoção. Permite a inserção de fotos, captura de localização e descrição das condições do animal.

<img width="1511" height="1041" alt="RegistroDeOcorrencia" src="https://github.com/user-attachments/assets/f455d382-f4d4-43f8-a034-48d03a2cb08a" />


**PÁGINA DE URGÊNCIA**

Seção dedicada exclusivamente a casos críticos e que demandam atenção imediata (como animais feridos ou em situação de risco). O design destaca as informações essenciais para mobilizar ajuda e resgates de forma mais rápida.

<img width="1536" height="1024" alt="PaginaUrgencia" src="https://github.com/user-attachments/assets/2a970e18-dc61-47b6-b359-911c4a92adeb" />


**DETALHES DA OCORRÊNCIA**

Visualização expandida de um caso específico. Exibe todas as informações cadastradas sobre o animal, galeria de fotos, mapa de onde foi visto pela última vez e botões para contato, compartilhamento ou oferta de ajuda.

<img width="890" height="1767" alt="Ocorrencia" src="https://github.com/user-attachments/assets/d0f6ff62-9872-4c68-8826-f75eefeaeb14" />


**GERADOR DE CARTAZ**

Ferramenta integrada que automatiza a criação de cartazes de "Procura-se" ou "Encontrado". Utiliza os dados já inseridos na ocorrência para gerar um layout pronto para ser impresso ou compartilhado nas redes sociais.

<img width="1672" height="941" alt="GeradorCartaz" src="https://github.com/user-attachments/assets/84d9ae6e-ede9-4820-b99a-f49998069ab0" />


**FEED DE NOTÍCIAS / CASOS**

Linha do tempo dinâmica onde os usuários podem acompanhar as últimas atualizações, visualizar novos casos registrados na comunidade e interagir com as publicações de adoção e resgate de forma contínua.

<img width="1672" height="941" alt="FeedNoticia" src="https://github.com/user-attachments/assets/2b21e141-ef39-4c2f-b7cc-bc3ec0033490" />


**LINK DO FIGMA**
https://www.figma.com/design/RfS7AOqTEDUfSA7F4k79R6/Sem-t%C3%ADtulo?node-id=0-1&t=kK8leeqBWRvLvbIE-1
