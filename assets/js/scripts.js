// Animacja przejścia zdjęć
function initSlideshow(containerId) {
    const container = document.getElementById(containerId);
    const slides = container.getElementsByClassName('slide');
    let current = 0;
    
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 10000);
}

// Inicjalizacja wszystkich slideshow
document.addEventListener('DOMContentLoaded', () => {
    initSlideshow('kotuni-slideshow');
    initSlideshow('fluffyroom-slideshow');
    
    // Lightbox dla przyszłych galerii
    lightGallery(document.querySelector('.gallery'), {
        selector: '.gallery-item',
        download: false
    });
});