document.addEventListener('DOMContentLoaded', () => {

    // Create cursor elements dynamically
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);

    const cursorOutline = document.createElement('div');
    cursorOutline.classList.add('cursor-outline');
    document.body.appendChild(cursorOutline);

    const cursorEffect = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        targetX: window.innerWidth / 2,
        targetY: window.innerHeight / 2
    };

    // Track mouse
    document.addEventListener('mousemove', (e) => {
        cursorEffect.targetX = e.clientX;
        cursorEffect.targetY = e.clientY;

        // Immediate movement for the dot
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    });

    // Smooth animation loop for outline
    function animateCursor() {
        const speed = 0.15; // Smooth dragging factor

        const dx = cursorEffect.targetX - cursorEffect.x;
        const dy = cursorEffect.targetY - cursorEffect.y;

        cursorEffect.x += dx * speed;
        cursorEffect.y += dy * speed;

        cursorOutline.style.left = `${cursorEffect.x}px`;
        cursorOutline.style.top = `${cursorEffect.y}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Magnetic and Interaction effects
    const interactiveElements = document.querySelectorAll('a, button, .btn, .social-links a, .nav-link');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = 'var(--primary-color)';
            cursorOutline.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
        });

        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            cursorOutline.style.backgroundColor = 'transparent';
        });

        // Optional: True magnetic pull logic can be added here if desired
        // For now, scale effect is cleaner
    });

    // Click effect
    document.addEventListener('mousedown', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});
