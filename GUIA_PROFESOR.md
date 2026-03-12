# 👨‍🏫 GUÍA RÁPIDA PARA PROFESOR

## 🎯 Antes de la Clase

### Checklist (5 minutos)
- [ ] Descarga el archivo `terminal-game.html`
- [ ] Abre en tu navegador favorito (Chrome recomendado)
- [ ] Juega 5-10 minutos para familiarizarte
- [ ] Prueba los botones: EJECUTAR, PISTA, SALTAR
- [ ] Verifica que compras en la tienda funcionan

### Problemas Comunes
**P: El juego no se ve completo**
R: Asegúrate de que la ventana está maximizada. Ancho mínimo: 1366px

**P: Los comandos no aceptan mi respuesta correcta**
R: Revisa que sea EXACTAMENTE igual. Los espacios cuentan.

**P: Puedo jugar más para entender mejor los ejercicios**
R: ¡SÍ! Crea 2 explorador de archivos, abre el HTML en uno y practica comandos en el otro

---

## 🚀 Durante la Clase

### Introducción (10 min)
**Dile a los estudiantes:**

> "Durante la próxima hora y media, vamos a aprender comandos de terminal jugando. Serán el personaje VOX y deberán derrotar un BOSS final (Pedro Sánchez). 
>
> Cada ejercicio correcto lo daña. Cada respuesta incorrecta les quita vidas.
>
> Pueden comprar items en la tienda para hacerse más fuertes. El objetivo es APRENDER, no solo ganar.
>
> ¿Preguntas? ¡Adelante!"

### Fase 1: Aprendizaje (0-20 min) | Ejercicios 1-6

**Objetivo:** Que entiendan la mecánica básica

```
Proyecta tu pantalla o camina viendo sus pantallas

1. Ejercicio 1: ECHO
   - Explica: "Este comando imprime texto"
   - Analiza: qué pasa cuando lo ejecutan
   - Pregunta: "¿Alguien puede decir qué es un comando?"

2. Ejercicios 2-6: Deja que intenten
   - Punto de control a ejercicio 3: Verifica que todos pasaron mkdir
   - Si muchos fallan: Para y explica de nuevo
   - Recomendación: No dejen saltar todavía
```

**Métricas de Control:**
- Si todos en ejercicio 3: Ritmo perfecto ✅
- Si muchos atrasados: Pausa, explica directorios ⏸️
- Si todos avanzados: Acelera el ritmo 🚀

### Fase 2: Permisos (20-45 min) | Ejercicios 7-14

**Punto de Control Importante:** Aquí viene lo difícil

```
⏸️ PAUSA PEDAGÓGICA aquí (5 min)

Explica visualmente:
- Dibuja rwx en la pizarra
- Muestra: -rw-r--r-- (propietario, grupo, otros)
- Dí: "En Linux, todo tiene propietario"

Ejemplo visual:
    chmod u+r archivo.txt
    └─ El usuario (u) puede read (r)
    
    chmod 755 archivo
    └─ 7=usuario (rwx), 5=grupo (r-x), 5=otros (r-x)
```

**Control de Flujo:**
- Ejercicio 10: Si > 50% falla, enseña ls -l de verdad
- Ejercicio 14: Hacen chmod 755, explica por qué es común

### Fase 3: Práctica Guiada (45-70 min) | Ejercicios 15-25

**Punto de Control:** Compras en la tienda

```
Después del ejercicio 15, dí:

"Vemos que el boss empieza a atacar más fuerte.
 Podemos comprar items en la tienda con las monedas que ganamos.
 
 Recomendación: Compren un Escudo (20 monedas) para defensa.
 Así reciben menos daño."

Monitoreo:
- Camina entre estudiantes
- Si tienen < 5 monedas: Dí que se enfoquen en aprender
- Si tienen > 50 monedas: Sugiere comprar Bomba
```

### Fase 4: Batalla Crítica (70-85 min) | Ejercicios 26-32

**Atmósfera:** "¡Esto es lo importante!"

```
"Los últimos 7 ejercicios son los más complejos.
 
 Aquí aprenderemos búsquedas, permisos avanzados y más.
 
 Si no estás seguro, USA LAS PISTAS. Eso no es malo en la educación."

Mientras juegan:
- Quédate disponible para preguntas
- Permite pistas sin penalizar
- Si alguien salta muchos: Sugiere verlos en la terminal real después
```

### Fase 5: Cierre (85-90 min)

```
Cuando el primero termine:

"¡Felicidades! Derrotaste el boss. 
 Ahora abre la terminal de verdad y ejecuta estos comandos:
 
 mkdir carpeta_test
 cd carpeta_test
 touch archivo.txt
 chmod 755 archivo.txt
 ls -l
 
 Verás que es exactamente lo que jugaste."

Cierre grupal:
1. Pregunta: "¿Cuál fue el comando más difícil?"
2. Explica: "Linux es así de importante"
3. Dí: "Ahora saben lo que muchos desarrolladores usan cada día"
4. Menciona: "Para preparar la EVAU, dominen estos 15 comandos básicos"
```

