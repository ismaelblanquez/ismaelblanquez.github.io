(() => {
  /* =========================================================
     CONFIGURACIÓN — editar aquí horario y festivos
     ========================================================= */
  const HORARIO = {           // minutos desde medianoche: [apertura, cierre]
    1: [[480, 1020]],         // lunes 8:00–17:00
    2: [[480, 1020]],
    3: [[480, 1020]],
    4: [[480, 1020]],
    5: [[480, 1020]],         // viernes
    6: [], 0: []              // sábado y domingo cerrado
  };
  const FESTIVOS = [          // AAAA-MM-DD · revisar cada año
    '2026-01-01','2026-01-06','2026-01-29','2026-03-05','2026-04-02','2026-04-03',
    '2026-04-23','2026-05-01','2026-08-15','2026-10-12','2026-12-08','2026-12-25',
    '2027-01-01','2027-01-06'
  ];

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ease = t => 1 - Math.pow(1 - t, 4);

  $('#year').textContent = new Date().getFullYear();
  $$('[data-years]').forEach(el => el.textContent = Math.max(1, new Date().getFullYear() - 2016));

  /* ---------- Variables CSS desde data-css (evita style="" en línea, compatible con CSP estricta) ---------- */
  $$('[data-css]').forEach(el => el.dataset.css.split(';').forEach(d => {
    const [k, v] = d.split(':'); if (k && v) el.style.setProperty(k.trim(), v.trim());
  }));

  /* ---------- Titulares palabra a palabra ---------- */
  $$('[data-split]').forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.replaceChildren();
    words.forEach((w, i) => {
      const o = document.createElement('span'); o.className = 'w'; o.setAttribute('aria-hidden', 'true');
      const n = document.createElement('span'); n.style.setProperty('--i', i); n.textContent = w;
      o.append(n);
      if (i) el.append(' ');
      el.append(o);
    });
  });

  /* ---------- Aparición al hacer scroll ---------- */
  $$('.stagger').forEach(g => [...g.children].forEach((c, i) => c.style.getPropertyValue('--i') || c.style.setProperty('--i', i)));
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
    if (e.target.matches('[data-count]')) count(e.target);
  }), { threshold: .14, rootMargin: '0px 0px -6% 0px' });
  $$('.rv, .stagger, .split, [data-reveal], [data-stars], [data-count]').forEach(el => io.observe(el));

  /* ---------- Contadores ---------- */
  function count(el) {
    const to = parseFloat(el.dataset.count), dec = +(el.dataset.decimals || 0);
    const fmt = v => v.toFixed(dec).replace('.', ',');
    if (reduce) { el.textContent = fmt(to); return; }
    let t0; const step = ts => { t0 ??= ts; const t = Math.min((ts - t0) / 1500, 1);
      el.textContent = fmt(to * ease(t)); if (t < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }

  /* ---------- Cabecera, progreso y flotantes ---------- */
  const header = $('#header'), progress = $('#progress'), wa = $('#waFloat'), bar = $('#mobileBar');
  let lastY = scrollY, ticking = false;
  const parallax = $$('[data-parallax]');
  const steps = $('#steps'), track = $('#steps .track i'), stepEls = $$('#steps .step');
  function onFrame() {
    ticking = false;
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    header.classList.toggle('scrolled', y > 40);
    if (!document.body.classList.contains('menu-open')) header.classList.toggle('hide', y > 500 && y > lastY + 2);
    if (y < lastY - 2) header.classList.remove('hide');
    lastY = y;
    progress.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    const show = y > innerHeight * .7; wa.classList.toggle('show', show); bar.classList.toggle('show', show);
    if (reduce) return;
    parallax.forEach(el => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      el.style.transform = `translate3d(0,${(-p * parseFloat(el.dataset.parallax) * 100).toFixed(2)}%,0)`;
    });
    if (steps && innerWidth > 960) {
      const r = steps.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .25)));
      track.style.setProperty('--p', p.toFixed(3));
      stepEls.forEach((s, i) => s.classList.toggle('lit', p >= i / stepEls.length + .02));
    }
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onFrame); } }, { passive: true });
  addEventListener('resize', onFrame); onFrame();
  if (reduce || innerWidth <= 960) stepEls.forEach(s => s.classList.add('lit'));

  /* ---------- Servicios: imagen según el servicio ---------- */
  const svcImgs = $$('[data-svc-img]'), svcName = $('#svcName');
  $$('#serviceList li').forEach(li => {
    const on = () => {
      $$('#serviceList li').forEach(x => x.classList.toggle('on', x === li));
      svcImgs.forEach(img => img.classList.toggle('on', img.dataset.svcImg === li.dataset.img));
      svcName.textContent = $('h3', li).textContent;
    };
    li.addEventListener('mouseenter', on);
    li.tabIndex = 0; li.addEventListener('focus', on);
  });

  /* ---------- Menú móvil ---------- */
  const burger = $('#burger'), menu = $('#mobileMenu');
  const setMenu = open => {
    header.classList.remove('hide');
    document.documentElement.style.setProperty('--menu-top', header.getBoundingClientRect().bottom + 'px');
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    menu.setAttribute('aria-hidden', !open);
  };
  burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => e.key === 'Escape' && setMenu(false));
  addEventListener('resize', () => innerWidth > 1140 && setMenu(false));

  /* ---------- Enlace activo ---------- */
  const links = $$('.nav a');
  const so = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['servicios','como-trabajamos','opiniones','taller','visitanos'].forEach(id => so.observe(document.getElementById(id)));

  /* ---------- Preguntas: apertura animada ---------- */
  $$('.faq details').forEach(d => {
    const s = $('summary', d), a = $('.ans', d);
    s.addEventListener('click', e => {
      if (reduce) return;
      e.preventDefault();
      if (d.open) {
        a.animate([{ height: a.offsetHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 320, easing: 'cubic-bezier(.65,0,.35,1)' }).onfinish = () => d.open = false;
      } else {
        d.open = true;
        a.animate([{ height: '0px', opacity: 0 }, { height: a.offsetHeight + 'px', opacity: 1 }], { duration: 380, easing: 'cubic-bezier(.22,.8,.2,1)' });
      }
    });
  });

  /* ---------- Abierto / cerrado (hora de Madrid) ---------- */
  const DAYS = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
  const fmt = m => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
  const madridNow = () => {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date()).map(x => [x.type, x.value]));
    return { date: new Date(Date.UTC(+p.year, +p.month - 1, +p.day)), day: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(p.weekday), mins: (+p.hour % 24) * 60 + +p.minute };
  };
  const iso = d => d.toISOString().slice(0, 10);
  const slotsFor = d => FESTIVOS.includes(iso(d)) ? [] : (HORARIO[d.getUTCDay()] || []);
  const updateStatus = () => {
    const { date, mins } = madridNow();
    const today = slotsFor(date), slot = today.find(([o, c]) => mins >= o && mins < c);
    let msgTop, msgNow, cls;
    if (slot) { cls = 'open'; msgTop = `Abierto ahora · hasta las ${fmt(slot[1])}`; msgNow = `Abierto ahora. Cerramos a las ${fmt(slot[1])}.`; }
    else {
      cls = 'closed'; let when = '';
      for (let a = 0; a < 14 && !when; a++) {
        const d = new Date(date.getTime() + a * 864e5);
        const s = slotsFor(d).find(([o]) => a > 0 || o > mins);
        if (s) when = `${a === 0 ? 'hoy' : a === 1 ? 'mañana' : 'el ' + DAYS[d.getUTCDay()]} a las ${fmt(s[0])}`;
      }
      const fest = FESTIVOS.includes(iso(date)) ? 'Hoy festivo' : 'Cerrado';
      msgTop = `${fest} · abrimos ${when}`; msgNow = `${fest === 'Cerrado' ? 'Ahora cerrado' : 'Hoy es festivo'}. Abrimos ${when}.`;
    }
    const top = $('#topStatus'), now = $('#nowStatus');
    [top, now].forEach(el => { el.classList.remove('open', 'closed'); el.classList.add(cls); });
    top.textContent = msgTop; now.textContent = msgNow;
    $$('#hoursTable tr').forEach(r => {
      const s = HORARIO[+r.dataset.day] || [];
      r.lastElementChild.textContent = s.length ? s.map(([o, c]) => `${fmt(o)}–${fmt(c)}`).join(' · ') : 'Cerrado';
      r.classList.toggle('today', +r.dataset.day === date.getUTCDay());
    });
  };
  updateStatus(); setInterval(updateStatus, 60000);

  /* ---------- Mapa bajo demanda ---------- */
  $('#loadMap').addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = 'https://maps.google.com/maps?q=Talleres%20Autoconcept%2C%20Calle%20Meridiano%202%2C%2050016%20Zaragoza&z=16&hl=es&output=embed';
    f.title = 'Ubicación de Talleres AutoConcept'; f.loading = 'lazy';
    $('#map').appendChild(f); $('#mapConsent').remove();
  });

  /* ---------- Formulario → WhatsApp / email ---------- */
  const form = $('#bookForm'); let channel = 'wa';
  $$('[data-channel]', form).forEach(b => b.addEventListener('click', () => channel = b.dataset.channel));
  $$('[required]', form).forEach(i => i.addEventListener('input', () => i.parentElement.classList.remove('err')));
  form.addEventListener('submit', e => {
    e.preventDefault();
    let first = null;
    $$('[required]', form).forEach(i => {
      const bad = !i.value.trim(); i.parentElement.classList.remove('err');
      if (bad) { void i.offsetWidth; i.parentElement.classList.add('err'); first ??= i; }
    });
    if (first) { first.focus(); return; }
    const v = id => $(id).value.trim();
    const text = [
      'Hola, quiero pedir cita / presupuesto:',
      `• Nombre: ${v('#f-name')}`,
      `• Teléfono: ${v('#f-phone')}`,
      `• Vehículo: ${v('#f-brand')} ${v('#f-model')}`,
      v('#f-plate') && `• Matrícula: ${v('#f-plate').toUpperCase()}`,
      `• Servicio: ${v('#f-service')}`,
      $('#f-pickup').checked && '• Necesito recogida a domicilio',
      v('#f-msg') && `• Detalles: ${v('#f-msg')}`
    ].filter(Boolean).join('\n');
    if (channel === 'mail') location.href = `mailto:info@autoconcept.es?subject=${encodeURIComponent('Solicitud de cita: ' + v('#f-brand') + ' ' + v('#f-model'))}&body=${encodeURIComponent(text)}`;
    else window.open(`https://wa.me/34672687554?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });

  /* ---------- Textos legales ---------- */
  const dlg = $('#legalDialog');
  const titles = { legal: 'Aviso legal', privacy: 'Política de privacidad', cookies: 'Política de cookies' };
  $$('[data-legal]').forEach(b => b.addEventListener('click', e => {
    e.preventDefault();
    $('#legalTitle').textContent = titles[b.dataset.legal];
    $('#legalBody').replaceChildren($('#tpl-' + b.dataset.legal).content.cloneNode(true));
    dlg.showModal();
  }));
  $('#legalClose').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => e.target === dlg && dlg.close());
})();