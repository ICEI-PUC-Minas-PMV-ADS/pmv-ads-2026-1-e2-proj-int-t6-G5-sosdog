// Inicialização do Swiper — adicione no final do @section Scripts no Index.cshtml
// Requer: <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
// e:      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

document.addEventListener('DOMContentLoaded', function () {
    const dogSwiper = new Swiper('.dogSwiper', {
        centeredSlides: true,       // card ativo sempre ao centro
        slidesPerView: 'auto',      // mostra quantos couberem + peek lateral
        spaceBetween: 20,
        loop: true,                 // volta ao início ao passar do último
        speed: 420,
        grabCursor: true,

        navigation: {
            prevEl: '#dogSwiperPrev',
            nextEl: '#dogSwiperNext',
        },

        on: {
            // Ao mudar de slide, dispara o focusCard do map-handler.js
            slideChangeTransitionEnd: function () {
                const activeSlide = this.slides[this.activeIndex];
                const card = activeSlide?.querySelector('.animal-card');
                if (card && typeof focusCard === 'function') {
                    focusCard(card.dataset.id);
                }
            }
        }
    });

    // Expõe para o map-handler.js poder sincronizar o slide ao clicar no mapa
    window.dogSwiper = dogSwiper;
});