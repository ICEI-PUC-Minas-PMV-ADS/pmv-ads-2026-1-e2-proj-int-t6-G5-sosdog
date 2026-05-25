document.addEventListener("DOMContentLoaded", function () {
    // Captura os botões da navbar (vindos do _Layout)
    const btnFeed = document.getElementById("btn-feed");
    const btnMapa = document.getElementById("btn-mapa");

    // Captura as seções da página (vindas do Index.cshtml)
    const mapSection = document.querySelector(".main-map-area");
    const feedSection = document.getElementById("section-feed");

    // Função para exibir a tela de Feed de Casos
    function ativarFeedView() {
        if (mapSection && feedSection) {
            mapSection.classList.add("d-none");       // Esconde o mapa
            feedSection.classList.remove("d-none");   // Mostra o feed

            // (Opcional) Gerenciamento visual de abas ativas se desejar estilizar
            btnFeed?.classList.add("active");
            btnMapa?.classList.remove("active");
        }
    }

    // Função para exibir a tela de Mapa de Casos
    function ativarMapaView() {
        if (mapSection && feedSection) {
            mapSection.classList.remove("d-none");    // Mostra o mapa
            feedSection.classList.add("d-none");      // Esconde o feed

            btnMapa?.classList.add("active");
            btnFeed?.classList.remove("active");
        }
    }

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

    // SUPORTE A RECARREGAMENTO: Se o usuário acessar diretamente ou atualizar a página em "/Home/Feed"
    if (window.location.pathname.toLowerCase().includes("/home/feed")) {
        ativarFeedView();
    }
});