---

## 📊 Métricas para Evaluar Aprendizaje

### Lo que DEBERÍAN aprender:
```
✅ mkdir/cd - Navegar directorios (Ejercicio 1-3)
✅ ls/pwd   - Ver dónde están (Ejercicio 3-6)
✅ chmod    - Permisos en 2 formatos (Ejercicio 7-14)
✅ cp/rm    - Copiar/borrar (Ejercicio 12-13)
✅ find/grep - Búsquedas (Ejercicio 26-27)
```

### Cómo Medir:
1. **Observación:** ¿Entienden qué hace cada comando?
2. **Velocidad:** ¿Escriben menos de 30 segundos por ejercicio?
3. **Independencia:** ¿Intentan sin pistas primero?
4. **Transfer:** ¿Pueden abrir terminal y reproducirlo?

---

## 🆘 Troubleshooting en Clase

### Problema: "No funciona el juego"
**Solución:**
1. Recarga la página (Ctrl+R)
2. Intenta otro navegador (Chrome es lo mejor)
3. Si sigue: Copia el HTML en un servidor web

### Problema: "Mi respuesta es correcta pero dice incorrecta"
**Posibles causas:**
```
❌ Espacios extras: "echo  VOX" en lugar de "echo VOX"
❌ Mayúsculas: "MKDIR" en lugar de "mkdir" 
❌ Signos: "chmod u+r " con espacio al final
```

**Solución rápida:** Dile que tenga cuidado con espacios

### Problema: "Estoy muy bajo de vida"
**Opciones:**
1. Compra Poción (10 monedas) en tienda
2. Usa Saltar (te da +10 vida)
3. Usa pista para reducir intentos

### Problema: "El boss tiene mucha defensa"
**Normal.** La defensa aumenta cada 5 ejercicios.
**Solución:** Compra Espada o Bomba para +daño

---

## 🎓 Cosas para Mencionar en Clase

### Sobre Linux
```
"En Linux/Debian, los permisos son MUY importantes.
 Si otro usuario no tiene permiso, NO puede ver tu archivo.
 
 Esto es seguridad. Es por eso que Linux corre el 95% 
 de servidores del mundo."
```

### Sobre la Historia
```
"El concepto de permisos rwx (usuario, grupo, otros) 
 fue inventado en 1969 cuando UNIX fue creado.
 
 51 años después, SIGUE SIENDO igual. Eso es buena diseño."
```

### Sobre EVAU
```
"En la EVAU, no les pedirán que dominen TODO Linux.
 Pero estos 15 comandos que aprendieron hoy? 
 Eso SÍ que puede salir. Practiquen en casa."
```

---

## 🏆 Gamificación Adicional

### Competencia (Opcional)
```
"Quien termine primero CON TODAS LAS RESPUESTAS CORRECTAS
 (sin saltar) se lleva 0.5 puntos bonus en la nota."

Ventajas:
- Motiva los rápidos
- Still premia el aprendizaje (tiene que ser correcto)
```

### Retorno
```
Después de la clase, pide:
"Abran terminal y reproduzcan 5 comandos del juego.
 Mándenme foto. Vale por 1 punto."
 
Esto last-mile aprende a transferir el juego a realidad.
```

---

## 📱 Después de la Clase

### Para Refuerzo
1. Dí: "El HTML está en tu ordenador. Puedes jugar cuando quieras"
2. Sugiere: "Intenta pasar con Defensa + Daño máximo"
3. Propón: "¿Alguien quiere modificar los ejercicios para sus amigos?"

### Para EVAU
```
"Dediquen 30 minutos a la semana reproduciéndolo en terminal REAL.

El juego te enseña, pero no es suficiente.
Terminal real es donde aprendes y DOMINAS."
```

### Ejercicios Complementarios
```
Despés de Terminal Battle, asigna:

1. "mkdir proyecto && cd proyecto && touch archivo.{1..10}.txt"
2. "Copia 5 archivos a backup con cp -r"
3. "Cambia permisos recursivos a 744 en una carpeta"
4. "Usa find para localizar todos los .txt"
```

---

## ✅ Checklist Final

Antes de terminar la clase:

- [ ] Todos jugaron al menos 20 ejercicios
- [ ] Al menos 70% entienden qué es chmod
- [ ] Al menos 1 estudiante preguntó algo inteligente
- [ ] Anotaste quién tuvo más dificultad (seguimiento)
- [ ] Dijiste dos ejemplos de uso en el mundo real
- [ ] Instó a jugar en casa/practicar en terminal

---

**¡Que disfruten la clase! 🚀 Recuerda: el objetivo es que aprendan, no solo que jueguen.**
