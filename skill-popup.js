document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('[data-popup]');
    const skillModal = document.getElementById('skill-modal');
    const skillModalBody = document.getElementById('skill-modal-body');
    const closeSkillModal = document.querySelector('.close-skill-modal');

    // Popup Content Data (Mini Landing Pages)
    const popupContent = {
        'memories': `
            <div class="memories-content-wrapper">
                <div class="memories-visuals">
                    <div class="polaroid p1">
                        <i class="fas fa-camera-retro"></i>
                    </div>
                    <div class="polaroid p2">
                        <i class="fas fa-image"></i>
                    </div>
                </div>
                <div class="memories-info">
                    <h2 class="memories-title">Visual Stories</h2>
                    <p class="memories-desc">
                        Freezing time, one shutter at a time. A collection of moments, landscapes, and the raw beauty of life.
                    </p>
                    <a href="memories.html" class="btn-primary instagram-btn">
                        <i class="fab fa-instagram"></i> View Gallery
                    </a>
                </div>
            </div>
        `,
        'tech': `
            <i class="fas fa-rocket" style="font-size: 3rem; color: var(--primary-purple); margin-bottom: 20px;"></i>
            <h2>MY TECH PRODUCTS</h2>
            <p style="color: var(--text-muted); margin-bottom: 20px;">
                My daily drivers and engineering tools.
            </p>
            <div class="product-list">
                <div class="product-item">
                    <div class="product-icon"><i class="fas fa-laptop-code"></i></div>
                    <div class="product-info">
                        <h4>ASUS TUF A15</h4>
                        <p>RTX 3050 | Ryzen 7 | Performance Beast</p>
                    </div>
                </div>
                <div class="product-item">
                    <div class="product-icon"><i class="fas fa-mobile-alt"></i></div>
                    <div class="product-info">
                        <h4>Nothing Phone (2a)</h4>
                        <p>Transparent Design | Glyph Interface</p>
                    </div>
                </div>
                <div class="product-item">
                    <div class="product-icon"><i class="fas fa-headphones"></i></div>
                    <div class="product-info">
                        <h4>Soundcore Q20i</h4>
                        <p>Noise Cancelling | High-Res Audio</p>
                    </div>
                </div>
            </div>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <a href="download.html" class="btn-primary">View Downloads</a>
            </div>
        `,
        'skills': `
            <i class="fas fa-microchip" style="font-size: 3rem; color: #00DBDE; margin-bottom: 20px;"></i>
            <h2>TECHNICAL SKILLS</h2>
            <p style="color: var(--text-muted); margin-bottom: 20px;">
                Tools and technologies I work with.
            </p>
            <div class="popup-skill-grid">
                <div class="popup-skill-item"><i class="fab fa-python" style="color: #3776AB;"></i><span>Python</span></div>
                <div class="popup-skill-item"><i class="fab fa-js" style="color: #F7DF1E;"></i><span>JavaScript</span></div>
                <div class="popup-skill-item"><i class="fas fa-code" style="color: #007ACC;"></i><span>C++</span></div>
                <div class="popup-skill-item"><i class="fas fa-microchip" style="color: #E84D31;"></i><span>Embedded</span></div>
                <div class="popup-skill-item"><i class="fas fa-wifi" style="color: #2496ED;"></i><span>IoT</span></div>
                <div class="popup-skill-item"><i class="fab fa-git-alt" style="color: #F05032;"></i><span>Git</span></div>
            </div>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <a href="technical-skills.html" class="btn-primary">View Full Skillset</a>
            </div>
        `
    };

    // Open Modal
    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const popupType = card.getAttribute('data-popup');
            const content = popupContent[popupType];

            if (content) {
                skillModalBody.innerHTML = content;
                skillModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling

                // Trigger Reflow to restart CSS animations if needed
                void skillModalBody.offsetWidth;

                // Add Animation Class
                skillModalBody.classList.remove('animate-in'); // Reset
                setTimeout(() => {
                    skillModalBody.classList.add('animate-in');
                }, 10);
            }
        });
    });

    // Close Functions
    const closeModalFunc = () => {
        skillModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeSkillModal) {
        closeSkillModal.addEventListener('click', closeModalFunc);
    }

    // Close on Outside Click
    window.addEventListener('click', (e) => {
        if (e.target === skillModal) {
            closeModalFunc();
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && skillModal.classList.contains('active')) {
            closeModalFunc();
        }
    });
});
