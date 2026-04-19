# Guía de Uso del CMS (Sanity Studio) — Top Show Pro

> Guía operativa para el cliente (equipo Top Show Pro). Explica cómo gestionar todo el contenido del sitio sin tocar código.

## Cómo acceder

1. Abrí tu navegador en `https://topshowpro.com/studio` (o `https://<tu-proyecto>.sanity.studio` hasta configurar dominio custom)
2. Login con tu cuenta Sanity (email + password o Google/GitHub SSO)
3. Si no tenés acceso, pedile al admin que te invite desde `https://sanity.io/manage`

---

## Cómo está organizado el menú

El menú lateral del Studio está agrupado en 3 secciones:

### Configuración global (singletons — una sola instancia)
- **Site Settings** — logo, contactos, redes, técnico
- **Hero** — videos del home y frase destacada
- **Homepage** — bloques editables del home (eventos destacados, CTA, etc.)
- **SEO Defaults** — meta tags por defecto

### Contenido (lista de documentos)
- **Events** — eventos/proyectos realizados
- **Event Categories** — Teatro / Discoteca / Corporativo / Privados
- **Services** — los 4 servicios que ofrecen
- **Equipment Categories** — Iluminación / Sonido / Stage / LED
- **Equipment Items** — ítems específicos dentro de cada categoría
- **Brands** — marcas que trabajan (Claypaky, Robe, etc.)
- **Contact Categories** — opciones del dropdown del form de contacto

### Leads (solo lectura)
- **Leads** — consultas recibidas del formulario de contacto

---

## Flujo general (cómo editar algo)

1. Clickeás el tipo de contenido en el menú
2. Elegís un ítem existente o `+ Create new`
3. Completás los campos
4. Click **Publish** (botón arriba a la derecha)
5. El sitio se refresca en < 5 segundos (webhook revalida ISR)

⚠️ Siempre clickear **Publish**. Si solo guardás como draft no se ve en el sitio público.

---

## Ejemplos prácticos

### Ejemplo 1 — Cambiar el video del hero del home

1. Menú → **Hero**
2. En "Slides" → click en un slide existente o `+ Add item` para uno nuevo
3. Campo **Video**: click y subí un `.mp4` (o pegá URL Mux si usás streaming)
4. Campo **Phrase**: escribí la frase blanca, ej: `"Producción completa. Sin vueltas."`
5. Campo **Accent Color**: elegí cyan / violet / mint (default cyan)
6. (Opcional) Si querés cambiar el banner azul del bottom: edita el campo **Banner Azul** → texto + link
7. **Publish**
8. Refrescá la home → video nuevo aparece

**Tips**:
- Los slides rotan automáticamente cada 5 segundos
- Si subís 1 solo slide, queda fijo
- Los videos ideales: 10-20 segundos de duración, loop suave, 1920x1080, < 10MB
- Si el video pesa mucho (>20MB), pedile al dev que te setee Mux

### Ejemplo 2 — Subir un evento nuevo (ej. "Lizy Tagliani")

1. Menú → **Events** → `+ Create new event`
2. Completá los campos (basado en la estructura real del sitio actual):
   - **Título**: `Lizy Tagliani`
   - **Subtítulo**: `Sí!!! Quiero…un music hall para todo público`
   - **Slug**: se autogenera (`lizy-tagliani`). Si querés cambiarlo, editalo. Es la parte final de la URL
   - **Categoría**: dropdown → `Teatro`
   - **Fecha inicio**: `05/07/2024`
   - **Fecha fin**: `11/02/2025` (opcional, para temporadas largas. Si es evento de 1 día, dejá vacío)
   - **Cliente** (opcional): `Productora X`
   - **Ubicación** (opcional): `Calle Corrientes, Buenos Aires`
   - **Descripción**: escribí el copy narrativo en el editor. Podés usar **negrita**, *itálica*, listas, links
   - **Equipos utilizados**: array de strings. Click `+ Add string` por cada uno:
     - `Moviles 7R`
     - `Moviles 740`
     - `Par Z`
     - `Aura`
     - `Pantalla Led 6×4 mts – Pitch 3.9`
   - **Hero image**: subí la foto principal del evento (aparece en hero del detalle)
   - **Galería** (opcional): drag & drop de múltiples fotos
   - **Video** (opcional): URL de YouTube / Vimeo / Mux
   - **Tags técnicos** (opcional): chips `Iluminación`, `LED`, `Sonido` (solo si querés resaltar el rubro)
   - **Destacado**: toggle `on` si querés que aparezca en la home
   - **SEO** (opcional): título, descripción y OG image para Google/Facebook. Si dejás vacío usa valores por defecto
