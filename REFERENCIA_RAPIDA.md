# 🎮 REFERENCIA RÁPIDA DE TERMINAL BATTLE

## Imprime esto y ten a mano en clase

---

## ⚡ CONTROLES RÁPIDOS

| Acción | Ejecutar |
|--------|----------|
| **Escribir comando** | En la caja de texto |
| **Enviar** | Enter o click ⚡EJECUTAR |
| **Ver pista** | Click 💡PISTA |
| **Saltar ejercicio** | Click ⏭️SALTAR |
| **Comprar item** | Click en el item |

---

## 🎯 FASES DE JUEGO

### FASE 1 (Min 0-15): BÁSICOS
```
Ejercicios 1-6
  echo - Imprimir texto
  mkdir - Crear carpetas
  cd - Navegar carpetas
  ls - Ver archivos
  touch - Crear archivos
  pwd - Ver ubicación

🎯 Goal: Entender estructura básica
```

### FASE 2 (Min 15-40): PERMISOS
```
Ejercicios 7-14
  chmod u+r/u+x/u+rw - Permisos simbólicos
  chmod 755/644 - Permisos octales
  chown - Cambiar propietario
  ls -l - Ver permisos en detalle

⚠️ PAUSA PEDAGÓGICA: Explica permisos aquí
🎯 Goal: Dominar chmod
```

### FASE 3 (Min 40-65): PRÁCTICA
```
Ejercicios 15-25
  mkdir -p - Carpetas anidadas
  cp - Copiar archivos
  rm - Eliminar archivos
  mv - Mover/renombrar
  find - Buscar archivos
  cat - Ver contenido

💰 Control: Estudiantes compran items
🎯 Goal: Operaciones con archivos
```

### FASE 4 (Min 65-80): AVANZADO
```
Ejercicios 26-32
  chmod -R - Cambios recursivos
  chgrp - Cambiar grupo
  ln -s - Crear enlaces
  ls -lh - Formato legible
  stat - Información archivo
  grep - Buscar en contenido

🔥 Boss gets stronger
🎯 Goal: Comandos avanzados
```

---

## 💬 QUÉ DECIR EN CADA MOMENTO

### Inicio:
> "Son VOX. Deben aprender Linux derrotando al Boss. 
> Cada respuesta correcta lo daña. Cada
> error los daña a ustedes. ¡A jugar!"

### Ejercicio 7 (PAUSA):
> "Aquí viene lo importante: PERMISOS. En Linux, 
> cada archivo tiene un dueño. Y ese dueño decide 
> quién puede leer (r), escribir (w), ejecutar (x). 
> Esto es seguridad. Así funciona LinkedIn, Gmail, 
> YouTube. Es importante."

### Ejercicio 15:
> "Ganaron monedas. Pueden comprar items para 
> hacerse más fuertes. Recomendación: Escudo para 
> no morir tanto. Así mantenemos el juego vivo."

### Ejercicio 26:
> "Los últimos ejercicios son complejos. Aquí 
> aprendemos búsquedas y cosas avanzadas. 
> Si usan pistas, está bien. Estamos aprendiendo."

### Final:
> "Cuando ganen, abran terminal real y reproduzcan 
> todo lo que hicieron. El juego es exacto a 
> Linux de verdad. ¡Así es como realmente funciona!"

---

## 📊 MONITOREO VISUAL

### La Barra de Vida del Boss
- 100%: Inicio (500 HP)
- 75% (375 HP): Ejercicio 8 aprox
- 50% (250 HP): Ejercicio 16 aprox
- 25% (125 HP): Ejercicio 24 aprox
- 0%: ¡VICTORIA!

### Puntos de Control (Detener y Hablar)
```
✓ Ejercicio 4: "¿Todos pasaron mkdir?"
✓ Ejercicio 7: PAUSA PEDAGOGICA sobre permisos
✓ Ejercicio 10: "Levanten la mano quien entiende 755"
✓ Ejercicio 15: Explica tienda de items
✓ Ejercicio 20: "¿Alguien necesita ayuda?"
✓ Ejercicio 26: "Últimos desafíos!"
```

