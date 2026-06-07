# Template Padrão da Aplicação

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>, <a href="4-Metodologia.md"> Metodologia</a></span>

Layout padrão da aplicação que será utilizado em todas as páginas com a definição de identidade visual, aspectos de responsividade e iconografia.

---

## 1. Visão Geral do Projeto

**NOME DA APLICAÇÃO:** SOSDOG - RESGATE, CUIDADO E ADOÇÃO DE ANIMAIS.

**OBJETIVO:** Uma plataforma online que conecta animais em situação de vulnerabilidade a futuros tutores. A aplicação tem como foco facilitar o processo de resgate, apoio e adoção de forma rápida, integrando protetores independentes e a comunidade.

**Modelo padrão da aplicação:** Interface acolhedora, empática e intuitiva, focada em dar destaque visual aos animais disponíveis para adoção. Conta com botões de ação claros e de fácil acesso para "Denunciar Abandono", "Quero Adotar" e "Ajudar/Doar".

---

## 2. Identidade Visual

### 2.1 Paleta de Cores

A paleta de cores foi escolhida estrategicamente para transmitir sensações de urgência, esperança e leveza:

* **Laranja ou Amarelo Mostarda:** Para chamar atenção, representar calor humano, energia e urgência nos resgates.
* **Verde Claro / Menta:** Simbolizando esperança, saúde, renovação e bem-estar animal.
* **Branco e Cinza Claro:** Cores de fundo utilizadas para trazer leveza, clareza e evitar a fadiga visual do usuário enquanto navega pelas fotos dos pets.

<img width="1132" height="558" alt="PALETA DE CORES" src="https://github.com/user-attachments/assets/4694fea0-187c-4fb8-8a77-525c7a731adb" />

**Tabela de Cores (Hexadecimais):**

| TIPO DA COR | HEX | DESCRIÇÃO |
|---|---|---|
| **Cor Primária (Verde)** | `#366261` | Destaques dos menus principais e identidade base. |
| **Cor Secundária (Cinza/Verde Claro)** | `#E7EDEE` | Destaques dos menus secundários e fundos de seções. |
| **Fundo / Superfície** | `#FFFFFF` | Fundos de cards e containers principais. |
| **Texto Principal** | `#000000` | Textos principais, garantindo alta legibilidade. |
| **Cor de Ação (Laranja)** | `#E47862` | Cores dos botões de ação primária (Call to Action). |

---

### 2.2 Tipografia

Para garantir consistência e fácil leitura, utilizamos duas famílias tipográficas principais, equilibrando um visual amigável nos títulos e clareza nos textos informativos.

**Títulos e Textos Principais:**

| ELEMENTO | FONTE | TAMANHO / PESO |
|---|---|---|
| **Títulos (H1, H2)** | Poetsen One | Negrito, 20px |
| **Texto Padrão (Body)** | Poetsen One | Seminegrito, 16px |

<img width="366" height="331" alt="Tipografia Poetsen One" src="https://github.com/user-attachments/assets/1e434aa4-7c59-449f-8e1e-9015a932f8d9" />

**Cards e Textos Secundários:**

| ELEMENTO | FONTE | TAMANHO / PESO |
|---|---|---|
| **Texto Cards Secundários** | Alatsi Regular | Negrito, 20px |
| **Texto Cards Terciários** | Alatsi Regular | Seminegrito, 20px |

<img width="491" height="509" alt="Tipografia Alatsi Regular" src="https://github.com/user-attachments/assets/b2136ebe-a1e6-4a9a-a507-3d2254899b9c" />

---

### 2.3 Iconografia

Os ícones utilizados na interface ajudam a guiar o usuário pelas ações principais do sistema de forma lúdica e objetiva (ex: Patinhas para pets, corações para favoritar, ícones de localização).

<img width="460" height="198" alt="ICONOGRAFIA" src="https://github.com/user-attachments/assets/9aea8335-bb61-4f61-9f09-06166f1c468c" />

---

### 2.4 Logotipo

Abaixo estão as versões oficiais do logotipo da SOSDOG, utilizadas no cabeçalho da aplicação (Navbar) e materiais de divulgação:

<div align="center">
<img width="53" height="45" alt="Logotipo SosDog" src="https://github.com/user-attachments/assets/4bc8fc20-2bb9-4a48-a771-4a37355b6b65" />
</div>

