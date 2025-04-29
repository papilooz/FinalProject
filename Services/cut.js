const body = document.querySelector('body');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
body.style.backgroundSize = 'cover';  // Ensures the image covers the entire area
// Elements for text content
const subtitleElement = document.getElementById('cutting-subtitle');
const descriptionElement = document.getElementById('cutting-description');

// Background images for carousel
const backgroundImages = [
    './images/stud4.jpg',
    './images/cuttwe.webp',
    './images/stud5.jpg'
];

// Subtitle and description paired with each background image
const contentData = [
    {
        subtitle: "Precision",
        description: "Our cutting service delivers precise, clean cuts to ensure your materials meet exact specifications. Ideal for business cards, posters, and brochures."
    },
    {
        subtitle: "Speed",
        description: "We offer fast turnaround times without compromising quality, using high-speed cutting machines for bulk or individual orders."
    },
    {
        subtitle: "Customization",
        description: "From custom shapes to unique sizes, our cutting service allows for full flexibility to match your brand or personal needs."
    }
];

let currentImageIndex = 0;
let isAnimating = false;
const animationDuration = 1000; // Adjust for slide speed (milliseconds)

function updateBackground(direction) {
    if (isAnimating) return;
    isAnimating = true;

    const startPosition = direction === 'next' ? '100%' : '-100%';
    const endPosition = '0%';

    body.style.backgroundPosition = startPosition;
    body.style.transition = `background-position ${animationDuration}ms ease-in-out`;

    // Force reflow to start animation
    void body.offsetWidth;

    body.style.backgroundPosition = endPosition;

    setTimeout(() => {
        isAnimating = false;
        body.style.transition = ''; // Remove inline transition

        // Update index based on direction
        currentImageIndex = (currentImageIndex + (direction === 'next' ? 1 : -1) + backgroundImages.length) % backgroundImages.length;

        // Set new background image
        body.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;

        // Set new text content
        subtitleElement.textContent = contentData[currentImageIndex].subtitle;
        descriptionElement.textContent = contentData[currentImageIndex].description;
    }, animationDuration);
}

// Event listeners
prevButton.addEventListener('click', () => {
    updateBackground('prev');
});

nextButton.addEventListener('click', () => {
    updateBackground('next');
});

// Initial background and text setup
body.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
subtitleElement.textContent = contentData[currentImageIndex].subtitle;
descriptionElement.textContent = contentData[currentImageIndex].description;
