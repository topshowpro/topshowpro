# Guía de Especificaciones de Imágenes (Top Show Pro)

Este documento detalla **al 100% de precisión** las dimensiones, relaciones de aspecto y calidades recomendadas para todos los campos de imágenes administrables desde Sanity CMS. Estas medidas están auditadas directamente contra los componentes React (Next.js) que las renderizan en el front-end.

Mantener estas reglas garantiza una carga rápida (buen SEO/Core Web Vitals) y un escalado perfecto en pantallas Retina (densidad 2x) sin sufrir recortes indeseados o imágenes borrosas.

---

## 1. Ajustes Globales (Site Settings & SEO)

| Campo | Dimensiones Exactas | Aspect Ratio | Formato Recomendado | Notas |
| :--- | :--- | :--- | :--- | :--- |
| **Logo del sitio** | `160 x 40 px` | 4:1 | SVG o PNG/WebP | Fondo transparente. Logo color blanco. Exportar en alta calidad. |
| **Hero: Servicios** | `1920 x 1080 px` | 16:9 | WebP o JPG | Calidad 80-85%. Ocupará todo el fondo de la cabecera. |
| **Hero: Equipamiento** | `1920 x 1080 px` | 16:9 | WebP o JPG | Calidad 80-85%. Ocupará todo el fondo de la cabecera. |
| **Hero: Contacto** | `1920 x 1080 px` | 16:9 | WebP o JPG | Calidad 80-85%. Ocupará todo el fondo de la cabecera. |
| **OG Image Default** | `1200 x 630 px` | ~1.91:1 | JPG o PNG | Menor a 1MB. Mantener textos centrados por recortes en RRSS. |

---

## 2. Homepage (Hero, Marcas y Clientes)

| Campo | Dimensiones Exactas | Aspect Ratio | Formato Recomendado | Notas |
| :--- | :--- | :--- | :--- | :--- |
| **Poster del Video Hero** | `1920 x 1080 px` | 16:9 | WebP o JPG | Calidad 80-85%. Se muestra mientras el video de fondo carga. |
| **Logo de Marca** (`brand`) | `360 x 112 px` | ~3.2:1 | SVG o PNG/WebP | Renderizado nativo: `180x56px`. Medida Retina: `360x112px`. Logo blanco/negro. |
| **Logo de Cliente** (`client`) | `360 x 128 px` | ~2.8:1 | SVG o PNG/WebP | Renderizado nativo: `180x64px`. Medida Retina: `360x128px`. Evitar bordes o fondos. |

---

## 3. Equipamiento (Categorías y Productos)

| Campo | Dimensiones Exactas | Aspect Ratio | Formato Recomendado | Notas |
| :--- | :--- | :--- | :--- | :--- |
| **Imagen de Categoría** | `1600 x 900 px` | 16:9 | WebP o JPG | Calidad 80-85%. Usada de fondo en las tarjetas del catálogo. |
| **Foto del Equipo** | `800 x 450 px` | 16:9 | WebP o JPG | Calidad 80-85%. Fondo oscuro o neutro para integrarse al grid. |

---

## 4. Eventos Destacados

| Campo | Dimensiones Exactas | Aspect Ratio | Formato Recomendado | Notas |
| :--- | :--- | :--- | :--- | :--- |
| **Imagen Principal (Hero)** | `1920 x 1080 px` | 16:9 | WebP o JPG | Calidad 80-85%. Imagen principal al entrar al evento. |
| **Imágenes de Galería** | `800 x 600 px` | 4:3 | WebP o JPG | Calidad 80-85%. El layout CSS (`aspect-[4/3]`) exige esta proporción exacta. |

---

## 5. Servicios (Tabs)

| Campo | Dimensiones Exactas | Aspect Ratio | Formato Recomendado | Notas |
| :--- | :--- | :--- | :--- | :--- |
| **Imágenes de Galería** | `800 x 600 px` | 4:3 | WebP o JPG | Calidad 80-85%. La primera foto es `cover` (`4:3`), la segunda es `sideImage`. Recomendamos siempre 4:3 para estandarizar el CMS. |

---

## 6. Recursos Generales (Bloques Modulares)

| Campo | Dimensiones Exactas | Aspect Ratio | Formato Recomendado | Notas |
| :--- | :--- | :--- | :--- | :--- |
| **MediaPicker (Genérico)** | `1600 x 900 px` | 16:9 | WebP o JPG | Calidad 80-85%. Esta base es la más segura para cualquier inserción en Rich Text o Landing pages. |
| **SEO Overrides (OG)** | `1200 x 630 px` | ~1.91:1 | JPG o PNG | Mismas reglas que la OG Image Default (max 1MB). |

---

## 💡 Mejores Prácticas de Rendimiento (Calidad)

1. **Usa WebP siempre que sea posible**: Pesa entre un 25% y 30% menos que un JPG equivalente manteniendo la misma calidad. En Photoshop o herramientas como Squoosh, un **80% o 85% de calidad WebP** es el punto dulce entre peso y nitidez.
2. **Logos en SVG o PNG Cuantizado**: Los formatos vectoriales (SVG) son ideales. Si usas PNG, pásalos por un optimizador para reducir los colores que no se usan (PNG-8) si son de un solo tono (blanco).
3. **No subas archivos crudos (Raw/Print)**: Evitar imágenes mayores a 2MB. Sanity Studio genera "derivados" de las imágenes para el Front, pero tener la imagen original optimizada previene problemas de memoria, cuotas de ancho de banda y demoras de carga para el administrador que sube el contenido.
