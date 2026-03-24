document.addEventListener('DOMContentLoaded', () => {
    // Lock scrolling initially
    document.body.classList.add('locked');

    // Coming Soon Logic
    const overlay = document.getElementById('coming-soon-overlay');
    const devYes = document.getElementById('dev-yes');
    const devNo = document.getElementById('dev-no');
    const devCheck = document.getElementById('developer-check');
    const codePrompt = document.getElementById('code-prompt');
    const devInput = document.getElementById('dev-code');
    const submitBtn = document.getElementById('submit-code');

    const ACCESS_CODE = "192017";

    devYes.addEventListener('click', () => {
        devCheck.classList.add('hide');
        codePrompt.classList.remove('hide');
        devInput.focus();
    });

    devNo.addEventListener('click', () => {
        alert("Thanks for visiting! Please come back later after our official launch.");
    });

    const authenticate = () => {
        if (devInput.value === ACCESS_CODE) {
            overlay.classList.add('fade-out');
            document.body.classList.remove('locked');
            console.log("Access Granted. Welcome, ZERO Developer.");
        } else {
            alert("Incorrect access code. Access Denied.");
            devInput.value = "";
        }
    };

    submitBtn.addEventListener('click', authenticate);
    devInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') authenticate();
    });

    // Smooth scroll reveal / parallax (keeping refined logic)
    const fadeEls = document.querySelectorAll('.feature-n-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    fadeEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    console.log("ZERO website logic initialized");
});
