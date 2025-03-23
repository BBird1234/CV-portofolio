// Handle contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! This is a demo alert - implement your own form handling logic.');
});

// Add smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Optional: Add image modal functionality
document.querySelectorAll('.gallery-item img').forEach(image => {
    image.addEventListener('click', function() {
        // Add your image modal logic here
        // This could open a larger version of the image when clicked
    });
}); 