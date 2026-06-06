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

---

## Wireframes

Os wireframes são protótipos utilizados no design de interfaces para representar a estrutura de um site e o relacionamento entre suas páginas. Eles funcionam como ilustrações do layout e da disposição dos elementos essenciais da interface.

Nesta seção, é **FUNDAMENTAL** indicar, para cada tela/wireframe proposto, quais requisitos do projeto estão sendo contemplados por aquela tela.

### 1. Tela Principal
Plataforma de resgate animal: gerencia casos, buscas e adoções com mapas, galeria e suporte.
<br>
<img width="100%" alt="Tela Principal" src="https://github.com/user-attachments/assets/25aba538-45bc-45cb-9bf7-09b5899b0814" />

* **Requisitos Contemplados:** * `RF-00X`: [Exemplo: O sistema deve permitir visualizar animais em destaque]
  * `HU-00X`: [Exemplo: Como usuário, quero ver um resumo dos casos para ajudar rapidamente]

---

### 2. Tela de Login
Interface com campos de usuário e senha, opções para lembrar login e recuperar acesso, além de um link para cadastro.
<br>
<img width="100%" alt="Tela de Login" src="https://github.com/user-attachments/assets/a4821b20-1dee-40fa-ad9f-bdd6b1e40d72" />

* **Requisitos Contemplados:** * `RF-00X`: [Exemplo: O sistema deve autenticar o usuário via e-mail e senha]
  * `HU-00X`: [Exemplo: Como usuário cadastrado, quero fazer login para acessar minha conta]

---

### 3. Tela de Cadastro
No registro, o usuário pode fazer o cadastro com e-mail, telefone e selecionar seu perfil entre: adotante, voluntário, apoiador ou representante de instituição.
<br>
<img width="100%" alt="Tela de Cadastro" src="https://github.com/user-attachments/assets/f576200b-0ea1-4f15-bb0d-349a6ce776e8" />

* **Requisitos Contemplados:** * `RF-00X`: [Exemplo: O sistema deve permitir a escolha do tipo de perfil no cadastro]
  * `HU-00X`: [Exemplo: Como novo usuário, quero me cadastrar selecionando meu perfil de interesse]

---

### 4. Esqueci a Senha
Interface "Esqueci a Senha" permite a recuperação segura do acesso à conta. O utilizador insere o e-mail registado e recebe imediatamente um link de redefinição, com feedback visual claro de sucesso.
<br>
<img width="100%" alt="Tela Esqueci a Senha" src="https://github.com/user-attachments/assets/77ec74be-2514-46e6-8746-ab90999f7dba" />

* **Requisitos Contemplados:** * `RF-00X`: [Exemplo: O sistema deve enviar um link de recuperação para o e-mail informado]
  * `HU-00X`: [Exemplo: Como usuário esquecido, quero recuperar minha senha com segurança]

---

### 5. Recuperar Usuário
Interface "Esqueci o Utilizador" permite recuperar facilmente o nome de acesso à conta. Basta inserir o e-mail de registo para receber um lembrete seguro na sua caixa de entrada, com feedback visual.
<br>
<img width="100%" alt="Tela de Recuperar Usuário" src="https://github.com/user-attachments/assets/6e63ee9e-609e-428f-a1df-06b42961f379" />

* **Requisitos Contemplados:** * `RF-00X`: [Mapeie o Requisito aqui]
  * `HU-00X`: [Mapeie a História de Usuário aqui]

---

### 6. Tela de Perfil
Interface intuitiva para resgate animais: une monitoramento, feed de casos e geolocalização. Foca em urgências, adoção e cuidados colaborativos, com menu de conta na lateral.
<br>
<img width="100%" alt="Tela de Perfil Adotante" src="https://github.com/user-attachments/assets/0c0e67d7-b156-4938-b028-77c20171fbc3" />

* **Requisitos Contemplados:** * `RF-00X`: [Mapeie o Requisito aqui]
  * `HU-00X`: [Mapeie a História de Usuário aqui]

---

### 7. Tela Mapa de Casos
Esta tela interativa localiza animais perdidos, encontrados e para adoção. As suas funções incluem filtros rápidos, pins no mapa com popups detalhados e uma lista lateral sincronizada para resgates.
<br>
<img width="100%" alt="Tela Mapa de Casos" src="https://github.com/user-attachments/assets/d6c1f071-b60d-4cdb-a999-fe6c4d83b758" />

* **Requisitos Contemplados:** * `RF-00X`: [Mapeie o Requisito aqui]
  * `HU-00X`: [Mapeie a História de Usuário aqui]

---

### 8. Tela Feed de Casos
O Feed de Casos é uma grelha interativa onde os utilizadores podem visualizar animais perdidos, encontrados ou para adoção. Permite filtrar casos facilmente e clicar para ajudar, partilhar ou adotar.
<br>
<img width="100%" alt="Tela Feed de Casos" src="https://github.com/user-attachments/assets/25315a1d-99a1-4fe6-a425-c0a4d7e2ee72" />

* **Requisitos Contemplados:** * `RF-00X`: [Mapeie o Requisito aqui]
  * `HU-00X`: [Mapeie a História de Usuário aqui]

---

## Protótipo Interativo (Figma)

O protótipo interativo das telas com a disposição dos elementos e transições de navegação pode ser acessado através do link abaixo:

👉 **[Acesse o Protótipo no Figma](https://www.figma.com/design/RfS7AOqTEDUfSA7F4k79R6/Sem-t%C3%ADtulo?node-id=0-1&t=kK8leeqBWRvLvbIE-1)**
