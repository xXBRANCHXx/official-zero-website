document.addEventListener('DOMContentLoaded', () => {
    const ACCESS_CODE = "192017";
    const SESSION_KEY = "zero_vault_access";
    const closeOverlay = (element) => {
        if (!element?.classList.contains('active')) return;
        element.classList.remove('expanded');
        setTimeout(() => element.classList.remove('active'), 500);
    };

    // Global Lock/Unlock Logic
    const overlay = document.getElementById('coming-soon-overlay');
    if (overlay) {
        if (sessionStorage.getItem(SESSION_KEY) === "granted") {
            overlay.style.display = 'none'; // Total removal from render stack
            document.body.classList.remove('locked');
        } else {
            document.body.classList.add('locked');
        }
    }

    // Portal UI Interaction
    const portal = {
        overlay: overlay,
        devYes: document.getElementById('dev-yes'),
        devNo: document.getElementById('dev-no'),
        devCheck: document.getElementById('developer-check'),
        codePrompt: document.getElementById('code-prompt'),
        devInput: document.getElementById('dev-code'),
        submitBtn: document.getElementById('submit-code')
    };

    portal.devYes?.addEventListener('click', () => {
        portal.devCheck.classList.add('hide');
        portal.codePrompt.classList.remove('hide');
        setTimeout(() => portal.devInput.focus(), 100);
    });

    const unlockSite = () => {
        if (portal.devInput.value === ACCESS_CODE) {
            sessionStorage.setItem(SESSION_KEY, "granted");
            portal.overlay.classList.add('fade-out');
            setTimeout(() => portal.overlay.style.display = 'none', 1000); 
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

    // Search and more menu logic
    const searchTrigger = document.getElementById('search-trigger');
    const searchPopout = document.getElementById('search-popout');
    const morphIconBox = document.getElementById('morph-icon-box');
    const mainSearch = document.getElementById('main-search');
    const closeSearch = document.getElementById('close-search');
    const moreTrigger = document.getElementById('more-trigger');
    const moreDropdown = document.getElementById('more-dropdown');

    if (searchTrigger && searchPopout && morphIconBox && mainSearch) {
        searchTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (searchPopout.classList.contains('active')) {
                closeOverlay(searchPopout);
            } else {
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

    closeSearch?.addEventListener('click', () => closeOverlay(searchPopout));

    if (moreTrigger && moreDropdown) {
        moreTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            moreDropdown.classList.toggle('active');
        });
    }

    document.addEventListener('click', (e) => {
        const clickedNode = e.target;

        if (moreDropdown && !moreDropdown.contains(clickedNode) && !moreTrigger?.contains(clickedNode)) {
            moreDropdown.classList.remove('active');
        }
        if (searchPopout && !searchPopout.contains(clickedNode) && !searchTrigger?.contains(clickedNode)) {
            closeOverlay(searchPopout);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeOverlay(searchPopout);
            moreDropdown?.classList.remove('active');
        }
    });

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    // Pinned Product Story
    const storyTrack = document.getElementById('product-story-track');
    const storyStage = document.getElementById('product-story-stage');
    const isCompactViewport = () => window.matchMedia('(max-width: 768px)').matches;

    if (storyTrack && storyStage) {
        const storyState = {
            revealProgress: 0,
            locked: false,
            touchY: null
        };

        const setStoryLock = (locked) => {
            if (storyState.locked === locked) return;
            storyState.locked = locked;
            document.documentElement.classList.toggle('story-scroll-locked', locked);
            document.body.classList.toggle('story-scroll-locked', locked);
        };

        const getStoryMetrics = () => {
            const viewportHeight = window.innerHeight || 1;
            const trackRect = storyTrack.getBoundingClientRect();
            const stageRect = storyStage.getBoundingClientRect();
            const distance = Math.max(storyTrack.offsetHeight - viewportHeight, 1);
            const scrollProgress = clamp((-trackRect.top) / distance, 0, 1);
            const stagePinned = trackRect.top <= 0 && trackRect.bottom >= viewportHeight;
            return { viewportHeight, trackRect, stageRect, scrollProgress, stagePinned };
        };

        const applyStoryVisuals = () => {
            const { scrollProgress, stagePinned } = getStoryMetrics();
            const entryProgress = clamp(scrollProgress / 0.18, 0, 1);
            const exitProgress = clamp((scrollProgress - 0.78) / 0.22, 0, 1);
            let sectionDarkness = entryProgress;

            if (stagePinned || scrollProgress > 0.18) {
                sectionDarkness = 1;
            }

            if (scrollProgress > 0.78) {
                sectionDarkness = 1 - exitProgress;
            }

            if (!stagePinned && scrollProgress < 0.08) {
                storyState.revealProgress = 0;
            }

            const revealIncomplete = storyState.revealProgress > 0 && storyState.revealProgress < 1;
            const shouldLock =
                stagePinned &&
                scrollProgress >= 0.12 &&
                scrollProgress <= 0.78 &&
                (storyState.revealProgress < 1 || revealIncomplete);

            setStoryLock(shouldLock);

            storyStage.style.setProperty('--story-progress', storyState.revealProgress.toFixed(4));
            storyStage.style.setProperty('--story-left-opacity', clamp((storyState.revealProgress - 0.18) * 3.3, 0, 1).toFixed(4));
            storyStage.style.setProperty('--story-center-opacity', clamp((storyState.revealProgress - 0.34) * 3.5, 0, 1).toFixed(4));
            storyStage.style.setProperty('--story-right-opacity', clamp((storyState.revealProgress - 0.52) * 3.5, 0, 1).toFixed(4));
            storyStage.style.setProperty('--story-syrup-opacity', clamp((storyState.revealProgress - 0.04) * 3.8, 0, 1).toFixed(4));
            storyStage.style.setProperty('--story-drops-opacity', clamp((storyState.revealProgress - 0.18) * 3.7, 0, 1).toFixed(4));
            storyStage.style.setProperty('--story-topping-opacity', clamp((storyState.revealProgress - 0.3) * 3.7, 0, 1).toFixed(4));
            storyStage.style.setProperty('--story-darkness', sectionDarkness.toFixed(4));
            storyTrack.closest('.product-story-section')?.style.setProperty('--section-darkness', sectionDarkness.toFixed(4));
        };

        const updateStoryProgress = () => {
            if (isCompactViewport()) {
                storyStage.style.setProperty('--story-progress', '1');
                storyStage.style.setProperty('--story-left-opacity', '1');
                storyStage.style.setProperty('--story-center-opacity', '1');
                storyStage.style.setProperty('--story-right-opacity', '1');
                storyStage.style.setProperty('--story-syrup-opacity', '1');
                storyStage.style.setProperty('--story-drops-opacity', '1');
                storyStage.style.setProperty('--story-topping-opacity', '1');
                storyStage.style.setProperty('--story-darkness', '0');
                storyTrack.closest('.product-story-section')?.style.setProperty('--section-darkness', '0');
                setStoryLock(false);
                return;
            }
            applyStoryVisuals();
        };

        const nudgeStoryProgress = (delta) => {
            storyState.revealProgress = clamp(storyState.revealProgress + delta, 0, 1);
            applyStoryVisuals();
        };

        const handleStoryWheel = (event) => {
            if (isCompactViewport()) return;

            const { scrollProgress, stagePinned } = getStoryMetrics();
            const inCaptureZone = stagePinned && scrollProgress >= 0.12 && scrollProgress <= 0.78;
            if (!inCaptureZone) {
                setStoryLock(false);
                return;
            }

            const movingDown = event.deltaY > 0;
            const movingUp = event.deltaY < 0;
            const step = clamp(Math.abs(event.deltaY) * 0.0012, 0.03, 0.11);

            if (movingDown && storyState.revealProgress < 1) {
                event.preventDefault();
                setStoryLock(true);
                nudgeStoryProgress(step);
                return;
            }

            if (movingUp && storyState.revealProgress > 0) {
                event.preventDefault();
                setStoryLock(true);
                nudgeStoryProgress(-step);
                return;
            }

            if (movingDown && storyState.revealProgress >= 1) {
                setStoryLock(false);
            }

            if (movingUp && storyState.revealProgress <= 0 && scrollProgress <= 0.14) {
                setStoryLock(false);
            }
        };

        const handleStoryKeydown = (event) => {
            if (isCompactViewport() || !storyState.locked) return;
            const downKeys = ['ArrowDown', 'PageDown', ' '];
            const upKeys = ['ArrowUp', 'PageUp'];

            if (downKeys.includes(event.key) && storyState.revealProgress < 1) {
                event.preventDefault();
                nudgeStoryProgress(0.09);
                return;
            }

            if (upKeys.includes(event.key) && storyState.revealProgress > 0) {
                event.preventDefault();
                nudgeStoryProgress(-0.09);
            }
        };

        const handleStoryTouchStart = (event) => {
            if (isCompactViewport()) return;
            storyState.touchY = event.touches[0]?.clientY ?? null;
        };

        const handleStoryTouchMove = (event) => {
            if (isCompactViewport() || storyState.touchY === null) return;
            const currentY = event.touches[0]?.clientY;
            if (typeof currentY !== 'number') return;

            const { scrollProgress, stagePinned } = getStoryMetrics();
            const inCaptureZone = stagePinned && scrollProgress >= 0.12 && scrollProgress <= 0.78;
            if (!inCaptureZone) {
                setStoryLock(false);
                storyState.touchY = currentY;
                return;
            }

            const deltaY = storyState.touchY - currentY;
            storyState.touchY = currentY;

            if (deltaY > 0 && storyState.revealProgress < 1) {
                event.preventDefault();
                setStoryLock(true);
                nudgeStoryProgress(clamp(Math.abs(deltaY) * 0.0035, 0.04, 0.12));
                return;
            }

            if (deltaY < 0 && storyState.revealProgress > 0) {
                event.preventDefault();
                setStoryLock(true);
                nudgeStoryProgress(-clamp(Math.abs(deltaY) * 0.0035, 0.04, 0.12));
                return;
            }

            setStoryLock(false);
        };

        updateStoryProgress();
        window.addEventListener('scroll', updateStoryProgress, { passive: true });
        window.addEventListener('resize', updateStoryProgress);
        window.addEventListener('wheel', handleStoryWheel, { passive: false });
        window.addEventListener('keydown', handleStoryKeydown);
        window.addEventListener('touchstart', handleStoryTouchStart, { passive: true });
        window.addEventListener('touchmove', handleStoryTouchMove, { passive: false });
    }

    // Pronounced but lightweight parallax layers
    const parallaxLayers = Array.from(document.querySelectorAll('[data-parallax]'));
    if (parallaxLayers.length) {
        let rafId = 0;

        const updateParallax = () => {
            rafId = 0;
            const viewportHeight = window.innerHeight || 1;

            parallaxLayers.forEach((layer) => {
                const rect = layer.parentElement?.getBoundingClientRect();
                if (!rect) return;

                const centerOffset = (rect.top + rect.height / 2) - viewportHeight / 2;
                const normalized = Math.max(-1.3, Math.min(1.3, centerOffset / viewportHeight));
                const speed = Number(layer.dataset.parallaxSpeed || 0.3);
                const scale = Number(layer.dataset.parallaxScale || 1.32);
                const translateY = normalized * viewportHeight * speed * -1;
                const image = layer.querySelector('.parallax-image');

                if (image) {
                    image.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale})`;
                }
            });
        };

        const requestParallaxFrame = () => {
            if (rafId) return;
            rafId = window.requestAnimationFrame(updateParallax);
        };

        updateParallax();
        window.addEventListener('scroll', requestParallaxFrame, { passive: true });
        window.addEventListener('resize', requestParallaxFrame);
    }

    // Transition Revealer
    const revealItems = document.querySelectorAll('.n-card, .dark-accent-card, .hero-h1, .hero-p, .flv-card-min, .metric-strip, .feature-wireframe, .showcase-panel, .journey-card, .timeline-card, .footer-shell');
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
