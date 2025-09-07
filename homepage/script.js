// Update the current year in the footer
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }

    // Set random procedural background for profile picture and matching name gradient
    const profileBg = document.querySelector('.profile-bg');
    const nameElement = document.querySelector('h1');
    
    const backgroundThemes = [
        {
            class: 'bg-circuit',
            gradient: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6)'
        },
        {
            class: 'bg-grid',
            gradient: 'linear-gradient(90deg, #6366f1, #8b5cf6, #6366f1)'
        },
        {
            class: 'bg-particles',
            gradient: 'linear-gradient(90deg, #7c3aed, #3b82f6, #7c3aed)'
        },
        {
            class: 'bg-waves',
            gradient: 'linear-gradient(90deg, #38bdf8, #6366f1, #38bdf8)'
        },
        {
            class: 'bg-binary',
            gradient: 'linear-gradient(90deg, #6366f1, #38bdf8, #6366f1)'
        }
    ];
    
    const selectedTheme = backgroundThemes[Math.floor(Math.random() * backgroundThemes.length)];
    profileBg.classList.add(selectedTheme.class);
    nameElement.style.backgroundImage = selectedTheme.gradient;

    // Dark Mode Toggle
    const toggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');

    // Check for saved user preference, if any, on load of the website
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            toggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }

    // Add listener for the manual toggle
    if (toggle) {
        toggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            
            // Toggle theme
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                toggle.setAttribute('aria-label', 'Switch to dark mode');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                toggle.setAttribute('aria-label', 'Switch to light mode');
            }
        });
    }

    // Check for system preference on load
    if (!currentTheme && prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (toggle) toggle.setAttribute('aria-label', 'Switch to light mode');
    }

    // Listen for changes in the system theme
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) { // Only if user hasn't set a preference
            if (e.matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
                if (toggle) toggle.setAttribute('aria-label', 'Switch to light mode');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                if (toggle) toggle.setAttribute('aria-label', 'Switch to dark mode');
            }
        }
    });
    
    // Add animation class to links after page loads
    setTimeout(() => {
        const links = document.querySelectorAll('.link-card');
        links.forEach((link, index) => {
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }, 500);
});
