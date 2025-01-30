// Losowanie i zmiana zdjęć
function initSlideshow(container) {
    const slides = container.querySelectorAll('.slide');
    let current = 0;

    // Pokazuj pierwsze zdjęcie
    slides[current].classList.add('active');

    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 10000);
}

// Inicjalizacja wszystkich slideshow
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.slideshow').forEach(initSlideshow);
});
// Lightbox dla galerii
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.classList.add('active');
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt;

            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }

            lightbox.appendChild(img);
        });
    });

    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
}

document.addEventListener('DOMContentLoaded', initLightbox);