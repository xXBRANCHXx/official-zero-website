// Security portal logic is scoped to ensure functionality
const initSecurityPortal = () => {
    const overlay = document.getElementById('coming-soon-overlay');
    const devYes = document.getElementById('dev-yes');
    const devNo = document.getElementById('dev-no');
    const devCheck = document.getElementById('developer-check');
    const codePrompt = document.getElementById('code-prompt');
    const devInput = document.getElementById('dev-code');
    const submitBtn = document.getElementById('submit-code');

    const ACCESS_CODE = "192017";

    if (devYes && devCheck && codePrompt && devInput) {
        devYes.addEventListener('click', () => {
            devCheck.classList.add('hide');
            codePrompt.classList.remove('hide');
            setTimeout(() => devInput.focus(), 100);
        });
    }

    if (devNo) {
        devNo.addEventListener('click', () => {
            alert("Come back later when our new site is ready!");
        });
    }

    const authenticate = () => {
        if (devInput.value === ACCESS_CODE) {
            overlay.classList.add('fade-out');
            document.body.classList.remove('locked');
            console.log("Access granted.");
        } else {
            alert("Incorrect code.");
            devInput.value = "";
        }
    };

    if (submitBtn) submitBtn.addEventListener('click', authenticate);
    if (devInput) {
        devInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') authenticate();
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('locked');
    initSecurityPortal();

    // v4 Editorial Animations
    const revealItems = document.querySelectorAll('.n-card, .witty-h1, .floating-render, .story-card, .flv-card');
    revealItems.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealItems.forEach(el => observer.observe(el));
});
