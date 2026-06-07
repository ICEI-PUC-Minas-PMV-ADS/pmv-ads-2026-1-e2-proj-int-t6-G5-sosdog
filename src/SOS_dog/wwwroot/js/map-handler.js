class SosDogMap {
    constructor() {
        this.map = null;
        this.userLocation = [-15.7801, -47.9292]; 
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
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    this.userLocation = [pos.coords.latitude, pos.coords.longitude];
                    this.renderMap(13);
                },
                () => this.renderMap(4) 
            );
        } else {
            this.renderMap(4);
        }
    }

    renderMap(zoom) {
        this.map = L.map('map', { zoomControl: false }).setView(this.userLocation, zoom);
        L.control.zoom({ position: 'topright' }).addTo(this.map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap'
        }).addTo(this.map);

        this.loadMarkersFromList();

        setTimeout(() => this.map.invalidateSize(), 300);
    }

    loadMarkersFromList() {
        const cards = document.querySelectorAll('.case-card');
        this.markers = [];

        cards.forEach(card => {
            const lat = parseFloat(card.dataset.lat.replace(',', '.'));
            const lng = parseFloat(card.dataset.lng.replace(',', '.'));
            const id = card.dataset.id;
            const codigo = card.dataset.codigo;

            if (!isNaN(lat) && !isNaN(lng)) {
                const marker = L.marker([lat, lng]).addTo(this.map);
                marker.bindTooltip(`Cão: ${codigo}`);

                marker.on('click', () => {
                    this.map.setView([lat, lng], 15); 
                    focusCard(id); 
                });

                this.markers.push({
                    marker,
                    card,
                    data: {
                        codigo: (card.dataset.codigo || '').toLowerCase(),
                        cor: (card.dataset.cor || '').toLowerCase(),
                        endereco: (card.dataset.endereco || '').toLowerCase(),
                        cuidador: (card.dataset.ultimoUser || card.getAttribute('data-ultimo-user') || '').toLowerCase(),
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

    aplicarFiltros() {
        let visiveis = 0;
        
        const inputBusca = document.getElementById('input-busca-global');
        const termoBusca = inputBusca ? inputBusca.value.toLowerCase().trim() : "";
        const filtroFavoritosAtivo = window.filtroFavoritosAtivo || false;

        const posicoesVisiveis = [];

        this.markers.forEach(({ marker, card, data }) => {
            const passaDropdown =
                (!this.activeFilters.tipo || data.tipo === this.activeFilters.tipo) &&
                (!this.activeFilters.estadoSaude || data.estadoSaude === this.activeFilters.estadoSaude) &&
                (!this.activeFilters.porte || data.porte === this.activeFilters.porte) && 
                (!this.activeFilters.sexo || data.sexo === this.activeFilters.sexo) &&
                (!this.activeFilters.faixaEtaria || data.faixaEtaria === this.activeFilters.faixaEtaria);

            const passaBusca = !termoBusca || 
                               data.codigo.includes(termoBusca) || 
                               data.cor.includes(termoBusca) ||
                               data.tipo.includes(termoBusca) ||
                               data.estadoSaude.includes(termoBusca) ||
                               data.endereco.includes(termoBusca) ||
                               data.cuidador.includes(termoBusca); 
                               
            const iconeCoracao = card.querySelector('.favoritar-btn');
            const ehFavorito = iconeCoracao ? iconeCoracao.classList.contains('favoritado') : false;
            const passaFavorito = !filtroFavoritosAtivo || ehFavorito;

            if (passaDropdown && passaBusca && passaFavorito) {
                card.style.display = 'flex';
                if (!this.map.hasLayer(marker)) marker.addTo(this.map); 
                visiveis++;

                posicoesVisiveis.push(marker.getLatLng());
            } else {
                card.style.display = 'none';
                if (this.map.hasLayer(marker)) marker.remove(); 
            }
        });

        const contador = document.getElementById('filtro-contador');
        if (contador) contador.textContent = `${visiveis} resultado${visiveis !== 1 ? 's' : ''}`;
        
        const semResultado = document.getElementById('sem-resultado-filtro');
        if (semResultado) semResultado.style.display = visiveis === 0 ? 'block' : 'none';

        if (posicoesVisiveis.length > 0) {
            const bounds = L.latLngBounds(posicoesVisiveis);
            this.map.flyToBounds(bounds, {
                padding: [50, 50], 
                maxZoom: 15,       
                duration: 0.5      
            });
        }
    }

    setFiltro(campo, valor) {
        this.activeFilters[campo] = valor.toLowerCase();
        this.aplicarFiltros();
    }

    limparFiltros() {
        this.activeFilters = { tipo: '', estadoSaude: '', porte: '', sexo: '', faixaEtaria: '' };
        document.querySelectorAll('.filtro-select').forEach(el => el.value = '');
        
        const inputBusca = document.getElementById('input-busca-global');
        if(inputBusca) inputBusca.value = '';
        if(typeof window.filtroFavoritosAtivo !== 'undefined') window.filtroFavoritosAtivo = false;
        const btnFavoritos = document.getElementById('btn-filtro-favoritos');
        if(btnFavoritos) btnFavoritos.classList.remove('ativo');

        this.aplicarFiltros();
    }

    ativarModoCriacao() {
        const center = this.map.getCenter();

        if (this.creationMarker) {
            this.creationMarker.setLatLng(center);
            this.creationMarker.openPopup();
            return;
        }

        const createIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        this.creationMarker = L.marker(center, {
            draggable: true,
            icon: createIcon
        }).addTo(this.map);

        this.atualizarCamposCoordenadas(center.lat, center.lng);

        this.creationMarker.on('dragend', (e) => {
            const position = e.target.getLatLng();
            this.atualizarCamposCoordenadas(position.lat, position.lng);
            this.creationMarker.openPopup(); 
        });

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
        const inputEndereco = document.getElementById('Endereco'); 

        if (inputLat) inputLat.value = lat.toString().replace('.', ',');
        if (inputLng) inputLng.value = lng.toString().replace('.', ',');

        if (inputEndereco) {
            inputEndereco.value = "A procurar endereço...";

            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
                const data = await response.json();

                if (data && data.display_name) {
                    const addr = data.address;
                    const rua = addr.road || addr.pedestrian || "";
                    const numero = addr.house_number ? `, ${addr.house_number}` : "";
                    const bairro = addr.suburb || addr.neighbourhood || "";

                    const enderecoFormatado = `${rua}${numero}${bairro ? ' - ' + bairro : ''}`;

                    inputEndereco.value = enderecoFormatado || data.display_name;
                }
            } catch (error) {
                console.error("Erro ao procurar endereço:", error);
                inputEndereco.value = ""; 
            }
        }
    }
}

function abrirModalCriacao() {
    const modalEl = document.getElementById('modalOcorrencia');
    if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    }
}

function focusCard(id) {
    const card = document.querySelector(`.case-card[data-id="${id}"], .animal-card[data-id="${id}"]`);
    const painel = document.getElementById('painel-detalhes');

    if (card && painel) {
        ocorrenciaSelecionadaId = id;

        document.querySelectorAll('.case-card').forEach(c => c.classList.remove('border', 'border-success', 'bg-light', 'active-card'));
        const cardLista = document.querySelector(`.case-card[data-id="${id}"]`);
        if (cardLista) {
            cardLista.classList.add('border', 'border-success', 'bg-light', 'active-card');
            cardLista.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        painel.style.display = 'flex';

        document.getElementById('sidebar-titulo-id').innerText = `Cão: ${card.dataset.codigo || '---'}`;
        document.getElementById('sidebar-sexo').innerText = card.dataset.sexo || '---';
        document.getElementById('sidebar-cor').innerText = card.dataset.cor || '---';
        document.getElementById('sidebar-porte').innerText = card.dataset.porte || '---';
        document.getElementById('sidebar-idade').innerText = card.dataset.idade || '---';

        const elSociabilidade = document.getElementById('sidebar-estadosaude');
        if (elSociabilidade) elSociabilidade.innerText = card.dataset.estadosaude || '---';

        const imgElement = document.getElementById('sidebar-foto');
        const avisoSemFoto = document.querySelector('.aviso-sem-foto');
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

        document.getElementById('sidebar-user-id').innerText = card.dataset.ultimoUser || card.getAttribute('data-ultimo-user') || 'Nenhum registro';
        
        // A MELHORIA DELES AQUI!
        if (typeof formatarDataAcao === 'function') {
            document.getElementById('sidebar-last-agua').innerText = formatarDataAcao(card.dataset.agua) || '--:--';
            document.getElementById('sidebar-last-comida').innerText = formatarDataAcao(card.dataset.comida) || '--:--';
        } else {
            document.getElementById('sidebar-last-agua').innerText = card.dataset.agua || '--:--';
            document.getElementById('sidebar-last-comida').innerText = card.dataset.comida || '--:--';
        }

        const btnDeletar = document.getElementById('btn-deletar-ocorrencia');
        const containerAcoes = document.getElementById('header-acoes-ocorrencia') || document.querySelector('.dashboard-container');

        if (btnDeletar && containerAcoes) {
            const usuarioLogadoId = containerAcoes.dataset.usuarioLogado || containerAcoes.dataset.userId;
            const idCriadorOcorrencia = card.dataset.idUsuario || card.dataset.usuario;

            if (usuarioLogadoId && idCriadorOcorrencia && String(idCriadorOcorrencia) === String(usuarioLogadoId)) {
                btnDeletar.style.display = 'inline-block';
            } else {
                btnDeletar.style.display = 'none';
            }
        }

        const hiddenId = document.getElementById('comentario-id-ocorrencia');
        if (hiddenId) hiddenId.value = id;

        if (typeof window.carregarComentarios === 'function') {
            window.carregarComentarios(id);
        }

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

document.addEventListener('DOMContentLoaded', () => {
    window.sosDogMap = new SosDogMap();
});