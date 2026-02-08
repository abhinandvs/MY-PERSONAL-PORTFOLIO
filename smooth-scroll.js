
// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential easing
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false, // Keep native touch scroll for better performance on mobile unless explicitly needed
    touchMultiplier: 2,
});

// Integrate with RAF loop
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Optional: Force scroll to top on reload to prevent jumpiness
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
