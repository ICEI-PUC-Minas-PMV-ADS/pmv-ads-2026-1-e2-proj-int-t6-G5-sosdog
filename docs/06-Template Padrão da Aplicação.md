# 3. Projeto de Interface

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>, <a href="4-Metodologia.md"> Metodologia</a>

## Visão Geral

O layout padrão da aplicação **SOSDOG** foi concebido para ser acolhedor, empático e altamente intuitivo, sendo utilizado em todas as páginas do sistema. Por se tratar de um projeto voltado para o bem-estar animal, o foco principal é dar destaque visual aos cães e facilitar a navegação em qualquer dispositivo, orientando o usuário para ações rápidas.

---

## 3.1. Nome e Objetivo da Aplicação

**NOME DA APLICAÇÃO:** SOSDOG - RESGATE, CUIDADO E ADOÇÃO DE ANIMAIS.

**OBJETIVO:** UMA PLATAFORMA ONLINE QUE CONECTA ANIMAIS EM SITUAÇÃO DE VULNERABILIDADE A FUTUROS TUTORES, FACILITANDO O PROCESSO DE RESGATE, APOIO E ADOÇÃO DE FORMA RÁPIDA, PROTETORES INDEPENDENTES E A COMUNIDADE.

---

## 3.2. Modelo Padrão da Aplicação

A interface entrega uma navegação guiada por Call-to-Actions (botões de ação) bem definidos:
* **"Denunciar Abandono":** Direciona o usuário para um formulário dinâmico com captura de coordenadas geográficas.
* **"Quero Adotar":** Filtra cards ricos em imagens para exploração intuitiva.
* **"Ajudar/Doar":** Ações rápidas nos cards de animais que permitem à comunidade registrar ofertas emergenciais de água e comida.

---

## 3.3. Identidade Visual

As cores, tipografia e ícones foram selecionados para inspirar afeto, saúde e prontidão, não cansando a visão do usuário durante as buscas.

### Paleta de Cores

<img width="1132" height="558" alt="PALETA DE CORES" src="https://github.com/user-attachments/assets/4694fea0-187c-4fb8-8a77-525c7a731adb" />

* **Laranja ou Amarelo Mostarda:** Para chamar atenção, representar calor humano, energia e urgência nos resgates.
* **Verde Claro/Menta:** Simbolizando esperança, saúde, renovação e bem-estar animal.
* **Branco e Cinza Claro:** Como cores de fundo para trazer leveza, clareza e não cansar a visão do usuário enquanto navega pelas fotos dos pets.

**Tabela de Estilos (CSS Variables):**

| ELEMENTO DA INTERFACE | HEX | DESCRIÇÃO DO USO |
| :--- | :---: | :--- |
| **Cor Secundária** | `#366261` | Destaques dos menus secundários e interações. |
| **Cor Secundária (Clara)**| `#E7EDEE` | Fundos de menus secundários, painéis e modais. |
| **Fundo (Base)** | `#FFFFFF` | Textos e fundos limpos (cards de pets). |
| **Texto Padrão** | `#000000` | Textos gerais para alto contraste e acessibilidade. |
| **Botões (Escuro)**| `#000000` | Cores dos botões de ações primárias. |
| **Botões (Alerta)**| `#E47862` | Cores dos botões de resgate/urgência. |

### Tipografia

| USO / HIERARQUIA | FONTE | TAMANHO E PESO |
| :--- | :--- | :--- |
| **Títulos (Headings)** | Poetsen One | Negrito (Bold) - 20px |
| **Texto Principal** | Poetsen One | Seminegrito (Semi-bold) - 16px |
| **Texto Cards Secundários** | Alatsi Regular | Negrito (Bold) - 20px |
| **Texto Cards Terciários** | Alatsi Regular | Seminegrito (Semi-bold) - 20px |

<img width="366" height="331" alt="image" src="https://github.com/user-attachments/assets/1e434aa4-7c59-449f-8e1e-9015a932f8d9" />
<img width="491" height="509" alt="fonte Alatsi Regular" src="https://github.com/user-attachments/assets/b2136ebe-a1e6-4a9a-a507-3d2254899b9c" />

### Iconografia

O sistema utiliza um pack de ícones enxuto e reconhecível para acelerar a leitura de menus, ações no mapa e interações de favoritar animais.

<img width="460" height="198" alt="ICONOGRAFIA" src="https://github.com/user-attachments/assets/9aea8335-bb61-4f61-9f09-06166f1c468c" />

### Logotipo

A identidade central da marca simboliza a conexão profunda entre cães, gatos e seus tutores ou protetores.

<div align="center">
  <img width="45%" alt="logolove" src="https://github.com/user-attachments/assets/4a3d676d-5e6b-4740-9be7-cece11a48b2c" />
  <img width="45%" alt="logo cao e gato" src="https://github.com/user-attachments/assets/7f85e581-279a-4ab3-b84c-e23d61dcca9e" />
</div>

---

## 3.4. Aspectos de Responsividade e Interação Técnico-Visual

O Front-end do SOSDOG aplica o conceito **Mobile-First** para assegurar que protetores nas ruas possam usar o sistema rapidamente. 

* **Grids e Layout Fluido:** Organização flexível onde os cards de cachorros no "Feed" se reajustam entre 1, 2 ou múltiplas colunas dependendo do dispositivo.
* **Integração e Visão Espacial (Mapa):** Os elementos de tela adaptam a visualização dos mapas Leaflet para funcionarem fluidamente em telas pequenas e com comandos via touch.
* **Componentização e Microinterações:** Formulários de "Login", edição de dados e ações de Favoritos/Comentários ocorrem por sobreposição (modais) ou requisições AJAX, de modo que o usuário resolva o que precisa sem mudar de página bruscamente.

> **Links Úteis**:
>
> - [CSS Website Layout (W3Schools)](https://www.w3schools.com/css/css_website_layout.asp)
> - [Website Page Layouts](http://www.cellbiol.com/bioinformatics_web_development/chapter-3-your-first-web-page-learning-html-and-css/website-page-layouts/)
> - [Perfect Liquid Layout](https://matthewjamestaylor.com/perfect-liquid-layouts)
> - [How and Why Icons Improve Your Web Design](https://usabilla.com/blog/how-and-why-icons-improve-you-web-design/)
