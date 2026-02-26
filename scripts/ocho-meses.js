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
        initWishLanterns();
        initPlaylist();
        initPromiseJar();
        initOceanLetter();
        initYearProgress();
        initJuntos();
        initGalaxyFinale();

        const particlesContainer = document.querySelector('.particles');
        if (particlesContainer) createParticles(particlesContainer, 18);

        initIntroHearts();
    }

    /* =============================================
       0. INTRO HEARTS
       ============================================= */
    function initIntroHearts() {
        const container = document.querySelector('.intro-screen__hearts');
        if (!container) return;
        const heartsCount = 25;
        for (let i = 0; i < heartsCount; i++) {
            const h = document.createElement('div');
            h.className = 'intro-heart';
            h.textContent = '❤️';
            h.style.left = Math.random() * 100 + '%';
            h.style.fontSize = (Math.random() * 15 + 10) + 'px';
            h.style.animationDuration = (Math.random() * 4 + 4) + 's';
            h.style.animationDelay = (Math.random() * 2) + 's';
            container.appendChild(h);
        }
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

            slides.forEach((s, i) => {
                s.classList.remove('is-active', 'is-exiting');
            });
            // Small tick to allow the exit animation, then show new slide
            requestAnimationFrame(() => {
                slides[index].classList.add('is-active');
            });

            segments.forEach((seg, i) => {
                const fill = seg.querySelector('.stories-progress__fill');
                seg.classList.remove('is-active', 'is-done');

                if (i < index) {
                    seg.classList.add('is-done');
                } else if (i === index) {
                    // Force reflow to restart animation
                    if (fill) {
                        fill.style.animation = 'none';
                        fill.offsetWidth; // trigger reflow
                        fill.style.animation = '';
                    }
                    seg.classList.add('is-active');
                }
            });

            clearTimeout(autoTimer);
            if (index < slides.length - 1) {
                autoTimer = setTimeout(() => showSlide(index + 1), 6000);
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
       (Removed unused Love Quiz to save space)
       ============================================= */

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
                // Anima visualmente la botella
                bottleVisual.style.transform = 'scale(1.4) rotate(15deg)';
                launchConfetti(bottle, 50); // Premium details: confeti al abrir!

                setTimeout(() => {
                    bottleVisual.style.opacity = '0.1';
                    bottleVisual.style.transform = 'scale(0.8) translateY(20px)';
                    // Reemplazamos icono visual pero sin ocultarlo bruscamente
                    bottleVisual.textContent = '💌';
                    bottleVisual.style.opacity = '0.8';
                    bottleVisual.style.transform = 'scale(1)';
                }, 500);
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
                }, 900);
            }, 700);
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

    /* =============================================
       10. JUNTOS — Actividades interactivas en persona
       ============================================= */
    function initJuntos() {
        const modeSelector = document.getElementById('juntosModeSelector');
        const game1 = document.getElementById('juntosGame1');
        const game2 = document.getElementById('juntosGame2');
        if (!modeSelector) return;

        // -- Datos: Cartas de Verdades --
        const truthCards = [
            { emoji: '🦆', q: '¿Qué es lo que más te gusta de mí sin pensarlo?' },
            { emoji: '💬', q: '¿Cuándo fue la primera vez que pensaste que me querías?' },
            { emoji: '🌙', q: '¿Hay algo que todavía no me has contado pero querrías?' },
            { emoji: '😂', q: '¿Cuál es el momento más ridículo que hemos vivido juntos?' },
            { emoji: '🙏', q: '¿Cuándo has sentido que Dios estaba en nuestra relación?' },
            { emoji: '💙', q: '¿Crees que hay algo en lo que me pueda mejorar como pareja?' },
            { emoji: '🎯', q: '¿Qué es lo primero que pensaste cuando me viste por primera vez?' },
            { emoji: '🌹', q: '¿Cuál ha sido el momento más especial que hemos compartido?' },
            { emoji: '🤝', q: '¿Hay algo que yo hago que te hace sentir muy querida?' },
            { emoji: '🌟', q: '¿En qué ves que hemos crecido juntos?' },
            { emoji: '💭', q: '¿Hay algo que te da miedo de nuestra relación?' },
            { emoji: '🎵', q: '¿Cuándo escuchas nuestra canción favorita, en qué piensas?' },
            { emoji: '🏠', q: '¿Cómo imaginas nuestra vida dentro de 5 años?' },
            { emoji: '💪', q: '¿Cuál ha sido el momento en que más me has necesitado?' },
            { emoji: '🌊', q: '¿Hay algo que yo diga o haga que te llena el corazón?' },
            { emoji: '🦋', q: '¿Qué es lo que más valoras de nuestra amistad dentro de la relación?' },
            { emoji: '📖', q: '¿Cuál es tu versículo bíblico favorito y por qué lo aplicas a nosotros?' },
            { emoji: '🎁', q: '¿Cuál ha sido el detalle más pequeño que más te ha llegado al corazón?' },
            { emoji: '🌜', q: '¿Hay algo que te gustaría que hiciéramos juntos que todavía no hemos hecho?' },
            { emoji: '❤️', q: '¿Qué significa para ti que yo sea tu novio?' }
        ];

        // -- Datos: ¿Cuánto me conoces? --
        const knowCards = [
            { emoji: '✨', q: '¿Qué define nuestra relación con pocas palabras?', a: 'Idiotas ✨' },
            { emoji: '🎵', q: '¿Cuál es nuestra canción favorita?', a: 'Rey de Reyes 👑' },
            { emoji: '🍝', q: 'Si tuviéramos que elegir los dos una comida, ¿cuál sería?', a: 'Macarrones' },
            { emoji: '🙏', q: '¿Cuál es mi mayor miedo?', a: 'Que el Señor me deje' },
            { emoji: '💭', q: '¿Qué es lo que más me preocupa de nuestra relación?', a: 'Que estés tan bien en tu casa y que estar conmigo sea peor para ti' },
            { emoji: '🚪', q: '¿Qué haría si me pusieras los cuernos?', a: 'Dejarte' },
            { emoji: '🍽️', q: '¿Cuál crees que fue el momento que más me gustó?', a: 'El día de la tagliatella' },
            { emoji: '💻', q: '¿Cuál de mis regalos me gustó más hacerte?', a: 'San Valentín (la web)' },
            { emoji: '🖥️', q: '¿Elegiría el PC o el móvil?', a: 'El PC' },
            { emoji: '💕', q: '¿Qué pienso de que me digan que soy muy agarrado?', a: 'Que eres generosa conmigo, eso es lo que importa' },
            { emoji: '💙', q: '¿Cuál crees que es mi mayor inseguridad?', a: 'No ser suficiente para ti' },
            { emoji: '🤫', q: '¿Crees que hay algo que pienso y no te he dicho?', a: 'Seguro que sí... algún día te lo contaré' },
            { emoji: '💪', q: '¿Crees que podría dejarte alguna vez?', a: 'Quizás en algún momento difícil... pero al final no' },
            { emoji: '🎂', q: '¿Cuántos meses llevamos juntos?', a: '8 meses 🎂' }
        ];

        // --- Juego 1: Cartas de Verdades ---
        let truthIndex = 0;
        let shuffledTruths = [...truthCards].sort(() => Math.random() - 0.5);

        function renderTruth() {
            const card = shuffledTruths[truthIndex % shuffledTruths.length];
            document.getElementById('truthEmoji').textContent = card.emoji;
            document.getElementById('truthQuestion').textContent = card.q;
            document.getElementById('truthCounter').textContent = `Carta ${(truthIndex % shuffledTruths.length) + 1} / ${shuffledTruths.length}`;
        }

        document.getElementById('juntosBtn1')?.addEventListener('click', () => {
            modeSelector.style.display = 'none';
            game1.style.display = '';
            truthIndex = 0;
            shuffledTruths = [...truthCards].sort(() => Math.random() - 0.5);
            renderTruth();
        });

        document.getElementById('juntosBack1')?.addEventListener('click', () => {
            game1.style.display = 'none';
            modeSelector.style.display = '';
        });

        document.getElementById('truthNext')?.addEventListener('click', () => {
            truthIndex++;
            if (truthIndex >= shuffledTruths.length) {
                // Reiniciar barajado para otra ronda
                shuffledTruths = [...truthCards].sort(() => Math.random() - 0.5);
                truthIndex = 0;
                launchConfetti(document.getElementById('juntosGame1'), 30);
            }
            renderTruth();
        });

        document.getElementById('truthSkip')?.addEventListener('click', () => {
            truthIndex++;
            renderTruth();
        });

        // --- Juego 2: ¿Cuánto me conoces? ---
        let knowIndex = 0;

        function renderKnow() {
            const item = knowCards[knowIndex];
            document.getElementById('knowEmoji').textContent = item.emoji;
            document.getElementById('knowQuestion').textContent = item.q;
            document.getElementById('knowReveal').style.display = 'none';
            document.getElementById('knowAnswer').textContent = item.a;
            document.getElementById('knowCounter').textContent = `Pregunta ${knowIndex + 1} / ${knowCards.length}`;
        }

        document.getElementById('juntosBtn2')?.addEventListener('click', () => {
            modeSelector.style.display = 'none';
            game2.style.display = '';
            knowIndex = 0;
            renderKnow();
        });

        document.getElementById('juntosBack2')?.addEventListener('click', () => {
            game2.style.display = 'none';
            modeSelector.style.display = '';
        });

        document.getElementById('knowRevealBtn')?.addEventListener('click', () => {
            document.getElementById('knowReveal').style.display = '';
        });

        document.getElementById('knowNext')?.addEventListener('click', () => {
            knowIndex++;
            if (knowIndex >= knowCards.length) {
                knowIndex = 0;
                launchConfetti(document.getElementById('juntosGame2'), 40);
            }
            renderKnow();
        });
    }
}); 
