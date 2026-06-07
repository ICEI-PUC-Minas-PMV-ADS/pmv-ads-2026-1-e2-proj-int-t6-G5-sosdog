# Programação de Funcionalidades

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md">Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md">Projeto de Interface</a>, <a href="4-Metodologia.md">Metodologia</a>, <a href="5-Arquitetura da Solução.md">Arquitetura da Solução</a>

Nesta seção, a implementação do sistema é descrita por meio dos requisitos funcionais e/ou não funcionais. É essencial relacionar os requisitos atendidos com os artefatos criados (código-fonte) e com o(s) responsável(is) pelo desenvolvimento de cada artefato a cada etapa.

A aplicação está funcional no ambiente de hospedagem a partir da Etapa 03.

---

## Tecnologias Utilizadas

**Frontend:**
- HTML, CSS e JavaScript
- Bootstrap (template responsivo)

**Backend:**
- C# (ASP.NET)
- MySQL / SQL Server (Base de Dados)

**Versionamento:**
- GitHub (documentação e controle de versão)

**IDE:**
- Microsoft Visual Studio

---

## Estrutura de Artefatos

### Frontend — Pasta `/js`

| Arquivo | Descrição |
|---|---|
| `alertsScript.js` | Scripts de alertas e notificações ao usuário |
| `carrusel.js` | Lógica do carrossel de imagens |
| `emergencia.js` | Funcionalidades da seção de emergência |
| `feedCasos.js` | Exibição do feed de ocorrências/casos |
| `filtro-mapa.js` | Filtros aplicados ao mapa |
| `geradorCartaz.js` | Geração de cartaz digital de busca (PDF) |
| `map-handler.js` | Manipulação e controle do mapa |
| `ocorrencias.js` | Registro e consulta de ocorrências |
| `usuario.js` | Gerenciamento de conta e sessão do usuário |
| `site.css` | Estilos globais da aplicação |

### Backend — Pasta `Models`

| Arquivo | Descrição |
|---|---|
| `AppDbContext.cs` | Contexto do banco de dados (Entity Framework) |
| `Comentario.cs` | Model de comentários nas marcações |
| `ErrorViewModel.cs` | Model de tratamento de erros |
| `Favorito.cs` | Model de marcações favoritas |
| `Ocorrencia.cs` | Model de ocorrências de animais |
| `Usuario.cs` | Model de usuário |

---

## Requisitos Funcionais Implementados

| ID | Descrição do Requisito | Artefatos Produzidos | Aluno(a) Responsável |
|---|---|---|---|
| RF-001 | Marcar a localização de um animal via GPS, diferenciando o seu status de avistamento | `map-handler.js`, `Ocorrencia.cs`, `AppDbContext.cs` | Vitor |
| RF-002 | Alternar a visualização do mapa por camadas baseadas no status do animal | `map-handler.js`, `filtro-mapa.js` | Vitor |
| RF-003 | Filtrar os animais no mapa por estado de saúde, tempo de avistamento e porte | `filtro-mapa.js`, `Ocorrencia.cs` | Helena |
| RF-005 | Exigir a seleção do estado atual do animal durante o registro de uma marcação | `ocorrencias.js`, `Ocorrencia.cs` | Vitor |
| RF-006 | Registrar o fornecimento recente de cuidados básicos aos animais marcados | `ocorrencias.js`, `Comentario.cs` | Vitor |
| RF-007 | Anexar fotos para facilitar a identificação visual do animal | `ocorrencias.js`, `Ocorrencia.cs` | Vitor |
| RF-008 | Consultar ocorrências de animais próximos à localização atual do usuário | `ocorrencias.js`, `map-handler.js`, `Ocorrencia.cs` | Vitor |
| RF-009 | Adicionar comentários nas marcações para atualizar o status do animal | `ocorrencias.js`, `Comentario.cs`, `AppDbContext.cs` | Vitor |
| RF-010 | Gerar cartaz digital de busca para animais perdidos (PDF) | `geradorCartaz.js` | Vitor |
| RF-011 | Disponibilizar seção informativa com leis, contatos de emergência e instruções de resgate | `emergencia.js` | Vitor |
| RF-012 | Editar os dados de perfil do usuário | `usuario.js`, `Usuario.cs` | Helena |
| RF-013 | Excluir permanentemente a conta e os dados pessoais do usuário | `usuario.js`, `Usuario.cs`, `AppDbContext.cs` | Helena |
| RF-014 | Cadastrar nova conta de usuário | `usuario.js`, `Usuario.cs` | Helena |
| RF-015 | Redefinir a senha de acesso da conta | `usuario.js`, `Usuario.cs` | Helena |
| RF-016 | Encerrar a sessão ativa do usuário de forma segura | `usuario.js` | Vitor |

---

# Instruções de acesso

Não deixe de informar o link onde a aplicação estiver disponível para acesso (por exemplo: https://adota-pet.herokuapp.com/src/index.html).

Se houver usuário de teste, o login e a senha também deverão ser informados aqui (por exemplo: usuário - admin / senha - admin).

O link e o usuário/senha descritos acima são apenas exemplos de como tais informações deverão ser apresentadas.

> **Links Úteis**:
>
> - [Trabalhando com HTML5 Local Storage e JSON](https://www.devmedia.com.br/trabalhando-com-html5-local-storage-e-json/29045)
> - [JSON Tutorial](https://www.w3resource.com/JSON)
> - [JSON Data Set Sample](https://opensource.adobe.com/Spry/samples/data_region/JSONDataSetSample.html)
> - [JSON - Introduction (W3Schools)](https://www.w3schools.com/js/js_json_intro.asp)
> - [JSON Tutorial (TutorialsPoint)](https://www.tutorialspoint.com/json/index.htm)
