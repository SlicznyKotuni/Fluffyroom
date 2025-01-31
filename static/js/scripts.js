document.addEventListener('DOMContentLoaded', function() {
    // Obsługa slideshow
    const slideshows = document.querySelectorAll('.slideshow');
    
    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slide');
        let currentSlide = 0;
        
        // Funkcja do losowego wyboru efektu
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

        // Funkcja do losowego wyboru zdjęcia
        const getRandomSlide = (excludeIndex) => {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * slides.length);
            } while (newIndex === excludeIndex);
            return newIndex;
        };

        // Pokazuj pierwsze losowe zdjęcie na start
        if (slides.length > 0) {
            currentSlide = getRandomSlide(-1);
            slides[currentSlide].classList.add('active');
        }

        // Dodaj obsługę efektów hover dla każdego slajdu
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

        // Zmiana slajdów co 5 sekund z losowym wyborem
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            slides[currentSlide].style.transform = 'translateX(-50%)';
            slides[currentSlide].style.filter = 'none';
            
            currentSlide = getRandomSlide(currentSlide);
            slides[currentSlide].classList.add('active');
        }, 5000);
    });

    // Inicjalizacja lightgallery dla galerii zdjęć
     const galleries = document.querySelectorAll('.gallery:not(.slideshow)');
    if (typeof lightGallery !== 'undefined') {
        galleries.forEach(gallery => {
            // Sprawdź, czy galeria nie została już zainicjalizowana
            if (!gallery.classList.contains('lg-initialized')) {
                lightGallery(gallery, {
                    selector: '.gallery-item',
                    plugins: [lgZoom, lgThumbnail],
                    speed: 500,
                    download: false,
                    thumbnail: true,
                    animateThumb: true,
                    zoomFromOrigin: true,
                    allowMediaOverlap: true,
                    toggleThumb: true
                });
                // Oznacz galerię jako zainicjalizowaną
                gallery.classList.add('lg-initialized');
            }
        });
    }
});