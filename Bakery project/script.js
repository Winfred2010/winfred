// Form Submission Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple validation feedback
    const btn = contactForm.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = "Sending...";
    btn.style.opacity = "0.7";
    
    setTimeout(() => {
        alert("Thank you! Your message has been sent to the bakery.");
        btn.innerText = originalText;
        btn.style.opacity = "1";
        contactForm.reset();
    }, 1500);
});

// Scroll Effect for Navbar
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.padding = "0.8rem 10%";
    } else {
        nav.style.padding = "1.5rem 10%";
    }
});