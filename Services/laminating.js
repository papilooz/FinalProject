document.addEventListener('DOMContentLoaded', function() {
    const body = document.querySelector('body');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const subtitleElement = document.getElementById('cutting-subtitle'); // Note: ID is 'cutting-subtitle'
    const descriptionElement = document.getElementById('cutting-description'); // Note: ID is 'cutting-description'
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // Initial content setup
    const backgroundImages = [
        './images/laminate.jpg',
        './images/laminate1.jpg',
        './images/laminate2.jpg'
    ];
    const contentData = [
        { subtitle: "Protection", description: "Our laminating service adds a durable protective layer, keeping your documents safe from damage, wear, and tear. Ideal for business cards, menus, and important documents." },
        { subtitle: "Glossy Finish", description: "Achieve a professional and high-quality glossy finish for your materials. This adds vibrancy and makes your prints stand out, perfect for promotional materials and presentations." },
        { subtitle: "Customization", description: "We offer full flexibility in size and thickness to ensure your laminated items meet your specific needs. From custom sizes to specialty finishes, we cater to every request." }
    ];
    let currentImageIndex = 0;
    body.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
    subtitleElement.textContent = contentData[currentImageIndex].subtitle;
    descriptionElement.textContent = contentData[currentImageIndex].description;

    // Carousel functionality
    let isAnimating = false;
    const animationDuration = 1000;

    function updateBackground(direction) {
        if (isAnimating) return;
        isAnimating = true;

        const startPosition = direction === 'next' ? '100%' : '-100%';
        const endPosition = '0%';

        body.style.backgroundPosition = startPosition;
        body.style.transition = `background-position ${animationDuration}ms ease-in-out`;

        void body.offsetWidth;

        body.style.backgroundPosition = endPosition;

        setTimeout(() => {
            isAnimating = false;
            body.style.transition = '';
            currentImageIndex = (currentImageIndex + (direction === 'next' ? 1 : -1) + backgroundImages.length) % backgroundImages.length;
            body.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
            subtitleElement.textContent = contentData[currentImageIndex].subtitle;
            descriptionElement.textContent = contentData[currentImageIndex].description;
        }, animationDuration);
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            updateBackground('prev');
        });

        nextButton.addEventListener('click', () => {
            updateBackground('next');
        });
    }

    // Dropdown menu functionality for "Know More"
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(event) {
            event.preventDefault();
            dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
        });

        window.addEventListener('click', function(event) {
            if (!event.target.matches('.dropdown-toggle') && !event.target.closest('.dropdown-menu')) {
                if (dropdownMenu.style.display === 'block') {
                    dropdownMenu.style.display = 'none';
                }
            }
        });
    }
});
