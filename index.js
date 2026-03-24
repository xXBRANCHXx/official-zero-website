document.addEventListener('DOMContentLoaded', () => {
    // Initial lock for 'Coming Soon' state
    document.body.classList.add('locked');

    // Portal UI Elements
    const elements = {
        overlay: document.getElementById('coming-soon-overlay'),
        devYes: document.getElementById('dev-yes'),
        devNo: document.getElementById('dev-no'),
        devCheck: document.getElementById('developer-check'),
        codePrompt: document.getElementById('code-prompt'),
        devInput: document.getElementById('dev-code'),
        submitBtn: document.getElementById('submit-code')
    };

    const ACCESS_CODE = "192017";

    // Witty portal logic
    elements.devYes?.addEventListener('click', () => {
        elements.devCheck.classList.add('hide');
        elements.codePrompt.classList.remove('hide');
        elements.devInput.focus();
    });

    elements.devNo?.addEventListener('click', () => {
        alert("We appreciate the honesty. Come back later for the calorie-free party!");
    });

    const unlockSite = () => {
        if (elements.devInput.value === ACCESS_CODE) {
            elements.overlay.classList.add('fade-out');
            document.body.classList.remove('locked');
            console.log("Welcome back, Captain.");
        } else {
            alert("Nice try, but that's not the code.");
            elements.devInput.value = "";
        }
    };

    elements.submitBtn?.addEventListener('click', unlockSite);
    elements.devInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') unlockSite();
    });

    // High-End Reveal Logic for Editorial Cards
    const revealItems = document.querySelectorAll('.n-card, .witty-h1, .floating-render');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(60px)';
        el.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

    // Custom Scroll Observer for revealing items
    window.addEventListener('scroll', () => {
        revealItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    });

    console.log("ZERO Editorial UI v4 initialized");
});
