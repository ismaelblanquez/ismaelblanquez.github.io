# 🎮 TERMINAL BATTLE - Aprende Linux Jugando

## 📖 Descripción
**Terminal Battle** es un juego educativo interactivo diseñado para enseñar comandos de Linux (Debian) a través de una batalla épica. El jugador toma el rol de **VOX** y debe derrotar al **BOSS FINAL (Pedro Sánchez)** resolviendo ejercicios de terminal correctamente.

**Duración estimada:** 1 hora y 30 minutos de clase
**Público:** Estudiantes de Tecnología / EVAU
**Temas:** Creación de carpetas, permisos, comandos básicos de terminal

---

## 🎯 Mecánica del Juego

### Sistema de Combate
- **Tu Personaje (VOX)**: 100 HP iniciales, sube a 120 en nivel 2, 140 en nivel 3, etc.
- **Boss Final**: 500 HP que disminuye con cada respuesta correcta
- **Respuesta Correcta** → ⚔️ Daño al Boss (10-20 + bonificaciones)
- **Respuesta Incorrecta** → 🔥 Recibe daño (15 HP modificable por defensa)

### Sistema de Progresión
```
Comandos correctos → Monedas + Experiencia
Experiencia 200 → Subes de nivel (Max HP +20)
Cada 5 ejercicios → Boss Defense +1
```

### Recursos
- 💰 **Monedas**: Se ganan por respuestas correctas
- 📈 **XP**: Acumula para subir nivel
- ❤️ **Vida**: Necesaria para usar pistas, se recupera comprando pociones

---

## 🛍️ Tienda de Items

| Item | Costo | Efecto |
|------|-------|--------|
| 🧪 Poción Menor | 10💰 | Recupera 25 HP |
| ⚔️ Espada del Aprendiz | 25💰 | +15 daño (equipable, acumulable) |
| 🛡️ Escudo de Conocimiento | 20💰 | +15% Defensa contra ataques |
| 💣 Bomba de Código | 50💰 | +40 daño especial (equipable, acumulable) |

**Estrategia:** La tienda es ESSENTIAL para ganar. Si tienes dificultades:
1. Acumula monedas en los primeros ejercicios
2. Compra una Poción y un Escudo en el medio juego
3. Por el final, consigue la Bomba para daño máximo

---

## 📚 Ejercicios Incluidos (32 Total)

### Fase 1: Básicos (Ejercicios 1-6)
- `echo` - Imprimir texto
- `mkdir` - Crear directorios
- `cd` - Navegar directorios
- `ls` - Listar archivos
- `touch` - Crear archivos
- `pwd` - Mostrar directorio actual

### Fase 2: Permisos Fundamentales (Ejercicios 7-14)
- `chmod u+r` - Permisos de lectura
- `chmod u+x` - Ejecución
- `chmod u+rw` - Múltiples permisos
- `ls -l` - Ver permisos en detalle
- `chown` - Cambiar propietario
- `chmod 755` - Permisos octales
- etc.

### Fase 3: Operaciones Avanzadas (Ejercicios 15-24)
- `mkdir -p` - Crear directorios anidados
- `cp archivo1 archivo2` - Copiar
- `rm archivo` - Eliminar
- `cd ~` - Home directory
- `chmod 644` - Permisos documentos
- `cp -r directorio backup` - Copiar recursivo
- `rmdir` - Eliminar directorio
- `cat` - Ver contenido
- `mv` - Mover/renombrar

### Fase 4: Avanzado (Ejercicios 25-32)
- `ls -lh` - Formato legible
- `chmod -R 755` - Recursivo
- `find . -name '*.sh'` - Búsquedas
- `chgrp` - Cambiar grupo
- `ln -s` - Crear enlaces
- `chmod g+r` - Permisos grupo
- `chmod o+x` - Permisos otros
- `stat` - Información detallada

---

## 🎮 Controles

| Acción | Botón/Tecla |
|--------|------------|
| Escribir comando | Escribe en la terminal |
| Ejecutar comando | Click en "⚡ EJECUTAR" o Enter |
| Pedir pista | Click en "💡 PISTA" (-5 vida) |
| Saltar ejercicio | Click en "⏭️ SALTAR" (+10 vida) |
| Comprar item | Click en item en la tienda |

---

## 💡 Pistas y Ayuda

### Sistema de Pistas
- **Costo**: -5 HP
- **Requisito**: Mínimo 10 HP
- **Ventaja**: Informa sobre sintaxis del comando
- **Estrategia**: Úsalas solo cuando estés atascado

