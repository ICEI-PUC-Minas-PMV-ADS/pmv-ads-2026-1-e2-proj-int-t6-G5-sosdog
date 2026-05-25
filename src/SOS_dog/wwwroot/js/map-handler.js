class SosDogMap {
    constructor() {
        this.map = null;
        this.userLocation = [-15.7801, -47.9292]; // Default: Brasília
        // Filtro: array de marcadores e filtros ativos
        this.markers = [];
        this.activeFilters = {
            tipo: '',
            estadoSaude: '',
            porte: '',
            sexo: '',
            faixaEtaria: ''
        };
        this.init();
    }

    init() {
        // 1. Tentar obter localização do usuário
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    this.userLocation = [pos.coords.latitude, pos.coords.longitude];
                    this.renderMap(13);
                },
                () => this.renderMap(4) // Fallback se negar
            );
        } else {
            this.renderMap(4);
        }
    }

    renderMap(zoom) {
        this.map = L.map('map').setView(this.userLocation, zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap'
        }).addTo(this.map);

        this.loadMarkersFromList();

        // Correção de renderização
        setTimeout(() => this.map.invalidateSize(), 300);
    }

    loadMarkersFromList() {
        // Pega todos os cards da lista lateral que possuem coordenadas
        const cards = document.querySelectorAll('.case-card');

        // Limpa array antes de recarregar
        this.markers = [];

        cards.forEach(card => {

            const lat = parseFloat(card.dataset.lat.replace(',', '.'));
            const lng = parseFloat(card.dataset.lng.replace(',', '.'));
            const id = card.dataset.id;
            const codigo = card.dataset.codigo;

            if (!isNaN(lat) && !isNaN(lng)) {
                // Cria o marcador
                const marker = L.marker([lat, lng]).addTo(this.map);

                // 1. Tooltip flutuante com o código do cachorro
                marker.bindTooltip(`Cão: ${codigo}`);

                // 2. Lógica de clique no PIN
                marker.on('click', () => {
                    this.map.setView([lat, lng], 15); // Dá zoom no local
                    focusCard(id); // Chama a função que você já tem para abrir o card
                });

                // 3. Guarda referência do marcador + dados do card para o filtro
                this.markers.push({
                    marker,
                    card,
                    data: {
                        tipo: (card.dataset.tipo || '').toLowerCase(),
                        estadoSaude: (card.dataset.estadosaude || '').toLowerCase(),
                        porte: (card.dataset.porte || '').toLowerCase(),
                        sexo: (card.dataset.sexo || '').toLowerCase(),
                        faixaEtaria: (card.dataset.idade || '').toLowerCase()
                    }
                });
            }
        });
    }

    // ==========================================
    // MÉTODOS DE FILTRO
    // ==========================================

    aplicarFiltros() {
        let visiveis = 0;

        this.markers.forEach(({ marker, card, data }) => {
            const passa =
                (!this.activeFilters.tipo || data.tipo === this.activeFilters.tipo) &&
                (!this.activeFilters.estadoSaude || data.estadoSaude === this.activeFilters.estadoSaude) &&
                (!this.activeFilters.porte || data.porte === this.activeFilters.porte) &&
                (!this.activeFilters.sexo || data.sexo === this.activeFilters.sexo) &&
                (!this.activeFilters.faixaEtaria || data.faixaEtaria === this.activeFilters.faixaEtaria);

            if (passa) {
                card.style.display = '';
                if (!this.map.hasLayer(marker)) marker.addTo(this.map);
                visiveis++;
            } else {
                card.style.display = 'none';
                if (this.map.hasLayer(marker)) this.map.removeLayer(marker);
            }
        });

        // Atualiza contador de resultados
        const contador = document.getElementById('filtro-contador');
        if (contador) contador.textContent = `${visiveis} resultado${visiveis !== 1 ? 's' : ''}`;

        // Mensagem de nenhum resultado
        const semResultado = document.getElementById('sem-resultado-filtro');
        if (semResultado) semResultado.style.display = visiveis === 0 ? 'block' : 'none';
    }

    setFiltro(campo, valor) {
        this.activeFilters[campo] = valor.toLowerCase();
        this.aplicarFiltros();
    }

    limparFiltros() {
        this.activeFilters = { tipo: '', estadoSaude: '', porte: '', sexo: '', faixaEtaria: '' };
        document.querySelectorAll('.filtro-select').forEach(el => el.value = '');
        this.aplicarFiltros();
    }

    ativarModoCriacao() {
        const center = this.map.getCenter();

        // Se já existir um marcador, apenas move-o para o centro atual do ecrã
        if (this.creationMarker) {
            this.creationMarker.setLatLng(center);
            this.creationMarker.openPopup();
            return;
        }

        // Cria um ícone vermelho para se destacar dos restantes casos
        const createIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        // Adiciona o marcador com a propriedade "draggable: true"
        this.creationMarker = L.marker(center, {
            draggable: true,
            icon: createIcon
        }).addTo(this.map);

        // Define as coordenadas iniciais nos campos ocultos
        this.atualizarCamposCoordenadas(center.lat, center.lng);

        // Evento: Dispara SEMPRE que o utilizador acaba de arrastar o pin
        this.creationMarker.on('dragend', (e) => {
            const position = e.target.getLatLng();
            this.atualizarCamposCoordenadas(position.lat, position.lng);
            this.creationMarker.openPopup(); // Reabre o balão
        });

        // Adiciona um balão com o botão que vai abrir a tua Modal
        this.creationMarker.bindPopup(`
            <div class="text-center p-1">
                <b style="color: var(--primary-orange);">Localização Escolhida!</b><br>
                <small class="text-muted">Arraste o pin para ajustar.</small><br>
                <button class="btn mt-2 w-100 text-white fw-bold" style="background-color: var(--primary-green); border-radius: 20px;" onclick="abrirModalCriacao()">
                    Preencher Ficha <i class="fa-solid fa-paw"></i>
                </button>
            </div>
        `).openPopup();

        setTimeout(() => {
            this.creationMarker.openPopup();
        }, 100);
    }

    async atualizarCamposCoordenadas(lat, lng) {
        const inputLat = document.getElementById('lat');
        const inputLng = document.getElementById('lng');
        const inputEndereco = document.getElementById('Endereco'); // ID padrão gerado pelo ASP.NET para asp-for="Endereco"

        // 1. Atualiza as coordenadas (formato C#)
        if (inputLat) inputLat.value = lat.toString().replace('.', ',');
        if (inputLng) inputLng.value = lng.toString().replace('.', ',');

        // 2. Feedback visual no campo de endereço enquanto busca
        if (inputEndereco) {
            inputEndereco.value = "Buscando endereço...";

            // 3. Chamada à API de Geocodificação Reversa
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
                const data = await response.json();

                if (data && data.display_name) {
                    // Formatamos para não ficar um texto gigante (ex: pegando rua, número e bairro)
                    const addr = data.address;
                    const rua = addr.road || addr.pedestrian || "";
                    const numero = addr.house_number ? `, ${addr.house_number}` : "";
                    const bairro = addr.suburb || addr.neighbourhood || "";

                    const enderecoFormatado = `${rua}${numero}${bairro ? ' - ' + bairro : ''}`;

                    // Se a API não retornar rua, usamos o display_name completo como fallback
                    inputEndereco.value = enderecoFormatado || data.display_name;
                }
            } catch (error) {
                console.error("Erro ao buscar endereço:", error);
                inputEndereco.value = ""; // Limpa se der erro para o usuário digitar manualmente
            }
        }
    }
}

