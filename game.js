'use strict';

// ─────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────
const CFG = {
    DAVID_MAX_HP: 100,
    BOSS_MAX_HP: 300,
    TIMER_SEC: 90 * 60,
    CHEAT_COST: 15,
    WRONG_COST: 5,
    BAD_ANS_COST: 10,
};

// ─────────────────────────────────────────────────────
// GAME STATE
// ─────────────────────────────────────────────────────
const G = {
    davidHP: CFG.DAVID_MAX_HP,
    bossHP: CFG.BOSS_MAX_HP,
    timeLeft: CFG.TIMER_SEC,
    timerInterval: null,
    missionIdx: 0,
    stepIdx: 0,
    topMode: false,
    gameOver: false,
    cheatsUsed: 0,
    wrongCmds: 0,
    wrongAns: 0,
    loreUnlocked: [],
};

// ─────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────
function nowTime() {
    const d = new Date();
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
function pad(n) { return String(n).padStart(2, '0'); }

// ─────────────────────────────────────────────────────
// MISSIONS
// ─────────────────────────────────────────────────────
const MISSIONS = [
    // ── M1 ──────────────────────────────────────────────
    {
        id: 1,
        title: "MISIÓN 1: EL DESPERTAR",
        subtitle: "Sistema comprometido — Inspección de permisos",
        story: `🎂 Hoy es tu cumpleaños, <em>David</em>. Pero mientras el sistema preparaba tu celebración, el <em>KERNEL_DAEMON</em> ha atacado y ha ocultado tus archivos de cumpleaños bajo capas de permisos cifrados.\n\nTu primera misión: inspeccionar el sistema de archivos.`,
        steps: [
            {
                type: "cmd",
                command: "ls -all",
                aliases: ["ls -la", "ls -al", "ls -a -l", "ls -l -a"],
                output: () => `total 64\ndrwxr-xr-x  6 david  david  4096 26 feb ${nowTime()} .\ndrwxr-xr-x  3 root   root   4096 26 feb 08:00 ..\n-rw-r--r--  1 david  david   256 26 feb 16:20 .bash_history\n-rw-r--r--  1 david  david  3526 26 feb 09:00 .bashrc\ndrwxrwxrwx  2 david  david  4096 26 feb 16:24 archivos_cumple\n-rwxr-xr-x  1 root   root   8192 26 feb 08:00 kernel.conf\n-rw-------  1 david  david  1024 26 feb 16:24 notas_secretas.txt\n-rw-r--r--  1 david  david   512 26 feb 16:00 regalo_david.birthday\n-rwsr-xr-x  1 root   root  16384 26 feb 16:00 kernel_daemon`,
                damageToBoss: 30,
                successMsg: "✅ ¡Archivos revelados! Observa los permisos cuidadosamente.",
                nextObjective: 'RETO: Los permisos de <code>kernel.conf</code> son <code>rwxr-xr-x</code>. ¿Cuál es su valor en octal? (ej: 755)',
                lore: null,
            },
            {
                type: "answer",
                prompt: 'RETO: Los permisos de <code>kernel.conf</code> son <code>rwxr-xr-x</code>. ¿Cuál es su valor en octal?',
                accept: ["755"],
                damageToBoss: 25,
                hintText: "r=4, w=2, x=1. Suma cada grupo: rwx=7, r-x=5, r-x=5 → 755",
            },
        ],
        lore: `📖 TEORÍA — PERMISOS Y SoC\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n► ls -all muestra permisos en formato rwx\n   r=Leer(4)  w=Escribir(2)  x=Ejecutar(1)\n   rwxr-xr-x → prop(7) grupo(5) otros(5) → octal 755\n► El bit 's' en kernel_daemon → SETUID: corre como root\n\n🏛 ARQUITECTURA SoC (System on a Chip)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n► Modelo Von Neumann: Procesador + Memoria + Entradas/Salidas\n► SoC integra todo en un único chip\n   ✓ Ventajas: Tamaño reducido, bajo consumo energético, menos peso\n   ✗ Desventajas: No ampliable; si un componente falla → cambia todo el chip`,
    },

    // ── M2 ──────────────────────────────────────────────
    {
        id: 2,
        title: "MISIÓN 2: LOS ESPECTROS",
        subtitle: "Procesos ocultos — Identificación del enemigo",
        story: `¡Buen trabajo! Pero el <em>KERNEL_DAEMON</em> no está solo.\n\nHa lanzado procesos zombi que se ejecutan en las sombras. Recuerda: un PROGRAMA es estático en disco, pero cuando el procesador lo ejecuta, se convierte en un PROCESO vivo.`,
        steps: [
            {
                type: "cmd",
                command: "ps",
                aliases: ["ps -e"],
                output: () => `  PID TTY          TIME CMD\n 1337 pts/0    00:00:00 bash\n 6666 pts/0    00:00:13 kernel_daemon  ← SOSPECHOSO\n 7890 pts/0    00:00:00 ps`,
                damageToBoss: 20,
                successMsg: "👁 ¡Proceso sospechoso detectado! PID 6666 — kernel_daemon",
                nextObjective: 'Ahora ejecuta <code>ps aux</code> para ver todos los procesos del sistema con más detalle.',
                lore: null,
            },
            {
                type: "cmd",
                command: "ps aux",
                aliases: ["ps -aux", "ps -ef"],
                output: () => `USER       PID %CPU %MEM    VSZ   RSS TTY  STAT START   TIME COMMAND\nroot         1  0.0  0.1  19356  1544 ?   Ss   08:00   0:01 /sbin/init\nroot         2  0.0  0.0      0     0 ?   S    08:00   0:00 [kthreadd]\nroot       666  0.0  0.5  45000  5000 ?   Ss   08:00   0:02 /usr/bin/python daemon.py\ndavid     1337  0.0  0.1   8000   900 pts/0 Ss  16:20   0:00 -bash\nroot      6666  0.9  2.4 128000 24576 ?   R    16:24  13:37 kernel_daemon --infect\ndavid     7891  0.0  0.0   7500   600 pts/0 R+  16:24   0:00 ps aux`,
                damageToBoss: 30,
                successMsg: "🔍 ¡Confirmado! PID 6666, consume 0.9% CPU, corre como root.",
                nextObjective: 'RETO: Según <code>ps aux</code>, ¿qué valor tiene la columna STAT del proceso <code>kernel_daemon</code>?',
                lore: null,
            },
            {
                type: "answer",
                prompt: 'RETO: ¿Qué valor tiene la columna STAT del proceso <code>kernel_daemon</code>? (una letra)',
                accept: ["r", "R"],
                damageToBoss: 20,
                hintText: "Busca 'kernel_daemon --infect' en la columna COMMAND. La columna STAT está justo antes de START.",
            },
        ],
        lore: `📖 TEORÍA — PROGRAMA vs. PROCESO\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n► PROGRAMA: Archivo estático en disco (código dormido)\n► PROCESO:  El procesador lo ejecuta → cobra vida\n\n🔄 ESTADOS DE UN PROCESO\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n► R = Élu       → Usando el procesador AHORA\n► S = Prêt      → Listo, esperando su turno\n► D = Bloqué    → Bloqueado, esperando un recurso\n\n👥 TIPOS DE PROCESOS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n► Usuario (user mode)  → Acceso restringido y seguro\n► Sistema (kernel mode)→ root, acceso total al hardware\n► PID 1 = systemd (padre de todos los procesos de usuario)\n► PID 2 = kthreadd (padre de los hilos del kernel)`,
    },

    // ── M3 ──────────────────────────────────────────────
    {
        id: 3,
        title: "MISIÓN 3: EL VIGILANTE",
        subtitle: "Monitor de recursos — El planificador en acción",
        story: `El <em>KERNEL_DAEMON</em> está consumiendo recursos masivamente. Cada ciclo de CPU que roba es un segundo de tu cumpleaños que pierde.\n\nUsa el monitor en tiempo real para observar cómo el planificador del SO gestiona los turnos de cada proceso.`,
        steps: [
            {
                type: "cmd",
                command: "top",
                aliases: ["top -bn1"],
                output: () => `top - ${nowTime()} up  8:24,  1 user,  load average: 0.99, 0.87, 0.72\nTasks:  98 total,   2 running,  95 sleeping\n%Cpu(s): 45.2 us,  3.8 sy, 50.5 id,  0.3 wa\nMiB Mem:   7847.3 total,   4231.1 free,   2891.4 used\n\n  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM  TIME+     COMMAND\n 6666 root      20   0  128000  24576   8192 R  44.9   2.4  13:37.00 kernel_daemon\n    1 root      20   0   19356   1544   1284 S   0.0   0.1   0:01.23 systemd\n    2 root      20   0       0      0      0 S   0.0   0.0   0:00.02 kthreadd\n  666 root      10 -10   45000   5000   2000 S   0.1   0.5   0:02.01 python\n 1337 david     20   0    8000    900    700 S   0.0   0.1   0:00.45 bash\n\n[top activo — escribe 'q' para salir]`,
                damageToBoss: 35,
                successMsg: "📊 ¡Monitor activo! kernel_daemon acapara el 44.9% de CPU.",
                nextObjective: "El proceso <code>python</code> tiene PR=10 y NI=-10. Ahora escribe <code>q</code> para salir de top.",
                lore: null,
                setsTopMode: true,
            },
            {
                type: "cmd",
                command: "q",
                aliases: ["Q"],
                output: () => `[top cerrado]`,
                damageToBoss: 15,
                successMsg: "✅ Has salido de top correctamente.",
                nextObjective: null,
                lore: null,
                clearsTopMode: true,
            },
        ],
        lore: `📖 TEORÍA — PLANIFICACIÓN DE PROCESOS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n► El SO simula que todo ocurre a la vez, aunque haya 1 CPU\n► Los procesos se turnan muy rápido (nanosegundos)\n\n⚙️ ALGORITMOS SIN REQUISICIÓN (ASR)\n   Un proceso corre hasta terminar, luego pasa el siguiente.\n\n⚙️ ALGORITMOS CON REQUISICIÓN (AAR)\n   El SO interrumpe procesos regularmente para dar paso a otros.\n\n🔄 ROUND ROBIN (Tourniquet)\n   El AAR más común:\n   → Cada proceso recibe un "quantum" de tiempo (ej. 100ms)\n   → Al agotarse, pasa al siguiente proceso en la cola circular\n   → Ningún proceso monopoliza la CPU\n\n🏆 PRIORIDADES\n   → PR (priority) en top: valor más bajo = más urgente\n   → NI negativo (-10) = muy alta prioridad\n   → python (PR=10) tiene más prioridad que bash (PR=20)`,
    },

    // ── M4 ──────────────────────────────────────────────
    {
        id: 4,
        title: "MISIÓN 4: EL ÁRBOL ANCESTRAL",
        subtitle: "Linaje del proceso — Rastreando el origen del mal",
        story: `El virus lleva generaciones replicándose. Para neutralizarlo definitivamente, necesitas entender su linaje.\n\nTodos los procesos tienen un padre. Encuentra al ancestro del <em>KERNEL_DAEMON</em>.`,
        steps: [
            {
                type: "cmd",
                command: "pstree",
                aliases: ["pstree -p", "pstree -a"],
                output: () => `systemd(1)─┬─cron(456)\n           ├─dbus-daemon(489)\n           ├─sshd(532)──david_session(1001)─┬─bash(1337)\n           │                                └─ps(7892)\n           ├─python(666)──kernel_daemon(6666)─┬─infect_proc(6700)\n           │                                  └─infect_proc(6701)\n           ├─NetworkManager(723)\n           └─systemd-journald(321)\n\nkthreadd(2)─┬─migration/0(3)\n            ├─rcu_gp(4)\n            └─kworker/u8:0(5)`,
                damageToBoss: 45,
                successMsg: "🌳 ¡El árbol revela todo! kernel_daemon desciende de python(666) → systemd(1).",
                nextObjective: 'RETO: ¿Qué PID tiene el proceso padre de TODOS los procesos de usuario?',
                lore: null,
            },
            {
                type: "answer",
                prompt: 'RETO: ¿Cuál es el PID del proceso padre de todos los procesos de usuario? (número)',
                accept: ["1", "01"],
                damageToBoss: 20,
                hintText: "Mira la raíz del árbol en pstree. Es el primer proceso que arranca el kernel. El PID va entre paréntesis.",
            },
        ],
        lore: `📖 TEORÍA — ÁRBOL DE PROCESOS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n► Todos los procesos forman un árbol genealógico\n►  PID 0 → El proceso primordial (gestor de memoria)\n►  PID 1 → systemd: padre de TODOS los procesos de usuario\n            Es lo primero que arranca el kernel al inicio\n            Si systemd muere → el sistema se apaga\n►  PID 2 → kthreadd: padre de los hilos del kernel\n            Gestiona procesos internos del SO\n\n► Cada proceso tiene un PPID (Parent PID)\n► Si el padre muere, el hijo queda "huérfano" → lo adopta systemd\n► kernel_daemon(6666) → padre: python(666) → abuelo: systemd(1)`,
    },

    // ── M5 ──────────────────────────────────────────────
    {
        id: 5,
        title: "MISIÓN 5: EL GOLPE FINAL",
        subtitle: "Eliminación del virus — Rompiendo el Deadlock",
        story: `¡Es la hora, David! El <em>KERNEL_DAEMON</em> está debilitado.\n\nPero ha activado un DEADLOCK: dos de sus procesos se bloquean mutuamente. Intenta terminarlo con gracia primero. Si falla, usa la fuerza.`,
        steps: [
            {
                type: "cmd",
                command: "kill 6666",
                aliases: ["kill -15 6666", "kill -SIGTERM 6666"],
                output: () => `[!] DEADLOCK detectado:\n    kernel_daemon(6666) espera recurso de infect_proc(6700)\n    infect_proc(6700)   espera recurso de kernel_daemon(6666)\n\n[!] SIGTERM ignorada. El proceso se niega a terminar.\n    → Usa kill -9 para forzar la terminación.`,
                damageToBoss: 20,
                successMsg: "⚠️ SIGTERM ignorada por el deadlock. Necesitas kill -9.",
                nextObjective: 'El proceso ignora SIGTERM. Ejecuta <code>kill -9 6666</code> para forzar la terminación.',
                lore: null,
            },
            {
                type: "cmd",
                command: "kill -9 6666",
                aliases: ["kill -SIGKILL 6666", "kill -9 6666"],
                output: () => `[1]+ Killed     kernel_daemon --infect\n[2]  Killed     infect_proc (6700)\n[3]  Killed     infect_proc (6701)\n\n✓ Proceso 6666 eliminado\n✓ Procesos hijo eliminados\n✓ DEADLOCK resuelto — recursos liberados`,
                damageToBoss: 999,  // kills boss
                successMsg: "💀 ¡KERNEL_DAEMON eliminado con SIGKILL! ¡Victoria!",
                nextObjective: null,
                lore: null,
            },
        ],
        lore: `📖 TEORÍA — DEADLOCKS E INTERBLOQUEOS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n► DEADLOCK: Dos procesos se bloquean mutuamente\n   A espera recurso de B → B espera recurso de A → ¡bucle infinito!\n   El sistema se congela si no se resuelve\n\n🔑 SEÑALES DE KILL\n   • SIGTERM (15): Petición educada. El proceso PUEDE ignorarla.\n   • SIGKILL (9):  Orden FORZADA del kernel. No se puede ignorar.\n   → Regla: siempre intenta SIGTERM primero\n\n🏦 ALGORITMO DEL BANQUERO (Dijkstra)\n   → Previene deadlocks antes de que ocurran\n   → Antes de asignar un recurso, calcula si el estado es "seguro"\n   → Si la asignación pudiera causar deadlock → la deniega\n   → Es la base de los schedulers modernos de SO`,
    },
];

// ─────────────────────────────────────────────────────
// ALL THEORY (for review modal)
// ─────────────────────────────────────────────────────
function getAllTheory() {
    return MISSIONS.map(m => `${'═'.repeat(50)}\n${m.title}\n${'═'.repeat(50)}\n${m.lore}`).join('\n\n');
}

// ─────────────────────────────────────────────────────
// DOM HELPERS
// ─────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    $(id).classList.add('active');
}

