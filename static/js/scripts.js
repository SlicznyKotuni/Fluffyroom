document.addEventListener('DOMContentLoaded', function() {
    // ===== SLIDESHOW SECTION =====
    const slideshows = document.querySelectorAll('.slideshow');
    
    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slide');
        let currentSlide = 0;
        
        const getRandomEffect = () => {
            const effects = [
                {
                    transform: 'scale(1.05) translateX(-48%)',
                    filter: 'brightness(1.05)'
                },
                {
                    transform: 'scale(1.05) translateX(-48%) rotateY(10deg)',
                    filter: 'brightness(1.1)'
                },
                {
                    transform: 'scale(1.02) translateX(-49%) rotate(2deg)',
                    filter: 'brightness(1.05)'
                },
                {
                    transform: 'scale(1.05) translateX(-48%) perspective(500px) rotateX(5deg)',
                    filter: 'contrast(1.1)'
                },
                {
                    transform: 'scale(1.08) translateX(-46%)',
                    filter: 'saturate(1.2)'
                }
            ];
            return effects[Math.floor(Math.random() * effects.length)];
        };

        const getRandomSlide = (excludeIndex) => {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * slides.length);
            } while (newIndex === excludeIndex);
            return newIndex;
        };

        if (slides.length > 0) {
            currentSlide = getRandomSlide(-1);
            slides[currentSlide].classList.add('active');
        }

        slides.forEach(slide => {
            slide.addEventListener('mouseenter', () => {
                if (slide.classList.contains('active')) {
                    const effect = getRandomEffect();
                    Object.assign(slide.style, effect);
                }
            });

            slide.addEventListener('mouseleave', () => {
                if (slide.classList.contains('active')) {
                    slide.style.transform = 'translateX(-50%)';
                    slide.style.filter = 'none';
                }
            });
        });

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            slides[currentSlide].style.transform = 'translateX(-50%)';
            slides[currentSlide].style.filter = 'none';
            
            currentSlide = getRandomSlide(currentSlide);
            slides[currentSlide].classList.add('active');
        }, 5000);
    });

function initPortraitSlideshow() {
    const slides = document.querySelectorAll('.portrait-slide');
    if (slides.length === 0) return;

    // Pokaż pierwsze zdjęcie na start
    let currentSlide = 0;
    slides[0].classList.add('active');

    // Funkcja do losowego wyboru następnego zdjęcia
    const getNextSlide = (current) => {
        let next;
        do {
            next = Math.floor(Math.random() * slides.length);
        } while (next === current && slides.length > 1);
        return next;
    };

    // Zmiana zdjęć z efektem crossfade
    setInterval(() => {
        const nextSlide = getNextSlide(currentSlide);
        
        // Wygaszanie aktualnego zdjęcia
        slides[currentSlide].classList.remove('active');
        
        // Pokazywanie następnego
        slides[nextSlide].classList.add('active');
        
        currentSlide = nextSlide;
    }, 4000); // Zmiana co 4 sekundy
}

// Dodaj wywołanie funkcji do istniejącego event listenera DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... (istniejący kod) ...
    

    
    initPortraitSlideshow();
});
    // ===== LIGHTGALLERY SECTION =====
    const initializeGallery = (gallery) => {
        if (typeof lightGallery === 'undefined') return;

        // Zniszcz istniejącą instancję, jeśli istnieje
        if (gallery.lgInstance) {
            gallery.lgInstance.destroy(true);
        }

        // Stwórz nową instancję
        const instance = lightGallery(gallery, {
            selector: '.gallery-item',
            plugins: [lgZoom, lgThumbnail],
            speed: 500,
            download: false,
            thumbnail: true,
            animateThumb: true,
            zoomFromOrigin: true,
            allowMediaOverlap: true,
            toggleThumb: true,
            closeOnTap: true,
            hideBarsDelay: 3000,
            addClass: 'lg-custom-gallery',
            counter: false,
            mousewheel: true,
            // Dodaj dodatkowe opcje, jeśli potrzebujesz
        });

        // Zapisz instancję w elemencie galerii
        gallery.lgInstance = instance;

        // Dodaj listener na zamknięcie
        gallery.addEventListener('lgAfterClose', () => {
            if (gallery.lgInstance) {
                gallery.lgInstance.destroy(true);
                gallery.lgInstance = null; // Upewnij się, że instancja jest zniszczona
            }
        });
    };

    // Inicjalizacja wszystkich galerii
    const galleries = document.querySelectorAll('.gallery:not(.slideshow)');
    galleries.forEach(gallery => initializeGallery(gallery));

    // Cleanup przy zamknięciu strony
    window.addEventListener('beforeunload', () => {
        galleries.forEach(gallery => {
            if (gallery.lgInstance) {
                gallery.lgInstance.destroy(true);
            }
        });
    });
});