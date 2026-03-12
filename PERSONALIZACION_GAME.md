# ⚙️ GUÍA DE PERSONALIZACIÓN - Terminal Battle

Si quieres modificar el juego para tu clase específica, aquí encontrarás cómo hacerlo.

---

## 🎨 Cambiar Tema de Personajes

### Cambiar Nombre del Jugador
En el archivo HTML, busca esta línea (aprox. línea 540):
```html
<div class="character-name">⚡ VOX ⚡</div>
```

Reemplázala con:
```html
<div class="character-name">⚡ TU NOMBRE AQUÍ ⚡</div>
```

### Cambiar Emoji del Jugador
La línea siguiente (aprox. línea 541):
```html
<div class="character-sprite">🎩</div>
```

Opciones sugeridas:
- `👨‍💻` Programador
- `⚡` Rayo
- `🔥` Fuego
- `🧙‍♂️` Mago
- `🦸‍♂️` Superhéroe
- `🤖` Robot

### Cambiar Boss Final
Busca (aprox. línea 580):
```html
<div class="character-name">👔 BOSS FINAL 👔</div>
<div class="character-sprite">😈</div>
```

Ideas divertidas:
```html
<!-- Opción 1: Profesor estricto -->
<div class="character-name">📚 PROFESOR 📚</div>
<div class="character-sprite">🧑‍🏫</div>

<!-- Opción 2: Virus informático -->
<div class="character-name">🦠 VIRUS INFORMÁTICO 🦠</div>
<div class="character-sprite">🔴</div>

<!-- Opción 3: Dragón -->
<div class="character-name">🐉 DRAGÓN LINUX 🐉</div>
<div class="character-sprite">🐉</div>

<!-- Opción 4: Mantener Pedro Sánchez -->
<!-- Ya está configured! -->
```

---

## 💰 Ajustar Dificultad

### Cambiar Vidas Iniciales del Jugador
Busca en JavaScript (aprox. línea 335):
```javascript
playerHp: 100,
playerMaxHp: 100,
```

Cambios sugeridos:
```javascript
// Fácil
playerHp: 150,
playerMaxHp: 150,

// Moderado (actual)
playerHp: 100,
playerMaxHp: 100,

// Difícil
playerHp: 75,
playerMaxHp: 75,
```

### Cambiar Vidas del Boss
Busca (aprox. línea 339):
```javascript
bossHp: 500,
bossMaxHp: 500,
```

Recomendaciones:
```javascript
// Juego corto (45 min)
bossHp: 300,
bossMaxHp: 300,

// Normal (90 min) - actual
bossHp: 500,
bossMaxHp: 500,

// Muy desafiante (120 min)
bossHp: 700,
bossMaxHp: 700,
```

### Cambiar Daño de Respuesta Incorrecta
Busca la función `wrongAnswer()` (aprox. línea 606):
```javascript
let damage = 15;
```

Cambios:
```javascript
// Fácil
let damage = 8;

// Normal (actual)
let damage = 15;

// Experto
let damage = 25;
```

### Cambiar Precios en la Tienda
Busca `buyItem()` (aprox. línea 645):
```javascript
const prices = {
    potion: 10,
    sword: 25,
    shield: 20,
    bomb: 50
};
```

Cambios según dificultad:
```javascript
// Más fácil (más monedas accesibles)
const prices = {
    potion: 5,
    sword: 15,
    shield: 10,
    bomb: 30
};

// Más difícil (menos dinero disponible)
const prices = {
    potion: 20,
    sword: 40,
    shield: 35,
    bomb: 80
};
```

---

## 📚 Agregar/Eliminar Ejercicios

### Agregar Nuevo Ejercicio
Busca el array `exercises` (aprox. línea 357) y ve al final del array.

Añade un nuevo objeto antes del cierre `];`:
```javascript
{
    title: "Nombre del Ejercicio",
    description: "Descripción de qué debe hacer el estudiante",
    command: "comando exacto que escribir",
    hint: "Pista que ayuda sin revelar la solución",
    explanation: "Explicación de qué hace el comando",
    damage: 15,      // Daño al boss (10-20 es normal)
    exp: 40,         // Experiencia ganada (25-60)
    coins: 15        // Monedas ganadas (5-25)
},
```

### Ejemplo de Nuevo Ejercicio
```javascript
{
    title: "Usar grep para buscar texto",
    description: "Busca la palabra 'linux' en el archivo 'notas.txt'",
    command: "grep linux notas.txt",
    hint: "grep [patrón] [archivo]",
    explanation: "grep busca patrones dentro de archivos - muy útil para debugging",
    damage: 18,
    exp: 50,
    coins: 20
},
```

### Eliminar Ejercicios
Si una clase es más corta, simplemente borra líneas del array. Por ejemplo, para tener solo los primeros 20:
1. Abre el archivo
2. Encuentra el ejercicio número 21 (busca `title: "Permisos octales - rw-r--r--"`)
3. Borra desde ese ejercicio hasta casi el final del array

---

## 🛍️ Agregar Items a la Tienda

Busca en HTML (aprox. línea 765) la sección `<!-- TIENDA -->`.

**Agregar un nuevo item:**
```html
<div class="shop-item" data-item="nuevo-item">
    <div class="shop-item-left">
        <div class="shop-item-emoji">🌟</div>
        <div class="shop-item-info">
            <h4>Nombre del Item</h4>
            <p>Descripción del efecto</p>
        </div>
    </div>
    <div class="shop-item-price">
        <span>💰</span>
        <span>40</span>
    </div>
</div>
```

