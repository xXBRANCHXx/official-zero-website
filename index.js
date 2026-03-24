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

    const unlockSite = () => {
        if (portal.devInput.value === ACCESS_CODE) {
            portal.overlay.classList.add('fade-out');
            document.body.classList.remove('locked');
            console.log("Access Granted.");
        } else {
            alert("Incorrect code.");
            portal.devInput.value = "";
        }
    };

    portal.submitBtn?.addEventListener('click', unlockSite);
    portal.devInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') unlockSite();
    });

    // HIGH-END MORPHING SEARCH LOGIC (WITH TOGGLE RETRACTION)
    const searchTrigger = document.getElementById('search-trigger');
    const searchPopout = document.getElementById('search-popout');
    const morphIconBox = document.getElementById('morph-icon-box');
    const mainSearch = document.getElementById('main-search');
    const closeSearch = document.getElementById('close-search');

    if (searchTrigger) {
        searchTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // If already open, retract it
            if (searchPopout.classList.contains('active')) {
                searchPopout.classList.remove('expanded');
                setTimeout(() => searchPopout.classList.remove('active'), 500);
            } else {
                // Open sequence
                searchPopout.classList.remove('hide');
                searchPopout.classList.add('active');
                setTimeout(() => {
                    morphIconBox.style.transform = 'translateX(200px)';
                    setTimeout(() => {
                        morphIconBox.style.transform = 'translateX(0)';
                        searchPopout.classList.add('expanded');
                        setTimeout(() => mainSearch.focus(), 400);
                    }, 400);
                }, 300);
            }
        });
    }

    // 3-DOT MORE MENU LOGIC
    const moreTrigger = document.getElementById('more-trigger');
    const moreDropdown = document.getElementById('more-dropdown');

    moreTrigger?.addEventListener('click', (e) => {
        e.stopPropagation();
        moreDropdown.classList.toggle('active');
        moreDropdown.classList.toggle('hide');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        // Handle dropdown
        if (moreDropdown && !moreDropdown.contains(e.target) && e.target !== moreTrigger) {
            moreDropdown.classList.remove('active');
            moreDropdown.classList.add('hide');
        }
        // Handle search
        if (searchPopout && !searchPopout.contains(e.target) && e.target !== searchTrigger) {
            searchPopout.classList.remove('expanded');
            setTimeout(() => searchPopout.classList.remove('active'), 500);
        }
    });

    // ESC to close all
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchPopout?.classList.remove('expanded');
            setTimeout(() => searchPopout?.classList.remove('active'), 500);
            moreDropdown?.classList.remove('active');
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
});
