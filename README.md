# Bear Coffee · Landing page para cafetería

Landing page de muestra para una cafetería de especialidad en Ciudad del Este, Paraguay. Pensada para publicitar el local, atraer nuevos clientes y recoger reseñas que ayuden a mejorar el servicio.

**Demo:** `https://TU-USUARIO.github.io/bear-coffee/`

![Captura de la landing](screenshot.png)

## Qué incluye

- **Hero con oso animado** dibujado en SVG: respira, flota vapor y ondas en el café.
- **Estado en vivo** del local ("Abierto ahora" / "Cerrado ahora") según el horario.
- **Menú por categorías** (café, frío y para comer) con pestañas.
- **Reseñas de clientes** con promedio, distribución por estrellas y un carrusel que avanza solo.
- **Formulario de reseña** con nombre, puntuación, comentario y un campo opcional de sugerencias de mejora.
- **Horarios** con el día actual resaltado y botón de reserva por WhatsApp.
- **Modo claro y oscuro** con botón, que recuerda la elección y sigue al sistema si no se eligió.
- **Responsiva** para celular, tablet y escritorio.
- **Accesible:** navegación por teclado, etiquetas para lectores de pantalla y respeto por la preferencia de movimiento reducido.

## Tecnologías

HTML, CSS y JavaScript puros, sin frameworks ni dependencias. Solo se cargan las tipografías Young Serif y Figtree desde Google Fonts.

## Estructura

```
bear-coffee/
├── index.html
├── styles.css
├── script.js
├── favicon.svg
├── apple-touch-icon.png
└── README.md
```

## Cómo verla en tu computadora

Abrí `index.html` en el navegador. No hace falta instalar nada.

## Cómo personalizarla

Todo el contenido de ejemplo es ficticio. Para adaptarla a un cliente real:

- **Datos del local:** dirección, teléfono y redes en `index.html`. Para el WhatsApp de reservas, mirá la sección siguiente.
- **Horarios:** la lista `H` al inicio de `script.js` (día, hora de apertura y de cierre).
- **Menú y precios:** el objeto `M` en `script.js`.
- **Reseñas de ejemplo:** la lista `seed` en `script.js`.
- **Colores y tipografías:** las variables al inicio de `styles.css`.
- **Velocidad del carrusel:** el valor `2800` (milisegundos) en `script.js`.
- **Mapa:** reemplazá el bloque `.map` por un iframe de Google Maps.

## Reservas de mesa por WhatsApp

Las reservas se hacen por WhatsApp, sin necesidad de un sistema de reservas ni de un servidor. El botón abre una conversación con el número del local y el mensaje ya escrito, y el personal confirma la mesa desde su teléfono.

**Cómo funciona para el cliente**

1. Toca **Reservar mesa** (en la barra superior) o **Reservar por WhatsApp** (en la sección de ubicación).
2. Se abre WhatsApp con el mensaje listo para enviar.
3. Completa los datos que faltan (día, hora y cantidad de personas) y lo envía.
4. El local responde y confirma.

**Cómo configurarlo**

Los dos botones están en `index.html` y hoy tienen `href="#"` como marcador. Reemplazalos por un enlace con este formato:

```html
<a class="btn" href="https://wa.me/595981123456?text=Hola%2C%20quisiera%20reservar%20una%20mesa" target="_blank" rel="noopener">Reservar mesa</a>
```

- **Número:** va después de `wa.me/`, con el código de país y sin `+`, espacios, guiones ni el `0` inicial. Por ejemplo, `+595 981 123 456` se escribe `595981123456`.
- **Mensaje:** va después de `?text=` y tiene que estar codificado para URL (los espacios son `%20`, la coma es `%2C` y los saltos de línea son `%0A`). Si no querés codificarlo a mano, podés usar un generador de enlaces de WhatsApp.
- **Mensaje sugerido:** `Hola, quisiera reservar una mesa para ___ personas el día ___ a las ___.` Así el cliente solo completa los espacios en blanco.
- **Dónde cambiarlo:** hay que editar los dos botones. Si cambiás el número, acordate de actualizarlo en ambos.

**Recomendaciones**

- Usá un número de WhatsApp Business del local, no uno personal. Permite configurar mensaje de bienvenida, respuestas rápidas y horario de atención.
- Probá el botón desde un celular antes de publicar, para confirmar que abre la conversación correcta.
- Las reservas no quedan registradas en la página: viven en el chat del local. Si el volumen crece, conviene sumar un formulario con fecha, hora y cantidad de personas que arme el mensaje solo, o un sistema de reservas dedicado.

## Limitaciones conocidas

- Las reseñas se guardan en el navegador de cada visitante (`localStorage`), por lo que no se comparten entre personas. Para un sitio real hay que conectar el formulario a un servicio como Supabase, Firebase o Formspree.
- El estado "Abierto ahora" usa la hora del dispositivo del visitante, no la de Paraguay.
- La reserva por WhatsApp no confirma la mesa de forma automática: depende de que el local responda el mensaje.

## Publicar en GitHub Pages

1. Subí los archivos a un repositorio público.
2. En **Settings → Pages**, elegí **Deploy from a branch**, la rama `main` y la carpeta `/ (root)`.
3. Esperá un par de minutos y abrí el enlace que aparece en esa misma pantalla.

## Autoría

Diseñado y desarrollado por [Andrea Servín](https://www.linkedin.com/in/andreaservin-ing).