---

## 💰 TIENDA DE ITEMS

### Qué Comprar Cuándo:

```
Ejercicios 1-5:  Acumula monedas
               No compres aún

Ejercicios 7-15: Ten 50+ monedas
               Compra ESCUDO (20💰)
               Reduces daño a mitad

Ejercicios 16-25: Ten 30+ monedas
                Compra ESPADA (25💰)
                O POCIÓN si bajo HP

Ejercicios 26-32: Ten 50+ monedas
                Compra BOMBA (50💰)
                Daño massivo al final

ESTRATEGIA TÍPICA:
  - Final Ejercicio 14: 60-80 monedas
  - Compra Escudo (20) → 40-60 monedas
  - Final Ejercicio 20: 80-100 monedas
  - Compra Espada (25) → 55-75 monedas
  - Final Ejercicio 25: 100-120 monedas
  - Compra Bomba (50) → 50-70 monedas
  - ¡Batalla final con todos items!
```

---

## ⚠️ PROBLEMAS COMUNES EN CLASE

### "No funciona mi comando"
```
💡 Revisa:
   [ ] ¿Espacios extras?
   [ ] ¿Mayúsculas incorrectas?
   [ ] ¿Distinto símbolo?
   [ ] ¿Pregunta si la respuesta es exacta
```

### "Estoy perdiendo mucha vida"
```
💡 Soluciones:
   1. Compra Escudo (reduce daño)
   2. Pide pista (cuesta -5 vida)
   3. Salta si estancado (+10 vida)
```

### "El boss tiene mucha defensa"
```
💡 Normal. Aumenta cada 5 ejercicios.
   Solución: Compra Espada o Bomba para +daño
```

### "No entiendo qué hace este comando"
```
💡 Muestra en terminal real (si puedes):
   $ echo "Hola"
   Hola
   (Explica: imprime lo que le digas)
```

---

## 🎯 COMANDOS POR CATEGORÍA

### Directorios
```
mkdir nombre          Crear carpeta
cd nombre            Ir a carpeta
cd ..               Subir un nivel
cd ~                Ir a home
pwd                 Ver ubicación actual
ls                  Ver contenido
```

### Archivos
```
touch nombre.txt      Crear archivo vacío
cat nombre.txt        Ver contenido
cp origen destino     Copiar
mv origen destino     Mover/renombrar
rm nombre            Eliminar
```

### Permisos
```
chmod u+r archivo     Usuario leer
chmod u+w archivo     Usuario escribir
chmod u+x archivo     Usuario ejecutar
chmod 755 archivo     rwxr-xr-x
chmod 644 archivo     rw-r--r--
chmod -R 755 dir      Cambio recursivo
```

### Búsqueda
```
find . -name "*.txt"  Buscar por nombre
grep "palabra" archivo   Buscar en contenido
ls -a                 Ver ocultos
ls -l                 Ver detalles
ls -lh               Ver detalles + legible
```

---

## ✨ TIPS PARA MANTENER ENERGÍA

### Minute 30: "Están en punto medio"
- Motívales mostrando progreso
- "¡La mitad del camino!"

### Minute 55: "Fase final"
- Levanta la voz: "¡Últimas batallas!"
- Muestra el Boss con poca vida
- "¡Casi lo tienen!"

### Minute 85: "Cierre épico"
- Mostra resultados finales
- "¡Ganaron! ¡Derrotaron al Boss!"
- Aplauso general

---

## 🏆 MÉTRICA DE ÉXITO

### Mínimo Aceptable:
✓ 70% de estudiantes llega ejercicio 20
✓ 60% entiende qué es chmod
✓ 50% termina o está muy cerca de terminar

