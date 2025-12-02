class PortfolioManager {
    constructor() {
        this.data = null;
        this.lastScrollTop = 0;
        this.dom = {
            loader: Utils.$('#loader'),
            navbar: Utils.$('#navbar'),
            mobileMenuBtn: Utils.$('#mobile-menu-btn'),
            navLinks: Utils.$('#nav-links'),
            canvas: Utils.$('#canvas-bg'),
            scrollProgress: null // Will be created
        };
    }

    async init() {
        try {
            await this.loadData();
            this.renderUI();
            this.createScrollProgress();
            this.initParticles();
            this.initScrollObserver();
            this.initMobileMenu();
            this.initNavbarScroll();
            this.initTypingEffect();
            this.initParallax();
            this.initTiltEffect();
            this.initSmoothScroll();
            this.hideLoader();
        } catch (error) {
            Utils.logError(error, 'Init');
            this.hideLoader();
        }
    }

    async loadData() {
        const { sourceUrl, cacheKey, cacheDuration } = APP_CONFIG.data;
        const cached = Utils.cache.get(cacheKey);
        if (cached) {
            this.data = cached;
            return;
        }
        const response = await fetch(sourceUrl);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        this.data = await response.json();
        Utils.cache.set(cacheKey, this.data, cacheDuration);
    }

    hideLoader() {
        if(this.dom.loader) {
            this.dom.loader.style.opacity = '0';
            setTimeout(() => this.dom.loader.remove(), 500);
        }
    }

    // --- UI RENDER --- //
    renderUI() {
        if (!this.data) return;
        this.renderHero();
        this.renderAbout();
        this.renderExperience();
        this.renderEducation();
        this.renderContact();
        document.title = `${this.data.personal.nombre} | ${this.data.personal.titulo}`;
    }

    renderHero() {
        const { personal } = this.data;
        Utils.$('#hero-name').textContent = `${personal.nombre}.`;
        const descHTML = Utils.highlightText(personal.descripcion, ['Salesforce', 'Apex', 'LWC', 'DevOps']);
        Utils.$('#hero-description').innerHTML = `<p>${descHTML}</p>`;
    }

    renderAbout() {
        const { about, personal } = this.data;
        const textContainer = Utils.$('#about-text-content');
        about.parrafos.forEach(p => {
            const pEl = Utils.createEl('p', '', Utils.highlightText(p, ['Deloitte', 'Inetum']));
            textContainer.appendChild(pEl);
        });

        const listContainer = Utils.$('#tech-list');
        about.tecnologias.forEach(tech => {
            const li = Utils.createEl('li', '', tech);
            listContainer.appendChild(li);
        });

        const imgSlot = Utils.$('#profile-image-slot');
        const img = document.createElement('img');
        img.src = personal.foto;
        img.alt = personal.nombre;
        img.loading = 'lazy';
        img.onerror = () => { img.src = 'https://via.placeholder.com/300x300/112240/00A1E0?text=IB'; };
        imgSlot.appendChild(img);
    }

    renderExperience() {
        const container = Utils.$('#timeline');
        this.data.experiencia.forEach((job) => {
            const card = Utils.createEl('div', 'job-card');
            const badges = job.tecnologias.map(t => `<span class="tech-tag">${t}</span>`).join('');
            const listItems = job.responsabilidades.map(r => `<li>${r}</li>`).join('');

            card.innerHTML = `
                <h3 class="job-role">${job.puesto} <span class="job-company">@ ${job.empresa}</span></h3>
                <p class="job-meta">${job.fecha} | ${job.ubicacion}</p>
                <ul class="job-responsibilities">${listItems}</ul>
                <div class="job-tech-stack">${badges}</div>
            `;
            container.appendChild(card);
        });
    }

    renderEducation() {
        const eduContainer = Utils.$('#education-list');
        this.data.educacion.forEach(edu => {
            const item = Utils.createEl('div', 'edu-item', `
                <h4>${edu.titulo}</h4>
                <span>${edu.institucion} | ${edu.periodo}</span>
            `);
            eduContainer.appendChild(item);
        });

        const certContainer = Utils.$('#certifications-list');
        this.data.certificaciones.forEach(cert => {
            const item = Utils.createEl('div', 'cert-item', `
                <i class="fas fa-check-circle"></i> <span>${cert}</span>
            `);
            certContainer.appendChild(item);
        });
    }

    renderContact() {
        const { personal } = this.data;
        Utils.$('#contact-btn').href = `mailto:${personal.email}`;
        Utils.$('#contact-desc').textContent = "Actualmente estoy abierto a nuevas oportunidades en el ecosistema Salesforce. ¡Hablemos!";

        const container = Utils.$('#social-links');
        const links = [
            { url: personal.linkedin, icon: APP_CONFIG.socialIcons.linkedin },
            { url: personal.github, icon: APP_CONFIG.socialIcons.github },
            { url: `mailto:${personal.email}`, icon: APP_CONFIG.socialIcons.email }
        ];

        links.forEach(link => {
            if(link.url && link.url !== '#') {
                const a = Utils.createEl('a', '', `<i class="${link.icon}"></i>`);
                a.href = link.url;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                container.appendChild(a);
            }
        });
    }

    // --- ADVANCED EFFECTS --- //

    /**
     * Creates scroll progress bar
     */
    createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        this.dom.scrollProgress = progressBar;

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    /**
     * Typing effect for hero subtitle
     */
    initTypingEffect() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (!subtitle) return;

        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        subtitle.appendChild(cursor);

        const typeWriter = () => {
            if (i < text.length) {
                subtitle.insertBefore(document.createTextNode(text.charAt(i)), cursor);
                i++;
                setTimeout(typeWriter, 80);
            } else {
                setTimeout(() => cursor.style.display = 'none', 1000);
            }
        };

        setTimeout(typeWriter, 1000);
    }

    /**
     * Parallax effect for hero section
     */
    initParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                hero.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }

    /**
     * Tilt effect on cards (mouse movement)
     */
    initTiltEffect() {
        const cards = document.querySelectorAll('.job-card, .card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    /**
     * Smooth scroll for anchor links
     */
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    initScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

        document.querySelectorAll('section').forEach(section => observer.observe(section));
    }

    initMobileMenu() {
        const btn = this.dom.mobileMenuBtn;
        const nav = this.dom.navLinks;
        if(btn && nav) {
            btn.addEventListener('click', () => {
                nav.classList.toggle('active');
                const isOpen = nav.classList.contains('active');
                btn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            });
            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                    btn.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
        }
    }

    initNavbarScroll() {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                this.dom.navbar.classList.add('scrolled');
            } else {
                this.dom.navbar.classList.remove('scrolled');
            }

            if (currentScroll > lastScroll && currentScroll > 500) {
                this.dom.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.dom.navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    initParticles() {
        const canvas = this.dom.canvas;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };
        let animationId = null;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.baseX = this.x;
                this.baseY = this.y;
            }
            
            update() {
                // Mouse interaction
                if (mouse.x != null && mouse.y != null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        const forceDirectionX = Math.cos(angle) * force;
                        const forceDirectionY = Math.sin(angle) * force;
                        
                        this.x -= forceDirectionX * 5;
                        this.y -= forceDirectionY * 5;
                    }
                }
                
                // Return to base position
                const dxBase = this.x - this.baseX;
                const dyBase = this.y - this.baseY;
                const distanceBase = Math.sqrt(dxBase * dxBase + dyBase * dyBase);
                
                if (distanceBase > 2) {
                    this.x -= dxBase * 0.05;
                    this.y -= dyBase * 0.05;
                }

                // Natural movement
                this.baseX += this.speedX;
                this.baseY += this.speedY;
                
                // Bounce off edges
                if (this.baseX > canvas.width || this.baseX < 0) {
                    this.speedX = -this.speedX;
                    this.baseX = Math.max(0, Math.min(canvas.width, this.baseX));
                }
                if (this.baseY > canvas.height || this.baseY < 0) {
                    this.speedY = -this.speedY;
                    this.baseY = Math.max(0, Math.min(canvas.height, this.baseY));
                }
            }
            
            draw() {
                ctx.fillStyle = 'rgba(0, 161, 224, 0.8)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // DECLARE init BEFORE resize uses it
        const init = () => {
            particles = [];
            const count = window.innerWidth < 768 ? 50 : 100;
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init(); // Now init is defined
        };

        const connect = () => {
            const maxDistance = 120;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.4;
                        ctx.strokeStyle = `rgba(0, 161, 224, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            connect();
            
            animationId = requestAnimationFrame(animate);
        };
        
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });
        
        resize(); // Initialize canvas size and particles
        animate(); // Start animation loop
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioManager();
    app.init();
});