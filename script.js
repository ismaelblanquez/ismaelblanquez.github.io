/* ============================================
   DATA LOADING & RENDERING
   ============================================ */
class PortfolioApp {
    constructor() {
        this.data = null;
        this.particleNetwork = null;
    }

    async init() {
        try {
            Utils.log.info('Inicializando aplicación...');
            
            // Cargar datos
            await this.loadData();
            
            // Renderizar contenido
            this.renderPage();
            
            // Inicializar animaciones
            this.initScrollAnimation();
            this.initParticles();
            
            // Inicializar navegación suave
            this.initSmoothScroll();
            
            Utils.log.info('Aplicación inicializada correctamente');
        } catch (error) {
            Utils.handleError(error, 'PortfolioApp.init');
        }
    }

    async loadData() {
        const cacheKey = 'portfolio_data';
        
        // Intentar obtener de cache
        if (APP_CONFIG.data.cacheEnabled) {
            const cachedData = Utils.cache.get(cacheKey);
            if (cachedData) {
                Utils.log.info('Datos cargados desde cache');
                this.data = cachedData;
                return;
            }
        }

        try {
            const response = await fetch(APP_CONFIG.data.sourceFile);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.data = await response.json();
            
            // Guardar en cache
            if (APP_CONFIG.data.cacheEnabled) {
                Utils.cache.set(cacheKey, this.data);
            }
            
            Utils.log.info('Datos cargados correctamente');
        } catch (error) {
            Utils.handleError(error, 'loadData');
            throw error;
        }
    }

    renderPage() {
        if (!this.data) {
            Utils.log.error('No hay datos para renderizar');
            return;
        }

        this.renderHero(this.data.personal);
        this.renderAbout(this.data.about);
        this.renderExperience(this.data.experiencia);
        this.renderEducation(this.data.educacion);
        this.renderCertifications(this.data.certificaciones);
        this.renderContact(this.data.personal);
        this.updateSEO(this.data.personal);
    }

    renderHero(personal) {
        const heroNombre = document.getElementById('hero-nombre');
        const heroSubtitulo = document.getElementById('hero-subtitulo');
        const heroDescripcion = document.getElementById('hero-descripcion');

        if (heroNombre) heroNombre.textContent = personal.nombre + '.';
        if (heroSubtitulo) heroSubtitulo.textContent = APP_CONFIG.texts.hero.subtitle;
        
        if (heroDescripcion) {
            const keywords = ['Senior Salesforce Developer', 'Salesforce', 'Apex', 'LWC', 'DevOps'];
            heroDescripcion.innerHTML = Utils.highlightKeywords(
                personal.descripcion,
                keywords
            );
        }
    }

    renderAbout(about) {
        const parrafosContainer = document.getElementById('about-parrafos');
        if (!parrafosContainer) return;

        parrafosContainer.innerHTML = '';
        about.parrafos.forEach(texto => {
            const p = Utils.createElement('p', '', 
                Utils.highlightKeywords(texto, ['Deloitte', 'Inetum'])
            );
            parrafosContainer.appendChild(p);
        });

        const techList = document.getElementById('tech-list');
        if (!techList) return;

        techList.innerHTML = '';
        about.tecnologias.forEach(tech => {
            const li = Utils.createElement('li', '', 
                `<span>▹</span> ${Utils.sanitizeHTML(tech)}`
            );
            techList.appendChild(li);
        });

        // Renderizar foto de perfil
        this.renderProfileImage();
    }

