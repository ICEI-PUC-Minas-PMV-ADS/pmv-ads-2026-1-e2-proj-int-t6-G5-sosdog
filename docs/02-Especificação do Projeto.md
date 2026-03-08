# Especificações do Projeto

## Personas

![Persona 1](img/Persona%201.png)
![Persona 2](img/Persona%202.png)
![Persona 3](img/Persona%203.png)
![Persona 4](img/Persona%204.png)
![Persona 5](img/Persona%205.png)


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Protetora Mariana  | Marcar a localização exata de um animal no mapa           | Que outros usuários saibam onde encontrá-lo ou a região em que foi perdido.    |
|Coordenadora de ONG Juliana       | Alternar entre diferentes camadas de visualização Perdidos vs. Rua     | Focar apenas nos casos que desejo ajudar no momento. |
|Protetora Mariana       | Registrar que forneci água ou comida a um cão comunitário           | Evitar que outros usuários dupliquem o esforço ou que o animal fique desassistido. |
|Comerciante Patrícia      | Confirmar se um animal ainda está no local indicado                 | Manter o mapa atualizado e evitar informações falsas. |
|Tutor Eduardo       | Receber um alerta se alguém cadastrar um "Cão de Rua" próximo à minha localização             | Que eu possa verificar se é o meu animal.  |
|Tutor Eduardo       | Gerar um PDF automático do meu cão perdido                 | Imprimir e colar no bairro e aumentar as chances de encontrar meu pet perdido. |
|Coordenadora de ONG Juliana        | Classificar o estado de saúde do animal                 | Garantir que casos críticos recebam atenção prioritária da comunidade e de ONGs. |
|Coordenadora de ONG Juliana        | Filtrar o mapa por estado de saúde, porte e tempo de avistamento. | Otimizar o deslocamento da minha equipe de resgate com base na prioridade.  |
|Motorista Lucas        | Fazer o upload de fotos rapidamente ao registrar um avistamento.                 | Facilitar a identificação visual sem precisar digitar descrições longas. |
|Comerciante Patrícia         | Favoritar e adicionar comentários nas ocorrências.                 | Acompanhar o status de um animal que reportei e saber se ele já foi encaminhado. |
|Tutor Eduardo        | Configurar o raio de distância e filtrar os tipos de alertas que recebo.   | Garantir notificações relevantes sem ser inundado por alertas distantes.  |
|Protetora (Mariana)        | Acessar uma seção de contatos de emergência e guias rápidos.        | Saber a quem recorrer e como agir em situações de primeiros socorros na rua. |


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

### Tabela de Requisitos Funcionais

| ID | Descrição do Requisito | Prioridade |
| :--- | :--- | :--- |
| **RF-001** | O sistema deve permitir que o usuário marque a localização exata de um animal via GPS, diferenciando entre animal de rua/avistado (pino amarelo) e animal perdido/dono procurando (pino vermelho). | ALTA |
| **RF-002** | O sistema deve permitir que o usuário alterne a visualização do mapa em camadas: "Apenas animais de rua", "Apenas animais perdidos" ou "Visualização geral". | MÉDIA |
| **RF-003** | O sistema deve permitir filtrar o mapa por estado de saúde, tempo de avistamento (ex.: últimas 2h, 24h) e porte do animal. | MÉDIA |
| **RF-004** | O sistema deve permitir que outros usuários confirmem uma marcação existente (validação) para atestar que a informação ainda é verídica, evitando duplicatas ou trotes. | ALTA |
| **RF-005** | O sistema deve exigir que, ao marcar um animal, o usuário selecione o estado atual dele (Saudável, Ferido, Atropelado, Fêmea com filhotes ou Cão com coleira/perdido). | ALTA |
| **RF-006** | O sistema deve permitir o registro, no card de um animal de rua, de informações caso ele tenha recebido água, comida ou medicação por algum usuário recentemente. | MÉDIA |
| **RF-007** | O sistema deve permitir que o usuário faça o upload de fotos para facilitar a identificação visual rápida do animal no mapa e no feed. | ALTA |
| **RF-008** | O sistema deve permitir que o usuário consulte ocorrências de animais em situação crítica ou perdidos dentro de um raio de até 5 km da sua localização atual, em mapa ou lista. | ALTA |
| **RF-009** | O sistema deve permitir que os usuários adicionem comentários nas marcações para atualizar o paradeiro do animal. | MÉDIA |
| **RF-010** | O sistema deve gerar automaticamente um cartaz digital (em PDF) para animais perdidos, contendo foto, dados do dono, observações e um QR Code para o último local avistado. | MÉDIA |
| **RF-011** | O sistema deve dedicar uma seção para informar leis de proteção animal, contatos de emergência e instruções sobre o que fazer em casos de urgência. | BAIXA |
| **RF-012** | O sistema deve permitir que o usuário edite seus dados pessoais (nome, foto de perfil, e-mail e telefone). | ALTA |
| **RF-013** | O sistema deve fornecer uma opção para exclusão permanente da conta e dos dados do usuário (Adequação LGPD). | ALTA |
| **RF-014** | O sistema deve permitir que o usuário defina o raio de distância (ex.: 1km, 5km) para o recebimento de alertas de animais. | ALTA |
| **RF-015** | O sistema deve permitir que o usuário filtre quais tipos de notificações deseja receber (perdidos, feridos ou todos). | MÉDIA |
| **RF-016** | O sistema deve permitir ativar ou desativar notificações de interações da comunidade (validações e comentários). | BAIXA |
| **RF-017** | O sistema deve permitir que o usuário defina a visualização padrão do mapa ao iniciar o aplicativo. | BAIXA |
| **RF-018** | O sistema deve permitir configurar a ocultação automática de pinos antigos no mapa (ex.: mais de 7 dias). | MÉDIA |
| **RF-019** | O sistema deve disponibilizar uma área de "Itens Salvos" para que o usuário acompanhe marcações favoritadas. | MÉDIA |
| **RF-020** | O sistema deve conter uma central de Ajuda e Suporte, com FAQ e formulário para envio de dicas, opiniões e sugestões. | BAIXA |

