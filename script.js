/**
 * Portfolio Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Preloader Logic
    const preloader = document.getElementById('preloader');
    const percentEl = document.getElementById('loader-percent');
    const terminalEl = document.getElementById('loader-terminal');
    const logoLarge = document.querySelector('.logo-large');

    if (preloader) {
        document.body.style.overflow = 'hidden';
        let pct = 0;

        const loaderPhrases = [
            "allocating_sys_memory...",
            "npm WARN deprecated",
            "fetching /api/v1/auth",
            "resolving dependencies",
            "compiling React components...",
            "mounting virtual DOM",
            "decrypting user_payload",
            "applying cyber_shaders.wgsl",
            "[eth0] link up, 10Gbps",
            "establishing TCP connection...",
            "reading buffer 0x00A1F...",
            "bypassing firewall protocols..."
        ];

        const loaderInterval = setInterval(() => {
            pct += Math.floor(Math.random() * 4) + 1; // Faster updates, more lines
            if (pct >= 100) {
                pct = 100;
                clearInterval(loaderInterval);

                // Final step
                if (terminalEl) {
                    const finalLine = document.createElement('div');
                    finalLine.className = 'loader-terminal-line';
                    finalLine.style.color = '#fff';
                    finalLine.innerHTML = `> [SYSTEM READY] Access Granted.`;
                    terminalEl.appendChild(finalLine);
                }

                if (logoLarge) logoLarge.classList.add('move-to-nav');

                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    setTimeout(() => {
                        document.body.style.overflow = '';
                        preloader.style.display = 'none';

                    }, 800);
                }, 1000);

                if (percentEl) {
                    percentEl.textContent = '100%';
                    percentEl.setAttribute('data-text', '100%');
                }
                return; // Stop execution so no lines append after ready
            }
            if (percentEl) {
                percentEl.textContent = pct + '%';
                percentEl.setAttribute('data-text', pct + '%'); // For glitch effect
            }

            // Append a rapid-fire terminal line
            if (terminalEl) {
                const randPhrase = loaderPhrases[Math.floor(Math.random() * loaderPhrases.length)];
                const line = document.createElement('div');
                line.className = 'loader-terminal-line';
                // User requested: coding line should only show phrase, green color. (The white/red was for the numbers/hex that were removed)
                line.innerHTML = `<span style="color: #00ff41;">> ${randPhrase}</span>`;
                terminalEl.appendChild(line);

                // Keep up to 50 lines to fill the screen to the top border
                if (terminalEl.children.length > 50) {
                    terminalEl.removeChild(terminalEl.firstChild);
                }
            }
        }, 60);
    }

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

    if (menuToggle && navLinks) {
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

    // 3. Scroll Animations (directional + legacy reveal)
    const animTargets = document.querySelectorAll(
        '.anim-slide-left, .anim-slide-right, .anim-fade-up, .anim-zoom-in, .reveal, .stagger-container, .terminal-card'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;

                // New directional animations
                if (el.classList.contains('anim-slide-left') ||
                    el.classList.contains('anim-slide-right') ||
                    el.classList.contains('anim-fade-up') ||
                    el.classList.contains('anim-zoom-in')) {
                    el.classList.add('anim-active');
                }

                // Legacy reveal
                if (el.classList.contains('reveal') ||
                    el.classList.contains('stagger-container')) {
                    el.classList.add('active');
                }

                // Terminal card typing
                if (el.classList.contains('terminal-card')) {
                    el.classList.add('anim-active');
                    setTimeout(startTerminalAnimation, 600);
                }

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.12 });

    animTargets.forEach(el => observer.observe(el));

    // Fire hero animations immediately on page load (no scroll needed)
    const heroAnimEls = document.querySelectorAll('.hero .anim-slide-left, .hero .anim-slide-right');
    setTimeout(() => {
        heroAnimEls.forEach(el => {
            el.classList.add('anim-active');
            observer.unobserve(el);
        });
    }, 300); // slight delay so preloader doesn't block it

    // 4. Parallax Hero + Scroll-Exit Effect
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const spheres = document.querySelectorAll('.glow-sphere');

    if (hero) {
        // Mouse parallax on glow spheres
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;
            spheres.forEach((s, i) => {
                const factor = i === 0 ? 1 : -1.2;
                s.style.transform = `translate(calc(-50% + ${x * factor}px), calc(-50% + ${y * factor}px))`;
            });
        });

        // Scroll-driven exit: hero fades as it naturally scrolls out of view
        window.addEventListener('scroll', () => {
            const rect = hero.getBoundingClientRect();
            const heroHeight = hero.offsetHeight;

            // How far the hero top has gone above the viewport top (negative = exiting)
            const exitDistance = -rect.top; // 0 at top, increases as you scroll
            const progress = Math.min(Math.max(exitDistance / (heroHeight * 0.5), 0), 1);

            if (heroContent) {
                heroContent.style.opacity = 1 - progress;
                heroContent.style.transform = `translateY(${progress * -50}px)`;
                heroContent.style.pointerEvents = progress > 0.9 ? 'none' : '';
            }

            spheres.forEach(s => {
                s.style.opacity = 1 - progress;
            });
        }, { passive: true });
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

    // 6. Contact Section Interaction (Expand Card)
    const contactCard = document.getElementById('contact-main-card');
    let hasTypedContact = false;

    if (contactCard) {
        contactCard.addEventListener('click', () => {
            if (contactCard.classList.contains('contact-collapsed')) {
                contactCard.classList.remove('contact-collapsed');

                // Trigger typing effect after card expands
                if (!hasTypedContact) {
                    setTimeout(() => {
                        const typingTitle = contactCard.querySelector('#typing-contact-title');
                        if (typingTitle) humanType(typingTitle, false);
                        hasTypedContact = true;
                    }, 800);
                }
            }
        });
    }

    // 7. Form Handler (Mailto Integration)
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.querySelector('#name').value;
            const message = form.querySelector('#message').value;

            // Construct the mailto link
            const subject = encodeURIComponent(`Collaboration Inquiry from ${name}`);
            const body = encodeURIComponent(`Hello Tharuki,\n\n${message}\n\n---\nName: ${name}`);
            const mailtoLink = `mailto:tharuki.fbacc@gmail.com?subject=${subject}&body=${body}`;

            const btn = form.querySelector('.submit-btn');
            const original = btn.innerHTML;

            btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> redirecting...';
            btn.disabled = true;

            setTimeout(() => {
                window.location.href = mailtoLink;
                btn.innerHTML = '<i class="bx bx-check"></i> Opening Mail...';

                form.reset();
                setTimeout(() => {
                    btn.innerHTML = original;
                    btn.disabled = false;
                }, 4000);
            }, 800);
        });
    }

    // 8. Hero Role Typewriter Cycler
    const roleTarget = document.getElementById('typing-role');
    if (roleTarget) {
        const roles = ["CREATIVE DEVELOPER", "FRONT END DEVELOPER", "UI UX DESIGNER", "PROJECT MANAGER"];
        let roleIdx = 0;
        let charIdx = 0;
        let isMoving = true;
        let direction = 1; // 1 for typing, -1 for deleting

        function typeHero() {
            const current = roles[roleIdx];

            if (direction === 1) {
                roleTarget.textContent = current.substring(0, charIdx + 1);
                charIdx++;
                if (charIdx === current.length) {
                    direction = -1;
                    setTimeout(typeHero, 2000); // Pause at full word
                    return;
                }
            } else {
                roleTarget.textContent = current.substring(0, charIdx - 1);
                charIdx--;
                if (charIdx === 0) {
                    direction = 1;
                    roleIdx = (roleIdx + 1) % roles.length;
                    setTimeout(typeHero, 500); // Pause at empty
                    return;
                }
            }

            const speed = direction === 1 ? 120 : 60;
            setTimeout(typeHero, speed);
        }

        typeHero();
    }
});