3. **Publish**
4. El evento aparece en:
   - Listado `/eventos`
   - Página detalle `/eventos/lizy-tagliani`
   - Sitemap
   - Si marcaste **Destacado**: home

**Tips**:
- Las fotos se optimizan automáticamente (AVIF, responsive). No necesitás redimensionar
- Tamaño recomendado hero image: 1920x1080, < 500KB después de compresión manual
- Para la galería: min 1200px de ancho, formato landscape o portrait según corresponda
- Si el copy es muy largo, usá el editor rich text (negrita para resaltar, listas para enumerar equipos técnicos)

### Ejemplo 3 — Editar la descripción de un servicio

Recordatorio: **los servicios NO tienen página propia**. Toda la info se muestra inline en `/servicios` como tabs (desktop) o accordion (mobile).

1. Menú → **Services** → elegí el servicio (ej: `Técnica Teatral`)
2. Editá:
   - **Nombre**: `Técnica Teatral`
   - **Ícono**: nombre del ícono (ej: `theater-masks`)
   - **Orden**: número 1-4 (define orden de los tabs)
   - **Descripción corta**: una línea, aparece en la card resumen
   - **Descripción larga**: Portable Text, aparece al activar el tab
   - **Galería**: sube fotos que acompañen el texto largo
   - **CTA Contacto**: `{ label: "Consultanos", link: "/contacto" }`
3. **Publish**
4. `/servicios` refresca automáticamente

### Ejemplo 4 — Agregar un ítem de equipamiento

1. Menú → **Equipment Categories** → elegí la categoría (ej: `Iluminación`)
2. En el campo **Items** → click `+ Add` → elegís un `equipmentItem` existente o creás nuevo
3. Si creás nuevo ítem inline:
   - **Nombre**: `Robin MMX Spot`
   - **Marca**: ref → seleccionás una brand existente o `+ Add brand` inline
   - **Specs**: Portable Text con bullets. Ej:
     - `Potencia: 470W LED`
     - `Zoom: 5° a 50°`
     - `DMX: 37 canales modo extendido`
   - **Foto**: upload
   - **Ficha técnica** (opcional): PDF
4. **Publish**
5. El ítem aparece en el acordeón/tab de Iluminación en `/equipamiento`

### Ejemplo 5 — Agregar una marca nueva

1. Menú → **Brands** → `+ Create`
2. **Nombre**: `Claypaky`
3. **Logo B/N**: SVG preferido (queda crisp en cualquier tamaño). PNG transparente también sirve. Importante: que sea **blanco sobre fondo transparente** (se ve sobre fondo oscuro del sitio)
4. **Website**: `https://claypaky.it`
5. **Publish**
6. La marca aparece en el marquee infinito de `/equipamiento` y home

**Tip**: Si tenés que subir muchas marcas juntas, usá la feature de upload múltiple de Sanity (seleccionás varios logos, los sube y solo te falta nombrar y publicar uno por uno)

### Ejemplo 6 — Actualizar los datos del contacto técnico

El contacto técnico es el que aparece en `/contacto` como "Soporte técnico" separado del contacto general.

1. Menú → **Site Settings**
2. Sección **Contacto Técnico**:
   - Nombre: `Juan Pérez`
   - Teléfono: `+54 11 1234-5678`
   - Email: `tecnico@topshowpro.com`
3. **Publish**
4. `/contacto` refresca

### Ejemplo 7 — Ver y gestionar leads del formulario

