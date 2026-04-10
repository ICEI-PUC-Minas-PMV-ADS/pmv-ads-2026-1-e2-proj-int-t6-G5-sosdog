
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

Plataforma de resgate animal: gerencia casos, buscas e adoções com mapas, galeria e suporte.
<img width="1545" height="874" alt="Tela_Principal" src="https://github.com/user-attachments/assets/25aba538-45bc-45cb-9bf7-09b5899b0814" />


**TELA DE LOGIN**

interface com campos de usuário e senha, opções para lembrar login e recuperar acesso, além de um link para cadastro. 

<img width="1164" height="643" alt="Tela_de_Login" src="https://github.com/user-attachments/assets/a4821b20-1dee-40fa-ad9f-bdd6b1e40d72" />

TELA DE CADASTRO


No registro, o usuário pode fazer o cadastro com e-mail, telefone e selecionar seu perfil entre: adotante, voluntário, apoiador ou representante de instituição.

<img width="1897" height="905" alt="Tela_de_Cadastro" src="https://github.com/user-attachments/assets/f576200b-0ea1-4f15-bb0d-349a6ce776e8" />

**ESQUECI A SENHA**

Interface"Esqueci a Senha" permite a recuperação segura do acesso à conta. O utilizador insere o e-mail registado e recebe imediatamente um link de redefinição, com feedback visual claro de sucesso.

<img width="1406" height="795" alt="Tela de recuperar senha" src="https://github.com/user-attachments/assets/77ec74be-2514-46e6-8746-ab90999f7dba" />


**RECUPERAR USUÁRIO**

Interface'Esqueci o Utilizador' permite recuperar facilmente o nome de acesso à conta. Basta inserir o e-mail de registo para receber um lembrete seguro na sua caixa de entrada, com feedback visual.

<img width="1410" height="786" alt="Tela de recuperar usuário" src="https://github.com/user-attachments/assets/6e63ee9e-609e-428f-a1df-06b42961f379" />


**TELA DE PERFIL**

Interface intuitiva para resgate animais: une monitoramento, feed de casos e geolocalização. Foca em urgências, adoção e cuidados colaborativos, tela com conta na lateral de .


<img width="1662" height="930" alt="Tela_Perfil_adotante" src="https://github.com/user-attachments/assets/0c0e67d7-b156-4938-b028-77c20171fbc3" />



**TELA MAPA DE CASOS**


Esta tela interativa localiza animais perdidos, encontrados e para adoção. As suas funções incluem filtros rápidos, pins no mapa com popups detalhados e uma lista lateral sincronizada para resgates.


<img width="1639" height="928" alt="Tela Mapa de Casos" src="https://github.com/user-attachments/assets/d6c1f071-b60d-4cdb-a999-fe6c4d83b758" />

**TELA FEED DE CASOS**


O Feed de Casos é uma grelha interativa onde os utilizadores podem visualizar animais perdidos, encontrados ou para adoção. Permite filtrar casos facilmente e clicar para ajudar, partilhar ou adotar.


<img width="1096" height="614" alt="Tela feed de Casos" src="https://github.com/user-attachments/assets/25315a1d-99a1-4fe6-a425-c0a4d7e2ee72" />


**LINK DO FIGMA**
https://www.figma.com/design/RfS7AOqTEDUfSA7F4k79R6/Sem-t%C3%ADtulo?node-id=0-1&t=kK8leeqBWRvLvbIE-1
