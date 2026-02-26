/* ==========================================================================
   SHARED UTILITIES — Nuestra Historia · Yanoah & Ismael
   Funciones compartidas entre todas las páginas
   ========================================================================== */

/**
 * Inicializa el sistema de reveal con IntersectionObserver.
 * Los elementos con [data-reveal] aparecerán al hacer scroll.
 */
function initReveals() {
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    // Fallback de seguridad para iOS Safari:
    // Si la API falla, revelamos todo después de 1 segundo para evitar página en blanco
    const fallbackTimer = setTimeout(() => {
        items.forEach(item => item.classList.add('is-visible'));
    }, 1500);

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px 50px 0px' }
    );

    items.forEach((item) => observer.observe(item));

    // Si el observer se activa antes, limpiamos el fallback innecesario
    const firstReveal = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) {
            clearTimeout(fallbackTimer);
            firstReveal.disconnect();
        }
    });
    firstReveal.observe(document.body);
}

/**
 * Crea partículas flotantes en el contenedor indicado.
 * @param {HTMLElement} container - contenedor donde añadir partículas
 * @param {number} count - número de partículas
 * @param {string[]} colors - array de colores CSS
 */
function createParticles(container, count = 20, colors = ['#5d7bff', '#ff5da2', '#7affec']) {
    for (let i = 0; i < count; i++) {
        const p = document.createElement('span');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.width = p.style.height = (Math.random() * 3 + 2) + 'px';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.animationDuration = (Math.random() * 8 + 6) + 's';
        p.style.animationDelay = (Math.random() * 6) + 's';
        container.appendChild(p);
    }
}

/**
 * Efecto typewriter: escribe texto letra a letra.
 * @param {HTMLElement} element - elemento donde escribir
 * @param {string} text - texto a escribir
 * @param {number} speed - ms entre cada letra
 * @returns {Promise} se resuelve cuando termina
 */
function typeWriter(element, text, speed = 35) {
    return new Promise((resolve) => {
        let i = 0;
        element.textContent = '';
        const interval = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

/**
 * Lanza confeti desde un punto.
 * @param {HTMLElement} origin - elemento origen
 * @param {number} count - número de piezas
 */
function launchConfetti(origin, count = 30) {
    const rect = origin ? origin.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2 };
    const colors = ['#5d7bff', '#ff5da2', '#ffd700', '#7affec', '#ff6b6b', '#fff'];

    for (let i = 0; i < count; i++) {
        const piece = document.createElement('span');
        piece.style.cssText = `
      position: fixed;
      left: ${rect.left + (rect.width || 0) / 2}px;
      top: ${rect.top + (rect.height || 0) / 2}px;
      width: ${Math.random() * 8 + 4}px;
      height: ${Math.random() * 8 + 4}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      pointer-events: none;
      z-index: 10000;
    `;
        document.body.appendChild(piece);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 300 + 150;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 200;

        piece.animate(
            [
                { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
                { transform: `translate(${vx}px, ${vy + 400}px) rotate(${Math.random() * 720}deg)`, opacity: 0 },
            ],
            { duration: Math.random() * 1000 + 1200, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
        ).onfinish = () => piece.remove();
    }
}

/**
 * Calcula el tiempo restante hasta una fecha.
 * @param {Date} targetDate 
 * @returns {{ days: number, hours: number, minutes: number, passed: boolean }}
 */
function timeUntil(targetDate) {
    const now = new Date();
    const diff = targetDate - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, passed: true };
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        passed: false,
    };
}

/* Exportar para módulos (compatibilidad con scripts normales vía global) */
window.SharedUtils = {
    initReveals,
    createParticles,
    typeWriter,
    launchConfetti,
    timeUntil,
};