// ─────────────────────────────────────────────────────
// TERMINAL OUTPUT
// ─────────────────────────────────────────────────────
function termLine(text, cls = 't-line') {
    const out = $('term-output');
    const line = document.createElement('div');
    line.className = cls;
    line.innerHTML = text;
    out.appendChild(line);
    out.scrollTop = out.scrollHeight;
}
function termPrint(text, cls) { text.split('\n').forEach(l => termLine(l, cls || 't-out')); }
function termCmd(cmd) { termLine(`<span class="prompt">david@linux-quest:~$ </span><span class="t-cmd">${escHtml(cmd)}</span>`); }
function escHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

// ─────────────────────────────────────────────────────
// HP SYSTEM
// ─────────────────────────────────────────────────────
function updateHPBars() {
    const dp = Math.max(0, G.davidHP / CFG.DAVID_MAX_HP * 100);
    const bp = Math.max(0, G.bossHP / CFG.BOSS_MAX_HP * 100);
    $('david-hp-bar').style.width = dp + '%';
    $('boss-hp-bar').style.width = bp + '%';
    $('david-hp-num').textContent = `${Math.max(0, G.davidHP)}/${CFG.DAVID_MAX_HP}`;
    $('boss-hp-num').textContent = `${Math.max(0, G.bossHP)}/${CFG.BOSS_MAX_HP}`;
}