---

## 3. Arquitetura de Responsividade (Estratégia Desktop-First)

A plataforma SOSDOG foi desenvolvida seguindo a estratégia **Desktop-First**. O layout base e estrutural foi projetado nativamente para resoluções de monitores e laptops (onde protetores e administradores gerenciam o sistema com visão analítica completa).

A adaptação para telas menores ocorre de forma regressiva através de Media Queries baseadas em `max-width`, reduzindo a complexidade visual e priorizando a usabilidade touch conforme o dispositivo diminui.

### 3.1 Tabela de Breakpoints e Comportamentos

| Breakpoint | Dispositivo Alvo | Alteração Estrutural na Interface |
|---|---|---|
| **Padrão (Base)** | Desktop / Laptop (≥ 1200px) | Layout completo em **Grid de 3 Colunas**: Lista de Casos (Esquerda) \| Mapa Interativo (Centro) \| Perfil/Detalhes (Direita). |
| **`min-width: 1400px`** | Monitores UltraWide / Grandes | Ajustes finos de expansão: Grid alargado (`320px 1fr 340px`) e aumento do espaçamento (*padding*) do cabeçalho. |
| **`max-width: 1199px`** | Laptops Compactos / Tablets (Landscape) | Redução proporcional das barras laterais para preservar a área útil do mapa central. |
| **`max-width: 991px`** | Tablets Standard / Telas Médias | **Colapso para 2 Colunas**. A Sidebar Direita sai do fluxo e transforma-se num *Off-Canvas Drawer* (gaveta lateral oculta) acionada por JavaScript. |
| **`max-width: 767px`** | Tablets (Portrait) / Smartphones Largos | **Layout em Stack Vertical (Pilha)**. O Grid horizontal é desfeito (`display: flex` vertical). A Sidebar Direita passa a ser um *Bottom Sheet* (desliza de baixo para cima). |
| **`max-width: 575px`** | Smartphones Padrão (Mobile) | Interface minimalista. Ocultação da barra de pesquisa flutuante, reorganização do menu de navegação em bloco centralizado e otimização total para toque (*touch*). |
| **`max-width: 399px`** | Smartphones Pequenos (ex: iPhone SE) | Micro-ajustes de segurança: Redução do tamanho de fontes, imagens de cards compactadas e botões menores para evitar quebras de texto. |

---

### 3.2 Soluções Técnicas de UX Implementadas

Para garantir que a experiência mobile seja tão rica quanto a desktop, o CSS adota três padrões modernos de engenharia de interface:

#### A. O Padrão Off-Canvas & Bottom Sheet
Em telas grandes, as informações do animal e os botões de ação ficam expostos permanentemente na direita. No ecossistema mobile, para poupar espaço, o elemento `.right-sidebar` (ou `.dog-profile-sidebar`) ganha propriedades dinâmicas:
* **Em Tablets (`max-width: 991px`):** Fica oculto à direita (`right: -100%`) e desliza horizontalmente quando a classe `.drawer-open` é injetada via JS, acompanhado de um efeito de desfoque de fundo (`.drawer-overlay`).
* **Em Celulares (`max-width: 767px`):** Muda seu ponto de ancoragem para a base da tela (`top: auto; bottom: -100%`), deslizando para cima como uma folha de propriedades (*Bottom Sheet*), facilitando o alcance do clique com o polegar.

#### B. Altura Dinâmica com a Unidade `dvh`
Nas propriedades dos painéis móveis, foi utilizada a unidade `height: 100dvh;` (Dynamic Viewport Height). Isso impede que as barras de navegação dinâmicas dos browsers mobile (como Safari do iOS ou Chrome do Android) cortem ou escondam os botões de ação situados no rodapé dos menus deslizantes.

#### C. Simplificação de Elementos e Foco no Negócio
* **Barra de Busca (`.search-bar`):** É completamente ocultada no mobile (`display: none` abaixo de 575px) para limpar o cabeçalho e dar destaque absoluto ao logotipo e às ações de urgência.
* **Lista de Ocorrências (`.cases-list`):** Passa a ter uma altura máxima controlada por *Viewport Height* (`max-height: 30vh`) no mobile, garantindo que o usuário consiga visualizar o Mapa e a Lista na mesma tela sem precisar rolar a página inteira infinitamente.
