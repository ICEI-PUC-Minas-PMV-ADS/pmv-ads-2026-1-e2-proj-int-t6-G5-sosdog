# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

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

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| A aplicação deve permitir que o usuário avalie uma agência de intercâmbio com base na sua experiência| ALTA | 
|RF-002| A aplicação deve permitir que o usuário inclua comentários ao fazer uma avaliação de uma agência de intercâmbio    | ALTA |
|RF-003| A aplicação deve permitir que o usuário consulte todas as agências de intercâmbio cadastradas ordenando-as com base em suas notas | ALTA |

### Requisitos não Funcionais

| ID | Descrição do Requisito | Prioridade |
|---|---|---|
|RNF-001| A aplicação deve ser responsiva e otimizada primordialmente para dispositivos móveis (Mobile First). | ALTA |
|RNF-002| A aplicação deve atualizar o mapa e processar buscas por ocorrências (raio de 5 km) em no máximo 3s. | ALTA |
|RNF-003| O sistema deve estar disponível 24 horas por dia, 7 dias por semana, devido à imprevisibilidade dos resgates. | ALTA |
|RNF-004| O sistema deve proteger os dados pessoais dos usuários (telefone/endereço) de acordo com a LGPD, exibindo-os apenas mediante autorização. | ALTA |
|RNF-005| O aplicativo/plataforma web necessita de permissão ativa de acesso ao GPS do dispositivo do usuário para funcionar. | ALTA |
|RNF-006| O sistema depende da abertura do aplicativo pelo usuário para atualizar e exibir as notificações internas de "matches" e alertas. | MÉDIA | 

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

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
