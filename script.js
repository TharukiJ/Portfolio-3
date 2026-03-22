/**
 * Portfolio Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Logic
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if(menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('bx-menu');
            icon.classList.toggle('bx-x');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('bx-menu');
                icon.classList.remove('bx-x');
            });
        });
    }

    // 2. Humanized Terminal Typing Engine (Dynamic & Rhythmic)
    const humanType = async (element, isCode = false) => {
        const fullContent = element.innerHTML.trim();
        element.innerHTML = '';
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        
        let currentHTML = "";
        let i = 0;
        let isTag = false;

        while (i < fullContent.length) {
            const char = fullContent[i];
            
            if (char === '<') isTag = true;
            currentHTML += char;
            if (char === '>') isTag = false;

            if (!isTag) {
                element.innerHTML = currentHTML;
                
                // Human rhythm: vary between 30ms and 100ms for commands
                // Code block (isCode=true) is faster but still rhythmic
                const baseDelay = isCode ? 10 : 40;
                const variance = isCode ? 15 : 60;
                const randomDelay = baseDelay + Math.random() * variance;
                
                // Add longer pause for commas/semicolons/braces
                const punctuationPause = (char === ';' || char === '{' || char === '}' || char === ',') ? 200 : 0;
                
                await new Promise(resolve => setTimeout(resolve, randomDelay + punctuationPause));
            }
            i++;
        }
    };

    const startTerminalAnimation = async () => {
        const terminalBody = document.querySelector('.terminal-body');
        if (!terminalBody) return;
        
        const lines = terminalBody.querySelectorAll(':scope > div');
        
        for (let line of lines) {
            const isCode = line.innerHTML.includes('<span');
            await humanType(line, isCode);
            // Wait slightly before moving to the next line
            await new Promise(resolve => setTimeout(resolve, isCode ? 200 : 500));
        }
    };

    // 3. Scroll Reveal & Intersection Observer
    const revealElements = document.querySelectorAll('.reveal, .stagger-container, .terminal-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('terminal-card')) {
                    setTimeout(startTerminalAnimation, 600);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    // 4. Parallax Hero
    const hero = document.querySelector('.hero');
    const spheres = document.querySelectorAll('.glow-sphere');
    
    if(hero) {
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;
            spheres.forEach((s, i) => {
                const factor = i === 0 ? 1 : -1.2;
                s.style.transform = `translate(calc(-50% + ${x * factor}px), calc(-50% + ${y * factor}px))`;
            });
        });
    }

    // 5. Counter Animation
    const counters = document.querySelectorAll('.count');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let now = 0;
                const totalDuration = 2000;
                const updateFreq = 20;
                const inc = target / (totalDuration / updateFreq);
                
                const timer = setInterval(() => {
                    now += inc;
                    if (now >= target) {
                        entry.target.innerText = target;
                        clearInterval(timer);
                    } else {
                        entry.target.innerText = Math.floor(now);
                    }
                }, updateFreq);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 1.0 });

    counters.forEach(c => countObserver.observe(c));

    // 6. Form Handler
    const form = document.querySelector('.contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="bx bx-check"></i> sent';
                btn.style.backgroundColor = '#27c93f';
                form.reset();
                setTimeout(() => {
                    btn.innerHTML = original;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
