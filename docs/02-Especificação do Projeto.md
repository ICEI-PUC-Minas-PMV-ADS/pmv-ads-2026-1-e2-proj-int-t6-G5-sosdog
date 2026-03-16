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
| **RF-001** | Marcar a localização de um animal via GPS, diferenciando o seu status de avistamento. | ALTA |
| **RF-002** | Alternar a visualização do mapa por camadas baseadas no status do animal.| MÉDIA |
| **RF-003** | Filtrar os animais no mapa por estado de saúde, tempo de avistamento e porte. | MÉDIA |
| **RF-004** | Validar marcações de outros usuários para confirmar a veracidade das informações. | ALTA |
| **RF-005** | Exigir a seleção do estado atual do animal durante o registro de uma marcação. | ALTA |
| **RF-006** | Registrar o fornecimento recente de cuidados básicos aos animais marcados. | MÉDIA |
| **RF-007** | Anexar fotos para facilitar a identificação visual do animal. | ALTA |
| **RF-008** | Consultar ocorrências de animais próximos à localização atual do usuário.| ALTA |
| **RF-009** | Adicionar comentários nas marcações para atualizar o status do animal. | MÉDIA |
| **RF-010** | Gerar cartaz digital de busca para animais perdidos.(PDF) | MÉDIA |
| **RF-011** | Disponibilizar seção informativa com leis, contatos de emergência e instruções de resgate. | BAIXA |
| **RF-012** | Editar os dados de perfil do usuário. | ALTA |
| **RF-013** | Excluir permanentemente a conta e os dados pessoais do usuário. | ALTA |
| **RF-014** | Configurar o raio de distância para o recebimento de alertas. | ALTA |
| **RF-015** | Filtrar os tipos de notificações de animais que deseja receber. | MÉDIA |
| **RF-016** | Gerenciar o recebimento de notificações de interações da comunidade. | BAIXA |
| **RF-017** | Definir a visualização padrão do mapa ao abrir o aplicativo. | BAIXA |
| **RF-018** | Configurar a ocultação automática de marcações antigas no mapa. | MÉDIA |
| **RF-019** | Salvar marcações favoritas em uma área dedicada para acompanhamento. | MÉDIA |
| **RF-020** | Disponibilizar central de ajuda e suporte ao usuário. | BAIXA 
| **RF-021** | Cadastrar nova conta de usuário. | ALTA |
| **RF-022** | Redefinir a senha de acesso da conta. | ALTA |
| **RF-023** | Encerrar a sessão ativa do usuário de forma segura. | ALTA |
| **RF-024** | Bloquear temporariamente a conta após sucessivas tentativas de login inválidas. | MÉDIA ||

### Requisitos não Funcionais

| ID | Descrição do Requisito | Prioridade |
| :--- | :--- | :--- |
| **RNF-001** | Garantir responsividade e otimização com foco primordial em dispositivos móveis (*Mobile First*). | ALTA |
| **RNF-002** | Processar buscas e atualizar o mapa (raio de 5 km) em no máximo 3 segundos. | ALTA |
| **RNF-003** | Manter alta disponibilidade (24/7) para suportar a imprevisibilidade dos resgates. | ALTA |
| **RNF-004** | Proteger dados sensíveis em conformidade com a LGPD, exigindo autorização explícita para exibição de contatos. | ALTA |
| **RNF-005** | Exigir permissão ativa de acesso ao GPS do dispositivo para a liberação das funções de mapa. | ALTA |
| **RNF-006** | Sincronizar e exibir notificações internas apenas mediante a abertura do aplicativo pelo usuário. | MÉDIA |
| **RNF-007** | Garantir compatibilidade total com as versões mais recentes dos principais navegadores (Chrome, Safari e Firefox). | ALTA |

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


## Diagrama de Casos de Uso

O diagrama abaixo ilustra as principais interações entre os diferentes perfis de usuários e o **Sistema SOS Dog**, mapeando visualmente as funcionalidades descritas na nossa tabela de Requisitos Funcionais.

<img width="100%" alt="Diagrama de Casos de Uso" src="https://github.com/user-attachments/assets/7380327c-76da-406d-9849-d6a41579a0d7" />

### 📌 Destaques da Modelagem:

* **Generalização de Atores (Herança):** Para evitar redundâncias visuais e manter o diagrama otimizado, aplicamos o conceito de herança da UML. O ator **Usuário Geral** concentra as ações comuns a todos no aplicativo (como realizar login, visualizar o mapa, favoritar ocorrências e acessar a central de ajuda). Os perfis específicos (*Tutor, Voluntário, Membro da Comunidade e ONG*) herdam essas permissões básicas e possuem ligação direta apenas com suas ações exclusivas.
* **Ator de Sistema Externo (`<<System>>`):** A **API - GPS** foi mapeada como um ator externo. O sistema depende ativamente desse serviço para capturar a localização exata no momento dos registros e para calcular o raio de busca de 5km no mapa.
* **Relacionamentos de Inclusão (`<<include>>`):** Processos de registro, como "Registrar animal de rua" e "Cadastrar animal perdido", exigem obrigatoriamente etapas complementares para manter a qualidade dos dados. Por isso, utilizamos *includes* para mostrar que o sistema sempre acionará o "Marcar localização GPS" e o "Upload de foto" durante essas ações.
* **Relacionamentos de Extensão (`<<extend>>`):** Aplicamos a relação de extensão apontando de "Filtrar ocorrências" para "Monitorar ocorrências". Isso demonstra tecnicamente que a aplicação de filtros é um comportamento opcional e complementar à ação principal de monitoramento realizada pela ONG/Administrador.

## Diagrama de Fluxo (Fluxograma Principal)

O fluxo abaixo representa a jornada principal do usuário dentro do **Sistema SOS Dog**, desde a autenticação até as interações com o mapa e o registro de novas ocorrências.

```mermaid
graph TD
    A([Acesso ao App SOS Dog]) --> B{Usuário Logado?}
    
    %% Fluxo de Autenticação
    B -- Não --> C[Tela de Login / Cadastro]
    C --> D{Permissão de GPS?}
    B -- Sim --> D
    
    D -- Negada --> E[Aviso: O app precisa do GPS para funcionar]
    E --> D
    
    D -- Concedida --> F[[Tela Principal: Mapa de Ocorrências]]
    
    %% Ramificações a partir da Tela Principal
    F --> G{O que deseja fazer?}
    
    %% Rota 1: Interagir com o Mapa
    G -- Explorar Mapa --> H[Aplicar Filtros / Camadas]
    H --> I[Visualizar Detalhes da Ocorrência]
    I --> J[Ações: Favoritar, Comentar ou Cuidar]
    J --> F
    
    %% Rota 2: Registrar Ocorrência
    G -- Registrar Ocorrência --> K{Tipo de Registro}
    K -- Animal de Rua --> L[Preencher Dados Básicos]
    K -- Animal Perdido --> L
    L --> M[Upload de Foto]
    M --> N[Capturar Localização GPS]
    N --> O[Informar Estado do Animal]
    O --> P((Salvar Ocorrência))
    P --> F
    
    %% Rota 3: Outros
    G -- Acessar Menu --> Q[Configurações, Perfil ou Ajuda]
    Q --> F
