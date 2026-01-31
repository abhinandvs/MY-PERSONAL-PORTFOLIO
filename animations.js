/* Global Animations: Scroll Reveal & 3D Tilt */
document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Reveal ---
    // Targets all reveal animation classes
    const revealElements = document.querySelectorAll('.reveal, .reveal-smooth, .reveal-up, .reveal-left, .reveal-right, .reveal-zoom');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Toggle 'active' class based on visibility
            // This ensures animations play when scrolling down AND up (re-entering)
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Slightly higher threshold for better visibility before trigger
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));



});
