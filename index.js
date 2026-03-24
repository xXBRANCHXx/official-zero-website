document.addEventListener('DOMContentLoaded', () => {
    // Initial lock for 'Coming Soon' state
    document.body.classList.add('locked');

    // Portal Logic
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
        alert("Thanks for visiting! See you at launch.");
    });

    const unlockSite = () => {
        if (portal.devInput.value === ACCESS_CODE) {
            portal.overlay.classList.add('fade-out');
            document.body.classList.remove('locked');
            console.log("Access Granted. Welcome to ZERO v6.");
        } else {
            alert("Security code failed.");
            portal.devInput.value = "";
        }
    };

    portal.submitBtn?.addEventListener('click', unlockSite);
    portal.devInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') unlockSite();
    });

    // SEARCH LOGIC - FUSION UI
    const search = {
        trigger: document.getElementById('search-trigger'),
        overlay: document.getElementById('search-popout'),
        close: document.getElementById('close-search'),
        input: document.getElementById('main-search')
    };

    if (search.trigger) {
        search.trigger.addEventListener('click', () => {
            search.overlay.classList.remove('hide');
            search.overlay.classList.add('active');
            setTimeout(() => search.input.focus(), 300);
        });
    }

    if (search.close) {
        search.close.addEventListener('click', () => {
            search.overlay.classList.add('hide');
            search.overlay.classList.remove('active');
        });
    }

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && search.overlay) {
            search.overlay.classList.add('hide');
            search.overlay.classList.remove('active');
        }
    });

    // Reveal Trigger logic
    const revealItems = document.querySelectorAll('.n-card, .dark-accent-card, .hero-h1, .hero-p, .render-v6, .flv-card-min');
    
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
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

    console.log("ZERO Fusion UI initialized (v6)");
});
