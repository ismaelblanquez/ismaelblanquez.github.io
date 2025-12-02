class PortfolioManager {
    constructor() {
        this.data = null;
        this.lastScrollTop = 0; // For scroll detection
        this.dom = {
            loader: Utils.$('#loader'),
            navbar: Utils.$('#navbar'),
            mobileMenuBtn: Utils.$('#mobile-menu-btn'),
            navLinks: Utils.$('#nav-links'),
            canvas: Utils.$('#canvas-bg')
        };
    }

    async init() {
        try {
            await this.loadData();
            this.renderUI();
            this.initParticles();
            this.initScrollObserver();
            this.initMobileMenu();
            this.initNavbarScroll(); // NEW: Scroll logic
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
                container.appendChild(a);
            }
        });
    }

    // --- INTERACTIONS --- //
    
    initScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('section').forEach(section => observer.observe(section));
    }

    initMobileMenu() {
        const btn = this.dom.mobileMenuBtn;
        const nav = this.dom.navLinks;
        if(btn && nav) {
            btn.addEventListener('click', () => {
                nav.classList.toggle('active');
            });
            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => nav.classList.remove('active'));
            });
        }
    }

    // Logic to hide navbar on scroll down, show on scroll up
    initNavbarScroll() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > this.lastScrollTop && scrollTop > 100) {
                // Scroll Down
                this.dom.navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scroll Up
                this.dom.navbar.style.transform = 'translateY(0)';
            }
            this.lastScrollTop = scrollTop;
        });
    }

    initParticles() {
        const canvas = this.dom.canvas;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            }
            draw() {
                ctx.fillStyle = APP_CONFIG.particles.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            const count = window.innerWidth < 768 ? 30 : 80;
            for (let i = 0; i < count; i++) particles.push(new Particle());
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 120) {
                        ctx.beginPath();
                        const opacity = 1 - (distance / 120);
                        ctx.strokeStyle = `rgba(0, 161, 224, ${opacity * 0.5})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        };
        init();
        animate();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioManager();
    app.init();
});