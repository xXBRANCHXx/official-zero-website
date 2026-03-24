document.addEventListener('DOMContentLoaded', () => {
    // Initial lock for 'Coming Soon' state
    document.body.classList.add('locked');

    // Portal UI Management
    const portal = {
        overlay: document.getElementById('coming-soon-overlay'),
        devYes: document.getElementById('dev-yes'),
        devNo: document.getElementById('dev-no'),
        devCheck: document.getElementById('developer-check'),
        codePrompt: document.getElementById('code-prompt'),
        devInput: document.getElementById('dev-code'),
        submitBtn: document.getElementById('submit-code')
    };

    const ACCESS_CODE = "192017";

    portal.devYes?.addEventListener('click', () => {
        portal.devCheck.classList.add('hide');
        portal.codePrompt.classList.remove('hide');
        setTimeout(() => portal.devInput.focus(), 100);
    });

    portal.devNo?.addEventListener('click', () => {
        alert("We value your visit. Come back at official launch!");
    });

    const unlockSite = () => {
        if (portal.devInput.value === ACCESS_CODE) {
            portal.overlay.classList.add('fade-out');
            document.body.classList.remove('locked');
            console.log("Access Granted. Welcome to ZERO v5.");
        } else {
            alert("Security code incorrect.");
            portal.devInput.value = "";
        }
    };

    portal.submitBtn?.addEventListener('click', unlockSite);
    portal.devInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') unlockSite();
    });

    // SEARCH OVERLAY v5 LOGIC
    const search = {
        trigger: document.getElementById('search-trigger'),
        overlay: document.getElementById('search-popout'),
        close: document.getElementById('close-search'),
        input: document.getElementById('main-search')
    };

    search.trigger?.addEventListener('click', () => {
        search.overlay.classList.remove('hide');
        search.overlay.classList.add('active');
        setTimeout(() => search.input.focus(), 300);
    });

    search.close?.addEventListener('click', () => {
        search.overlay.classList.add('hide');
        search.overlay.classList.remove('active');
    });

    // ESC to close search
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            search.overlay.classList.add('hide');
            search.overlay.classList.remove('active');
        }
    });

    // PARALLAX & REVEAL EFFECTS (Cyber-Organic)
    const revealItems = document.querySelectorAll('.v5-card, .carousel-item, .split-txt, .product-orb');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealItems.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(60px)';
        el.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

    // Smooth background parallax scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroBgTxt = document.querySelector('.hero-bg-text');
        if (heroBgTxt) {
            heroBgTxt.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.15}px))`;
        }
    });

    console.log("ZERO Cyber-Organic v5 initialized");
});
