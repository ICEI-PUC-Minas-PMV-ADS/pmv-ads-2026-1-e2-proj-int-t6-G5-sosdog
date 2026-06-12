// =========================================================================
// 1. CENÁRIO A: Para a Sidebar / Lista de Cards (Múltiplos Corações)
// =========================================================================
async function alternarFavorito(event, idOcorrencia) {
    if (event) event.stopPropagation(); // Impede que o clique no coração abra o card/detalhes indesejadamente

    const icone = document.getElementById(`coracao-${idOcorrencia}`);
    const card = document.getElementById(`card-ocorrencia-${idOcorrencia}`);

    if (!icone) return;

    try {
        const response = await fetch('/Favoritos/Alternar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `idOcorrencia=${idOcorrencia}`
        });

        // Se o servidor responder 401 (Não Autorizado) ou redirecionar para a tela de login
        if (response.status === 401 || response.redirected) {
            alert("Você precisa estar logado para favoritar um animal.");
            return;
        }

        if (response.ok) {
            const resultado = await response.json();

            // Altera a classe e os atributos conforme a resposta do servidor
            if (resultado.favoritado) {
                icone.classList.add('favoritado');
                if (card) card.setAttribute('data-favoritado', 'true');
            } else {
                icone.classList.remove('favoritado');
                if (card) card.setAttribute('data-favoritado', 'false');
            }

            // Opcional: Se seu script de filtros do mapa tiver uma função global para re-avaliar o estado visual, chame-a aqui:
            // Exemplo: if(typeof atualizarFiltrosVisuais === "function") atualizarFiltrosVisuais();

        } else {
            console.error("Erro ao processar resposta do servidor no Controller de Favoritos.");
        }
    } catch (error) {
        console.error("Erro na requisição de favoritos:", error);
        alert("Ocorreu um erro ao processar a sua solicitação.");
    }
}

// =========================================================================
// 2. CENÁRIO B: Para a página de Detalhes (Botão único de Favoritar)
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const btnFavoritoDetalhe = document.getElementById('btn-favorito');

    if (btnFavoritoDetalhe) {
        btnFavoritoDetalhe.addEventListener('click', async function () {
            const button = this;
            const idOcorrencia = button.getAttribute('data-id');
            const icone = document.getElementById('icone-favorito');
            const texto = document.getElementById('texto-favorito');

            try {
                const response = await fetch('/Favoritos/Alternar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `idOcorrencia=${idOcorrencia}`
                });

                if (response.status === 401 || response.redirected) {
                    alert("Você precisa estar logado para favoritar.");
                    return;
                }

                if (response.ok) {
                    const data = await response.json();

                    if (data.favoritado) {
                        button.classList.remove('btn-outline-danger');
                        button.classList.add('btn-danger');
                        if (icone) {
                            icone.classList.remove('fa-heart-o', 'bi-heart');
                            icone.classList.add('fa-heart', 'bi-heart-fill');
                        }
                        if (texto) texto.textContent = 'Remover dos Favoritos';
                    } else {
                        button.classList.remove('btn-danger');
                        button.classList.add('btn-outline-danger');
                        if (icone) {
                            icone.classList.remove('fa-heart', 'bi-heart-fill');
                            icone.classList.add('fa-heart-o', 'bi-heart');
                        }
                        if (texto) texto.textContent = 'Favoritar Ocorrência';
                    }

                    // Sincroniza o ícone da Sidebar caso ela esteja visível atrás do modal/detalhes
                    const iconeSidebar = document.getElementById(`coracao-${idOcorrencia}`);
                    const cardSidebar = document.getElementById(`card-ocorrencia-${idOcorrencia}`);
                    if (iconeSidebar) {
                        if (data.favoritado) {
                            iconeSidebar.classList.add('favoritado');
                            if (cardSidebar) cardSidebar.setAttribute('data-favoritado', 'true');
                        } else {
                            iconeSidebar.classList.remove('favoritado');
                            if (cardSidebar) cardSidebar.setAttribute('data-favoritado', 'false');
                        }
                    }
                }
            } catch (error) {
                console.error('Erro ao processar favorito na tela de detalhes:', error);
            }
        });
    }
});