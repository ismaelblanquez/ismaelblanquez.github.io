/* ==========================================================================
   8 MESES — Lógica Interactiva v3
   Nuestra Historia · Yanoah & Ismael
   Playlist reemplazada por: Vision Board, Love Quiz, Wish Lanterns
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const { initReveals, createParticles, typeWriter, launchConfetti } = window.SharedUtils;

    /* =============================================
       1. INTRO CINEMÁTICA
       ============================================= */
    const introScreen = document.querySelector('.intro-screen');
    const introBtn = document.querySelector('.intro-screen__cta');

    function createIntroHearts() {
        const container = document.querySelector('.intro-screen__hearts');
        if (!container) return;
        const emojis = ['❤️', '💕', '💗', '🦆', '✨', '🌹'];
        for (let i = 0; i < 15; i++) {
            const h = document.createElement('span');
            h.className = 'intro-heart';
            h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            h.style.left = Math.random() * 100 + '%';
            h.style.animationDuration = (Math.random() * 6 + 8) + 's';
            h.style.animationDelay = (Math.random() * 4) + 's';
            h.style.fontSize = (Math.random() * 14 + 14) + 'px';
            container.appendChild(h);
        }
    }
    createIntroHearts();

    if (introBtn) {
        introBtn.addEventListener('click', () => {
            introScreen.classList.add('is-hidden');
            document.body.style.overflow = '';
            setTimeout(() => {
                introScreen.style.display = 'none';
                initAllAnimations();
            }, 1200);
        });
        document.body.style.overflow = 'hidden';
    } else {
        initAllAnimations();
    }

    /* =============================================
       2. INICIALIZAR TODO POST-INTRO
       ============================================= */
    function initAllAnimations() {
        initReveals();
        initReadingProgress();
        initStories();
        initDictionary();
        initScratchCards();
        initVisionBoard();
        initLoveQuiz();
        initWishLanterns();
        initPlaylist();
        initPromiseJar();
        initOceanLetter();
        initYearProgress();
        initGalaxyFinale();

        const particlesContainer = document.querySelector('.particles');
        if (particlesContainer) createParticles(particlesContainer, 18);
    }

    /* =============================================
       3. BARRA DE LECTURA
       ============================================= */
    function initReadingProgress() {
        const bar = document.querySelector('.reading-progress__bar');
        if (!bar) return;
        window.addEventListener('scroll', () => {
            const s = window.scrollY;
            const d = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = (d > 0 ? (s / d) * 100 : 0) + '%';
        }, { passive: true });
    }

    /* =============================================
       4. STORIES — Modo Instagram tap-through
       ============================================= */
    function initStories() {
        const slides = document.querySelectorAll('.story-slide');
        const segments = document.querySelectorAll('.stories-progress__segment');
        const prevZone = document.querySelector('.stories-touch--prev');
        const nextZone = document.querySelector('.stories-touch--next');
        if (!slides.length) return;

        let currentSlide = 0;
        let autoTimer = null;
        const SLIDE_DURATION = 6000;

        function showSlide(index) {
            if (index < 0) index = 0;
            if (index >= slides.length) index = slides.length - 1;
            currentSlide = index;

            slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
            segments.forEach((seg, i) => {
                seg.classList.remove('is-active', 'is-done');
                if (i < index) seg.classList.add('is-done');
                if (i === index) seg.classList.add('is-active');
            });

            clearTimeout(autoTimer);
            if (index < slides.length - 1) {
                autoTimer = setTimeout(() => showSlide(index + 1), SLIDE_DURATION);
            }
        }

        if (nextZone) nextZone.addEventListener('click', () => showSlide(currentSlide + 1));
        if (prevZone) prevZone.addEventListener('click', () => showSlide(currentSlide - 1));

        let touchStartX = 0;
        const container = document.querySelector('.stories-container');
        if (container) {
            container.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            }, { passive: true });
            container.addEventListener('touchend', (e) => {
                const diff = touchStartX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 40) {
                    diff > 0 ? showSlide(currentSlide + 1) : showSlide(currentSlide - 1);
                }
            });
        }

        showSlide(0);
    }

    /* =============================================
       5. DICCIONARIO
       ============================================= */
    function initDictionary() {
        const entries = document.querySelectorAll('.dict-entry');
        entries.forEach((entry) => {
            entry.addEventListener('click', () => {
                entries.forEach((e) => { if (e !== entry) e.classList.remove('is-open'); });
                entry.classList.toggle('is-open');
            });
        });
    }

    /* =============================================
       6. SCRATCH CARDS
       ============================================= */
    function initScratchCards() {
        const cards = document.querySelectorAll('.scratch-card');
        cards.forEach((card) => {
            let touchCount = 0;

            function revealCard() {
                card.classList.add('is-revealed');
                launchConfetti(card, 15);
            }

            card.addEventListener('click', () => {
                touchCount++;
                if (touchCount >= 2) revealCard();
            });

            let touching = false;
            card.addEventListener('touchstart', () => { touching = true; touchCount++; }, { passive: true });
            card.addEventListener('touchmove', () => {
                if (touching) { touchCount++; if (touchCount >= 5) revealCard(); }
            }, { passive: true });
            card.addEventListener('touchend', () => { touching = false; });
        });
    }

    /* =============================================
       7. VISION BOARD — Tarjetas con tilt 3D
       ============================================= */
    function initVisionBoard() {
        const cards = document.querySelectorAll('.vision-card[data-tilt]');
        cards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;
                card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });

            /* Para móvil: toggle texto al tocar */
            card.addEventListener('touchstart', () => {
                cards.forEach(c => { if (c !== card) c.classList.remove('is-touched'); });
                card.classList.toggle('is-touched');
            }, { passive: true });
        });
    }

    /* =============================================
       8. LOVE QUIZ — Juego interactivo
       ============================================= */
    function initLoveQuiz() {
        const questions = [
            {
                q: '¿Qué día del mes celebramos nuestro mesniversario?',
                options: ['El 14', 'El 27', 'El 1', 'El 25'],
                correct: 1
            },
            {
                q: '¿Cuál es nuestra palabra secreta para "para siempre"?',
                options: ['Loveyou', 'Siempre juntos', 'Patdoalavida', 'Infinito'],
                correct: 2
            },
            {
                q: '¿Qué animal nos representa?',
                options: ['Un gato', 'Un oso', 'Un pato 🦆', 'Una mariposa'],
                correct: 2
            },
            {
                q: '¿Qué decimos sobre la base de nuestra relación?',
                options: ['Sobre la arena', 'Sobre la roca', 'Sobre las nubes', 'Sobre el amor'],
                correct: 1
            },
            {
                q: '¿Cómo decimos que avanzamos en la relación?',
                options: ['A lo loco', 'A pasitos de tortuga 🐢', 'A mil por hora', 'Sin pensar'],
                correct: 1
            }
        ];

        let currentQ = 0;
        let score = 0;

        const quizCard = document.getElementById('quizCard');
        const quizResult = document.getElementById('quizResult');
        const quizQuestion = document.getElementById('quizQuestion');
        const quizOptions = document.getElementById('quizOptions');
        const quizCurrent = document.getElementById('quizCurrent');
        const quizProgressFill = document.getElementById('quizProgressFill');
        const quizRetry = document.getElementById('quizRetry');

        if (!quizCard) return;

        function renderQuestion() {
            const q = questions[currentQ];
            quizCurrent.textContent = currentQ + 1;
            quizProgressFill.style.width = ((currentQ + 1) / questions.length * 100) + '%';
            quizQuestion.textContent = q.q;
            quizOptions.innerHTML = '';

            q.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.className = 'quiz-option';
                btn.textContent = opt;
                btn.addEventListener('click', () => handleAnswer(i, btn));
                quizOptions.appendChild(btn);
            });
        }

        function handleAnswer(index, btn) {
            const q = questions[currentQ];
            const allBtns = quizOptions.querySelectorAll('.quiz-option');
            allBtns.forEach(b => b.disabled = true);

            if (index === q.correct) {
                btn.classList.add('is-correct');
                score++;
                launchConfetti(btn, 12);
            } else {
                btn.classList.add('is-wrong');
                allBtns[q.correct].classList.add('is-correct');
            }

            setTimeout(() => {
                currentQ++;
                if (currentQ < questions.length) {
                    renderQuestion();
                } else {
                    showResult();
                }
            }, 1200);
        }

        function showResult() {
            quizCard.style.display = 'none';
            quizResult.style.display = '';

            const resultEmoji = document.getElementById('quizResultEmoji');
            const resultTitle = document.getElementById('quizResultTitle');
            const resultText = document.getElementById('quizResultText');

            if (score === 5) {
                resultEmoji.textContent = '🏆';
                resultTitle.textContent = '¡Perfecta! 5/5';
                resultText.textContent = '¡Lo sabes TODO sobre nosotros! Eres la mejor, mi princesa preciosa. Me conoces como nadie.';
                launchConfetti(quizResult, 50);
            } else if (score >= 3) {
                resultEmoji.textContent = '💕';
                resultTitle.textContent = `¡Casi! ${score}/5`;
                resultText.textContent = 'Nos conoces muy bien, pero aún hay cositas que aprender juntos. ¡Eso hace la relación más divertida!';
            } else {
                resultEmoji.textContent = '🦆';
                resultTitle.textContent = `${score}/5 — Hay que repasar`;
                resultText.textContent = 'Bueno… esto significa que tenemos que pasar más tiempo juntos. ¿Qué mejor excusa? 😏';
            }
        }

        quizRetry?.addEventListener('click', () => {
            currentQ = 0;
            score = 0;
            quizCard.style.display = '';
            quizResult.style.display = 'none';
            renderQuestion();
        });

        renderQuestion();
    }

    /* =============================================
       9. WISH LANTERNS — Farolillos inmersivos
       ============================================= */
    function initWishLanterns() {
        const sky = document.getElementById('lanternSky');
        const input = document.getElementById('lanternInput');
        const btn = document.getElementById('lanternBtn');
        const presets = document.querySelectorAll('.lantern-preset');

        if (!sky || !input || !btn) return;

        function launchLantern(wish) {
            const lantern = document.createElement('div');
            lantern.className = 'floating-lantern';

            // Cuerpo del farolillo 3D
            const body = document.createElement('div');
            body.className = 'floating-lantern__body';

            const flame = document.createElement('div');
            flame.className = 'floating-lantern__flame';
            body.appendChild(flame);

            // Cuerdita
            const string = document.createElement('div');
            string.className = 'floating-lantern__string';

            // Texto del deseo
            const wishText = document.createElement('span');
            wishText.className = 'floating-lantern__wish';
            wishText.textContent = wish;

            lantern.appendChild(body);
            lantern.appendChild(string);
            lantern.appendChild(wishText);

            /* Posición aleatoria horizontal inicio */
            const xPos = 10 + Math.random() * 80;
            lantern.style.left = xPos + '%';

            /* Animaciones y profundidad (3D perspective) */
            // Escala inicial (los que están "detrás" son más pequeños)
            const startScale = 0.6 + Math.random() * 0.6; // 0.6 a 1.2
            // Escala final (siempre más pequeña que la inicial simulando que se aleja)
            const endScale = startScale * 0.3;
            // Balanceo horizontal
            const drift = (Math.random() - 0.5) * 150;
            // Rotación por el viento
            const rot = (Math.random() - 0.5) * 30;

            lantern.style.setProperty('--start-scale', startScale);
            lantern.style.setProperty('--end-scale', endScale);
            lantern.style.setProperty('--drift', drift + 'px');
            lantern.style.setProperty('--rot', rot + 'deg');

            /* Duración aleatoria para que unos suban más lento que otros */
            const duration = 12 + Math.random() * 10; // 12 a 22 segundos
            lantern.style.animationDuration = duration + 's';

            sky.appendChild(lantern);

            /* Eliminar después de la animación */
            setTimeout(() => lantern.remove(), duration * 1000);
        }

        btn.addEventListener('click', () => {
            const wish = input.value.trim();
            if (wish) {
                launchLantern(wish);
                input.value = '';
            }
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') btn.click();
        });

        presets.forEach((preset) => {
            preset.addEventListener('click', () => {
                const wish = preset.getAttribute('data-wish');
                launchLantern(wish);
            });
        });

        /* Lanzar farolillos iniciales para dar vida */
        setTimeout(() => launchLantern('Patdoalavida 🦆'), 1000);
        setTimeout(() => launchLantern('Que seamos muy felices ❤️'), 3500);
        setTimeout(() => launchLantern('Un viaje a Japón 🗼'), 7000);
    }

    /* =============================================
       9b. PLAYLIST — Spotify-style track details
       ============================================= */
    function initPlaylist() {
        const vinylDisc = document.getElementById('vinylDisc');
        const vinylEmoji = document.getElementById('vinylEmoji');
        const vinylArm = document.querySelector('.vinyl__arm');
        const nowPlaying = document.getElementById('nowPlaying');
        const npTitle = document.getElementById('npTitle');
        const npArtist = document.getElementById('npArtist');
        const npDetail = document.getElementById('npDetail');
        const trackChips = document.querySelectorAll('.track-chip');

        let isPlaying = true; // Empieza girando
        let currentTimeout;

        if (!trackChips.length || !vinylDisc) return;

        // Iniciar estado: vinilo girando
        vinylArm?.classList.add('is-playing');

        // Pausar/reproducir al hacer click en el vinilo o now-playing
        const togglePlay = () => {
            isPlaying = !isPlaying;
            if (isPlaying) {
                vinylDisc.classList.remove('is-paused');
                nowPlaying?.classList.remove('is-paused');
                vinylArm?.classList.add('is-playing');
            } else {
                vinylDisc.classList.add('is-paused');
                nowPlaying?.classList.add('is-paused');
                vinylArm?.classList.remove('is-playing');
            }
        };

        vinylDisc.parentElement.addEventListener('click', togglePlay);
        nowPlaying?.addEventListener('click', togglePlay);

        // Cambiar pista
        trackChips.forEach(chip => {
            chip.addEventListener('click', () => {
                if (chip.classList.contains('is-active')) return;

                // Animación de aguja al cambiar
                vinylArm?.classList.remove('is-playing');
                clearTimeout(currentTimeout);

                const title = chip.dataset.title;
                const artist = chip.dataset.artist;
                const detail = chip.dataset.detail;
                const emoji = chip.dataset.emoji;

                // Actualizar interfaz
                trackChips.forEach(c => c.classList.remove('is-active'));
                chip.classList.add('is-active');

                // Mover el scroll al chip activo
                chip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

                // Efecto de desvanecimiento suave para el texto y cambio
                if (nowPlaying) {
                    nowPlaying.style.opacity = '0.5';
                    currentTimeout = setTimeout(() => {
                        if (npTitle) npTitle.textContent = title;
                        if (npArtist) npArtist.textContent = artist;
                        if (npDetail) npDetail.textContent = detail;
                        if (vinylEmoji) vinylEmoji.textContent = emoji;
                        nowPlaying.style.opacity = '1';

                        // Si estaba girando, volver la aguja
                        if (isPlaying) {
                            vinylArm?.classList.add('is-playing');
                        }
                    }, 300);
                }

                // Asegurarse de que esté reproduciendo al seleccionar una pista nueva
                if (!isPlaying) togglePlay();
            });
        });
    }

    /* =============================================
       10. PROMISE JAR — Tarro de promesas
       ============================================= */
    function initPromiseJar() {
        const papers = document.querySelectorAll('.jar-paper');
        const reveal = document.querySelector('.paper-reveal');
        const revealText = reveal?.querySelector('.paper-reveal__text');
        const revealIcon = reveal?.querySelector('.paper-reveal__icon');
        const revealClose = reveal?.querySelector('.paper-reveal__close');

        papers.forEach((paper) => {
            paper.addEventListener('click', () => {
                const msg = paper.getAttribute('data-promise');
                const icon = paper.getAttribute('data-icon') || '💌';
                if (revealText) revealText.textContent = msg;
                if (revealIcon) revealIcon.textContent = icon;
                if (reveal) reveal.classList.add('is-visible');
            });
        });

        revealClose?.addEventListener('click', () => {
            reveal.classList.remove('is-visible');
        });

        reveal?.addEventListener('click', (e) => {
            if (e.target === reveal) reveal.classList.remove('is-visible');
        });
    }

    /* =============================================
       11. OCEAN LETTER — Mensaje en la botella
       ============================================= */
    function initOceanLetter() {
        const bottle = document.querySelector('.bottle');
        const seaLetter = document.querySelector('.sea-letter');
        const letterBody = document.querySelector('.sea-letter__body');
        const letterCursor = document.querySelector('.sea-letter__cursor');
        const letterSignature = document.querySelector('.sea-letter__signature');
        let letterOpened = false;

        const letterMessage = `8 meses ya, mi princesa preciosa…

¿Quién nos lo iba a decir? Si me llegan a decir hace un año que mi vida iba a cambiar así, con el corazón tan lleno y con una mujer tan increíble a mi lado, no me lo hubiera creído.

Y aquí estamos. Más cerca del año que del inicio, más enamorado que nunca, más seguro de que eres tú.

Este mes ha sido de todo: la boda, los ensayos, cantar contigo, los nervios, las emociones… pero cada momento a tu lado ha merecido la pena. Y pagaría por volver a repetir cada uno.

Quiero que sepas algo: no tengo ninguna razón para dejarte. Ninguna. Y sí tengo un millón para quedarme contigo. Mi meta eres tú, formar esa familia contigo, servir a Dios a tu lado.

Te pido perdón si te he fallado, si no he llegado a lo que mereces. Quiero estar siempre a la altura. Y cuando no lo esté, quiero que seas capaz de perdonarme, porque te prometo que cada día me esfuerzo por ti.

Esto ya es para siempre, te guste o no. Patdoalavida. 🦆

Te amo con locura, hoy, mañana y el resto de mi vida.`;

        function openBottle() {
            if (letterOpened) return;
            letterOpened = true;

            const bottleVisual = document.querySelector('.bottle__visual');
            if (bottleVisual) {
                bottleVisual.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    bottleVisual.style.opacity = '0.3';
                    bottleVisual.style.transform = 'scale(0.8)';
                }, 400);
            }

            setTimeout(() => {
                if (seaLetter) seaLetter.classList.add('is-visible');
                if (letterCursor) letterCursor.style.display = 'inline-block';

                setTimeout(() => {
                    typeWriter(letterBody, letterMessage, 22).then(() => {
                        if (letterCursor) letterCursor.style.display = 'none';
                        if (letterSignature) {
                            setTimeout(() => letterSignature.classList.add('is-visible'), 500);
                        }
                    });
                }, 800);
            }, 600);
        }

        bottle?.addEventListener('click', openBottle);
    }

    /* =============================================
       12. YEAR PROGRESS
       ============================================= */
    function initYearProgress() {
        const fill = document.querySelector('.year-progress__bar-fill');
        if (!fill) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fill.style.width = '66.67%';
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(fill.parentElement);
    }

    /* =============================================
       13. GALAXY FINALE
       ============================================= */
    function initGalaxyFinale() {
        const starContainer = document.querySelector('.galaxy-finale__stars');
        if (starContainer) {
            for (let i = 0; i < 60; i++) {
                const star = document.createElement('span');
                star.className = 'galaxy-star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                const size = Math.random() * 3 + 1;
                star.style.width = size + 'px';
                star.style.height = size + 'px';
                star.style.animationDuration = (Math.random() * 3 + 2) + 's';
                star.style.animationDelay = (Math.random() * 3) + 's';
                starContainer.appendChild(star);
            }
        }

        const btn = document.querySelector('.galaxy-finale__celebrate-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                launchConfetti(btn, 60);
                setTimeout(() => launchConfetti(btn, 50), 300);
                setTimeout(() => launchConfetti(btn, 40), 600);
                setTimeout(() => launchConfetti(btn, 30), 900);
                btn.textContent = '¡Te amo con locura! 🦆❤️';
                btn.classList.remove('btn--primary');
                btn.classList.add('btn--rose');
            });
        }
    }
});
