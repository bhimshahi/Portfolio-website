// Smooth Scrolling
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Contact Form Submission (Basic Alert for Now)
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Message Sent! I will get back to you soon.');
    this.reset();
});
