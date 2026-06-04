document.addEventListener("DOMContentLoaded", function () {
    // Captura os botões da navbar (vindos do _Layout)
    const btnFeed = document.getElementById("btn-feed");
    const btnMapa = document.getElementById("btn-mapa");
    const btnTutores = document.getElementById("btn-tutores");

    // Captura as seções da página (vindas do Index.cshtml)
    const mapSection = document.querySelector(".main-map-area");
    const feedSection = document.getElementById("section-feed");
    const tutoresSection = document.getElementById("section-tutores");

    // ==========================================
    // FUNÇÕES DE EXIBIÇÃO
    // ==========================================
    // Função para exibir a tela de Feed de Casos
    function ativarFeedView() {
        if (mapSection && feedSection && tutoresSection) {
            mapSection.classList.add("d-none");       // Esconde mapa
            tutoresSection.classList.add("d-none");   // Esconde tutores
            feedSection.classList.remove("d-none");   // Mostra feed

            btnFeed?.classList.add("active");
            btnMapa?.classList.remove("active");
            btnTutores?.classList.remove("active");
        }
    }

    function ativarMapaView() {
        if (mapSection && feedSection && tutoresSection) {
            feedSection.classList.add("d-none");      // Esconde feed
            tutoresSection.classList.add("d-none");   // Esconde tutores
            mapSection.classList.remove("d-none");    // Mostra mapa

            btnMapa?.classList.add("active");
            btnFeed?.classList.remove("active");
            btnTutores?.classList.remove("active");
        }
    }


    function ativarTutoresView() {
        if (mapSection && feedSection && tutoresSection) {
            mapSection.classList.add("d-none");       // Esconde mapa
            feedSection.classList.add("d-none");      // Esconde feed
            tutoresSection.classList.remove("d-none");// Mostra tutores

            btnTutores?.classList.add("active");
            btnMapa?.classList.remove("active");
            btnFeed?.classList.remove("active");
        }
    }

    // ==========================================
    // OUVINTES DE CLIQUE (EVENT LISTENERS)
    // ==========================================

    // Ouvinte de clique para o botão "Feed de Casos"
    if (btnFeed) {
        btnFeed.addEventListener("click", function (e) {
            // Se as seções existirem na página atual, alterna via JS sem recarregar a página
            if (mapSection && feedSection) {
                e.preventDefault();
                ativarFeedView();

                // Atualiza amigavelmente a URL no navegador sem recarregar tudo
                history.pushState(null, "", "/Home/Feed");
            }
        });
    }

    // Ouvinte de clique para o botão "Mapa dos Casos"
    if (btnMapa) {
        btnMapa.addEventListener("click", function (e) {
            if (mapSection && feedSection) {
                e.preventDefault();
                ativarMapaView();

                // Atualiza amigavelmente a URL no navegador para Index
                history.pushState(null, "", "/Home/Index");
            }
        });
    }

    if (btnTutores) {
        btnTutores.addEventListener("click", function (e) {
            if (mapSection && feedSection && tutoresSection) {
                e.preventDefault();
                ativarTutoresView();
                // Atualiza a URL para combinar com o seu link do Layout
                history.pushState(null, "", "/Tutores/Index");
            }
        });
    }

    // ==========================================
    // SUPORTE A RECARREGAMENTO E NAVEGAÇÃO DIRETA
    // ==========================================
    const currentPath = window.location.pathname.toLowerCase();

    if (currentPath.includes("/home/feed")) {
        ativarFeedView();
    } else if (currentPath.includes("/tutores")) {
        // Se acessar direto pela URL /Tutores ou /Tutores/Index
        ativarTutoresView();
    } else {
        // Por padrão, se estiver na raiz ou /Home/Index, garante que o mapa apareça
        // (Opcional, pois o HTML já vem com o mapa visível por padrão)
    }
});