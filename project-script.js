// Handle view switching
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and containers
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.view-container').forEach(container => container.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding view container
        const viewId = button.getAttribute('data-view');
        document.getElementById(viewId).classList.add('active');
    });
});

// Optional: Add zoom functionality for images
document.querySelectorAll('.view-container img').forEach(img => {
    img.addEventListener('click', () => {
        img.classList.toggle('zoomed');
    });
}); 