    renderProfileImage() {
        console.log('=== RENDERIZANDO IMAGEN DE PERFIL ===');
        
        const imageContainer = document.querySelector('.about-image');
        
        if (!imageContainer || !this.data.personal.foto) return;

        imageContainer.innerHTML = '';

        // VERSION CON ESTILOS INLINE PARA DEBUGGING
        const imgWrapper = document.createElement('div');
        imgWrapper.style.cssText = `
            position: relative;
            width: 300px;
            height: 300px;
            margin: 0 auto;
            border: 3px solid red;
            background: yellow;
        `;

        const img = document.createElement('img');
        img.src = this.data.personal.foto;
        img.alt = `Foto de perfil de ${this.data.personal.nombre}`;
        img.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        `;
        
        img.addEventListener('load', () => {
            console.log('✅ Imagen cargada exitosamente!');
        });

        img.addEventListener('error', (e) => {
            console.error('❌ Error al cargar la imagen');
        });

        imgWrapper.appendChild(img);
        imageContainer.appendChild(imgWrapper);
        
        console.log('Imagen agregada al DOM con estilos inline');
    }

    renderExperience(experiencia) {
        const timeline = document.getElementById('timeline');
        if (!timeline) return;

        timeline.innerHTML = '';
        
        experiencia.forEach((job, index) => {
            const jobCard = Utils.createElement('div', 'job-card');
            jobCard.style.animationDelay = `${index * 0.1}s`;
            
            const responsabilidadesList = job.responsabilidades
                .map(resp => `<li>${Utils.sanitizeHTML(resp)}</li>`)
                .join('');

            const tecnologiasBadges = job.tecnologias
                .map(tech => `<span class="tech-badge">${Utils.sanitizeHTML(tech)}</span>`)
                .join('');
            
            jobCard.innerHTML = `
                <div class="job-header">
                    <h3>${Utils.sanitizeHTML(job.puesto)}</h3>
                    <span class="company">@ ${Utils.sanitizeHTML(job.empresa)}</span>
                    <span class="date">${Utils.sanitizeHTML(job.fecha)} | ${Utils.sanitizeHTML(job.ubicacion)}</span>
                </div>
                <div class="job-details">
                    <ul>${responsabilidadesList}</ul>
                    <div class="tech-stack-mini">${tecnologiasBadges}</div>
                </div>
            `;
            
            timeline.appendChild(jobCard);
        });
    }

    renderEducation(educacion) {
        const educationList = document.getElementById('education-list');
        if (!educationList) return;

        educationList.innerHTML = '';
        
        educacion.forEach(edu => {
            const eduItem = Utils.createElement('div', 'education-item', `
                <h4>${Utils.sanitizeHTML(edu.titulo)}</h4>
                <p>${Utils.sanitizeHTML(edu.institucion)} | ${Utils.sanitizeHTML(edu.periodo)}</p>
            `);
            educationList.appendChild(eduItem);
        });
    }

    renderCertifications(certificaciones) {
        const certList = document.getElementById('certifications-list');
        if (!certList) return;

        certList.innerHTML = '';
        
        certificaciones.forEach(cert => {
            const certItem = Utils.createElement('div', 'skill-item', `
                <span class="check-icon">✔</span> ${Utils.sanitizeHTML(cert)}
            `);
            certList.appendChild(certItem);
        });
    }

    renderContact(personal) {
        const contactEmail = document.getElementById('contact-email');
        if (contactEmail && Utils.isValidEmail(personal.email)) {
            contactEmail.href = `mailto:${personal.email}`;
        }
        
        const socialLinks = document.getElementById('social-links');
        if (!socialLinks) return;

        const links = [];
        
        if (personal.linkedin) {
            links.push(`
                <a href="${personal.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i class="${APP_CONFIG.social.icons.linkedin}"></i>
                </a>
            `);
        }
        
        if (personal.github && personal.github !== '#') {
            links.push(`
                <a href="${personal.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <i class="${APP_CONFIG.social.icons.github}"></i>
                </a>
            `);
        }

        socialLinks.innerHTML = links.join('');
    }

    updateSEO(personal) {
        // Actualizar título
        document.title = `${personal.nombre} ${APP_CONFIG.seo.titleSeparator} ${personal.titulo}`;
        
        // Actualizar meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = APP_CONFIG.seo.description;

        // Actualizar meta keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = 'keywords';
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.content = APP_CONFIG.seo.keywords;
    }

    initScrollAnimation() {
        const sections = document.querySelectorAll('section');
        const observerOptions = {
            threshold: APP_CONFIG.animations.scrollThreshold,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Opcional: dejar de observar después de ser visible
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    initParticles() {
        this.particleNetwork = new ParticleNetwork('canvas-bg');
        this.particleNetwork.animate();
    }

    initSmoothScroll() {
        if (!APP_CONFIG.navigation.smoothScroll) return;

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const targetId = href.substring(1);
                Utils.smoothScrollTo(targetId);
            });
        });
    }
}

/* ============================================
   SCROLL ANIMATION (Intersection Observer)
   ============================================ */
function initScrollAnimation() {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/* ============================================
   CANVAS PARTICLE NETWORK ANIMATION
   ============================================ */
class ParticleNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particlesArray = [];
        this.mouse = {
            x: null,
            y: null,
            radius: 0
        };

        this.init();
        this.setupEventListeners();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.mouse.radius = (this.canvas.height / 80) * (this.canvas.width / 80);
        
        this.createParticles();
    }

    createParticles() {
        this.particlesArray = [];
        const numberOfParticles = (this.canvas.height * this.canvas.width) / 9000;
        
        for (let i = 0; i < numberOfParticles; i++) {
            const size = (Math.random() * 2) + 1;
            const x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            const y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            const directionX = (Math.random() * 1) - 0.5;
            const directionY = (Math.random() * 1) - 0.5;
            
            this.particlesArray.push(new Particle(
                x, y, directionX, directionY, size, this.canvas, this.mouse
            ));
        }
    }

    setupEventListeners() {
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = event.x;
            this.mouse.y = event.y;
        });

        window.addEventListener('resize', () => {
            this.canvas.width = innerWidth;
            this.canvas.height = innerHeight;
            this.mouse.radius = (this.canvas.height / 80) * (this.canvas.width / 80);
            this.init();
        });
    }

    connect() {
        for (let a = 0; a < this.particlesArray.length; a++) {
            for (let b = a; b < this.particlesArray.length; b++) {
                const dx = this.particlesArray[a].x - this.particlesArray[b].x;
                const dy = this.particlesArray[a].y - this.particlesArray[b].y;
                const distance = dx * dx + dy * dy;
                
                if (distance < (this.canvas.width / 7) * (this.canvas.height / 7)) {
                    const opacityValue = 1 - (distance / 20000);
                    this.ctx.strokeStyle = `rgba(0, 161, 224, ${opacityValue})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particlesArray[a].x, this.particlesArray[a].y);
                    this.ctx.lineTo(this.particlesArray[b].x, this.particlesArray[b].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);
        
        for (let i = 0; i < this.particlesArray.length; i++) {
            this.particlesArray[i].update();
        }
        
        this.connect();
    }
}

/* ============================================
   PARTICLE CLASS
   ============================================ */
class Particle {
    constructor(x, y, directionX, directionY, size, canvas, mouse) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.canvas = canvas;
        this.mouse = mouse;
    }

    draw() {
        const ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#00A1E0';
        ctx.fill();
    }

    update() {
        // Boundary check
        if (this.x > this.canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > this.canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Mouse collision detection
        const dx = this.mouse.x - this.x;
        const dy = this.mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius + this.size) {
            if (this.mouse.x < this.x && this.x < this.canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (this.mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (this.mouse.y < this.y && this.y < this.canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (this.mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;
        
        this.draw();
    }
}

/* ============================================
   INITIALIZE APPLICATION
   ============================================ */
document.addEventListener('DOMContentLoaded', async () => {
    const app = new PortfolioApp();
    await app.init();
});
