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
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    initScrollAnimation();

    // Initialize particle network
    const particleNetwork = new ParticleNetwork('canvas-bg');
    particleNetwork.animate();
});
