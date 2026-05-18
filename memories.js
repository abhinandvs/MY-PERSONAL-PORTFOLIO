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

    let currentIndex = 0;
    const batchSize = 16; // Load 16 images at a time to ensure scrollbar appears

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    // Infinite scroll observer to load more items
    const loadMoreObserver = new IntersectionObserver((entries) => {
        const lastEntry = entries[0];
        if (lastEntry.isIntersecting && currentIndex < memoryData.length) {
            // Unobserve the current sentinel
            loadMoreObserver.unobserve(lastEntry.target);
            // Load next batch
            loadBatch();
        }
    }, { rootMargin: '200px' }); // Trigger before reaching the very bottom

    function loadBatch() {
        const fragment = document.createDocumentFragment();
        const endIndex = Math.min(currentIndex + batchSize, memoryData.length);
        
        for (let i = currentIndex; i < endIndex; i++) {
            const data = memoryData[i];
            const div = document.createElement('div');
            div.className = 'memory-item';
            
            if (data.type === 'image') {
                const img = document.createElement('img');
                img.src = data.src;
                img.alt = 'Memory';
                img.loading = 'lazy';
                div.appendChild(img);
            } else {
                div.className += ` ${data.class}`;
                div.innerHTML = data.content;
            }

            fragment.appendChild(div);
            
            // Observe for entrance animation
            observer.observe(div);
        }
        
        gallery.appendChild(fragment);
        currentIndex = endIndex;

        // If there are more items to load, observe the last rendered item
        if (currentIndex < memoryData.length) {
            const items = gallery.querySelectorAll('.memory-item');
            const lastItem = items[items.length - 1];
            if (lastItem) {
                loadMoreObserver.observe(lastItem);
            }
        }
    }

    // Initial load
    loadBatch();
});
