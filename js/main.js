document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation (Intersection Inspector)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });

    // Read More Functionality
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const container = e.target.parentElement;
            const content = container.querySelector('.content-full');
            const preview = container.querySelector('.content-preview');

            if (container.classList.contains('expanded')) {
                // Collapse
                container.classList.remove('expanded');
                content.style.display = 'none';
                preview.style.maxHeight = '100px';
                e.target.textContent = 'Leer más...';
            } else {
                // Expand
                container.classList.add('expanded');
                content.style.display = 'block';
                preview.style.maxHeight = 'none';
                e.target.textContent = 'Leer menos';
            }
        });
    });

    // Gift Reveal Logic
    const giftBox = document.querySelector('.gift-box');
    const giftReveal = document.querySelector('.gift-reveal');
    const giftSection = document.getElementById('gift');

    if (giftBox) {
        giftBox.addEventListener('click', () => {
            // Animate box opening (scale out)
            giftBox.style.transform = 'scale(1.5) rotate(10deg)';
            giftBox.style.opacity = '0';

            setTimeout(() => {
                giftBox.style.display = 'none';
                giftReveal.style.display = 'flex';

                // Trigger Confetti
                triggerConfetti();
            }, 500);
        });
    }
});

function triggerConfetti() {
    // Simple confetti using canvas-confetti CDN if available, 
    // or we could implement a simple fallback.
    // Assuming we include the script in index.html: 
    // <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

    if (typeof confetti === 'function') {
        var duration = 3 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        var randomInOut = function (min, max) {
            return Math.random() * (max - min) + min;
        };

        var interval = setInterval(function () {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInOut(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInOut(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }
}
