document.addEventListener('DOMContentLoaded', () => {
    const memoryData = [
        { type: 'text', class: 'text-block', content: '<h3>The<br>Little<br>Moments</h3><span class="date">Est. 2019</span>' },
        { type: 'image', src: 'assets/memories_images/157.jpg' },
        { type: 'image', src: 'assets/memories_images/1697267561669 (1).jpg' },
        { type: 'image', src: 'assets/memories_images/20230825_164051.jpg' },
        { type: 'image', src: 'assets/memories_images/20231016_121456.jpg' },
        { type: 'image', src: 'assets/memories_images/DSC_0055.JPG' },
        { type: 'quote', class: 'quote-block', content: '<p>"Captured in time."</p>' },
        { type: 'image', src: 'assets/memories_images/IMG-20190710-WA0031-01.jpeg' },
        { type: 'image', src: 'assets/memories_images/IMG-20191202-WA0091_35834685932018.jpg' },
        { type: 'image', src: 'assets/memories_images/IMG-20191206-WA0042.jpg' },
        { type: 'image', src: 'assets/memories_images/IMG-20191220-WA0066.jpg' },
        { type: 'image', src: 'assets/memories_images/IMG-20200830-WA0056.jpg' },
        { type: 'image', src: 'assets/memories_images/IMG-20231018-WA0024.jpg' },
        { type: 'text', class: 'text-block', content: '<h3>LIFE</h3>' },
        { type: 'image', src: 'assets/memories_images/IMG-20231018-WA0037 (2).jpg' },
        { type: 'image', src: 'assets/memories_images/IMG-20231018-WA0086_36335111457985.jpg' },
        { type: 'image', src: 'assets/memories_images/IMG-20231018-WA0102.jpg' },
        { type: 'image', src: 'assets/memories_images/IMG20231016120739 (2).jpg' },
        { type: 'image', src: 'assets/memories_images/IMG_20190427_115955.jpg' },
        { type: 'image', src: 'assets/memories_images/IMG_20210222_110523-01.jpeg' },
        { type: 'image', src: 'assets/memories_images/IMG_20220512_131102.jpg' },
        { type: 'image', src: 'assets/memories_images/IMG_20231015_164050.png' },
        { type: 'image', src: 'assets/memories_images/IMG_20231017_003650-01 (1).jpg' },
        { type: 'image', src: 'assets/memories_images/IMG_20231018_094930.jpg' },
        { type: 'image', src: 'assets/memories_images/IMG_20250302_123349539.jpg' },
        { type: 'image', src: 'assets/memories_images/IMG_20250302_134158147.jpg' },
        { type: 'quote', class: 'quote-block', content: '<p>"To remember."</p>' },
        { type: 'image', src: 'assets/memories_images/IMG_20250719_135907310.jpg' },
        { type: 'image', src: 'assets/memories_images/IMG_2713.JPG' },
        { type: 'image', src: 'assets/memories_images/IMG_5273 (1)-01.jpeg' },
        { type: 'image', src: 'assets/memories_images/IMG_5291.jpg' },
        { type: 'image', src: 'assets/memories_images/IMG_5307 (1).jpg' },
        { type: 'image', src: 'assets/memories_images/IMG_7592-01.jpeg' },
        { type: 'image', src: 'assets/memories_images/IMG_7599.JPG' },
        { type: 'image', src: 'assets/memories_images/InShot_20210222_194008152.jpg' },
        { type: 'image', src: 'assets/memories_images/Screenshot_20210131_225648_com.whatsapp.w4b.jpg' }
    ];

    const gallery = document.getElementById('memory-gallery');
    if (!gallery) return;

    // Render all images into the track
    const fragment = document.createDocumentFragment();
    memoryData.forEach((data) => {
        const div = document.createElement('div');
        div.className = 'memory-item';
        
        if (data.type === 'image') {
            const img = document.createElement('img');
            img.src = data.src;
            img.alt = 'Memory';
            img.loading = 'lazy'; // Keep native lazy loading so off-screen images don't load immediately
            div.appendChild(img);
        } else {
            div.className += ` ${data.class}`;
            div.innerHTML = data.content;
        }

        fragment.appendChild(div);
    });
    
    gallery.appendChild(fragment);

    // Get all rendered items
    const items = document.querySelectorAll('.memory-item');

    // Scroll Animation Logic
    function updateGallery() {
        const containerCenter = gallery.getBoundingClientRect().left + gallery.offsetWidth / 2;
        
        items.forEach((item) => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            
            // Distance from center of container
            const distance = itemCenter - containerCenter;
            
            // Normalizing factor (tune this to make the effect wider or narrower)
            // Using a fixed pixel amount (e.g. 500) works better than container width for a consistent curve
            const maxDistance = 600; 
            
            // Normalize distance between -1 and 1
            let normalized = distance / maxDistance;
            
            // Clamp to [-1, 1] to stop animating past a certain point
            normalized = Math.max(-1, Math.min(1, normalized));
            
            // Transform Math based on reference image
            // 1. Rotation: Center is 0deg. Left is negative rotation, Right is positive.
            const rotateZ = normalized * 35; // degrees (max 35deg rotation)
            
            // 2. Scale: Center is 1. Edges scale down.
            // When normalized is 0 (center), scale is 1. When normalized is 1/-1 (edges), scale is 0.6
            const scale = 1 - Math.abs(normalized) * 0.4;
            
            // 3. Translate Y: Form an arc (push down slightly at edges)
            const translateY = Math.abs(normalized) * 80; // push down up to 80px
            
            // 4. Translate X: Squeeze items closer together as they move to edges
            const translateX = normalized * -100; // Pull towards center
            
            // 5. Z-Index: Center item must be on top
            // Using 100 as base and subtracting based on distance
            const zIndex = Math.round(100 - Math.abs(normalized) * 100);
            
            // Apply Transforms
            item.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotateZ(${rotateZ}deg)`;
            item.style.zIndex = zIndex;
            
            // Optional: Dim items on edges
            const img = item.querySelector('img');
            if (img) {
                // Dim down to 30% brightness at edges
                const brightness = 1 - Math.abs(normalized) * 0.7;
                img.style.filter = `brightness(${brightness})`;
            }
        });
    }

    // Map vertical mouse wheel scroll to horizontal scroll
    gallery.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            // Smoothly scroll horizontally based on vertical wheel movement
            gallery.scrollBy({
                left: e.deltaY * 2, // Multiply for slightly faster scroll speed
                behavior: 'auto'
            });
        }
    }, { passive: false }); // Needs to not be passive to preventDefault

    // Attach scroll and resize events
    gallery.addEventListener('scroll', () => {
        // Use requestAnimationFrame for smooth 60fps+ rendering
        requestAnimationFrame(updateGallery);
    });
    
    window.addEventListener('resize', () => {
        requestAnimationFrame(updateGallery);
    });
    
    // Initial setup
    // We use setTimeout to ensure images/layout have settled before calculating rects
    setTimeout(() => {
        // Scroll to the middle of the gallery to start
        gallery.scrollLeft = (gallery.scrollWidth - gallery.clientWidth) / 2;
        updateGallery();
    }, 100);
});
