document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up, .neomorph-card, .product-card');
    fadeElements.forEach(el => {
        el.classList.add('fade-in'); // Ensure base class is present
        observer.observe(el);
    });

    // Navigation Color Change on Scroll
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.width = '85%';
            nav.style.top = '10px';
        } else {
            nav.style.width = '90%';
            nav.style.top = '20px';
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    console.log("ZERO website logic initialized");
});
