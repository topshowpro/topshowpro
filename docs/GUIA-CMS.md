# Guía de uso del CMS — Top Show Pro

**Sanity Studio** es el panel de administración donde cargás y editás todo el contenido del sitio. Esta guía explica exactamente qué campos controlan qué parte de cada página.

---

## Acceso al Studio

**URL:** [https://top-show-pro.vercel.app/studio]( https://top-show-pro.vercel.app/studio)
*(También disponible en `/studio` cuando el servidor de desarrollo está corriendo)*

El panel lateral izquierdo tiene estas secciones:

| Ícono | Sección | Qué controla |
|-------|---------|--------------|
| ⚙️ | Configuración del sitio | Contacto, redes, imágenes de fondo de páginas |
| 🎬 | Hero | Carrusel de la homepage |
| 🏠 | Homepage | Texto intro + eventos destacados |
| 🎭 | Eventos | Portfolio de eventos |
| 🏷️ | Categorías de Eventos | Teatro, Discoteca, Corporativo, Privados |
| 🔧 | Servicios | Técnica Teatral, Rental, Corporativo, etc. |
| 📦 | Categorías de Equipamiento | Iluminación, Sonido, Stage, LED |
| 🔩 | Ítems de Equipamiento | Equipos individuales dentro de cada categoría |
| 🏢 | Clientes | Logos del slider en homepage |
| 🎯 | Marcas | Logos del carrusel de marcas |
| 📬 | Categorías de Contacto | Opciones del formulario de contacto |
| 📥 | Consultas recibidas | Formularios enviados por visitantes |
| 🔍 | SEO Defaults | Título y descripción globales |
| 🧪 | Vision | Herramienta técnica de consulta (uso interno) |

### ⚠️ Notas importantes sobre el acceso
Existen dos URLs de acceso, pero **siempre debés usar la de Vercel**:

1. **URL de Vercel (Recomendada):** `https://top-show-pro.vercel.app/studio`
   - Está vinculada directamente al código. Si el equipo técnico hace un cambio, lo ves acá al instante.
2. **URL de Sanity.io (Desactualizada):** `https://topshowpro.sanity.studio`
   - Es una instancia independiente que requiere despliegue manual. Suele estar desactualizada respecto a la versión de Vercel.

### 🌐 Cambio de dominio y CORS
Si decidís conectar un dominio propio (ej: `topshowpro.com.ar`), el Studio estará en `topshowpro.com.ar/studio`. 
**Recordatorio:** Al cambiar el dominio, se debe entrar a [manage.sanity.io](https://manage.sanity.io) > API > CORS Origins y agregar la nueva URL con "Allow credentials" activado para que Sanity dé permiso de conexión al nuevo dominio.

---

## 1. Homepage

La homepage combina datos de tres fuentes: **Hero**, **Homepage** y **Clientes**.

---

### 1.1 Hero (carrusel principal)

**Panel:** 🎬 Hero

El hero es el carrusel de pantalla completa que aparece al entrar al sitio.

#### Slides (diapositivas)

Cada slide tiene:

| Campo | Qué hace | Obligatorio |
|-------|----------|-------------|
| **Frase** | Texto grande en la pantalla (ej: "Producción completa. Sin vueltas.") | Sí |
| **Color de acento** | `cyan` (celeste) o `violet` (violeta) — color del texto destacado | Sí |
| **Poster (imagen)** | Foto de fondo mientras carga el video, o si no hay video | Recomendado |
| **Video** | Archivo de video de fondo (formato MP4 / WebM) | No |

> **Imagen del poster:** mínimo 1920×1080 px, formato JPG/WebP. Se usa como fondo en pantallas sin autoplay de video.

#### Banner inferior ("Faja azul")

Barra de texto que aparece debajo del carrusel:

| Campo | Qué hace |
|-------|----------|
| **Texto** | Mensaje corto (ej: "Menos proveedores. Más Top Show.") |
| **CTA — Texto del botón** | Ej: "Contactanos" |
| **CTA — Link** | URL destino (ej: `/contacto`) |

---

### 1.2 Homepage (texto + eventos destacados)

**Panel:** 🏠 Homepage

| Campo | Qué hace | Obligatorio |
|-------|----------|-------------|
| **Intro** (texto enriquecido) | Párrafo de la sección "Quiénes somos" debajo del hero. Admite negritas, párrafos, listas. | No — si está vacío muestra texto de ejemplo |
| **Eventos Destacados** | Lista de referencias a eventos que aparecen en la sección "Eventos destacados" | No — si está vacío muestra automáticamente los 4 eventos más recientes con `featured = true` |

> **Tip:** Si querés controlar exactamente qué 4 eventos aparecen en la homepage, usá el campo **Eventos Destacados** para seleccionarlos manualmente. Si lo dejás vacío, el sistema elige solo los eventos que tengan la opción **"Destacado"** activada.

---

### 1.3 Clientes (slider de logos)

**Panel:** 🏢 Clientes

Cada documento de cliente tiene:

| Campo | Qué hace | Obligatorio |
|-------|----------|-------------|
| **Nombre** | Nombre de la empresa (ej: "Movistar Arena") | Sí |
| **Logo** | Imagen del logo. Se muestra en blanco y negro por defecto. | No — si no hay logo, muestra el nombre como texto |
| **Orden** | Número que determina la posición en el slider | No |

> **Imagen del logo:** usar PNG con fondo **transparente**, orientación horizontal, mínimo 200px de ancho. El slider aplica escala de grises automática; al pasar el mouse recupera el color original.

> **El slider solo aparece si hay al menos 1 cliente cargado.** Si borrás todos los clientes, la sección desaparece de la homepage.

---

### 1.4 Servicios (grilla en homepage)

Los primeros 5 servicios activos aparecen en la grilla de la homepage. Cada tarjeta muestra personalmente:

- Nombre del servicio
- Descripción corta
- Primera imagen de la galería como fondo tenue

Se administran desde **🔧 Servicios** (ver sección 3).

---

## 2. Página de Eventos (`/eventos`)

**Panel:** 🎭 Eventos + 🏷️ Categorías de Eventos

---

### 2.1 Categorías de Eventos

**Panel:** 🏷️ Categorías de Eventos

Cada categoría tiene:

| Campo | Qué hace | Obligatorio |
|-------|----------|-------------|
| **Nombre** | Texto del botón de filtro (ej: "Teatro") | Sí |
| **Slug** | Identificador URL (ej: `teatro`) — solo minúsculas y guiones | Sí |
| **Orden** | Posición en la barra de filtros | No |

Las categorías actuales son: `Teatro`, `Discoteca`, `Corporativo`, `Privados`.

---

### 2.2 Eventos

**Panel:** 🎭 Eventos

Cada evento es una tarjeta en la grilla y una página de detalle propia.

#### Campos del evento

| Campo | Dónde aparece | Obligatorio |
|-------|--------------|-------------|
| **Título** | Tarjeta + página de detalle | Sí |
| **Subtítulo** | Tarjeta (2 líneas máx) + página de detalle | No |
| **Slug** | URL de la página (ej: `creamfields-argentina-2025`) | Sí — generado automáticamente del título |
| **Categoría** | Badge en tarjeta + filtro + detalle | Sí |
| **Fecha de inicio** | Tarjeta + detalle | Sí |
| **Fecha de fin** | Detalle (si el evento dura varios días) | No |
| **Cliente** | Detalle — fila de info debajo del título | No |
| **Locación** | Detalle — fila de info | No |
| **Descripción** (texto enriquecido) | Detalle — cuerpo del artículo | No |
| **Equipos utilizados** | Detalle — grilla de chips debajo de la descripción | No |
| **Tags técnicos** | Detalle — badges (Iluminación / Sonido / LED / Stage / Backline) | No |
| **Video** | Detalle — iframe embebido (YouTube o Vimeo) | No |
| **Imagen hero** | Tarjeta + cabecera de página de detalle | Sí |
| **Galería** | Detalle — grilla de fotos al final | No |
| **Destacado** | Activa o no aparición en homepage si no hay selección manual | No |
| **SEO** | Título y descripción para Google | No |

#### Imagen Hero del evento

- **Tamaño recomendado:** 1600×900 px mínimo (relación 16:9)
- **Formato:** JPG o WebP
- En la **tarjeta** se muestra recortada en proporción 4:3
- En la **página de detalle** se muestra a ancho completo con altura de 50–70% del viewport

#### Galería del evento

- Subir entre 3 y 12 fotos
- Formato JPG/WebP, mínimo 800px de ancho
- Se muestran en grilla de 1–3 columnas según cantidad

#### Video del evento

Pegar la URL directa de YouTube o Vimeo:

- ✅ `https://www.youtube.com/watch?v=XXXXXXXXXXX`
- ✅ `https://youtu.be/XXXXXXXXXXX`
- ✅ `https://vimeo.com/XXXXXXXXX`

El sistema convierte automáticamente la URL a un embed (iframe).

---

## 3. Página de Servicios (`/servicios`)

**Panel:** 🔧 Servicios

Cada servicio tiene su propio tab en la página. El orden de los tabs se controla con el campo **Orden**.

#### Campos de cada servicio

| Campo | Dónde aparece | Obligatorio |
|-------|--------------|-------------|
| **Nombre** | Tab + tarjeta homepage | Sí |
| **Ícono** | Tarjeta en homepage | No |
| **Orden** | Posición en tabs y grilla | No |
| **Descripción corta** | Tarjeta homepage + resumen en tab | No |
| **Descripción larga** (texto enriquecido) | Cuerpo del tab | No |
| **Galería** | Grilla de imágenes dentro del tab (máximo 4 se muestran) | No |
| **Contacto técnico** | Bloque de contacto dentro del tab ("Soporte técnico") | No |
| **CTA** | Botón al final del tab | No |

#### Galería de servicios

- Se muestran hasta 4 imágenes en el tab (2×2 grid en desktop)
- Formato JPG/WebP, mínimo 900×600 px
- La primera imagen también se usa como fondo en la tarjeta de la homepage

#### Contacto técnico (opcional)

Si un servicio tiene un responsable técnico específico, completar:

| Campo | Ejemplo |
|-------|---------|
| Nombre | Juan Pérez |
| Teléfono | +54 11 8765-4321 |
| Email | <tecnico@topshowpro.com.ar> |

Si no se completa, el bloque de soporte técnico no aparece en ese servicio.

#### Imagen de fondo del header

La foto de cabecera de la página `/servicios` se configura en **⚙️ Configuración del sitio → Hero Servicios**.

---

## 4. Página de Equipamiento (`/equipamiento`)

**Panel:** 📦 Categorías de Equipamiento + 🔩 Ítems de Equipamiento + 🎯 Marcas

La página de equipamiento es un acordeón donde cada categoría despliega su catálogo de ítems.

---

### 4.1 Categorías de Equipamiento

**Panel:** 📦 Categorías de Equipamiento

| Campo | Qué hace | Obligatorio |
|-------|----------|-------------|
| **Nombre** | Título del acordeón (ej: "Iluminación") | Sí |
| **Slug** | Identificador (ej: `iluminacion`) | No |
| **Descripción** | Texto descriptivo dentro del acordeón | No |
| **Imagen hero** | Foto decorativa que aparece dentro del acordeón antes de la grilla | No |
| **Ítems** | Lista de equipos que pertenecen a esta categoría | No |
| **Orden** | Posición en la página | No |

> Si una categoría no tiene ítems cargados, muestra el texto *"Catálogo disponible bajo solicitud."*

> **Imagen hero de categoría:** ancho completo, altura 192px de display. Recomendado 1400×400 px, JPG/WebP.

---

### 4.2 Ítems de Equipamiento

**Panel:** 🔩 Ítems de Equipamiento

Cada ítem es un equipo individual dentro de una categoría.

| Campo | Qué hace | Obligatorio |
|-------|----------|-------------|
| **Nombre** | Nombre del equipo (ej: "Claypaky B-EYE K20") | Sí |
| **Marca** | Referencia a una marca del catálogo de marcas | No |
| **Foto** | Imagen del equipo | No |

> **Foto del ítem:** cuadrada o 16:9, fondo neutro preferiblemente, mínimo 400×400 px. Se muestra en una grilla de 2–4 columnas con efecto hover.

> **¿Cómo asignar un ítem a una categoría?**
> Ir a **📦 Categorías de Equipamiento**, abrir la categoría correspondiente, y en el campo **Ítems** hacer click en *"Añadir ítem"* para buscar y vincular los equipos.

---

### 4.3 Marcas

**Panel:** 🎯 Marcas

Aparecen en el carrusel inferior de la página de equipamiento y también en la homepage.

| Campo | Qué hace | Obligatorio |
|-------|----------|-------------|
| **Nombre** | Nombre de la marca (ej: "Claypaky") | Sí |
| **Logo B/N** | Imagen del logo, preferiblemente en blanco o negro | No — si no hay logo, muestra el nombre como texto |

> **Logo de marca:** PNG con fondo transparente, versión horizontal, mínimo 200px de ancho. El carrusel muestra los logos en escala de grises; al pasar el mouse recupera el color.

#### Imagen de fondo del header

La foto de cabecera de `/equipamiento` se configura en **⚙️ Configuración del sitio → Hero Equipamiento**.

---

## 5. Página de Contacto (`/contacto`)

**Panel:** 📬 Categorías de Contacto + ⚙️ Configuración del sitio + 📥 Consultas recibidas

---

### 5.1 Información de contacto

**Panel:** ⚙️ Configuración del sitio

Los datos de contacto que aparecen en el lateral derecho de la página:

| Campo | Dónde aparece |
|-------|--------------|
| **Email** | Bloque "Contacto general" |
| **Teléfono** | Bloque "Contacto general" |
| **Horario** | Bloque "Horario" |
| **Dirección** | Bloque "Dirección" |
| **Contacto técnico** (nombre / teléfono / email) | Bloque "Soporte técnico" — solo aparece si está completado |

> Si dejás en blanco **Contacto técnico**, ese bloque no aparece en la página.

#### Imagen de fondo del header

La foto de cabecera de `/contacto` se configura en **⚙️ Configuración del sitio → Hero Contacto**.

> **Recomendación:** usar una foto de técnicos armando escenario o conectando iluminación. Mínimo 1920×1080 px, JPG/WebP. La imagen se aplica con transparencia del 25% para no opacar el texto.

---

### 5.2 Categorías del formulario

**Panel:** 📬 Categorías de Contacto

Las opciones que aparecen en el selector *"¿Qué tipo de evento tenés?"* del formulario.

| Campo | Qué hace | Obligatorio |
|-------|----------|-------------|
| **Nombre** | Texto de la opción (ej: "Producción Teatral") | Sí |
| **Orden** | Posición en el desplegable | No |

Categorías actuales: Producción Teatral, Discoteca, Evento Corporativo, Fiesta Privada, Otro.

---

### 5.3 Consultas recibidas (Leads)

**Panel:** 📥 Consultas recibidas

Cada vez que alguien envía el formulario de contacto, aparece un documento nuevo acá con:

- Nombre, empresa, email, teléfono
- Tipo de evento
- Mensaje
- Fecha y hora de envío
- Estado de lectura (leído / no leído)

> **No hace falta editar estos documentos**, solo leerlos para responder consultas.

---

## 6. Configuración del sitio (global)

**Panel:** ⚙️ Configuración del sitio

Datos globales que afectan múltiples páginas.

| Campo | Dónde aparece |
|-------|--------------|
| **Email** | Página de contacto |
| **Teléfono** | Página de contacto |
| **Horario de atención** | Página de contacto |
| **Dirección** | Página de contacto |
| **Contacto técnico** | Página de contacto + pestaña de Servicio Técnico en /servicios |
| **Hero Servicios** | Imagen de fondo del header en `/servicios` |
| **Hero Equipamiento** | Imagen de fondo del header en `/equipamiento` |
| **Hero Contacto** | Imagen de fondo del header en `/contacto` |

---

## 7. SEO — Posicionamiento en Google

### 7.1 SEO por evento

Cada evento tiene un bloque **SEO** (al final del formulario de edición) con:

| Campo | Qué hace |
|-------|----------|
| **Título SEO** | Título que Google muestra en resultados. Si está vacío usa el título del evento. |
| **Descripción SEO** | Resumen de 150 caracteres para Google. Si está vacío usa el subtítulo del evento. |
| **Imagen OG** | Imagen que aparece al compartir en redes sociales (1200×630 px recomendado) |
| **No indexar** | Marcar si no querés que Google indexe este evento |

### 7.2 SEO global

**Panel:** 🔍 SEO Defaults

Configura los valores por defecto para páginas que no tienen SEO propio:

| Campo | Ejemplo |
|-------|---------|
| **Patrón de título** | `{page} \| Top Show Pro` |
| **Descripción global** | "Rental de tecnología para eventos y espectáculos en Argentina." |

---

## 8. Especificaciones de imágenes (resumen)

| Imagen | Dónde se carga | Tamaño recomendado | Formato |
|--------|---------------|-------------------|---------|
| Hero slides (fondo carrusel homepage) | 🎬 Hero → Slide → Poster | 1920×1080 px | JPG/WebP |
| Logo de cliente | 🏢 Clientes → Logo | 400×200 px (horizontal) | PNG transparente |
| Logo de marca | 🎯 Marcas → Logo B/N | 400×200 px (horizontal) | PNG transparente |
| Hero imagen de evento | 🎭 Eventos → Imagen hero | 1600×900 px | JPG/WebP |
| Galería de evento | 🎭 Eventos → Galería | 1200×800 px c/u | JPG/WebP |
| Galería de servicio | 🔧 Servicios → Galería | 1200×800 px c/u | JPG/WebP |
| Hero categoría equipamiento | 📦 Categorías Equipo → Imagen hero | 1400×400 px | JPG/WebP |
| Foto de ítem de equipo | 🔩 Ítems Equipamiento → Foto | 600×600 px | JPG/WebP |
| Hero Servicios (fondo header) | ⚙️ Config del sitio | 1920×1080 px | JPG/WebP |
| Hero Equipamiento (fondo header) | ⚙️ Config del sitio | 1920×1080 px | JPG/WebP |
| Hero Contacto (fondo header) | ⚙️ Config del sitio | 1920×1080 px | JPG/WebP |

> **Tip general:** antes de subir imágenes, optimizarlas con [Squoosh](https://squoosh.app) o similar para reducir el peso sin perder calidad. Apuntar a menos de 500 KB por imagen.

---

## 9. Contenido fijo (no editable desde el CMS)

Las siguientes secciones tienen texto que **no se puede cambiar desde Sanity** sin modificar el código. Documentarlas para tenerlas en cuenta:

| Sección | Texto fijo |
|---------|-----------|
| Homepage — sección "Hacemos que todo suceda" | Título y etiqueta "— Quiénes somos" |
| Homepage — sección Servicios | Título "Servicios" y link "Ver todos →" |
| Homepage — sección Eventos | Título "Eventos destacados" y link "Ver todos →" |
| Homepage — CTA final | "¿Tu próximo evento?", descripción y botón "Contactanos" |
| Servicios — estadísticas | "15+ Años", "500+ Eventos", "50+ Marcas", "24/7 Soporte" |
| Servicios — CTA final | "¿Tenés un proyecto en mente?" y botón "Hablemos" |
| Equipamiento — CTA final | "¿Necesitás cotizar?", descripción y botón "Solicitar cotización" |
| Evento detalle — CTA final | "¿Necesitás algo similar?" y botón "Contactanos" |
| Contacto — descripción | "Dejanos tu consulta y te respondemos en 24hs hábiles." |

Si necesitás cambiar alguno de estos textos, avisar al equipo de desarrollo.

---

## 10. Flujo de trabajo recomendado

### Para agregar un evento nuevo

1. Ir a **🎭 Eventos** → **Nuevo documento**
2. Completar: Título, Slug (se genera automáticamente), Categoría, Fecha de inicio, Imagen hero
3. Agregar descripción, equipos utilizados, tags técnicos
4. Subir galería de fotos (mínimo 3)
5. Si tenés video: pegar URL de YouTube o Vimeo en el campo Video
6. Completar el bloque SEO (opcional pero recomendado)
7. Si querés que aparezca en la homepage: activar **Destacado** o agregarlo manualmente en **🏠 Homepage → Eventos Destacados**
8. **Publicar** (botón verde arriba a la derecha)

### Para agregar equipamiento nuevo

1. Ir a **🔩 Ítems de Equipamiento** → **Nuevo documento**
2. Completar nombre, marca y foto
3. **Publicar**
4. Ir a **📦 Categorías de Equipamiento**, abrir la categoría correspondiente
5. En el campo **Ítems**, agregar el ítem recién creado
6. **Publicar** la categoría

### Para actualizar datos de contacto

1. Ir a **⚙️ Configuración del sitio**
2. Modificar los campos deseados
3. **Publicar**

---

## 11. Preguntas frecuentes

**¿Cuánto tiempo tarda en verse el cambio en el sitio?**
En el sitio en producción, los cambios se reflejan automáticamente en segundos gracias al webhook de Sanity. Si no se actualiza, refrescar con `Ctrl+Shift+R`.

**¿Puedo borrar un evento?**
Sí. Ir al evento → menú de tres puntos (⋯) → Eliminar. Tener en cuenta que si el evento estaba en la selección de Eventos Destacados de la homepage, va a dejar de aparecer.

**¿Qué pasa si subo una imagen muy grande?**
Sanity la acepta igual, pero puede afectar la velocidad del sitio. Siempre optimizar antes de subir (menos de 500 KB).

**¿Puedo tener dos versiones de un evento (borrador y publicado)?**
Sí. Sanity maneja borradores automáticamente. Los cambios no se ven en el sitio hasta que hagas click en **Publicar**.

**¿Dónde veo los formularios enviados?**
En **📥 Consultas recibidas**. Los nuevos aparecen marcados como no leídos.

**¿Cómo cambio el orden de los servicios?**
Abrir cada servicio y modificar el campo **Orden** (número). El servicio con orden 1 aparece primero.

---

*Documento generado para Top Show Pro — Abril 2026*