### Requisitos não Funcionais

| ID | Descrição do Requisito | Prioridade |
|---|---|---|
| RNF-001 | A aplicação deve ser responsiva e otimizada primordialmente para dispositivos móveis (Mobile First). | ALTA |
| RNF-002 | A aplicação deve atualizar o mapa e processar buscas por ocorrências (raio de 5 km) em no máximo 3s. | ALTA |
| RNF-003 | O sistema deve estar disponível 24 horas por dia, 7 dias por semana, devido à imprevisibilidade dos resgates. | ALTA |
| RNF-004 | O sistema deve proteger os dados pessoais dos usuários (telefone/endereço) de acordo com a LGPD, exibindo-os apenas mediante autorização. | ALTA |
| RNF-005 | O aplicativo/plataforma web necessita de permissão ativa de acesso ao GPS do dispositivo do usuário para funcionar. | ALTA |
| RNF-006 | O sistema depende da abertura do aplicativo pelo usuário para atualizar e exibir as notificações internas de "matches" e alertas. | MÉDIA |
| RNF-007 | A aplicação web deve ser totalmente compatível e funcional nas versões mais recentes dos principais navegadores mobile e desktop (Google Chrome, Safari e Mozilla Firefox). | ALTA |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                                                 |
|--|---------------------------------------------------------------------------|
|01| O projeto deverá ser desenvolvido e entregue dentro do prazo da disciplina|
|02| A solução será apresentada inicialmente como um protótipo funcional       |
|03| O sistema depende da autorização do usuário para acesso ao GPS            |
|04| A aplicação depende da colaboração dos usuários para registrar ocorrências|
|05| O desenvolvimento utilizará as tecnologias definidas pela equipe e faculdade|
|06| O sistema depende de conexão com internet para registrar e visualizar dados|


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)


## Diagrama de Casos de Uso

O diagrama abaixo ilustra as principais interações entre os diferentes perfis de usuários e o **Sistema SOS Dog**, mapeando visualmente as funcionalidades descritas na nossa tabela de Requisitos Funcionais.

<img width="406" height="754" alt="Diagrama de Casos de Uso" src="https://github.com/user-attachments/assets/d7ac6590-47d0-44a7-a5a5-b0b26e9deedf" />

### 📌 Destaques da Modelagem:

* **Generalização de Atores (Herança):** Para evitar redundâncias visuais e manter o diagrama otimizado, aplicamos o conceito de herança da UML. O ator **Usuário Geral** concentra as ações comuns a todos no aplicativo (como visualizar o mapa, favoritar ocorrências e acessar a central de ajuda). Os perfis específicos (*Tutor, Voluntário, Membro da Comunidade e ONG*) herdam essas permissões básicas e possuem ligação direta apenas com suas ações exclusivas.
* **Ator de Sistema Externo (`<<System>>`):** A **API - GPS** foi mapeada como um ator externo. O sistema depende ativamente desse serviço para capturar a localização exata no momento dos registros e para calcular o raio de busca de 5km no mapa.
* **Relacionamentos de Inclusão (`<<include>>`):** Processos de registro, como "Registrar cão de rua" e "Cadastrar cão perdido", exigem obrigatoriamente etapas complementares para manter a qualidade dos dados. Por isso, utilizamos *includes* para mostrar que o sistema sempre acionará o "Marcar localização GPS" e o "Upload de foto" durante essas ações.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)
