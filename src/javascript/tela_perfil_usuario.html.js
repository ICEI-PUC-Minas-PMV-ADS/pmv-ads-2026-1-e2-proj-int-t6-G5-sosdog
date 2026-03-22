document.addEventListener("DOMContentLoaded", function () {


    const swiperFeed = new Swiper('.swiper-feed', {
        slidesPerView: 2,
        spaceBetween: 20,
        grabCursor: true,
        loop: true,
        navigation: {
            nextEl: '.feed-next',
            prevEl: '.feed-prev',
        },
        breakpoints: {
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 }
        }
    });


    const swiperLost = new Swiper('.swiper-lost', {
        slidesPerView: 4,
        spaceBetween: 15,
        grabCursor: true,
        loop: true,
        navigation: {
            nextEl: '.lost-next',
            prevEl: '.lost-prev',
        },
        breakpoints: {
            320: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
        }
    });
});




function fazerLogoutGeral() {

    localStorage.removeItem('sos_logado');





    window.location.href = '../html/home.html';
}