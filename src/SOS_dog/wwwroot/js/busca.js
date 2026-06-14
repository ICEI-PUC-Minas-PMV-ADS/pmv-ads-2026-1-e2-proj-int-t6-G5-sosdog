/**
 * SOS Dog - Módulo de Busca Global Dinâmica
 * Responsável por filtrar os cards da sidebar e atualizar os contadores em tempo real.
 */

document.addEventListener("DOMContentLoaded", () => {
    const inputBusca = document.getElementById("input-busca-global");
    const btnBusca = document.getElementById("btn-busca-global");
    const cards = document.querySelectorAll(".case-card");
    const contadorSidebar = document.getElementById("filtro-contador-sidebar");

    // Inicializa o contador logo que a página carrega
    atualizarContadorSidebar();

    // Evento 1: Ao digitar no campo (Busca em Tempo Real)
    if (inputBusca) {
        inputBusca.addEventListener("keyup", () => {
            executarFiltragem();
        });
    }

    // Evento 2: Ao clicar no botão de seta
    if (btnBusca) {
        btnBusca.addEventListener("click", () => {
            executarFiltragem();
        });
    }

    /**
     * Realiza a filtragem dos cards com base no termo digitado
     */
    function executarFiltragem() { 
        if (!inputBusca || cards.length === 0) return;

        const termoBusca = inputBusca.value.toLowerCase().trim();

        cards.forEach(card => {
            // Buscando múltiplos critérios para deixar a busca do usuário mais inteligente
            const codigo = (card.getAttribute("data-codigo") || "").toLowerCase();
            const cor = (card.getAttribute("data-cor") || "").toLowerCase();
            const tipo = (card.getAttribute("data-tipo") || "").toLowerCase();
            const porte = (card.getAttribute("data-porte") || "").toLowerCase();
            const estadoSaude = (card.getAttribute("data-estadoSaude") || "").toLowerCase(); // ADICIONADO
            const endereco = (card.getAttribute("data-endereco") || "").toLowerCase(); // ADICIONADO

            // Se o termo estiver vazio ou bater com alguma propriedade do card, exibe.
            const atendeFiltro = !termoBusca ||
                codigo.includes(termoBusca) ||
                cor.includes(termoBusca) ||
                tipo.includes(termoBusca) ||
                porte.includes(termoBusca) ||
                estadoSaude.includes(termoBusca) || // ADICIONADO
                endereco.includes(termoBusca);      // ADICIONADO

            if (atendeFiltro) {
                card.style.setProperty("display", "flex", "important");
            } else {
                card.style.setProperty("display", "none", "important");
            }
        });

        // Atualiza a contagem dos cards visíveis após o filtro
        atualizarContadorSidebar();
    }

    /**
     * Atualiza dinamicamente o elemento de contagem da Sidebar
     */
    function atualizarContadorSidebar() {
        if (!contadorSidebar) return;

        // Conta quantos cards não estão com display: none
        const cardsVisiveis = Array.from(cards).filter(card => card.style.display !== "none").length;

        // Formatação textual amigável
        if (cardsVisiveis === 0) {
            contadorSidebar.textContent = "Nenhum caso";
        } else if (cardsVisiveis === 1) {
            contadorSidebar.textContent = "1 caso encontrado";
        } else {
            contadorSidebar.textContent = `${cardsVisiveis} casos encontrados`;
        }
    }
});