// ==========================================
// 1. MODELS (Dados e Regras de Negócio)
// ==========================================

class AnimalModel {
    constructor() {
        this.animals = [
            { id: "A001", type: "dog", img: "../img/cac.rua.jpg", tags: ["Macho", "Pelo Médio", "Pequeno"], obs: "Cachorro muito dócil precisa de um lar" },
            { id: "A002", type: "cat", img: "../img/gatorua.jpg", tags: ["Macho", "Cinza", "Adulto"], obs: "Gatinho perdido perto da padaria." },
            { id: "A003", type: "dog", img: "../img/amora.jpg", tags: ["Fêmea", "Curto", "Filhote"], obs: "Encontrada na praça principal." },
            { id: "A004", type: "cat", img: "../img/gatocinza.jpg", tags: ["Fêmea", "Rajado", "Adulto"], obs: "Gata super mansa procurando os donos." }
        ];
    }

    getAllAnimals() {
        return this.animals;
    }
}

class DogImageModel {
    /**
     * Busca uma quantidade específica de imagens aleatórias de cachorros.
     * @param {number} count - Quantidade de imagens desejadas.
     * @returns {Promise<string[]>} - Array com as URLs das imagens.
     */
    async fetchImages(count) {
        try {
            const response = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`);
            const data = await response.json();
            
            if (data.status === 'success') {
                return data.message;
            } else {
                throw new Error("Erro ao buscar imagens na API");
            }
        } catch (error) {
            console.error("DogImageModel Error:", error);
            return [];
        }
    }
}

class MapModel {
    constructor() {
        this.isMapVisible = false;
        this.mapInstance = null;
        this.initialCoords = [-15.7801, -47.9292];
        this.zoom = 4;
    }
}

// ==========================================
// 2. VIEWS (Interface e Manipulação do DOM)
// ==========================================

class AnimalView {
    constructor() {
        this.container = document.querySelector('#animal-feed-container');
    }

    renderCards(animals) {
        if (!this.container) return;

        this.container.innerHTML = animals.map(animal => `
            <div class="swiper-slide">
                <div class="feed-card">
                    <i class="fas fa-${animal.type} card-icon" style="font-size: 20px;"></i>
                    <img src="${animal.img}" alt="Animal" class="feed-img">
                    <h3>${animal.id}</h3>
                    <div class="tags">
                        ${animal.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="obs-box">
                        <strong>Observações:</strong><br>${animal.obs}
                    </div>
                    <div class="feed-actions">
                        <i class="fas fa-share"></i>
                        <i class="far fa-heart"></i>
                        <i class="far fa-bookmark"></i>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

class DogImageView {
    constructor() {
        this.petImages = document.querySelectorAll('.case-card img, .feed-card img, .lost-card img, .profile-img-wrap img');
    }

    getImagesCount() {
        return this.petImages.length;
    }

    updateImages(imageUrls) {
        this.petImages.forEach((imgElement, index) => {
            if (imageUrls[index]) {
                imgElement.src = imageUrls[index];
            }
        });
    }
}

class MapView {
    constructor() {
        this.nodes = {
            containerFeed: document.getElementById('container-feed-completo'),
            containerMapa: document.getElementById('container-mapa'),
            btnMapa: document.getElementById('btn-mapa'),
            btnFeed: document.getElementById('btn-feed'),
            mainFeedHeader: document.querySelector('.main-content > .feed-header'),
            btnHome: document.querySelector('.btn-home')
        };
    }

    renderInterface(showMap) {
        if (showMap) {
            if (this.nodes.mainFeedHeader) this.nodes.mainFeedHeader.style.display = 'none';
            if (this.nodes.containerFeed) this.nodes.containerFeed.style.display = 'none';
            if (this.nodes.containerMapa) this.nodes.containerMapa.style.display = 'flex';
        } else {
            if (this.nodes.mainFeedHeader) this.nodes.mainFeedHeader.style.display = 'flex';
            if (this.nodes.containerFeed) this.nodes.containerFeed.style.display = 'flex';
            if (this.nodes.containerMapa) this.nodes.containerMapa.style.display = 'none';
        }
    }

    initLeafletMap(coords, zoom) {
        const map = L.map('map').setView(coords, zoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap'
        }).addTo(map);
        return map;
    }
}

// ==========================================
// 3. CONTROLLERS (Lógica e Integração)
// ==========================================

class CarouselController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init() {
        const data = this.model.getAllAnimals();
        this.view.renderCards(data);
        this.setupSwiper();
    }

    setupSwiper() {
        this.swiper = new Swiper('.feed-swiper', {
            slidesPerView: 1.2,
            spaceBetween: 15,
            loop: true,
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: '.feed-next',
                prevEl: '.feed-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: { slidesPerView: 2.2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 25 }
            }
        });
    }
}

class DogImageController {
    constructor() {
        this.model = new DogImageModel();
        this.view = new DogImageView();
    }

    async init() {
        const count = this.view.getImagesCount();
        if (count > 0) {
            const imageUrls = await this.model.fetchImages(count);
            if (imageUrls.length > 0) {
                this.view.updateImages(imageUrls);
            }
        }
    }
}

class MapController {
    constructor() {
        this.model = new MapModel();
        this.view = new MapView();
    }

    handleNavigation(showMap) {
        this.model.isMapVisible = showMap;
        this.view.renderInterface(showMap);

        if (showMap) {
            if (!this.model.mapInstance) {
                this.model.mapInstance = this.view.initLeafletMap(
                    this.model.initialCoords, 
                    this.model.zoom
                );
            }
            setTimeout(() => {
                if (this.model.mapInstance) {
                    this.model.mapInstance.invalidateSize();
                }
            }, 100); 
        }
    }

    initApp() {
        if (this.view.nodes.btnMapa) {
            this.view.nodes.btnMapa.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(true);
            });
        }

        if (this.view.nodes.btnFeed) {
            this.view.nodes.btnFeed.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(false);
            });
        }
    }
}
// ==========================================
// 4. INICIALIZAÇÃO (Main App)
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Inicia o Mapa
    const app = new MapController();
    app.initApp();

    // 2. Inicia o Carrossel (Feed de Animais)
    const animalCarousel = new CarouselController(
        new AnimalModel(), 
        new AnimalView()
    );
    animalCarousel.init();

    // 3. Inicia o Swiper dos Animais Perdidos
    const swiperLost = new Swiper('.swiper-lost', {
        direction: 'horizontal',
        loop: false,
        spaceBetween: 20,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.lost-next',
            prevEl: '.lost-prev',
        },
        breakpoints: {
            320: { slidesPerView: 1.2, spaceBetween: 16 },
            768: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 }
        }
    });

    // 4. Inicia a API de Imagens POR ÚLTIMO
    // Garante que o fetch das imagens só ocorra depois que os Swipers e o HTML base já existem
    const dogImageController = new DogImageController();
    await dogImageController.init();
});