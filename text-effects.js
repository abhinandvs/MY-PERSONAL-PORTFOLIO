/* Text Hover Animations */
document.addEventListener('DOMContentLoaded', () => {
    // Use Event Delegation for better performance
    const relevantTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'A', 'SPAN', 'LI', 'BUTTON'];

    document.body.addEventListener('mouseover', (e) => {
        if (relevantTags.includes(e.target.tagName) || e.target.classList.contains('btn') || e.target.classList.contains('logo')) {
            e.target.classList.add('hover-animate');
        }
    });

    document.body.addEventListener('mouseout', (e) => {
        if (relevantTags.includes(e.target.tagName) || e.target.classList.contains('btn') || e.target.classList.contains('logo')) {
            e.target.classList.remove('hover-animate');
        }
    });
});
