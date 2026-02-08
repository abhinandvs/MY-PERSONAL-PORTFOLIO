document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('hero-canvas');
    const context = canvas.getContext('2d');
    const totalFrames = 286;
    const folderPath = 'assets/heroimage/ezgif-2e2f263418658a9f-jpg/';

    // Frames state
    const images = [];
    const frameCount = totalFrames;
    let imagesLoaded = 0;
    let currentFrame = 0;

    // Timing for 24fps
    const fps = 24;
    const interval = 1000 / fps;
    let lastTime = 0;

    // Preload images
    const pad = (num, size) => {
        let s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    };

    // Load all images
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = `${folderPath}ezgif-frame-${pad(i, 3)}.jpg`;
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === frameCount) {
                // All images loaded, start animation loop
                requestAnimationFrame(animate);
            }
        };
        images.push(img);
    }

    // Set canvas dimensions with DPI support
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;

        // Set display size (css pixels).
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";

        // Set actual size in memory (scaled to account for extra pixel density).
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;

        // Redraw immediately if paused or waiting
        if (images.length > 0 && images[currentFrame]) {
            drawImageCover(context, images[currentFrame]);
        }
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial call

    // Helper to mimic object-fit: contain (Zoom out to fit)
    function drawImageCover(ctx, img) {
        if (!img) return;

        // Use physical dimensions
        const w = canvas.width;
        const h = canvas.height;
        const canvasRatio = w / h;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        // "Contain" logic: ensure the whole image is visible
        if (canvasRatio > imgRatio) {
            // Canvas is wider than image (pillarbox)
            // Fit to height
            drawHeight = h;
            drawWidth = h * imgRatio;
        } else {
            // Canvas is taller than image (letterbox)
            // Fit to width
            drawWidth = w;
            drawHeight = w / imgRatio;
        }

        // Apply additional "Zoom Out" factor
        const scaleFactor = 0.85; // Increased from 0.6 to reduce black space
        drawWidth *= scaleFactor;
        drawHeight *= scaleFactor;

        // Positioning Logic
        if (h > w) {
            // Mobile (Portrait): Move video up
            offsetX = (w - drawWidth) / 2;
            offsetY = h * 0.15;
        } else {
            // Desktop: Center
            offsetX = (w - drawWidth) / 2;
            offsetY = (h - drawHeight) / 2;
        }

        // Fill background with black (or dark color matching video bg) to hide gaps
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, w, h);

        // Draw image centered
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    // Animation Loop Control
    let isAnimating = false;

    // Animation Loop
    function animate(timestamp) {
        if (!isAnimating) return; // Stop if not visible

        if (!lastTime) lastTime = timestamp;
        const elapsed = timestamp - lastTime;

        if (imagesLoaded === frameCount) {
            if (elapsed > interval) {
                // Draw current frame
                drawImageCover(context, images[currentFrame]);

                // Next frame
                currentFrame = (currentFrame + 1) % frameCount;

                // Adjust for consistent fps
                lastTime = timestamp - (elapsed % interval);
            }
        } else {
            // Fallback for loading state
            if (images[0] && images[0].complete) {
                drawImageCover(context, images[0]);
            }
        }

        requestAnimationFrame(animate);
    }

    // Optimize: Only animate when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!isAnimating && imagesLoaded === frameCount) {
                    isAnimating = true;
                    requestAnimationFrame(animate);
                } else if (!isAnimating) {
                    // Just mark as potentially ready, the load handler handles the first start
                    isAnimating = true;
                    // If images are not loaded yet, the load handler line 33 will call animate, which checks isAnimating
                }
            } else {
                isAnimating = false;
            }
        });
    }, { threshold: 0.01 }); // 1% visibility required

    observer.observe(canvas);

});