function damageBoss(amount) {
    const actual = Math.min(amount, G.bossHP);
    G.bossHP -= actual;
    if (G.bossHP < 0) G.bossHP = 0;
    updateHPBars();
    showHitText('hit-boss', `-${actual} HP`, false);
    animateSprite('sprite-david', 'attacking');
    animateSprite('sprite-boss', 'hit');
    termLine(`⚡ DAÑO AL BOSS: -${actual} HP  [Boss HP: ${G.bossHP}/${CFG.BOSS_MAX_HP}]`, 't-damage');
    logBattle(`⚔️ David ataca!  -${actual} HP al Boss`);
}

function damageDavid(amount, reason) {
    G.davidHP = Math.max(0, G.davidHP - amount);
    updateHPBars();
    showHitText('hit-david', `-${amount} HP`, true);
    animateSprite('sprite-boss', 'attacking');
    animateSprite('sprite-david', 'hit');
    termLine(`💔 ${reason}: -${amount} HP  [David HP: ${G.davidHP}/${CFG.DAVID_MAX_HP}]`, 't-error');
    logBattle(`💀 Boss contraataca! -${amount} HP a David`);
    if (G.davidHP <= 0) triggerDeath('hp');
}

function showHitText(elId, text, isDavid) {
    const el = $(elId);
    el.textContent = text;
    el.style.opacity = '1';
    setTimeout(() => { el.style.opacity = '0'; }, 1200);
}

