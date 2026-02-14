document.addEventListener('DOMContentLoaded', () => {
    const toolsTrigger = document.getElementById('tools-trigger');
    const toolsModal = document.getElementById('tools-modal');
    const closeModals = document.querySelectorAll('.close-tools-modal');

    // Open Modal
    if (toolsTrigger) {
        toolsTrigger.addEventListener('click', () => {
            toolsModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling

            // Trigger Animation
            const content = toolsModal.querySelector('.modal-content');
            if (content) {
                content.classList.remove('animate-in');
                void content.offsetWidth; // Force Reflow
                setTimeout(() => content.classList.add('animate-in'), 10);
            }
        });
    }

    // Close Modal Function
    const closeToolsModal = () => {
        toolsModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    if (closeModals) {
        closeModals.forEach(btn => {
            btn.addEventListener('click', closeToolsModal);
        });
    }

    // Close on Outside Click
    window.addEventListener('click', (e) => {
        if (e.target === toolsModal) {
            closeToolsModal();
        }
    });

    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toolsModal.classList.contains('active')) {
            closeToolsModal();
        }
    });

    // Close Menu When Link is Clicked
    const menuLinks = toolsModal.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeToolsModal);
    });
});
