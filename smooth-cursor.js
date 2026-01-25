/* Fluid Cursor & Text Effects */
document.addEventListener('DOMContentLoaded', () => {
    // Check for pointer capability (Mouse vs Touch)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return; // Exit if touch device

    // Create cursor elements
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);

    const cursorOutline = document.createElement('div');
    cursorOutline.classList.add('cursor-outline');
    document.body.appendChild(cursorOutline);

    // State
    const cursor = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        targetX: window.innerWidth / 2,
        targetY: window.innerHeight / 2
    };

    // Track mouse
    document.addEventListener('mousemove', (e) => {
        cursor.targetX = e.clientX;
        cursor.targetY = e.clientY;

        // Instant move for dot
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    });

    // Smooth animation loop (Lerp)
    const animate = () => {
        const speed = 0.15; // Smooth dragging factor

        cursor.x += (cursor.targetX - cursor.x) * speed;
        cursor.y += (cursor.targetY - cursor.y) * speed;

        cursorOutline.style.left = `${cursor.x}px`;
        cursorOutline.style.top = `${cursor.y}px`;

        requestAnimationFrame(animate);
    };
    animate();

    // Text Interactions (Scale + Color Shift)
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, span, li, button, .btn');

    textElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Cursor Effect
            cursorOutline.classList.add('hovering');

            // Text Effect
            el.classList.add('text-hover-effect');
        });

        el.addEventListener('mouseleave', () => {
            // Cursor Effect
            cursorOutline.classList.remove('hovering');

            // Text Effect
            el.classList.remove('text-hover-effect');
        });
    });
});
