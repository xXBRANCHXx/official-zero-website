document.addEventListener('DOMContentLoaded', () => {
    // Initial lock for 'Coming Soon' state
    document.body.classList.add('locked');

    // Portal Logic
    const overlay = document.getElementById('coming-soon-overlay');
    const devYes = document.getElementById('dev-yes');
    const devNo = document.getElementById('dev-no');
    const devCheck = document.getElementById('developer-check');
    const codePrompt = document.getElementById('code-prompt');
    const devInput = document.getElementById('dev-code');
    const submitBtn = document.getElementById('submit-code');

    const ACCESS_CODE = "192017";

    devYes?.addEventListener('click', () => {
        devCheck.classList.add('hide');
        codePrompt.classList.remove('hide');
        setTimeout(() => devInput.focus(), 100);
    });

    devNo?.addEventListener('click', () => {
        alert("Come back later when our new site is ready!");
    });

    const unlockSite = () => {
        if (devInput.value === ACCESS_CODE) {
            overlay.classList.add('fade-out');
            document.body.classList.remove('locked');
            console.log("Access Granted.");
        } else {
            alert("Incorrect code.");
            devInput.value = "";
        }
    };

    submitBtn?.addEventListener('click', unlockSite);
    devInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') unlockSite();
    });

    // SEARCH POPOUT LOGIC
    const searchTrigger = document.getElementById('search-trigger');
    const searchPopout = document.getElementById('search-popout');
    const closeSearch = document.getElementById('close-search');
    const mainSearch = document.getElementById('main-search');

    searchTrigger?.addEventListener('click', () => {
        searchPopout.classList.add('active');
        searchPopout.classList.remove('hide');
        setTimeout(() => mainSearch.focus(), 300);
    });

    closeSearch?.addEventListener('click', () => {
        searchPopout.classList.remove('active');
        setTimeout(() => searchPopout.classList.add('hide'), 500);
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchPopout.classList.contains('active')) {
            searchPopout.classList.remove('active');
            setTimeout(() => searchPopout.classList.add('hide'), 500);
        }
    });

    // Reveal Logic for Editorial Cards
    const revealItems = document.querySelectorAll('.n-card, .witty-h1, .floating-render, .story-card, .flv-card');
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

    console.log("ZERO Editorial UI initialized");
});
