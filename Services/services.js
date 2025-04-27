const serviceBoxes = document.querySelectorAll('.service-box');

serviceBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.backgroundColor = '#b2ebf2'; // Light blue on hover
    });

    box.addEventListener('mouseleave', () => {
        box.style.backgroundColor = '#e0f2f7'; // Original light blue
    });
});