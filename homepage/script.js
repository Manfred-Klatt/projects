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
    
    // Debug log to check if elements are found
    console.log('Profile background element:', profileBg);
    console.log('Name element:', nameElement);
    
    const backgroundThemes = [
        {
            class: 'bg-circuit',
            gradient: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6)'
        },
        {
            class: 'bg-grid',
            gradient: 'linear-gradient(90deg, #06b6d4, #3b82f6, #06b6d4)'
        },
        {
            class: 'bg-particles',
            gradient: 'linear-gradient(90deg, #f59e0b, #ef4444, #f59e0b)'
        },
        {
            class: 'bg-waves',
            gradient: 'linear-gradient(90deg, #10b981, #3b82f6, #10b981)'
        },
        {
            class: 'bg-binary',
            gradient: 'linear-gradient(90deg, #8b5cf6, #ec4899, #8b5cf6)'
        },
        {
            class: 'bg-circuit',
            gradient: 'linear-gradient(90deg, #f97316, #f59e0b, #f97316)' // Orange gradient
        },
        {
            class: 'bg-grid',
            gradient: 'linear-gradient(90deg, #14b8a6, #0ea5e9, #14b8a6)' // Teal to sky blue
        },
        {
            class: 'bg-particles',
            gradient: 'linear-gradient(90deg, #8b5cf6, #d946ef, #8b5cf6)' // Purple to fuchsia
        },
        {
            class: 'bg-waves',
            gradient: 'linear-gradient(90deg, #84cc16, #10b981, #84cc16)' // Lime to emerald
        },
        {
            class: 'bg-binary',
            gradient: 'linear-gradient(90deg, #ec4899, #f43f5e, #ec4899)' // Pink to rose
        }
    ];
    
    const selectedTheme = backgroundThemes[Math.floor(Math.random() * backgroundThemes.length)];
    console.log('Selected theme:', selectedTheme);
    
    // Apply the background class and gradient with error handling
    try {
        if (profileBg) {
            profileBg.classList.add(selectedTheme.class);
            // Also set the background directly as a fallback
            profileBg.style.background = selectedTheme.gradient;
            console.log('Applied background class:', selectedTheme.class);
        } else {
            console.error('Profile background element not found');
        }
        
        if (nameElement) {
            nameElement.style.backgroundImage = selectedTheme.gradient;
            console.log('Applied name gradient');
        } else {
            console.error('Name element not found');
        }
    } catch (error) {
        console.error('Error applying background:', error);
    }

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