function animateSprite(spriteId, cls) {
    const el = $(spriteId);
    el.classList.remove('attacking', 'hit');
    void el.offsetWidth; // force reflow
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), 500);
}

function logBattle(msg) {
    $('battle-log').innerHTML = msg;
}

// ─────────────────────────────────────────────────────
// TIMER
// ─────────────────────────────────────────────────────
function startTimer() {
    G.timerInterval = setInterval(() => {
        if (G.gameOver) return;
        G.timeLeft--;
        const m = Math.floor(G.timeLeft / 60);
        const s = G.timeLeft % 60;
        $('timer-text').textContent = `${pad(m)}:${pad(s)}`;
        if (G.timeLeft <= 300) $('timer-text').classList.add('urgent');
        if (G.timeLeft <= 0) triggerDeath('timer');
    }, 1000);
}

// ─────────────────────────────────────────────────────
// MISSION RENDERING
// ─────────────────────────────────────────────────────
function loadMission(idx) {
    if (idx >= MISSIONS.length) { triggerVictory(); return; }
    G.missionIdx = idx;
    G.stepIdx = 0;
    G.topMode = false;
    const m = MISSIONS[idx];
    $('mission-num').textContent = m.id;
    $('mission-title-bar').textContent = m.title;
    $('mission-story').innerHTML = m.story.replace(/\n/g, '<br>');
    $('lore-panel').classList.add('hidden');
    termLine('', 't-line');
    termLine(`${'─'.repeat(52)}`, 't-info');
    termLine(`▶ ${m.title} — ${m.subtitle}`, 't-info');
    termLine(`${'─'.repeat(52)}`, 't-info');
    loadStep(idx, 0);
}

