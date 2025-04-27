document.addEventListener('DOMContentLoaded', function() {
    const heroSections = document.querySelectorAll('.hero, .hero1');

    heroSections.forEach(hero => {
        const leftArrow = hero.querySelector('.left-arrow');
        const rightArrow = hero.querySelector('.right-arrow');
        const imageBackground = hero.querySelector('.image-background');
        const slideImages = imageBackground.querySelectorAll('.slide-image');
        const imageTitleElement = hero.querySelector('.image-title');
        const imageDescriptionElement = hero.querySelector('.image-description');
        let currentIndex = 0;

        // Initially show the first image, its title, and its description
        if (slideImages.length > 0) {
            slideImages[0].classList.add('active');
            imageTitleElement.textContent = slideImages[0].dataset.title;
            imageDescriptionElement.textContent = slideImages[0].dataset.description;
        }

        if (leftArrow && rightArrow && slideImages.length > 0) {
            leftArrow.addEventListener('click', function() {
                slideImages[currentIndex].classList.remove('active');
                imageTitleElement.classList.add('fade-out');
                imageDescriptionElement.classList.add('fade-out');
                setTimeout(() => {
                    currentIndex--;
                    if (currentIndex < 0) {
                        currentIndex = slideImages.length - 1;
                    }
                    slideImages[currentIndex].classList.add('active');
                    imageTitleElement.textContent = slideImages[currentIndex].dataset.title;
                    imageDescriptionElement.textContent = slideImages[currentIndex].dataset.description;
                    imageTitleElement.classList.remove('fade-out');
                    imageDescriptionElement.classList.remove('fade-out');
                }, 300); // Match the CSS transition duration
            });

            rightArrow.addEventListener('click', function() {
                slideImages[currentIndex].classList.remove('active');
                imageTitleElement.classList.add('fade-out');
                imageDescriptionElement.classList.add('fade-out');
                setTimeout(() => {
                    currentIndex++;
                    if (currentIndex >= slideImages.length) {
                        currentIndex = 0;
                    }
                    slideImages[currentIndex].classList.add('active');
                    imageTitleElement.textContent = slideImages[currentIndex].dataset.title;
                    imageDescriptionElement.textContent = slideImages[currentIndex].dataset.description;
                    imageTitleElement.classList.remove('fade-out');
                    imageDescriptionElement.classList.remove('fade-out');
                }, 300); // Match the CSS transition duration
            });
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const mainHero = document.querySelector('.main-hero');
    if (mainHero) {
        setTimeout(() => { // Optional: Add a small delay before starting the animation
            mainHero.classList.add('loaded');
        }, 100);
    }
});