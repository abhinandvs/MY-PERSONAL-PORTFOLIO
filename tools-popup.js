document.addEventListener('DOMContentLoaded', () => {
    const toolsTrigger = document.getElementById('tools-trigger');
    const toolsModal = document.getElementById('tools-modal');
    const closeModal = document.querySelector('.close-modal');

    // Open Modal
    if (toolsTrigger) {
        toolsTrigger.addEventListener('click', () => {
            toolsModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    // Close Modal Function
    const closeToolsModal = () => {
        toolsModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    if (closeModal) {
        closeModal.addEventListener('click', closeToolsModal);
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
});