function loadStep(mIdx, sIdx) {
    G.stepIdx = sIdx;
    const m = MISSIONS[mIdx];
    const s = m.steps[sIdx];
    if (!s) { showLore(mIdx); return; }
    if (s.type === 'cmd') {
        $('mission-objective').innerHTML = `🎯 <strong>OBJETIVO:</strong> Ejecuta <code>${escHtml(s.command)}</code>`;
    } else {
        $('mission-objective').innerHTML = `🧠 <strong>RETO:</strong> ${s.prompt}`;
    }
}

function showLore(mIdx) {
    const m = MISSIONS[mIdx];
    G.loreUnlocked.push(m.lore);
    $('lore-panel').classList.remove('hidden');
    $('lore-content').textContent = m.lore;
    $('mission-objective').innerHTML = '✅ <strong>Misión completada.</strong> Lee la teoría y avanza.';
    // Heal on mission complete
    const heal = 10;
    G.davidHP = Math.min(CFG.DAVID_MAX_HP, G.davidHP + heal);
    updateHPBars();
    termLine(`💚 ¡Misión ${mIdx + 1} completada! +${heal} HP recuperado.`, 't-success');
}

// ─────────────────────────────────────────────────────
// COMMAND PROCESSING
// ─────────────────────────────────────────────────────
function processInput(raw) {
    const input = raw.trim();
    if (!input) return;
    termCmd(input);

    if (G.gameOver) return;

    const cmd = input.toLowerCase();
    const m = MISSIONS[G.missionIdx];
    const step = m ? m.steps[G.stepIdx] : null;

    // Top mode: only allow 'q'
    if (G.topMode) {
        if (cmd === 'q' || cmd === 'Q') {
            processStep(step, input);
        } else {
            termPrint('[top activo — solo puedes escribir q para salir]', 't-warn');
        }
        return;
    }

    // Answer step
    if (step && step.type === 'answer') {
        const clean = input.toLowerCase().trim();
        const accepted = step.accept.map(a => a.toLowerCase());
        if (accepted.includes(clean)) {
            termLine('✅ ¡Respuesta correcta!', 't-success');
            damageBoss(step.damageToBoss);
            nextStep();
        } else {
            G.wrongAns++;
            damageDavid(CFG.BAD_ANS_COST, 'Respuesta incorrecta');
            termLine(`❌ Incorrecto. Pista: ${step.hintText}`, 't-warn');
        }
        return;
    }

    // Command step
    if (step && step.type === 'cmd') {
        const validCmds = [step.command.toLowerCase(), ...(step.aliases || []).map(a => a.toLowerCase())];
        if (validCmds.includes(cmd)) {
            processStep(step, input);
            return;
        }
    }

    // Generic unknown command
    G.wrongCmds++;
    damageDavid(CFG.WRONG_COST, 'Comando incorrecto');
    termPrint(`bash: ${escHtml(input)}: command not found`, 't-error');
    if (step) termLine(`💡 Recuerda: necesitas ejecutar <code>${step.type === 'answer' ? 'tu respuesta' : step.command}</code>`, 't-warn');
}

