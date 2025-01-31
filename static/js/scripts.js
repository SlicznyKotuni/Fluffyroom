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

    // ===== LIGHTGALLERY SECTION =====
    let galleryInstances = new Map();

    const initializeGallery = (gallery) => {
        // Zniszcz istniejącą instancję, jeśli istnieje
        if (galleryInstances.has(gallery)) {
            galleryInstances.get(gallery).destroy();
            galleryInstances.delete(gallery);
        }

        // Stwórz nową instancję
        if (typeof lightGallery !== 'undefined') {
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
                mousewheel: true
            });

            // Zapisz instancję w Map
            galleryInstances.set(gallery, instance);

            // Dodaj listener na zamknięcie
            gallery.addEventListener('lgAfterClose', () => {
                if (galleryInstances.has(gallery)) {
                    galleryInstances.get(gallery).destroy();
                    galleryInstances.delete(gallery);
                    // Reinicjalizuj po krótkim opóźnieniu
                    setTimeout(() => initializeGallery(gallery), 100);
                }
            });
        }
    };

    // Inicjalizacja wszystkich galerii
    const galleries = document.querySelectorAll('.gallery:not(.slideshow)');
    galleries.forEach(gallery => {
        initializeGallery(gallery);
    });

    // Cleanup przy zamknięciu strony
    window.addEventListener('beforeunload', () => {
        galleryInstances.forEach((instance) => {
            instance.destroy();
        });
        galleryInstances.clear();
    });
});