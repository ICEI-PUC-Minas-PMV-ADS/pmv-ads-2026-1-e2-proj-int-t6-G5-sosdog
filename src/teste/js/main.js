
const AnimalService = {
    // Dados estáticos iniciais
    localAnimals: [
        { id: "A001", type: "dog", img: "../img/cac.rua.jpg", tags: ["Macho", "Pelo Médio", "Pequeno"], obs: "Cachorro muito dócil precisa de um lar" },
        { id: "A002", type: "cat", img: "../img/gatorua.jpg", tags: ["Macho", "Cinza", "Adulto"], obs: "Gatinho perdido perto da padaria." },
        { id: "A003", type: "dog", img: "../img/amora.jpg", tags: ["Fêmea", "Curto", "Filhote"], obs: "Encontrada na praça principal." },
        { id: "A004", type: "cat", img: "../img/gatocinza.jpg", tags: ["Fêmea", "Rajado", "Adulto"], obs: "Gata super mansa procurando os donos." }
    ],

    // ESSA E APENAS UMA API SIMULADA PARA GERAR IMAGENS ALEATÓRIAS DE CACHORROS
    async fetchDogImages(count) {
        try {
            const response = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`);
            const data = await response.json();
            return data.status === 'success' ? data.message : [];
        } catch (error) {
            console.error("Erro na API Dog.ceo:", error);
            return [];
        }
    }
};

class AppManager {
    constructor() {
        this.map = null;
        this.init();
    }

    async init() {
        this.renderAnimalFeed();
        this.setupNavigation();
        this.initSwipers();
        
        // Atualiza imagens da API após a renderização inicial
        await this.refreshGalleryImages();
    }

    // Gerencia o Feed de Animais
    renderAnimalFeed() {
        const container = document.querySelector('#animal-feed-container');
        if (!container) return;

        container.innerHTML = AnimalService.localAnimals.map(animal => `
            <div class="swiper-slide">
                <div class="feed-card">
                    <i class="fas fa-${animal.type} card-icon" style="font-size: 20px;"></i>
                    <img src="${animal.img}" alt="Animal" class="feed-img">
                    <h3>${animal.id}</h3>
                    <div class="tags">
                        ${animal.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="obs-box"><strong>Observações:</strong><br>${animal.obs}</div>
                    <div class="feed-actions">
                        <i class="fas fa-share"></i><i class="far fa-heart"></i><i class="far fa-bookmark"></i>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Gerencia o Mapa e Troca de Telas
    setupNavigation() {
        const nodes = {
            feed: document.getElementById('container-feed-completo'),
            mapa: document.getElementById('container-mapa'),
            header: document.querySelector('.main-content > .feed-header'),
            btnMapa: document.getElementById('btn-mapa'),
            btnFeed: document.getElementById('btn-feed')
        };

        const toggleView = (showMap) => {
            nodes.feed.style.display = showMap ? 'none' : 'flex';
            nodes.header.style.display = showMap ? 'none' : 'flex';
            nodes.mapa.style.display = showMap ? 'flex' : 'none';

            if (showMap) this.initLeaflet();
        };

        nodes.btnMapa?.addEventListener('click', (e) => { e.preventDefault(); toggleView(true); });
        nodes.btnFeed?.addEventListener('click', (e) => { e.preventDefault(); toggleView(false); });
    }

    // PARTE DO MAPA QUE INICIA O LEAFLET E GARANTE QUE ELE SEJA RENDERIZADO CORRETAMENTE AO SER MOSTRADO
    initLeaflet() {
        if (this.map) {
            setTimeout(() => this.map.invalidateSize(), 100);
            return;
        }

        this.map = L.map('map').setView([-15.7801, -47.9292], 4);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap'
        }).addTo(this.map);
    }

    // Inicializa todos os Swipers da página
    initSwipers() {
        // Swiper principal de animais
        new Swiper('.feed-swiper', {
            slidesPerView: 1.2,
            spaceBetween: 15,
            loop: true,
            navigation: { nextEl: '.feed-next', prevEl: '.feed-prev' },
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                768: { slidesPerView: 2.2 },
                1024: { slidesPerView: 3 }
            }
        });

        // Swiper de animais perdidos
        new Swiper('.swiper-lost', {
            slidesPerView: 1.2,
            spaceBetween: 20,
            navigation: { nextEl: '.lost-next', prevEl: '.lost-prev' },
            breakpoints: {
                768: { slidesPerView: 2.2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // Busca imagens externas e aplica aos cards existentes
    // ESSA E A PARTE DE BUSCAR IMAGENS DA API E SUBSTITUIR AS IMAGENS ESTÁTICAS INICIAIS
    async refreshGalleryImages() {
        const imagesToReplace = document.querySelectorAll('.case-card img, .feed-card img, .lost-card img, .profile-img-wrap img');
        if (imagesToReplace.length === 0) return;

        const urls = await AnimalService.fetchDogImages(imagesToReplace.length);
        imagesToReplace.forEach((img, i) => {
            if (urls[i]) img.src = urls[i];
        });
    }
}

// ==========================================
// START
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    window.app = new AppManager();
});