function processStep(step, input) {
    const output = typeof step.output === 'function' ? step.output() : (step.output || '');
    if (output) termPrint(output, 't-out');
    if (step.successMsg) termLine(step.successMsg, 't-success');

    if (step.setsTopMode) G.topMode = true;
    if (step.clearsTopMode) G.topMode = false;

    damageBoss(step.damageToBoss || 0);

    if (G.bossHP <= 0) { triggerVictory(); return; }

    // Advance to next step or show lore
    const m = MISSIONS[G.missionIdx];
    const nextIdx = G.stepIdx + 1;
    if (nextIdx < m.steps.length) {
        loadStep(G.missionIdx, nextIdx);
    } else {
        showLore(G.missionIdx);
    }
}

function nextStep() {
    const m = MISSIONS[G.missionIdx];
    const nextIdx = G.stepIdx + 1;
    if (nextIdx < m.steps.length) {
        loadStep(G.missionIdx, nextIdx);
    } else {
        showLore(G.missionIdx);
    }
}

// ─────────────────────────────────────────────────────
// END GAME
// ─────────────────────────────────────────────────────
function triggerVictory() {
    if (G.gameOver) return;
    G.gameOver = true;
    clearInterval(G.timerInterval);
    saveReport('victory');
    setTimeout(() => {
        showScreen('screen-victory');
        spawnConfetti();
        const m = Math.floor(G.timeLeft / 60), s = G.timeLeft % 60;
        $('victory-stats').innerHTML =
            `❤️ HP Final de David: <strong>${G.davidHP}/${CFG.DAVID_MAX_HP}</strong><br>` +
            `⏱ Tiempo restante: <strong>${pad(m)}:${pad(s)}</strong><br>` +
            `📋 Chuletas usadas: <strong>${G.cheatsUsed}</strong><br>` +
            `❌ Comandos incorrectos: <strong>${G.wrongCmds + G.wrongAns}</strong>`;
        $('btn-review').addEventListener('click', openTheoryModal);
    }, 1200);
}

