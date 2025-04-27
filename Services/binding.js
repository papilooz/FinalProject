// binding.js

const carousel = document.querySelector('.image-carousel');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const images = document.querySelectorAll('.carousel-image');
const bindingTitle = document.getElementById('binding-title');
const bindingDescription = document.getElementById('binding-description'); // Select the description paragraph
let counter = 0;
let imageWidth = 0;

function scrollToImage() {
    carousel.style.transform = `translateX(-${counter * imageWidth}px)`;
    updateContent(); // Call updateContent to change title and description
}

function updateContent() {
    if (images[counter]) {
        if (images[counter].dataset.title) {
            bindingTitle.textContent = images[counter].dataset.title;
        }
        if (images[counter].dataset.description) {
            bindingDescription.textContent = images[counter].dataset.description;
        }
    }
}

function updateImageWidth() {
    if (images.length > 0) {
        imageWidth = images[0].clientWidth;
        scrollToImage();
    }
}

// Initial call and on resize
updateImageWidth();
updateContent(); // Set initial title and description
window.addEventListener('resize', updateImageWidth);

prevButton.addEventListener('click', () => {
    if (images.length === 0) return;
    counter--;
    if (counter < 0) {
        counter = images.length - 1;
    }
    scrollToImage();
});

nextButton.addEventListener('click', () => {
    if (images.length === 0) return;
    counter++;
    if (counter >= images.length) {
        counter = 0;
    }
    scrollToImage();
});

// Basic touch swipe functionality (optional)
let touchStartX = 0;
carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', (e) => {
    if (images.length === 0) return;
    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance > 0) {
            prevButton.click();
        } else {
            nextButton.click();
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});