/* Text Hover Animations */
document.addEventListener('DOMContentLoaded', () => {
    // Select all text-heavy elements
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, span, li, button, .btn, .logo');

    textElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.classList.add('hover-animate');
        });

        el.addEventListener('mouseleave', () => {
            el.classList.remove('hover-animate');
        });
    });
});
