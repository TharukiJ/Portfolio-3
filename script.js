/**
 * Portfolio Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Preloader Logic (Boot Sequence Upgrade)
    const preloader = document.getElementById('preloader');
    const bootTerminal = document.getElementById('boot-terminal');
    const percentEl = document.getElementById('loader-percent');

    if (preloader && bootTerminal) {
        document.body.style.overflow = 'hidden';

        // Tiny Audio Engine for Terminal Sounds
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // Browser Autoplay Policy: AudioContext must be resumed after user gesture
        document.addEventListener('click', () => {
            if (audioCtx.state === 'suspended') audioCtx.resume();
        }, { once: true });

        function playTick() {
            if (audioCtx.state === 'suspended') audioCtx.resume();

            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = 'square'; // More mechanical terminal sound
            oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); // Slightly lower frequency

            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // Significantly louder
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.08);
        }

        const bootSequence = [
            { text: "System.out.println(\"INITIALIZING_JVM...\")", accent: false },
            { text: "JVM VERSION 21.0.2+13-LTS", accent: false },
            { text: "LOADING_CLASS: THARUKI_JAYASURIYA...", accent: true },
            { text: "class Portfolio { public void init() { ... } }", accent: false },
            { text: "INSTANTIATING OBJECTS: PROJECT_CONTROLLER", accent: false },
            { text: "CHECKING_HEAP_MEMORY... [OK]", accent: false },
            { text: "GARBAGE_COLLECTOR: ACTIVE", accent: false },
            { text: "IMPORTING LIB: JAVA.UTIL.CREATIVITY", accent: true },
            { text: "SKILLSET_LOADED: NEXTJS, REACT, TYPESCRIPT", accent: false },
            { text: "MODE: FULL_STACK_DEVELOPER", accent: true },
            { text: "SCANNING ANNOTATIONS: @DEVELOPER", accent: false },
            { text: "ESTABLISHING SECURE_DATA_STREAM...", accent: false },
            { text: "COMPILING_BYTECODE_RESOURCES...", accent: true },
            { text: "CURRENT_STATUS: BUILDING_THE_FUTURE", accent: true },
            { text: "VERIFYING_SECURITY_POLICIES...", accent: false },
            { text: "System.out.println(\"ACCESS_GRANTED\");", accent: true },
            { text: "Portfolio.run();", accent: false }
        ];

        let lineIdx = 0;
        const totalLines = bootSequence.length;

        const bootInterval = setInterval(() => {
            if (lineIdx < totalLines) {
                // Play sound for new line
                try { playTick(); } catch (e) { }

                const lineData = bootSequence[lineIdx];
                const lineEl = document.createElement('div');
                lineEl.className = 'boot-line';

                lineEl.innerHTML = `<span class="${lineData.accent ? 'terminal-accent' : ''}">${lineData.text}</span>`;

                bootTerminal.appendChild(lineEl);

                // Reveal background vertical bars when class is loaded
                if (lineData.text.includes("LOADING_CLASS")) {
                    document.querySelectorAll('.bg-vertical-text').forEach(bar => {
                        bar.classList.add('visible');
                    });
                }

                // Update percentage based on lines progress
                const progress = Math.floor(((lineIdx + 1) / totalLines) * 100);
                if (percentEl) percentEl.textContent = progress + '%';

                lineIdx++;

                // Auto-scroll terminal
                bootTerminal.scrollTop = bootTerminal.scrollHeight;
            } else {
                clearInterval(bootInterval);

                // Final reveal
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    initHeroDarkBackground(); // Start interactive dark background
                    setTimeout(() => {
                        document.body.style.overflow = '';
                        preloader.style.display = 'none';
                    }, 1200);
                }, 800); // Shorter final pause
            }
        }, 160); // Faster sequence speed
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

    // 10. Interactive Dark Background Logic (Hero Section)
    function initHeroDarkBackground() {
        const hero = document.getElementById('home');
        const glow = document.getElementById('cursor-glow');
        const rainContainer = document.getElementById('code-rain-container');
        if (!hero) return;

        // 10a. Cursor Glow Follow
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (glow) {
                glow.style.left = x + 'px';
                glow.style.top = y + 'px';
            }
        });

        // 10b. Floating Code Symbols
        if (rainContainer) {
            const symbols = ['{', '}', '<', '>', '/', ';', '[]', '()', '=>', '&&', '||', '!', '?;'];
            const particles = [];
            const count = window.innerWidth < 768 ? 20 : 45;

            for (let i = 0; i < count; i++) {
                const el = document.createElement('div');
                el.className = 'floating-code-symbol';
                el.innerText = symbols[Math.floor(Math.random() * symbols.length)];

                const p = {
                    el: el,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    vx: (Math.random() - 0.5) * 0.01,
                    vy: (Math.random() - 0.5) * 0.01,
                    size: 0.8 + Math.random() * 0.4
                };

                rainContainer.appendChild(el);
                particles.push(p);
            }

            function animateRain() {
                particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    // Wrap
                    if (p.x < -5) p.x = 105;
                    if (p.x > 105) p.x = -5;
                    if (p.y < -5) p.y = 105;
                    if (p.y > 105) p.y = -5;

                    p.el.style.transform = `translate(${p.x}vw, ${p.y}vh) scale(${p.size})`;
                });
                requestAnimationFrame(animateRain);
            }
            animateRain();
        }
    }
});