function triggerDeath(reason) {
    if (G.gameOver) return;
    G.gameOver = true;
    clearInterval(G.timerInterval);
    saveReport('death');
    const msg = reason === 'timer'
        ? '⏱ El tiempo llegó a cero. El KERNEL_DAEMON ha completado su ciclo.'
        : '💔 David ha caído. Sus HP llegaron a cero.';
    setTimeout(() => {
        showScreen('screen-death');
        $('death-stats').innerHTML =
            `${msg}<br><br>` +
            `⚔️ Misiones completadas: <strong>${G.missionIdx}/${MISSIONS.length}</strong><br>` +
            `📋 Chuletas usadas: <strong>${G.cheatsUsed}</strong>`;
    }, 800);
}

// ─────────────────────────────────────────────────────
// TEACHER REPORT — saved to localStorage
// ─────────────────────────────────────────────────────
function saveReport(outcome) {
    const data = {
        outcome,
        davidHP: G.davidHP,
        timeLeft: G.timeLeft,
        missionsDone: G.missionIdx,
        cheatsUsed: G.cheatsUsed,
        wrongCmds: G.wrongCmds,
        wrongAns: G.wrongAns,
        loreUnlocked: G.loreUnlocked,
        allLore: MISSIONS.map(m => ({ title: m.title, lore: m.lore })),
        timestamp: new Date().toLocaleString('es-ES'),
    };
    localStorage.setItem('linux_quest_report', JSON.stringify(data));
}

