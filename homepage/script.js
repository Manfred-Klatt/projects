// Update the current year in the footer
document.addEventListener('DOMContentLoaded', function() {
    // Detect if device is mobile (screen width < 768px)
    const isMobile = window.innerWidth < 768;

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

    // Interactive Tech Tags with Tooltips
    const techTags = document.querySelectorAll('.tech-tag[data-tooltip]');
    
    techTags.forEach(tag => {
        const level = tag.getAttribute('data-level');
        
        // Add click interaction for mobile devices
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tags
            techTags.forEach(t => t.classList.remove('tooltip-active'));
            
            // Add active class to clicked tag
            this.classList.add('tooltip-active');
            
            // Remove active class after 3 seconds
            setTimeout(() => {
                this.classList.remove('tooltip-active');
            }, 3000);
        });
        
        // Add proficiency level indicator on hover
        tag.addEventListener('mouseenter', function() {
            // Create proficiency bar if it doesn't exist
            if (!this.querySelector('.proficiency-bar')) {
                const proficiencyBar = document.createElement('div');
                proficiencyBar.className = 'proficiency-bar';
                proficiencyBar.style.cssText = `
                    position: absolute;
                    bottom: -3px;
                    left: 0;
                    height: 3px;
                    width: 0%;
                    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
                    border-radius: 0 0 12px 12px;
                    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
                `;
                this.appendChild(proficiencyBar);
                
                // Animate the bar
                setTimeout(() => {
                    proficiencyBar.style.width = `${level}%`;
                }, 10);
            }
        });
        
        tag.addEventListener('mouseleave', function() {
            const bar = this.querySelector('.proficiency-bar');
            if (bar) {
                bar.style.width = '0%';
                setTimeout(() => bar.remove(), 300);
            }
        });
        
        // Add ripple effect on click
        tag.addEventListener('mousedown', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .tooltip-active::before,
        .tooltip-active::after {
            opacity: 1 !important;
            transform: translateX(-50%) translateY(0) !important;
        }
        
        .proficiency-bar {
            animation: barGlow 2s ease-in-out infinite;
        }
        
        @keyframes barGlow {
            0%, 100% { 
                box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
            }
            50% { 
                box-shadow: 0 2px 12px rgba(139, 92, 246, 0.6);
            }
        }
    `;
    document.head.appendChild(style);

    // Resume Modal Functionality - Only load on desktop/tablet
    if (!isMobile) {
        const resumeBtn = document.getElementById('resume-btn');
        const resumeModal = document.getElementById('resume-modal');
        const resumeCloseBtn = document.querySelector('.resume-close-btn');
        const resumeOverlay = document.querySelector('.resume-modal-overlay');
        const resumeObject = document.getElementById('resume-object');
        
        // Set your resume PDF path here
        const resumePath = 'ManfredKlatt.pdf';
        
        // Open modal
        if (resumeBtn) {
            resumeBtn.addEventListener('click', () => {
                // Set the object data source with cache-busting parameter
                resumeObject.data = resumePath + '#toolbar=1&navpanes=0&scrollbar=1&view=FitH';
                
                // Add active class with slight delay for smooth animation
                setTimeout(() => {
                    resumeModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                }, 10);
            });
        }
        
        // Close modal function
        function closeResumeModal() {
            resumeModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Clear object data after animation completes
            setTimeout(() => {
                resumeObject.data = '';
            }, 400);
        }
        
        // Close button click
        if (resumeCloseBtn) {
            resumeCloseBtn.addEventListener('click', closeResumeModal);
        }
        
        // Close on overlay click
        if (resumeOverlay) {
            resumeOverlay.addEventListener('click', closeResumeModal);
        }
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
                closeResumeModal();
            }
        });
    }

    // Terminal Functionality - Only load on desktop/tablet
    if (!isMobile) {
        const terminalBtn = document.getElementById('terminal-btn');
        const terminalModal = document.getElementById('terminal-modal');
        const terminalClose = document.getElementById('terminal-close');
        const terminalInput = document.getElementById('terminal-input');
        const terminalOutput = document.getElementById('terminal-output');
        const terminalBody = document.getElementById('terminal-body');
        const terminalWindow = document.querySelector('.terminal-window');
        const terminalTitle = document.getElementById('terminal-title');
        const terminalThemeDropdown = document.getElementById('terminal-theme');

        let commandHistory = [];
        let historyIndex = -1;

    // Terminal themes
    const terminalThemes = {
        cmd: {
            title: 'cmd',
            background: '#000000',
            text: '#c0c0c0',
            prompt: '#c0c0c0',
            command: '#c0c0c0',
            success: '#c0c0c0',
            error: '#c0c0c0',
            link: '#c0c0c0'
        },
        dracula: {
            title: 'dracula',
            background: '#282a36',
            text: '#f8f8f2',
            prompt: '#bd93f9',
            command: '#8be9fd',
            success: '#50fa7b',
            error: '#ff5555',
            link: '#ff79c6'
        },
        hacker: {
            title: 'hacker',
            background: '#000000',
            text: '#00ff41',
            prompt: '#00ff41',
            command: '#00ff41',
            success: '#00ff41',
            error: '#ff0000',
            link: '#00ffff'
        },
        ubuntu: {
            title: 'ubuntu',
            background: '#300a24',
            text: '#aaaaaa',
            prompt: '#8ae234',
            command: '#aaaaaa',
            success: '#8ae234',
            error: '#ef2929',
            link: '#729fcf'
        },
        powershell: {
            title: 'ps',
            background: '#012456',
            text: '#ffffff',
            prompt: '#ffffff',
            command: '#ffffff',
            success: '#ffffff',
            error: '#ff0000',
            link: '#00ffff'
        },
        solarized: {
            title: 'solarized',
            background: '#002b36',
            text: '#839496',
            prompt: '#859900',
            command: '#268bd2',
            success: '#859900',
            error: '#dc322f',
            link: '#2aa198'
        }
    };

    // Apply terminal theme
    function applyTerminalTheme(themeName) {
        const theme = terminalThemes[themeName];
        if (!theme) return;

        // Update title
        terminalTitle.textContent = theme.title;

        // Update CSS variables
        terminalBody.style.background = theme.background;
        terminalBody.style.color = theme.text;
        
        // Update all existing output
        document.querySelectorAll('.terminal-text').forEach(el => {
            el.style.color = theme.text;
        });
        document.querySelectorAll('.terminal-prompt').forEach(el => {
            el.style.color = theme.prompt;
        });
        document.querySelectorAll('.terminal-command-hint').forEach(el => {
            el.style.color = theme.command;
        });
        document.querySelectorAll('.terminal-success').forEach(el => {
            el.style.color = theme.success;
        });
        document.querySelectorAll('.terminal-error').forEach(el => {
            el.style.color = theme.error;
        });
        document.querySelectorAll('.terminal-link').forEach(el => {
            el.style.color = theme.link;
        });
        document.querySelectorAll('.terminal-prompt-symbol').forEach(el => {
            el.style.color = theme.text;
        });

        // Update input
        terminalInput.style.color = theme.text;
        terminalInput.style.caretColor = theme.text;

        // Update scrollbar
        const style = document.createElement('style');
        style.id = 'terminal-theme-style';
        const existingStyle = document.getElementById('terminal-theme-style');
        if (existingStyle) existingStyle.remove();
        
        style.textContent = `
            .terminal-body::-webkit-scrollbar-track {
                background: ${theme.background} !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Theme dropdown change handler
    if (terminalThemeDropdown) {
        terminalThemeDropdown.addEventListener('change', (e) => {
            applyTerminalTheme(e.target.value);
        });
    }

    // Terminal commands
    const commands = {
        help: () => {
            return `<span class="terminal-success">Available Commands:</span><br>
─────────────────────────────────────────<br>
<span class="terminal-command-hint">about</span>      - Learn more about me<br>
<span class="terminal-command-hint">skills</span>     - View my technical skills<br>
<span class="terminal-command-hint">projects</span>   - See my projects<br>
<span class="terminal-command-hint">experience</span> - View my work experience<br>
<span class="terminal-command-hint">contact</span>    - Get my contact information<br>
<span class="terminal-command-hint">social</span>     - View my social media links<br>
<span class="terminal-command-hint">clear</span>      - Clear the terminal<br>
<span class="terminal-command-hint">help</span>       - Show this help message<br>
─────────────────────────────────────────`;
        },

        about: () => {
            return `Hi! I'm Manfred Klatt, a passionate software developer 
with a love for creating elegant solutions to complex 
problems. I specialize in full-stack web development 
and enjoy working with modern JavaScript frameworks.

When I'm not coding, you can find me exploring new 
technologies or working on personal projects like 
Blathers.app!`;
        },

        skills: () => {
            return `<span class="terminal-prompt">Frontend:</span>
  • JavaScript (ES6+)  • HTML5 & CSS3
  • React              • Sass/SCSS

<span class="terminal-prompt">Backend:</span>
  • Node.js            • Express.js
  • Python             • C++

<span class="terminal-prompt">Database:</span>
  • MongoDB            • SQL/NoSQL

<span class="terminal-prompt">DevOps & Tools:</span>
  • Docker             • GCP
  • Git/GitHub         • Vite`;
        },

        projects: () => {
            return `<span class="terminal-prompt">🍃 Blathers.app</span>
A web-based game where players identify creatures 
and characters from Animal Crossing: New Horizons.

<span class="terminal-text">Tech Stack:</span> Node.js, Express.js, MongoDB
<span class="terminal-text">Features:</span> User authentication, global scoreboards
<span class="terminal-text">Link:</span> <a href="https://blathers.app" target="_blank" class="terminal-link">blathers.app</a>

<span class="terminal-prompt">💼 Portfolio Website</span>
This interactive portfolio you're viewing right now!

<span class="terminal-text">Tech Stack:</span> HTML5, CSS3, JavaScript
<span class="terminal-text">Features:</span> Dark mode, interactive terminal, resume viewer`;
        },

        experience: () => {
            return `<span class="terminal-prompt">Software Developer</span> @ Blathers.app
<span class="terminal-text">2025 - Present</span>
Creator and developer of a web-based Animal Crossing 
identification game with user authentication and 
global scoreboards.

<span class="terminal-prompt">Computer Repair Technician</span> @ Griffin IT
<span class="terminal-text">03/2025 - Present</span>
Specialize in diagnosing hardware and software issues,
sourcing components, and maintaining detailed service
documentation.

<span class="terminal-prompt">Technical Support Analyst</span> @ Transcendent by Actabl
<span class="terminal-text">05/2022 - 09/2024</span>
Delivered comprehensive technical support and training
to end-users with 100% SLA resolution.`;
        },

        contact: () => {
            return `<span class="terminal-prompt">📧 Email:</span>
<a href="mailto:manfredjklatt@gmail.com" class="terminal-link">manfredjklatt@gmail.com</a>

<span class="terminal-prompt">💼 LinkedIn:</span>
<a href="https://www.linkedin.com/in/manfred-klatt-094a88161/" target="_blank" class="terminal-link">linkedin.com/in/manfred-klatt</a>

<span class="terminal-prompt">💻 GitHub:</span>
<a href="https://github.com/Manfred-Klatt" target="_blank" class="terminal-link">github.com/Manfred-Klatt</a>

Feel free to reach out!`;
        },

        social: () => {
            return `<span class="terminal-prompt">🔗 LinkedIn:</span>
<a href="https://www.linkedin.com/in/manfred-klatt-094a88161/" target="_blank" class="terminal-link">linkedin.com/in/manfred-klatt</a>

<span class="terminal-prompt">💻 GitHub:</span>
<a href="https://github.com/Manfred-Klatt" target="_blank" class="terminal-link">github.com/Manfred-Klatt</a>

<span class="terminal-prompt">🍃 Blathers.app:</span>
<a href="https://blathers.app" target="_blank" class="terminal-link">blathers.app</a>`;
        },

        clear: () => {
            terminalOutput.innerHTML = '';
            return null;
        },

        // Hidden Easter egg commands
        blathers: () => {
            window.open('https://blathers.app/game.html', '_blank');
            return `<span class="terminal-success">🍃 Opening Blathers.app game...</span>`;
        },

        idler: () => {
            window.open('https://blathers.app/idler.html', '_blank');
            return `<span class="terminal-success">🌿 Opening Blathers.app idler...</span>`;
        }
    };

    // Open terminal
    if (terminalBtn) {
        terminalBtn.addEventListener('click', () => {
            terminalModal.classList.add('active');
            setTimeout(() => {
                terminalInput.focus();
            }, 100);
        });
    }

    // Close terminal
    function closeTerminal() {
        terminalModal.classList.remove('active');
    }

    if (terminalClose) {
        terminalClose.addEventListener('click', closeTerminal);
    }

    // Close on overlay click
    terminalModal.addEventListener('click', (e) => {
        if (e.target === terminalModal) {
            closeTerminal();
        }
    });

    // Handle terminal input
    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                
                if (command) {
                    // Add command to history
                    commandHistory.push(command);
                    historyIndex = commandHistory.length;

                    // Display command
                    const commandLine = document.createElement('div');
                    commandLine.className = 'terminal-line';
                    commandLine.innerHTML = `<span class="terminal-prompt-symbol">$</span> <span class="terminal-text">${command}</span>`;
                    terminalOutput.appendChild(commandLine);

                    // Execute command
                    if (commands[command]) {
                        const result = commands[command]();
                        if (result !== null) {
                            const resultLine = document.createElement('div');
                            resultLine.className = 'terminal-line';
                            resultLine.innerHTML = result;
                            terminalOutput.appendChild(resultLine);
                        }
                    } else {
                        const errorLine = document.createElement('div');
                        errorLine.className = 'terminal-line';
                        errorLine.innerHTML = `<span class="terminal-error">Command not found: ${command}</span>\n<span class="terminal-text">Type <span class="terminal-command-hint">help</span> to see available commands.</span>`;
                        terminalOutput.appendChild(errorLine);
                    }

                    // Clear input
                    terminalInput.value = '';

                    // Scroll to bottom
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = commandHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    terminalInput.value = '';
                }
            }
        });
    }

        // Close terminal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && terminalModal.classList.contains('active')) {
                closeTerminal();
            }
        });
    }
});