1. Menú → **Leads**
2. Vista por defecto: lista ordenada por fecha (más reciente arriba). Columnas: nombre, empresa, email, categoría, fecha, estado (leído/no leído)
3. Click en un lead → ves el detalle completo: nombre, empresa, teléfono, email, categoría, mensaje, fecha de creación
4. Campo **Leído**: toggle `on/off` para marcar. Te ayuda a trackear qué consultas ya respondiste
5. Filtros (arriba de la lista):
   - Por categoría de servicio
   - Por estado leído/no leído
   - Por rango de fechas
6. Exportar a CSV: no nativo en Studio. Si necesitás exportar, pedile al dev que corra `pnpm sanity dataset export`

**Tip importante**: Los leads llegan a tu email vía Resend también. El Studio es un inbox adicional para trackear estado.

### Ejemplo 8 — Ordenar los eventos destacados del home

1. Menú → **Homepage**
2. Sección **Eventos Destacados**:
   - Lista de refs a eventos (solo aparecen los que marcaste `featured: true` en el doc del evento)
   - Drag & drop para reordenar
   - Click `Remove` para sacar uno
   - Click `+ Add` para agregar (elegís de los eventos con `featured: true`)
3. Máximo 4 eventos visibles en home
4. **Publish**

### Ejemplo 9 — Cambiar logo del sitio o redes sociales

1. Menú → **Site Settings**
2. Campos:
   - **Logo**: SVG upload (preferido). Tamaño ideal 400x80px
   - **Dirección**: texto
   - **Teléfono**: texto
   - **Email principal**: `hola@topshowpro.com`
   - **Redes sociales**: Instagram, Facebook, LinkedIn, YouTube — cada uno con URL completa
   - **Horario atención**: texto (ej: `Lunes a Viernes 9-18hs`)
3. **Publish**
4. El logo y datos aparecen en Header + Footer de todo el sitio

### Ejemplo 10 — Customizar SEO de un evento específico

Útil para eventos premium que querés optimizar para Google.

1. Menú → **Events** → abrí el evento
2. Scroll al fondo → sección **SEO**:
   - **Title override**: si vacío usa `"{título} | Top Show Pro"`. Si lo completás, reemplaza
   - **Description override**: 150-160 caracteres max. Aparece en resultados de Google
   - **OG Image**: imagen que aparece cuando se comparte el link en WhatsApp/Facebook/Twitter. Si vacío, se autogenera con el título + subtítulo + degradado cyan
   - **noIndex**: toggle. Si `on`, Google no indexa esta página. Útil para eventos privados/ocultos
3. **Publish**
4. Testeá compartiendo el link en WhatsApp → vas a ver el OG image actualizado

---

## Operaciones avanzadas

### Duplicar un evento

1. Abrí el evento original
2. Menú de 3 puntos (arriba derecha) → **Duplicate**
3. El duplicado se abre con título `{original} Copy`
4. Cambiá título, fechas, descripción
5. Si querés la misma galería, deja las imágenes (Sanity referencia los assets, no los copia)
6. **Publish**

### Archivar un evento viejo sin eliminarlo

- No lo borres. En vez: desactivá **Destacado** y si querés podés agregar `tagsTecnicos: ["archivado"]`
- Si lo borras, el link `/eventos/{slug}` empieza a dar 404
- Si queriés que no aparezca en el filtro pero sí en el detalle: no lo asignes a ninguna categoría (el filtro lo excluye)

### Cambiar el slug de un evento publicado

- Si cambiás el slug, la URL vieja rompe (404)
- Opciones:
  1. Dejá el slug como está
  2. Cambialo + pedile al dev que agregue un redirect en `next.config.ts`

### Restaurar una versión anterior

1. Abrí el doc
2. Click en el ícono de historial (reloj)
3. Ves todas las versiones publicadas
4. Click en una versión → `Restore`

### Borrar un lead

Sí podés borrar leads viejos. Click en el lead → menú 3 puntos → **Delete**. Confirmación pedida.

### Subir videos grandes

