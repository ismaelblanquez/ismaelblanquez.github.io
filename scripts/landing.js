/* ==========================================================================
   LANDING PAGE — Lógica de la rueda selectora
   Nuestra Historia · Yanoah & Ismael
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    /* --- Inicializar utilidades compartidas --- */
    const { initReveals, createParticles, timeUntil } = window.SharedUtils;
    initReveals();

    /* --- Partículas flotantes --- */
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        createParticles(particlesContainer, 15);
    }

    /* --- CUENTA ATRÁS para tarjetas bloqueadas --- */
    const countdownElements = document.querySelectorAll('[data-unlock-date]');

    /**
     * Actualiza los contadores de tiempo restante
     * para las tarjetas bloqueadas.
     */
    function updateCountdowns() {
        countdownElements.forEach((el) => {
            const dateStr = el.getAttribute('data-unlock-date');
            if (!dateStr) return;

            const target = new Date(dateStr + 'T00:00:00');
            const { days, hours, minutes, passed } = window.SharedUtils.timeUntil(target);
            const display = el.querySelector('.moment-card__countdown');

            if (passed) {
                /* Si ya pasó la fecha, desbloquear */
                el.classList.remove('moment-card--locked');
                el.style.opacity = '1';
                el.style.pointerEvents = 'auto';
                el.style.filter = 'none';
                if (display) display.textContent = '¡Disponible!';
                /* Quitar el candado */
                el.style.setProperty('--after-content', 'none');
            } else if (display) {
                if (days > 30) {
                    display.textContent = `Faltan ${Math.floor(days / 30)} meses y ${days % 30} días`;
                } else if (days > 0) {
                    display.textContent = `Faltan ${days} día${days !== 1 ? 's' : ''} y ${hours}h`;
                } else {
                    display.textContent = `Faltan ${hours}h ${minutes}min`;
                }
            }
        });
    }

    updateCountdowns();
    setInterval(updateCountdowns, 60000); // Actualizar cada minuto

    /* --- INDICADORES (dots) del carrusel --- */
    const track = document.querySelector('.wheel__track');
    const dots = document.querySelectorAll('.wheel__dot');
    const cards = document.querySelectorAll('.moment-card');

    if (track && dots.length) {
        /**
         * Actualiza la posición activa de los dots
         * basándose en la posición de scroll del carrusel.
         */
        function updateDots() {
            const scrollLeft = track.scrollLeft;
            const cardWidth = cards[0]?.offsetWidth || 280;
            const gap = 16;
            const index = Math.round(scrollLeft / (cardWidth + gap));

            dots.forEach((dot, i) => {
                dot.classList.toggle('is-active', i === index);
            });
        }

        track.addEventListener('scroll', updateDots, { passive: true });
        updateDots();

        /* Click en los dots para navegar */
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                const cardWidth = cards[0]?.offsetWidth || 280;
                const gap = 16;
                track.scrollTo({ left: i * (cardWidth + gap), behavior: 'smooth' });
            });
        });
    }

    /* --- Centrar la tarjeta de 8 meses al cargar (la nueva) --- */
    const newCard = document.querySelector('.moment-card--new');
    if (newCard && track) {
        setTimeout(() => {
            const cardLeft = newCard.offsetLeft;
            const trackWidth = track.offsetWidth;
            const cardWidth = newCard.offsetWidth;
            track.scrollTo({
                left: cardLeft - (trackWidth - cardWidth) / 2,
                behavior: 'smooth',
            });
        }, 800);
    }
});
