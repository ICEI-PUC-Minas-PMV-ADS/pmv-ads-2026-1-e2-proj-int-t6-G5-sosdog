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
|Usuário: Tutor ou Voluntário  | marcar a localização exata de um animal no mapa           | que outros usuários saibam onde encontrá-lo ou a região em que foi perdido.    |
|Usuário       | alternar entre diferentes camadas de visualização Perdidos vs. Rua                 | focar apenas nos casos que desejo ajudar no momento |
|Voluntário       | registrar que forneci água ou comida a um cão comunitário                 | evitar que outros usuários dupliquem o esforço ou que o animal fique desassistido |
|Morador local       | confirmar se um animal ainda está no local indicado                 | manter o mapa atualizado e evitar informações falsas. |
|Tutor de um pet perdido       | receber um alerta se alguém cadastrar um "Cão de Rua" próximo à minha localização             | que eu possa verificar se é o meu animal.  |
|Tutor       | gerar um PDF automático do meu cão perdido                 | imprimir e colar no bairro e aumentar as chances de encontrar meu pet perdido. |
|Usuário       | classificar o estado de saúde do animal                 | que casos críticos recebam atenção prioritária da comunidade e de ONGs. |

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
|RNF-001| A aplicação deve ser responsiva e otimizada primordialmente para dispositivos móveis (Mobile First). | ALTA |
|RNF-002| A aplicação deve atualizar o mapa e processar buscas por ocorrências (raio de 5 km) em no máximo 3s. | ALTA |
|RNF-003| O sistema deve estar disponível 24 horas por dia, 7 dias por semana, devido à imprevisibilidade dos resgates. | ALTA |
|RNF-004| O sistema deve proteger os dados pessoais dos usuários (telefone/endereço) de acordo com a LGPD, exibindo-os apenas mediante autorização. | ALTA |
|RNF-005| O aplicativo/plataforma web necessita de permissão ativa de acesso ao GPS do dispositivo do usuário para funcionar. | ALTA |
|RNF-006| O sistema depende da abertura do aplicativo pelo usuário para atualizar e exibir as notificações internas de "matches" e alertas. | MÉDIA | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)