**Luego, implementar el efecto en `buyItem()` función:**
```javascript
} else if (itemType === 'nuevo-item') {
    // Tu lógica aquí
    gameState.nuevoAtributo += 1;
    feedback = `🌟 ¡Obtuviste nuevo-item!`;
}
```

---

## 🎨 Cambiar Colores

### Variables de Color (en CSS)
Busca (aprox. línea 13):
```css
:root {
    --primary: #00ff41;           /* Verde principal - terminal */
    --primary-dark: #00aa00;      /* Verde oscuro */
    --secondary: #ff006e;         /* Magenta - boss */
    --danger: #ff3333;            /* Rojo - peligro */
    --warning: #ffb703;           /* Naranja - advertencia */
    --success: #06ffa5;           /* Cyan - éxito */
    --bg-dark: #0a0e27;           /* Fondo oscuro */
    --bg-card: #1a1f3a;           /* Fondo cartas */
    --border: #2d3561;            /* Bordes */
    --text-light: #e0e0e0;        /* Texto claro */
}
```

### Temas Predefinidos

**Tema Cyberpunk (actual):**
```css
--primary: #ff00ff;      /* Magenta */
--secondary: #00ffff;    /* Cyan */
--danger: #ff0066;
--bg-dark: #0a0a0f;
```

**Tema Matrix:**
```css
--primary: #00ff00;      /* Verde */
--secondary: #00aa00;    
--danger: #ff3333;
--bg-dark: #000000;
```

**Tema Retro:**
```css
--primary: #ffff00;      /* Amarillo */
--secondary: #ff6600;    /* Naranja */
--danger: #ff0000;
--bg-dark: #000033;
```

---

## 📝 Cambiar Textos

### Cambiar Título de la Página
Busca (aprox. línea 4):
```html
<title>Terminal Battle - Aprende Linux</title>
```

### Cambiar Mensajes de Victoria/Derrota
Busca `victoryScreen()` (aprox. línea 723):
```javascript
document.getElementById('gameOverTitle').textContent = '🎉 ¡VICTORIA! 🎉';
document.getElementById('gameOverSubtitle').textContent = '¡Derrotaste al Boss Final y aprendiste Linux!';
```

### Cambiar Placeholder del Input
Busca (aprox. línea 515):
```html
<input type="text" class="input-field" id="commandInput" placeholder="Ingresa el comando...">
```

---

## 🎯 Ajustar Velocidad de Juego

### Cambiar Delay Entre Ejercicios
Busca `setTimeout` en `correctAnswer()` (aprox. línea 601):
```javascript
setTimeout(() => {
    gameState.currentExerciseIndex++;
    loadNextExercise();
}, 2000);  // <-- En milisegundos
```

Cambios:
```javascript
1000;  // 1 segundo - muy rápido
2000;  // 2 segundos - normal (actual)
3000;  // 3 segundos - tiempo para leer
```

### Cambiar Duración de Animaciones
En CSS, busca `transition` y `animation-duration` para cambiar valores como:
```css
transition: all 0.3s ease;  /* Cambiar 0.3s */
animation: damageFloat 1.5s ease-out forwards;  /* Cambiar 1.5s */
```

---

## 🔧 Cambios Avanzados

### Modificar Escala de Daño
Para hacer que el daño escale con nivel:
```javascript
let damage = exercise.damage + (gameState.playerLevel * 2);
```

### Sistema de Multiplicadores
```javascript
let multiplier = 1;
if (gameState.correctAnswers % 5 === 0) {
    multiplier = 1.5;  // 50% más daño cada 5 respuestas
}
damage = Math.floor(damage * multiplier);
```

### Penalización por Saltar
Actualmente saltar sumá vida. Para hacerlo penalizante:
```javascript
function skipExercise() {
    gameState.playerHp = Math.max(0, gameState.playerHp - 20);  // Quita vida
    // ... resto del código
}
```

---

## 💾 Crear Versiones Alternativas

### Para Principiantes
1. Reduce vidas a 75
2. Quita últimos 15 ejercicios
3. Aumenta precios de items en 50%
4. Reduce HP boss a 300

### Para Avanzados
1. Aumenta vidas a 100
2. Mantén todos 32 ejercicios
3. Reduce precios items en 30%
4. Aumenta HP boss a 700
5. Daño incorrecto a 20

### Mini Juego (30 minutos)
1. Copia ejercicios 1-12
2. HP Boss = 250
3. Sin tienda (comenta la sección)
4. Vidas = 80

---

## 🧪 Testing Local

Para probar cambios:
1. Abre el archivo HTML en tu navegador
2. Presiona **F12** para Developer Tools
3. Abre la pestaña **Console**
4. Escribe comandos para debuguear:

```javascript
// Ver estado actual del juego
console.log(gameState);

// Ver todos los ejercicios
console.log(exercises);

// Cambiar vidas del jugador (solo para testing)
gameState.playerHp = 50;
updateUI();

// Ir directo al ejercicio 20
gameState.currentExerciseIndex = 19;
loadNextExercise();
```

---

## 📞 Soporte de Desarrollo

Si necesitas agregar funcionalidad más compleja:
- **Guardar progreso**: Usa `localStorage` para guardar `gameState`
- **Multiplayer**: Abre 2 ventanas, comparten ejercicio
- **Ranking**: Guarda scores en texto para mostrar después
-  **API de comandos reales**: Integra con terminal backend

---

**¡Diviértete personalizando tu juego!** 🚀
