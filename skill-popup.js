document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('[data-popup]');
    const skillModal = document.getElementById('skill-modal');
    const skillModalBody = document.getElementById('skill-modal-body');
    const closeSkillModal = document.querySelector('.close-skill-modal');

    // Popup Content Data (Mini Landing Pages)
    const popupContent = {
        'memories': `
            <i class="fab fa-instagram" style="font-size: 3rem; color: #E1306C; margin-bottom: 20px;"></i>
            <h2>MEMORIES</h2>
            <p style="color: var(--text-muted); margin-bottom: 30px;">
                Capturing life's most beautiful moments through the lens. <br>
                Explore my full visual portfolio on Instagram.
            </p>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <a href="https://www.instagram.com/_abhinand_vs" target="_blank" class="btn-primary">
                    <i class="fab fa-instagram" style="margin-right: 8px;"></i> Visit Instagram
                </a>
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
                <a href="tech-products.html" class="btn-primary">View All Details</a>
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
