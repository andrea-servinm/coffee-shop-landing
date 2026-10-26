# Bear Coffee · Landing page para cafetería

Landing page de muestra para una cafetería de especialidad en Ciudad del Este, Paraguay. Pensada para publicitar el local, atraer nuevos clientes y recoger reseñas que ayuden a mejorar el servicio.

**Demo:** `https://andrea-servinm.github.io/coffee-shop-landing/`

![Captura de la landing](screenshot.png)

## Qué incluye

- **Hero con oso animado** dibujado en SVG: respira, flota vapor y ondas en el café.
- **Estado en vivo** del local ("Abierto ahora" / "Cerrado ahora") según el horario y la zona horaria del local.
- **Menú por categorías** (café, frío y para comer) con pestañas.
- **Reseñas de clientes** con promedio, distribución por estrellas y un carrusel que avanza solo.
- **Formulario de reseña** con nombre, puntuación, comentario y un campo opcional de sugerencias de mejora.
- **Horarios** con el día actual resaltado, mapa y botón de reserva por WhatsApp.
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

Todo el contenido de ejemplo es ficticio. Para adaptarla a un cliente real, estos son los lugares a editar:

| Qué | Dónde |
| --- | --- |
| Número y mensaje de WhatsApp | `index.html` (dos botones de reserva) |
| Instagram, Facebook y teléfono | `index.html` (pie de página) |
| Dirección y mapa | `index.html` (sección "Pasá a visitarnos") |
| Zona horaria del local | `script.js` (variable `TIMEZONE`) |
| Horarios de atención | `script.js` (lista `H`) |
| Menú y precios | `script.js` (objeto `M`) |
| Reseñas de ejemplo | `script.js` (lista `seed`) |
| Velocidad del carrusel | `script.js` (el valor `2800`, en milisegundos) |
| Colores y tipografías | `styles.css` (variables al inicio) |

Las secciones siguientes explican los que más se cambian.

## Zona horaria y horarios

El estado "Abierto ahora" se calcula con la hora **del local**, no con la del dispositivo del visitante. Así, alguien que mire la página desde otro país ve el estado correcto.

La zona horaria está en `script.js`:

```js
var TIMEZONE="America/Asuncion";
```

- Usá el nombre de la zona en formato IANA (`Continente/Ciudad`). Por ejemplo: `America/Asuncion`, `America/Argentina/Buenos_Aires`, `America/Sao_Paulo`, `America/Bogota`, `America/Mexico_City` o `Europe/Madrid`.
- Los cambios de horario de verano los resuelve el navegador solo.
- Si el nombre está mal escrito, la página no se rompe: usa la hora del dispositivo del visitante.

Los horarios de apertura están en la lista `H` de `script.js`, un renglón por día, empezando por el domingo. Cada uno lleva el nombre del día, la hora de apertura y la de cierre (formato 24 horas):

```js
["Lunes",7,20]   // abre a las 7:00 y cierra a las 20:00
```

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
- **Importante:** hay que cambiar el número en **los dos** botones.

**Recomendaciones**

- Usá un número de WhatsApp Business del local, no uno personal. Permite configurar mensaje de bienvenida, respuestas rápidas y horario de atención.
- Probá el botón desde un celular antes de publicar, para confirmar que abre la conversación correcta.
- Las reservas no quedan registradas en la página: viven en el chat del local. Si el volumen crece, conviene sumar un formulario con fecha, hora y cantidad de personas que arme el mensaje solo, o un sistema de reservas dedicado.

## Redes sociales y teléfono

Están en el pie de página de `index.html`:

```html
<a href="https://instagram.com/tu_cuenta" target="_blank" rel="noopener">Instagram</a>
<a href="https://facebook.com/tu_pagina" target="_blank" rel="noopener">Facebook</a>
<a href="tel:+595981123456">+595 981 123 456</a>
```

- **Instagram y Facebook:** reemplazá `tu_cuenta` y `tu_pagina` por el usuario o la página real del local. Si el local no usa una red, borrá esa línea completa para no dejar un enlace muerto.
- **Teléfono:** son dos datos distintos. El `href="tel:..."` lleva el número con `+` y código de país, sin espacios; el texto visible puede escribirse como quieras. Al tocarlo desde un celular, abre el marcador.
- **Otra red** (TikTok, X, etc.): copiá una de las líneas, cambiá la URL y el texto.

## Ubicación: dirección y mapa

Está en la sección "Pasá a visitarnos" de `index.html`.

**Dirección**

Se edita en la etiqueta `<address>`. El `<br>` separa las dos líneas:

```html
<address>Av. San Blas 1234<br>Ciudad, Departamento</address>
```

**Mapa de Google Maps**

Hoy hay un bloque vacío en el lugar del mapa. Para poner el real:

1. Abrí [Google Maps](https://maps.google.com) y buscá el local.
2. Tocá **Compartir** y elegí la pestaña **Incorporar un mapa**.
3. Tocá **Copiar HTML**. Vas a obtener una etiqueta `<iframe ...></iframe>`.
4. En `index.html`, reemplazá el bloque `<div class="map" ...>...</div>` por esto, pegando tu enlace en `src`:

```html
<div class="map">
  <iframe src="PEGÁ-ACÁ-EL-ENLACE-DEL-MAPA" title="Mapa de Bear Coffee" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
</div>
```

El estilo ya está preparado en `styles.css`: el mapa ocupa todo el ancho de su columna y se adapta al celular. Si pegás el iframe completo que da Google, los atributos `width` y `height` se ignoran y los reemplaza el CSS.

**Botón "Cómo llegar" (opcional):** en Google Maps, **Compartir → Copiar enlace**. Podés agregar un botón con ese enlace debajo del mapa, para que abra la app de mapas del celular.

## Limitaciones conocidas

- Las reseñas se guardan en el navegador de cada visitante (`localStorage`), por lo que no se comparten entre personas. Para un sitio real hay que conectar el formulario a un servicio como Supabase, Firebase o Formspree.
- La reserva por WhatsApp no confirma la mesa de forma automática: depende de que el local responda el mensaje.
- Los datos del local (dirección, teléfono, redes, precios y reseñas) son de ejemplo hasta que se reemplacen.

## Publicar en GitHub Pages

1. Subí todos los archivos del proyecto a un repositorio público.
2. En **Settings → Pages**, elegí **Deploy from a branch**, la rama `main` y la carpeta `/ (root)`.
3. Esperá un par de minutos y abrí el enlace que aparece en esa misma pantalla.

## Autoría

Diseñado y desarrollado por [Andrea Servín](https://www.linkedin.com/in/andreaservin-ing).
