
# Registro de Testes de Software

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>, <a href="8-Plano de Testes de Software.md"> Plano de Testes de Software</a>

Para cada caso de teste definido no Plano de Testes de Software, realize o registro das evidências dos testes feitos na aplicação pela equipe, que comprovem que o critério de êxito foi alcançado (ou não!!!). Para isso, utilize uma ferramenta de captura de tela que mostre cada um dos casos de teste definidos (obs.: cada caso de teste deverá possuir um vídeo do tipo _screencast_ para caracterizar uma evidência do referido caso).

| **Caso de Teste** | **CT01 – Cadastrar nova conta de usuário** |
|:---:|:---|
| Requisito Associado | RF-014 - Cadastrar nova conta de usuário. |
| Registro de evidência |

https://github.com/user-attachments/assets/de307a2a-8340-40f8-a342-f98185c55bd9

 |

| **Caso de Teste** | **CT02 – Realizar login e logout** |
|:---:|:---|
| Requisito Associado | RF-016 - Encerrar a sessão ativa do usuário de forma segura. |
| Registro de evidência | 


https://github.com/user-attachments/assets/3f0f19ca-5ebb-4f09-b0cd-9b68363db674


|

| **Caso de Teste** | **CT03 – Registrar ocorrência de animal de rua** |
|:---:|:---|
| Requisito Associado | RF-001 - Marcar a localização de um animal via GPS, diferenciando o seu status de avistamento; RF-005 - Exigir a seleção do estado atual do animal durante o registro de uma marcação; RF-007 - Anexar fotos para facilitar a identificação visual do animal. |
| Registro de evidência |

https://github.com/user-attachments/assets/bf1074ed-1229-4663-b3ed-fbfd611403a1

|

| **Caso de Teste** | **CT04 – Filtrar ocorrências no mapa** |
|:---:|:---|
| Requisito Associado | RF-003 - Filtrar os animais no mapa por estado de saúde, tipo de ocorrência, idade, sexo e porte do animal. |
| Registro de evidência |

https://github.com/user-attachments/assets/cfcf4f15-f129-40aa-8cde-9535c2768144

 |

| **Caso de Teste** | **CT05 – Registrar ação de cuidado (água e comida)** |
|:---:|:---|
| Requisito Associado | RF-006 - Registrar o fornecimento recente de cuidados básicos aos animais marcados. |
| Registro de evidência |


https://github.com/user-attachments/assets/b3c50aec-caf5-43d7-875e-f7c33680484c


 |

| **Caso de Teste** | **CT06 – Adicionar comentário em uma ocorrência** |
|:---:|:---|
| Requisito Associado | RF-009 - Adicionar comentários nas marcações para atualizar o status do animal. |
| Registro de evidência |


https://github.com/user-attachments/assets/bac6db50-208a-44df-856f-12248c9555fb


|

| **Caso de Teste** | **CT07 – Favoritar e desfavoritar uma ocorrência** |
|:---:|:---|
| Requisito Associado | RF-017 - Permitir que usuários autenticados favoritam ou desfavoritam uma ocorrência. |
| Registro de evidência | 

https://github.com/user-attachments/assets/81448431-b3b4-4b02-bab0-240b80043c50




 |

| **Caso de Teste** | **CT08 – Editar ocorrência própria** |
|:---:|:---|
| Requisito Associado | RF-004 - Permitir que o criador da ocorrência edite ou exclua seu próprio registro. |
| Registro de evidência | 

https://github.com/user-attachments/assets/4fdaa1b3-168a-49b1-9221-88c0d2211058


 |

| **Caso de Teste** | **CT09 – Gerar cartaz digital de busca (PDF)** |
|:---:|:---|
| Requisito Associado | RF-010 - Gerar cartaz digital de busca para animais perdidos (PDF). |
| Registro de evidência | 

https://github.com/user-attachments/assets/e68a6005-fd3d-4586-bec9-3a499f4f4b30



 |

| **Caso de Teste** | **CT10 – Redefinir senha de acesso** |
|:---:|:---|
| Requisito Associado | RF-015 - Redefinir a senha de acesso da conta. |
| Registro de evidência | 


https://github.com/user-attachments/assets/6b48408a-21bf-4cfa-b9fc-6f2792b322ef


 |

| **Caso de Teste** | **CT11 – Editar e excluir perfil do usuário** |
|:---:|:---|
| Requisito Associado | RF-012 - Editar os dados de perfil do usuário. RF-013 - Excluir permanentemente a conta e os dados pessoais do usuário. |
| Registro de evidência | 

https://github.com/user-attachments/assets/f1e2bdba-0cca-4d7f-9d18-e1d60f0c0a8a

 |

---

## Relatório de Testes de Software

1. Apresentação e Discussão dos Resultados Obtidos

Os testes de software e usabilidade realizados no sistema SOS Dog abrangeram os fluxos principais da aplicação hospedada em ambiente de produção (Azure). Foram validados os cenários de: Cadastro, Confirmação de E-mail, Login, Reporte de Animal, Edição de Ocorrências, Geração de Cartaz, Favoritar Casos, Exclusão de Perfil e Redefinição de Senha.

