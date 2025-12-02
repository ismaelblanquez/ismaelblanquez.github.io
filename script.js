/* ============================================
   DATA LOADING & RENDERING
   ============================================ */
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        renderPage(data);
    } catch (error) {
        console.error('Error cargando datos:', error);
    }
}

function renderPage(data) {
    renderHero(data.personal);
    renderAbout(data.about);
    renderExperience(data.experiencia);
    renderEducation(data.educacion);
    renderCertifications(data.certificaciones);
    renderContact(data.personal);
}

function renderHero(personal) {
    document.getElementById('hero-nombre').textContent = personal.nombre + '.';
    document.getElementById('hero-subtitulo').textContent = 'Construyo cosas en Salesforce.';
    
    const descripcionElement = document.getElementById('hero-descripcion');
    descripcionElement.innerHTML = personal.descripcion
        .replace('Senior Salesforce Developer', '<span style="color:var(--accent)">Senior Salesforce Developer</span>')
        .replace('Nubika Cloud Solutions', '<span style="color:var(--accent)">Nubika Cloud Solutions</span>');
}

function renderAbout(about) {
    const parrafosContainer = document.getElementById('about-parrafos');
    about.parrafos.forEach(texto => {
        const p = document.createElement('p');
        p.innerHTML = texto
            .replace('Deloitte', '<strong>Deloitte</strong>')
            .replace('Inetum', '<strong>Inetum</strong>');
        parrafosContainer.appendChild(p);
    });

    const techList = document.getElementById('tech-list');
    about.tecnologias.forEach(tech => {
        const li = document.createElement('li');
        li.innerHTML = `<span>▹</span> ${tech}`;
        techList.appendChild(li);
    });
}

function renderExperience(experiencia) {
    const timeline = document.getElementById('timeline');
    
    experiencia.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        
        jobCard.innerHTML = `
            <div class="job-header">
                <h3>${job.puesto}</h3>
                <span class="company">@ ${job.empresa}</span>
                <span class="date">${job.fecha} | ${job.ubicacion}</span>
            </div>
            <div class="job-details">
                <ul>
                    ${job.responsabilidades.map(resp => 
                        `<li>${resp.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`
                    ).join('')}
                </ul>
                <div class="tech-stack-mini">
                    ${job.tecnologias.map(tech => 
                        `<span class="tech-badge">${tech}</span>`
                    ).join('')}
                </div>
            </div>
        `;
        
        timeline.appendChild(jobCard);
    });
}

function renderEducation(educacion) {
    const educationList = document.getElementById('education-list');
    
    educacion.forEach(edu => {
        const eduItem = document.createElement('div');
        eduItem.className = 'education-item';
        eduItem.innerHTML = `
            <h4>${edu.titulo}</h4>
            <p>${edu.institucion} | ${edu.periodo}</p>
        `;
        educationList.appendChild(eduItem);
    });
}

function renderCertifications(certificaciones) {
    const certList = document.getElementById('certifications-list');
    
    certificaciones.forEach(cert => {
        const certItem = document.createElement('div');
        certItem.className = 'skill-item';
        certItem.innerHTML = `
            <span class="check-icon">✔</span> ${cert}
        `;
        certList.appendChild(certItem);
    });
}

function renderContact(personal) {
    const contactEmail = document.getElementById('contact-email');
    contactEmail.href = `mailto:${personal.email}`;
    
    const socialLinks = document.getElementById('social-links');
    socialLinks.innerHTML = `
        <a href="${personal.linkedin}" target="_blank" aria-label="LinkedIn">
            <i class="fab fa-linkedin"></i>
        </a>
        <a href="${personal.github}" aria-label="GitHub">
            <i class="fab fa-github"></i>
        </a>
    `;
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
    // Load and render data first
    await loadData();
    
    // Initialize scroll animations
    initScrollAnimation();

    // Initialize particle network
    const particleNetwork = new ParticleNetwork('canvas-bg');
    particleNetwork.animate();
});
