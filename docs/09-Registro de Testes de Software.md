# Registro de Testes de Software

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>, <a href="8-Plano de Testes de Software.md"> Plano de Testes de Software</a>

Para cada caso de teste definido no Plano de Testes de Software, realize o registro das evidências dos testes feitos na aplicação pela equipe, que comprovem que o critério de êxito foi alcançado (ou não!!!). Para isso, utilize uma ferramenta de captura de tela que mostre cada um dos casos de teste definidos (obs.: cada caso de teste deverá possuir um vídeo do tipo _screencast_ para caracterizar uma evidência do referido caso).

| **Caso de Teste** | **CT01 – Cadastrar nova conta de usuário** |
|:---:|:---|
| Requisito Associado | RF-014 - Cadastrar nova conta de usuário. |
| Registro de evidência |
https://github.com/user-attachments/assets/0da83974-c2ed-4223-9395-94277bede979
|

| **Caso de Teste** | **CT02 – Realizar login e logout** |
|:---:|:---|
| Requisito Associado | RF-016 - Encerrar a sessão ativa do usuário de forma segura. |
| Registro de evidência | _screencast a gravar: login com conta confirmada, verificação do nome no header e logout_ |

| **Caso de Teste** | **CT03 – Registrar ocorrência de animal de rua** |
|:---:|:---|
| Requisito Associado | RF-001 - Marcar a localização de um animal via GPS, diferenciando o seu status de avistamento; RF-005 - Exigir a seleção do estado atual do animal durante o registro de uma marcação; RF-007 - Anexar fotos para facilitar a identificação visual do animal. |
| Registro de evidência |
https://github.com/user-attachments/assets/5b5a62e7-893e-4efa-bd15-0b39e1548380
|

| **Caso de Teste** | **CT04 – Filtrar ocorrências no mapa** |
|:---:|:---|
| Requisito Associado | RF-003 - Filtrar os animais no mapa por estado de saúde, tipo de ocorrência, idade, sexo e porte do animal. |
| Registro de evidência | _screencast a gravar: abrir o dropdown de filtros, aplicar um ou mais critérios, verificar a atualização do mapa e da lista lateral e limpar os filtros_ |

| **Caso de Teste** | **CT05 – Registrar ação de cuidado (água e comida)** |
|:---:|:---|
| Requisito Associado | RF-006 - Registrar o fornecimento recente de cuidados básicos aos animais marcados. |
| Registro de evidência | _screencast a gravar: selecionar uma ocorrência, clicar nos botões Água e Comida no painel de detalhes e verificar a atualização da data e do nome do cuidador_ |

| **Caso de Teste** | **CT06 – Adicionar comentário em uma ocorrência** |
|:---:|:---|
| Requisito Associado | RF-009 - Adicionar comentários nas marcações para atualizar o status do animal. |
| Registro de evidência |
https://github.com/user-attachments/assets/271a5997-a065-4348-95d6-c4fd88d6af1f
|

| **Caso de Teste** | **CT07 – Favoritar e desfavoritar uma ocorrência** |
|:---:|:---|
| Requisito Associado | RF-008 - Consultar ocorrências de animais próximos à localização atual do usuário. |
| Registro de evidência | _screencast a gravar: clicar no ícone de coração em um card, verificar a mudança de cor para vermelho e clicar novamente para desfavoritar_ |

| **Caso de Teste** | **CT08 – Editar ocorrência própria** |
|:---:|:---|
| Requisito Associado | RF-002 - Alternar a visualização do mapa por camadas baseadas no status do animal. |
| Registro de evidência | _screencast a gravar: selecionar uma ocorrência própria, clicar no ícone de edição, alterar um campo e salvar, verificando a atualização dos dados_ |

| **Caso de Teste** | **CT09 – Gerar cartaz digital de busca (PDF)** |
|:---:|:---|
| Requisito Associado | RF-010 - Gerar cartaz digital de busca para animais perdidos (PDF). |
| Registro de evidência | _screencast a gravar: acessar a seção de Pets Perdidos, clicar em "Gerar Cartaz" em um animal e verificar o download do arquivo PDF_ |

| **Caso de Teste** | **CT10 – Redefinir senha de acesso** |
|:---:|:---|
| Requisito Associado | RF-015 - Redefinir a senha de acesso da conta. |
| Registro de evidência | _screencast a gravar: clicar em "Esqueci minha senha", inserir o e-mail, receber o token, inserir a nova senha e confirmar o login com as novas credenciais_ |

| **Caso de Teste** | **CT11 – Editar e excluir perfil do usuário** |
|:---:|:---|
| Requisito Associado | RF-012 - Editar os dados de perfil do usuário. RF-013 - Excluir permanentemente a conta e os dados pessoais do usuário. |
| Registro de evidência | _screencast a gravar: acessar o perfil, alterar um campo e salvar, depois acessar a opção de exclusão de conta e confirmar_ |

---

## Relatório de Testes de Software

Apresente e discuta detalhadamente os resultados obtidos nos testes realizados, destacando tanto os pontos fortes quanto as fragilidades identificadas na solução. Explique como os aspectos positivos contribuem para o desempenho e a usabilidade do sistema, e como os pontos fracos impactam sua eficácia.

Descreva as principais falhas detectadas durante os testes, fornecendo exemplos concretos e evidências que sustentem essas observações. Explicite os impactos dessas falhas na experiência do usuário, na funcionalidade do sistema e nos objetivos do projeto.

Com base nessas análises, detalhe as estratégias que o grupo pretende adotar para corrigir as deficiências e aprimorar a solução nas próximas iterações. Inclua ações específicas, como ajustes no código, modificações na interface, otimizações de desempenho ou melhorias na acessibilidade e usabilidade.

Por fim, apresente e/ou proponha as melhorias a partir dos testes realizados, destacando os ganhos obtidos e como essas alterações contribuem para a evolução do projeto.

> **Links Úteis**:
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