### Óptimo:
✓ 90% llega ejercicio 25
✓ 85% entiende permisos bien
✓ 70% termina el juego

### Excelencia:
✓ 100% termina antes de 85 minutos
✓ 95% entiende comandos sin pistas
✓ 80% reproduce en terminal real después

---

## 📱 DESPUÉS DE CLASE

### Tarea Sugerida:
```
1. Juega Terminal Battle otra vez
2. Ejecuta 5 comandos en terminal real
3. Toma screenshot
4. Me lo envías
```

### Evaluación:
```
- Juego = 50% (nota)
- Terminal real = 30%
- Comprensión = 20%
```

---

## 📍 LOCALIZACIÓN DE COSAS EN GAME

```
┌─────────────────────────────────────────────┐
│ IZQUIERDA         │ CENTRO           │ DERECHA  │
│ Personajes        │ Terminal + Botones │ Tienda   │
│ Vida de VOX       │ Describir ejercicio │ Items    │
│ Vida de Boss      │ Caja de comandos   │ Comprar  │
│ Items equipados   │ Log de batalla      │ Stats    │
└─────────────────────────────────────────────┘
```

**Lo más importante:** CENTRO (Terminal)
**Monitorear:** IZQUIERDA (Barras de vida)
**Auxiliar:** DERECHA (Tienda cuando lo dicen)

---

## 🔄 SI ALGO FALLA

### Juego no carga:
- F5 (recargar página)
- Otra navegador
- Cierra y abre HTML de nuevo

### Terminal no funciona:
- Asegúrate de hacer click en caja de input
- Verifica que escribes el comando exactamente

### Botones no responden:
- Espera 1 segundo
- Refresh página
- Reinicia navegador

---

## 💾 PARA SALVAR PROGRESO

**Mala noticia:** El juego NO savea progreso (por diseño).
**Buena noticia:** Dura 90 minutos exactos. No necesita pausarse.

Si necesitas pausar:
- No cierres la pestaña
- Pausa el navegador (no es ideal)
- Mejor: Termina la sesión de una vez

---

## 📞 EN EMERGENCIA

### Email no funciona:
Intenta con tus 20 minutos más largos juego directo

### Estudiante atorado:
- Pista (-5 vida)
- O Saltar (+10 vida)
- Nunca hagas skip automático

### Tiempo no alcanza:
- Salta algunos ejercicios de prueba
- Mantén últimos 5 (los más importantes)
- O extender clase día siguiente

---

## 🎓 CONEXIÓN CON EVAU

### Los comandos aquí = Comandos EVAU
```
SEGURO salen:
  mkdir, cd, ls, chmod, touch, rm, cp

PROBABLE:
  chown, ls -l, pwd, cat

POSIBLE:
  find, grep, rm -r, chmod -R
```

### Después del juego:
1. Repasa estas 10 comandos
2. Haz mini-tests de 5 minutos
3. Simula examen EVAU real
4. ¡Aprobado! 

---

## 📊 HOJA DE SEGUIMIENTO

Imprime esto y marca durante la clase:

```
EJERCICIO | HORA | % CLASE | NOTA
1-6       | 0:15 | 25%     | ___
7-10      | 0:30 | 33%     | ___
11-15     | 0:45 | 50%     | ___
16-20     | 1:00 | 67%     | ___
21-25     | 1:15 | 83%     | ___
26-32     | 1:30 | 100%    | ___
```

Ajusta según tu grupo:
- Rápido: Adelanta
- Lento: Salta algunos
- Perfecto: Sigue el ritmo

---

## 🚀 RECUERDA

✅ TU ROL: Mentor, no juez

✅ SU ROL: Aprender jugando

✅ OBJETIVO: Linux + Diversión

✅ ÉXITO: Que entiendan los comandos

✅ VICTORIA: Que terminen con ganas de más

---

**Buena suerte en clase! 🎮📚**

*Imprime esta hoja. Llévala contigo. Consulta cada vez que lo necesites.*
