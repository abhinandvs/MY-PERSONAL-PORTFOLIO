/* Global Animations: Scroll Reveal & 3D Tilt */
document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Reveal ---
    // Targets both general 'reveal' sections and specific 'reveal-smooth' items
    const revealElements = document.querySelectorAll('.reveal, .reveal-smooth');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger earlier (10%) for smoother flow
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));



});