- Sanity asset upload tiene límite por plan. Free: 500MB total de assets
- Si los videos son grandes, migrá a **Mux**:
  1. Pedile al dev que configure Mux
  2. En el campo "Video" del hero/evento, vas a ver opción "Mux asset"
  3. Mux auto-transcodea a HLS (streaming adaptativo, carga rápido)

---

## Buenas prácticas

### Imágenes

- **Tamaño**: hero 1920x1080, galería mínimo 1200px ancho, brands SVG o PNG transparente 500x200
- **Peso**: aunque Sanity optimiza, compresión manual previa ayuda (TinyPNG, Squoosh)
- **Formato**: JPG para fotos, PNG/SVG para logos, WEBP/AVIF opcional
- **Alt text**: completalo siempre. Accesibilidad + SEO

### Copy

- **Títulos**: cortos, impactantes. Bebas Neue los agranda automáticamente
- **Descripciones**: 2-4 párrafos. Usá negrita para resaltar palabras clave
- **Equipos utilizados**: uno por línea. Específicos (modelo + marca si aplica)
- **Subtítulos**: frases evocativas, estilo teatro ("Un music hall para todo público")

### SEO

- **Title**: 50-60 caracteres max
- **Description**: 150-160 caracteres max, incluye llamada a la acción
- **Cada evento** debería tener SEO custom si es importante para búsquedas
- **OG image**: usá el default autogenerado excepto eventos destacados

### Publicación

- **Publish** es irreversible en términos de live. Si te equivocás, editá y volvé a publicar
- **Draft**: si editás algo pero no estás seguro, no publiques. Queda como borrador, solo vos lo ves
- **Previsualizar**: si el dev habilitó preview mode, podés ver cómo queda antes de publicar

### Orden

- Revisá cada 3-6 meses qué eventos ya no están activos y desmarcá "Destacado"
- Rotá los hero slides: no dejés el mismo 6 meses seguidos

---

## Troubleshooting

### "Publiqué pero no veo el cambio"

1. Esperá 10 segundos y refrescá (CTRL+SHIFT+R)
2. Si no aparece: el webhook Sanity→Next puede estar caído. Pedile al dev que chequee `/api/revalidate` logs en Vercel
3. Como workaround manual: pedile al dev que corra `vercel --prod` para forzar rebuild

### "Subí una imagen pero no se ve"

- Chequeá que tenga formato válido (JPG/PNG/WEBP/AVIF)
- Peso max Sanity free: 500MB total assets. Si está lleno, borrá imágenes no usadas
- Si es SVG: asegurate que no tenga JS inline (Sanity sanitiza)

### "El form de contacto no envía"

- Si recibís mail: todo OK. El lead también debería estar en Studio → Leads
- Si no recibís mail:
  - Chequeá spam
  - Chequeá que `RESEND_API_KEY` esté configurada (dev)
  - Chequeá que el dominio esté verificado en Resend (DKIM)

### "Cambié el logo pero el sitio muestra el viejo"

- Caché del navegador: CTRL+SHIFT+R
- Caché Vercel: a veces tarda hasta 60s. Si no, pedile al dev que revalide

### "¿Puedo darle acceso al Studio a otro miembro del equipo?"

Sí. En `https://sanity.io/manage`:
1. Seleccioná el proyecto
2. Tab **Members** → `Invite member`
3. Email de la persona → rol:
   - **Administrator**: control total, incluye borrar datasets
   - **Editor**: crear/editar/publicar, no borrar
   - **Viewer**: solo ver

### "¿Cómo hago un backup del contenido?"

- Automático: Sanity tiene historial de cambios por doc
- Manual: pedile al dev que corra `pnpm sanity dataset export production backup-YYYY-MM-DD.tar.gz`

---

## Referencias

- Sanity docs: https://www.sanity.io/docs
- Portable Text editor: https://www.sanity.io/docs/presenting-block-text
- Studio keyboard shortcuts: en Studio, `?` para ver todos

---

## Contacto para ayuda

- Dudas operativas: {contacto del dev/maintainer}
- Bugs en Studio: GitHub issues del repo
- Pedido de nuevos campos: discutir con dev, se agregan en `sanity/schemas/*.ts`