function openReport() {
    window.open('teacher-report.html', '_blank');
}

// ─────────────────────────────────────────────────────
// THEORY MODAL
// ─────────────────────────────────────────────────────
function openTheoryModal() {
    $('modal-body').textContent = getAllTheory();
    $('theory-modal').classList.remove('hidden');
}
document.addEventListener('DOMContentLoaded', () => {
    $('btn-close-modal')?.addEventListener('click', () => {
        $('theory-modal').classList.add('hidden');
    });
});

// ─────────────────────────────────────────────────────
// CHEAT SHEET
// ─────────────────────────────────────────────────────
function openCheat() {
    if ($('cheat-panel').classList.contains('hidden')) {
        if (!G.gameOver && G.davidHP > 0) {
            G.cheatsUsed++;
            damageDavid(CFG.CHEAT_COST, 'Uso de chuleta');
        }
        $('cheat-panel').classList.remove('hidden');
    }
}

// ─────────────────────────────────────────────────────
// CONFETTI
// ─────────────────────────────────────────────────────
function spawnConfetti() {
    const colors = ['#00ff41', '#ffdd00', '#ff3333', '#00aaff', '#aa44ff', '#ff9900'];
    const container = $('confetti-container');
    for (let i = 0; i < 80; i++) {
        const el = document.createElement('div');
        el.className = 'confetti-piece';
        el.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${6 + Math.random() * 8}px;
      height: ${10 + Math.random() * 14}px;
      animation-duration: ${2 + Math.random() * 3}s;
      animation-delay: ${Math.random() * 2}s;
      transform: rotate(${Math.random() * 360}deg);
    `;
        container.appendChild(el);
    }
}

// ─────────────────────────────────────────────────────
// MATRIX RAIN (INTRO)
// ─────────────────────────────────────────────────────
function startMatrix() {
    const canvas = $('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cols = Math.floor(canvas.width / 16);
    const drops = new Array(cols).fill(1);
    const chars = '01アイウエオカキクケコサシスセソ';
    setInterval(() => {
        ctx.fillStyle = 'rgba(5,10,5,0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff41';
        ctx.font = '14px monospace';
        drops.forEach((y, i) => {
            const c = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(c, i * 16, y * 16);
            if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }, 40);
}

// ─────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    startMatrix();

    $('btn-start').addEventListener('click', () => {
        showScreen('screen-game');
        $('term-input').focus();
        loadMission(0);
        startTimer();
        termLine('╔══════════════════════════════════════════════════╗', 't-info');
        termLine('║       BIENVENIDO, DAVID. LINUX QUEST INICIADO.   ║', 't-info');
        termLine('║           Salva el sistema. Salva tu cumple.      ║', 't-info');
        termLine('╚══════════════════════════════════════════════════╝', 't-info');
        termLine('', 't-line');
    });

    // TERMINAL INPUT
    $('term-input').addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const val = $('term-input').value;
            $('term-input').value = '';
            processInput(val);
        }
    });

    // NEXT MISSION BUTTON
    $('btn-next').addEventListener('click', () => {
        loadMission(G.missionIdx + 1);
    });

    // CHEAT SHEET
    $('btn-cheat').addEventListener('click', openCheat);
    $('btn-close-cheat').addEventListener('click', () => {
        $('cheat-panel').classList.add('hidden');
    });
});