// ==========================================
// FUNÇÕES GLOBAIS
// ==========================================

function abrirModalCriacao() {
    const modalEl = document.getElementById('modalOcorrencia');
    if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    }
}

// Função global para destacar o card ao clicar no mapa ou interagir com ele
function focusCard(id) {
    // Busca o card correspondente (pode ser da lista ou do carrossel/feed)
    const card = document.querySelector(`.case-card[data-id="${id}"], .animal-card[data-id="${id}"]`);
    const painel = document.getElementById('painel-detalhes');

    if (card && painel) {
        // Sincroniza o ID global para o sistema de comentários e ações
        ocorrenciaSelecionadaId = id;

        // 1. Destaque Visual (apenas para cards que estão na lista lateral esquerda)
        document.querySelectorAll('.case-card').forEach(c => c.classList.remove('border', 'border-success', 'bg-light', 'active-card'));
        const cardLista = document.querySelector(`.case-card[data-id="${id}"]`);
        if (cardLista) {
            cardLista.classList.add('border', 'border-success', 'bg-light', 'active-card');
            cardLista.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // 2. Exibir Painel Lateral
        painel.style.display = 'flex';

        // 3. Preencher Dados de Texto
        document.getElementById('sidebar-titulo-id').innerText = `Cão: ${card.dataset.codigo || '---'}`;
        document.getElementById('sidebar-sexo').innerText = card.dataset.sexo || '---';
        document.getElementById('sidebar-cor').innerText = card.dataset.cor || '---';
        document.getElementById('sidebar-porte').innerText = card.dataset.porte || '---';
        document.getElementById('sidebar-idade').innerText = card.dataset.idade || '---';

        const elSociabilidade = document.getElementById('sidebar-estadosaude');
        if (elSociabilidade) elSociabilidade.innerText = card.dataset.estadosaude || '---';

        // 4. Lógica de Imagem
        const imgElement = document.getElementById('sidebar-foto');
        const avisoSemFoto = document.querySelector('.aviso-sem-foto');

        // Tenta pegar do atributo data-foto ou da tag img interna do card
        const fotoUrl = card.dataset.foto || (card.querySelector('img') ? card.querySelector('img').src : '');

        if (imgElement && avisoSemFoto) {
            if (fotoUrl && fotoUrl.trim() !== '' && !fotoUrl.includes('undefined')) {
                imgElement.src = fotoUrl;
                imgElement.style.display = 'block';
                avisoSemFoto.style.display = 'none';
            } else {
                imgElement.src = "";
                imgElement.style.display = 'none';
                avisoSemFoto.style.display = 'flex';
            }
        }

        // 5. Ações e Histórico de Registros
        document.getElementById('sidebar-user-id').innerText = card.dataset.ultimoUser || card.getAttribute('data-ultimo-user') || 'Nenhum registro';
        document.getElementById('sidebar-last-agua').innerText = card.dataset.agua || card.getAttribute('data-agua') || '--:--';
        document.getElementById('sidebar-last-comida').innerText = card.dataset.comida || card.getAttribute('data-comida') || '--:--';

        // 6. LÓGICA UNIFICADA DE EXCLUSÃO (BOTÃO DELETAR)
        const btnDeletar = document.getElementById('btn-deletar-ocorrencia');
        const containerAcoes = document.getElementById('header-acoes-ocorrencia') || document.querySelector('.dashboard-container');

        if (btnDeletar && containerAcoes) {
            // Mapeamento resiliente para aceitar as variações que você usou no HTML
            const usuarioLogadoId = containerAcoes.dataset.usuarioLogado || containerAcoes.dataset.userId;
            const idCriadorOcorrencia = card.dataset.idUsuario || card.dataset.usuario;

            // Se o usuário logado for o criador, exibe o botão da lixeira
            if (usuarioLogadoId && idCriadorOcorrencia && String(idCriadorOcorrencia) === String(usuarioLogadoId)) {
                btnDeletar.style.display = 'inline-block';
            } else {
                btnDeletar.style.display = 'none';
            }
        }

        // 7. Lógica do Formulário de Comentários
        const hiddenId = document.getElementById('comentario-id-ocorrencia');
        if (hiddenId) hiddenId.value = id;

        if (typeof window.carregarComentarios === 'function') {
            window.carregarComentarios(id);
        }

        // 8. Movimentação do Mapa (Ajuste Leaflet)
        if (window.sosDogMap && window.sosDogMap.map) {
            const latStr = card.dataset.lat ? card.dataset.lat.toString().replace(',', '.') : "";
            const lngStr = card.dataset.lng ? card.dataset.lng.toString().replace(',', '.') : "";
            const lat = parseFloat(latStr);
            const lng = parseFloat(lngStr);

            if (!isNaN(lat) && !isNaN(lng)) {
                window.sosDogMap.map.setView([lat, lng], 16);
            }
        }
    }
}

// ==========================================
// INICIALIZAÇÃO DO MAPA AO CARREGAR A PÁGINA
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    window.sosDogMap = new SosDogMap();
});