### Sistema de Saltar
- **Costo**: Nada, pero +10 HP
- **Efecto**: Te muestra la solución exacta
- **Castigo**: No avanzas

**Consejo para 1h30min:** 
- Primeros 20 ejercicios: Aprende bien sin saltar
- Después: Usa saltar para mantener ritmo si te atascas
- Compra defensa para reducir daño recibido

---

## 📊 Panel de Información

### Lado Izquierdo: Personajes
- **VOX**: Tu personaje, barra de vida, nivel, XP, monedas
- **BOSS**: Vida enemiga, defensa

### Centro: Terminal
- Donde ejecutas los comandos
- Feedback de respuestas
- Log de batalla

### Lado Derecho: Inventario y Tienda
- **Inventario**: Items que has comprado
- **Tienda**: Items disponibles
- **Estadísticas**: Contador de acciones

---

## 🏆 Objetivos de Aprendizaje

### Aprenderás a:
1. ✅ Navegar el sistema de archivos Linux
2. ✅ Entender la estructura de permisos (rwx)
3. ✅ Usar chmod en formato simbólico y octal
4. ✅ Crear, copiar, mover y eliminar archivos/carpetas
5. ✅ Cambiar propietarios y grupos
6. ✅ Usar parámetros (-r, -l, -a, -h, etc.)
7. ✅ Reconocer directorios especiales (., .., ~)

---

## ⚙️ Configuración Técnica

### Requisitos
- Navegador moderno (Chrome, Firefox, Edge, Safari)
- JavaScript habilitado
- Resolución mínima 1366x768 (se adapta a menor tamaño)

### Formato
- Archivo HTML único, todo embebido
- Sin conexión a internet requerida
- Funciona offline completamente

---

## 🎓 Uso en Clase

### Plan de Clase (90 minutos)

**00:00-10:00** - Introducción
- Explicar mecánica del juego
- Primer ejercicio guiado con profesor

**10:00-45:00** - Juego libre guiado
- Estudiante resuelve ejercicios 1-15
- Profesor para cuando tenga dudas
- Pausa a ejercicio 7 para explicar permisos

**45:00-70:00** - Juego intenso
- Ejercicios 16-25
- Compran items en la tienda
- Boss defense aumenta, necesitan estrategia

**70:00-85:00** - Clímax
- Últimos ejercicios
- Batalla final contra el boss
- Intentan alcanzar victoria

**85:00-90:00** - Repaso y reflexión
- Revisar qué comandos costaron más
- Discutir alternativas
- Mostrar recursos para practicar en casa

---

## 🚀 Tips para Profesor

1. **Antes de clase**: Prueba el juego una vez para familiarizarte
2. **Primeros ejercicios**: Explicar bien que es cada comando
3. **Compras**: Anima a estudiantes a comprar defensa en mitad del juego
4. **Ritmo**: Si alguien falla mucho, sugiere pista en lugar de saltar
5. **Competencia**: Puedes hacer que gane quién derrota el boss con más monedas
6. **Revisión**: Después, pide que ejecuten los comandos en terminal real

---

## 📝 Notas para Estudiantes

- Los comandos DEBEN escribirse exactamente como piden (incluyendo espacios)
- no es lo mismo `ls -l` que `ls-l` o `ls -L`
- Los ejercicios avanzan de fácil a difícil
- Usar pistas es VÁLIDO si estás aprendiendo
- El goal es APRENDER, no solo ganar

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Juego no carga | Verifica JavaScript está habilitado |
| Terminal no scrollea | Usa rueda del mouse o teclado 🔼🔽 |
| No puedo escribir | Haz click en campo de entrada |
| Botones no responden | Recarga la página (Ctrl+R) |
| Bajo FPS | Cierra otras pestañas, reduce efectos navegador |

---

## 🎨 Características Especiales

✨ **Efectos Visuales**
- Animaciones de combate
- Popups de daño flotantes
- Glow y scanlines en terminal
- Animaciones de barras de vida

🎵 **Atmósfera Gamer**
- Personaje tematizado (VOX con sombrero de copa 🎩)
- Boss con emoji amenazante 😈
- Mensajes de combate estilo RPG
- Feedback visual en cada acción

🎯 **Educación Interactiva**
- Validación exacta de comandos
- Explicaciones en time real
- Pistas contextuales
- Escalado de dificultad

---

## 📄 Licencia y Uso

Este juego es de código abierto y puede ser modificado libremente para tus necesidades educativas.

---

**Creado con ❤️ para aprender Linux jugando | 2026**