Pontos Fortes (Aspectos Positivos): O sistema apresentou um excelente desempenho na navegação e retenção de contexto. A taxa de sucesso na conclusão das tarefas foi de 100%, com um tempo médio de execução ágil (aprox. 26 segundos por tarefa). A arquitetura de interface baseada em modais sobrepostos ao mapa principal (Leaflet) provou-se altamente eficaz, pois evita que o usuário perca sua localização geográfica ao realizar ações paralelas. Além disso, o sistema de feedback visual verde (toasts de sucesso) para cada ação confirmada no banco de dados contribui significativamente para a segurança e usabilidade da ferramenta.

Fragilidades Identificadas: As principais fragilidades residem na infraestrutura de comunicação externa (e-mails) e no tratamento de exceções assíncronas (requisições AJAX/Fetch) no front-end quando a sessão do usuário expira no servidor, impactando a clareza da resposta ao usuário.

2. Principais Falhas Detectadas e Seus Impactos

Durante os testes, foram mapeadas falhas técnicas e de experiência do usuário (UX), com as seguintes evidências:

Falha 1: Entregabilidade de E-mails (Caixa de SPAM)

Evidência: Ao criar uma nova conta e ao solicitar a recuperação de senha, os vídeos de teste comprovaram que o e-mail transacional (remetente: sosdog.suporte) foi direcionado imediatamente para a pasta de SPAM do Gmail.

Impacto: Como o sistema exige a confirmação do e-mail para o primeiro acesso, o usuário que não possui familiaridade técnica para checar o SPAM presumirá que o sistema está quebrado, gerando uma taxa de abandono (churn) altíssima logo no cadastro, inviabilizando o objetivo do projeto.

Falha 2: Tratamento Genérico de Sessão Expirada no JavaScript

Evidência: Ao tentar clicar no botão "Editar" (ícone de lápis) de uma ocorrência, o sistema exibiu um alert genérico: "Não foi possível carregar a edição". A análise do DevTools (Console/Network) revelou que o erro real foi um bloqueio de autorização do Azure (Sessão Expirada ou Falta de Permissão), que retornou a página inteira de Login em HTML em vez do Modal esperado, quebrando o JavaScript (Cannot read properties of undefined).

Impacto: O usuário fica confuso, pois o sistema não explica que ele precisa fazer login novamente ou que não tem permissão para editar aquele animal, prejudicando severamente a usabilidade.

Falha 3: Ausência de Estado de Carregamento (Loading) e Preview de Mídia

Evidência: Ao registrar um animal ou atualizar a foto de perfil, o usuário seleciona a imagem, clica em "Salvar" e a tela permanece estática por alguns segundos até a conclusão do processamento no banco de dados. Além disso, apenas o nome do arquivo texto é exibido (ex: Teste 222), sem pré-visualização visual da foto.

Impacto: Gera ansiedade operacional. Sem feedback visual de "Carregando...", o usuário pode clicar múltiplas vezes no botão de salvar, sobrecarregando o servidor e potencialmente duplicando registros.

3. Estratégias de Correção e Próximas Iterações

Para sanar as deficiências apontadas e aprimorar a solução de forma robusta, o grupo adotará as seguintes estratégias técnicas:

Ajustes de Infraestrutura (E-mails): Para resolver a falha crítica do SPAM, a equipe configurará as chaves de autenticação de domínio (SPF, DKIM e DMARC) no provedor de e-mail atual, ou avaliará a migração para um serviço de disparo transacional profissional, garantindo a chegada na Caixa de Entrada.

Ajustes no Código JavaScript (Tratamento de Erros): Modificação nas funções fetch do arquivo ocorrencias.js. Será adicionada uma validação para verificar se a response.url redireciona para a página de Login. Caso afirmativo, o sistema interceptará o erro de forma elegante e exibirá um modal amigável: "Sua sessão expirou. Por favor, faça login novamente", redirecionando o usuário de volta ao início.

Otimizações de Interface (UX/UI): Implementação da API nativa FileReader do JavaScript nos formulários de cadastro de imagem. Isso permitirá renderizar uma miniatura em tempo real da foto do cãozinho antes mesmo do envio ao servidor.

Prevenção de Múltiplos Cliques (Desempenho): Adição de uma rotina no front-end que, ao clicar em botões de submissão (submit), desabilita o botão (disabled="true") e altera o texto para "Processando..." ou insere um ícone de spinner, destravando a tela apenas após o retorno de sucesso do servidor.

4. Propostas de Melhorias e Ganhos Obtidos

As intervenções propostas a partir desta rodada de testes gerarão ganhos imediatos na estabilidade e na percepção de valor do sistema pelo usuário.

A correção da entregabilidade de e-mails garantirá o cumprimento do fluxo primário (onboarding contínuo de usuários). A introdução de tratamentos de erros mais descritivos e bloqueios de carregamento (loading states) reduzirá a carga do servidor no Azure e mitigará frustrações do usuário final. Por fim, as melhorias incrementais, como o preview de imagens, polirão a interface, elevando o SOS Dog de um protótipo acadêmico funcional para um produto com padrões de mercado, pronto para adoção e uso real pela comunidade.

> **Links Úteis**:
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
