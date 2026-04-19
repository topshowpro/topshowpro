# Skills Recomendadas — Top Show Pro

> Catálogo de skills de Claude Code (y hooks) óptimas para desarrollar, mantener e iterar el sitio Top Show Pro.

## Cómo leer esta guía

- **Skills del ecosistema**: ya disponibles, se invocan con el `Skill` tool o se auto-activan
- **Skills custom del proyecto**: hay que crearlas (con `superpowers:writing-skills`) y quedan en `~/.claude/skills/` o dentro del repo en `.claude/skills/`
- **Hooks**: se configuran en `.claude/settings.json` o `~/.claude/settings.json` con la skill `update-config`

---

## Skills del ecosistema (prioridad alta)

### Workflow de desarrollo

| Skill | Cuándo usarla en Top Show Pro | Por qué |
|-------|-------------------------------|---------|
| **`superpowers:brainstorming`** | Antes de cualquier feature nueva (sección, componente, ruta, A/B test) | OBLIGATORIA para alinear intent + requirements antes de codear. Evita implementar la feature equivocada |
| **`superpowers:writing-plans`** | Antes de batches grandes: "migrar mock→Sanity real", "implementar multi-idioma", "refactor hero" | Plan estructurado con fases + verificación. Evita romper en producción |
| **`superpowers:executing-plans`** | Ejecutar el plan aprobado paso a paso con checkpoints | Controla que se siga el plan sin improvisación |
| **`superpowers:subagent-driven-development`** | Tareas independientes en paralelo (schema Sanity + templates Resend + SEO simultáneos) | Paralelización sin romper contexto main |
| **`superpowers:using-git-worktrees`** | Features aisladas (A/B de hero, multi-idioma experimental, diseño alternativo) | Cada feature en rama + worktree aparte, sin romper main |

### Calidad de código

| Skill | Cuándo usarla | Por qué |
|-------|---------------|---------|
| **`superpowers:test-driven-development`** | Form validation, API `/api/contact`, GROQ queries, utilidades SEO | Componentes críticos merecen tests. No todo (páginas visuales OK sin test) |
| **`superpowers:systematic-debugging`** | Bugs hydration SSR/CSR, Framer Motion + RSC, Lenis mobile, flicker de fonts | Debugging disciplinado vs prueba-error ciego |
| **`superpowers:verification-before-completion`** | Antes de decir "listo": Lighthouse real, form e2e, mobile check | OBLIGATORIA. Evita falsos positivos |
| **`superpowers:requesting-code-review`** / **`code-reviewer`** | Pre-merge de features grandes (hero, form, Studio deploy) | Segunda opinión antes de mergear |
| **`superpowers:receiving-code-review`** | Cuando otro dev/Claude review te deja feedback | Aplicar con criterio, no blindly |
| **`superpowers:finishing-a-development-branch`** | Terminar feature → decidir merge / PR / cleanup | Proceso claro de cierre |

### Skills específicas

| Skill | Cuándo usarla | Por qué |
|-------|---------------|---------|
| **`superpowers:writing-skills`** | Crear skills nuevas del proyecto | Para generar las skills custom listadas abajo |
| **`documentation-writer`** | Actualizar `README.md`, `docs/STACK.md`, `docs/CMS.md`, `docs/DEPLOY.md` | Sigue Diátaxis framework. Mejor docs que ad-hoc |
| **`claude-api`** | Si agregás feature con IA (autogenerar copy eventos, chatbot, OG custom) | Patterns + prompt caching |
| **`mintlify:mintlify`** | Si cliente quiere docs públicas navegables | Overkill inicial. Guardar para futuro |
| **`update-config`** | Configurar hooks locales (pre-commit lint+typecheck, auto-commit draft) | Automatizar lo repetitivo |
| **`fewer-permission-prompts`** | Después de varias sesiones, limpiar settings | Reducir ruido de aprobaciones |

### Skills no aplicables (informativo)

- Skills de BigQuery / Supply BI / DataFlow: NO aplicables (son del workspace Mercadolibre)
- Skills de Slack / MELI: NO aplicables a Top Show Pro (cliente externo)

---

## Skills custom a crear (específicas del proyecto)

Crear con `superpowers:writing-skills`. Ubicación sugerida: `.claude/skills/` dentro del repo (así el cliente/equipo las hereda al clonar).

### 1. `top-show-pro-design-system` — **Alta prioridad**

**Estado**: Ya creada en `~/.claude/skills/top-show-pro-design-system/SKILL.md` durante Fase 0.

**Propósito**: tokens de paleta, tipografías, motion presets, componentes patrones, Tailwind config. Auto-trigger en menciones de UI/branding.

**Cuándo se usa**: automático cuando trabajás en cualquier componente, estilo o decisión visual.

### 2. `top-show-pro-cms-patterns` — **Media prioridad (Fase 1 o 2)**

**Propósito**: GROQ queries reutilizables, patterns Sanity (cached fetch, tagged revalidate, image URL builder, portable text serializer).

**Por qué**: evitar re-inventar queries. Centralizar patterns de fetch con cache/tag.

**Snippets que incluye**:
- `fetchEvents({ category?, featured?, limit? })` con cache tag
- `fetchHomepage()` cached
- `urlForImage().auto('format').quality(80)` helper con LQIP
- Portable Text components map (H1, H2, links, images inline)

### 3. `top-show-pro-motion-presets` — **Media prioridad (Fase 1)**

**Propósito**: variants Framer Motion reutilizables + helpers Lenis + View Transitions.

**Por qué**: evitar copiar variants entre archivos. Mantener coherencia de easing/duration.

**Incluye**:
- `fadeIn`, `revealUp`, `staggerContainer`, `revealTextWords`, `flipCard`, `modalLedOpen`
- Config Lenis standard
- Hook `useInViewReveal()`
- Constantes de duration/easing premium

### 4. `top-show-pro-new-event` — **Baja prioridad (onboarding cliente)**

**Propósito**: guía + checklist para subir evento nuevo (usable por cliente no técnico).

**Trigger**: "subir evento", "crear evento en el CMS", "cargar proyecto nuevo".

**Checklist que incluye**:
- Campos obligatorios (título, categoría, fecha, heroImage, descripción)
- Campos opcionales + cuándo conviene completarlos
- Buenas prácticas de imágenes (tamaño, peso, alt)
- Cómo ordenar equipos
- Cuándo marcar "Destacado"
- Checklist SEO (title, description, OG)
- Cómo verificar que apareció bien en `/eventos`

### 5. `top-show-pro-deploy-check` — **Media prioridad (Fase 2)**

**Propósito**: checklist pre-deploy.

**Checklist que incluye**:
- Envs configurados (Sanity, Resend, Turnstile, Site URL)
- Webhook Sanity apuntando a `/api/revalidate`
- Resend domain verificado (DKIM/SPF/DMARC)
- Lighthouse score ≥ 95 en `vercel.app` URL
- Sitemap accesible (`/sitemap.xml` retorna 200 con URLs)
- `robots.txt` excluye `/studio` y `/api`
- OG images preview en Twitter/Facebook debugger
- Form de contacto: enviar test real, verificar mail + lead en Studio
- DNS: si hay custom domain, SSL válido + redirects correctos

### 6. `top-show-pro-copy-generator` — **Baja, nice-to-have**

**Propósito**: prompts + templates para generar copy de eventos/servicios con Claude.

**Uso**: cliente pasa bullet points → Claude genera copy narrativo estilo Lizy Tagliani page.

**Trigger**: "generar copy para evento", "ayudame a escribir descripción".

**Template inputs**:
- Título del evento
- Cliente/productora
- Fechas
- Equipos usados
- Tono (formal / casual / épico)
- Audiencia target

**Output**: copy largo listo para pegar en Sanity (Portable Text friendly).

---

## Hooks recomendados

Configurar con `update-config`. Van en `.claude/settings.json` dentro del repo.

### Hook 1 — Type-check pre-write

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": { "tool": "Write|Edit", "glob": "**/*.{ts,tsx}" },
        "command": "pnpm typecheck 2>&1 | tail -10",
        "onFailure": "warn"
      }
    ]
  }
}
```

**Por qué**: detecta errores TS antes de escribir. `onFailure: warn` (no aborta) para no bloquear exploración.

### Hook 2 — Validar schemas Sanity post-edit

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool": "Edit", "glob": "sanity/schemas/**/*.ts" },
        "command": "pnpm sanity schema validate"
      }
    ]
  }
}
```

**Por qué**: evita publicar schemas rotos que hacen crashear Studio.

### Hook 3 — Check envs al arrancar sesión

```json
{
  "hooks": {
    "SessionStart": [
      {
        "command": "diff <(grep -oP '^[A-Z_]+(?==)' .env.local.example | sort) <(grep -oP '^[A-Z_]+(?==)' .env.local 2>/dev/null | sort) | head -20 || echo 'envs OK'"
      }
    ]
  }
}
```

**Por qué**: avisa si faltan envs al arrancar. Evita confusión "¿por qué no fetcha Sanity?" cuando falta projectId.

### Hook 4 — Sugerir commit al parar

```json
{
  "hooks": {
    "Stop": [
      {
        "command": "git status --short | head -10 && git diff --stat | tail -5"
      }
    ]
  }
}
```

**Por qué**: recordatorio visual de cambios no commiteados.

### Hook 5 — Lint on save (opcional)

Si tenés pre-commit hook via Husky + lint-staged, skipear. Si no:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool": "Edit|Write", "glob": "**/*.{ts,tsx}" },
        "command": "pnpm lint --fix $FILE 2>&1 | tail -5",
        "onFailure": "ignore"
      }
    ]
  }
}
```

---

## Estrategia de uso por fase

### Fase 1 — Scaffold inicial

Skills clave:
1. `superpowers:writing-plans` (el plan ya existe, solo ejecutás)
2. `superpowers:executing-plans` o `superpowers:subagent-driven-development`
3. `top-show-pro-design-system` (auto-trigger en componentes)
4. `superpowers:verification-before-completion` al final

Hooks: skip hooks pesados (type-check lento). Solo SessionStart check envs.

### Fase 2 — Config APIs + deploy

Skills clave:
1. `top-show-pro-deploy-check`
2. `superpowers:verification-before-completion`
3. `update-config` para configurar hooks production-ready

Hooks: activar todos los sugeridos.

### Mantenimiento / iteración

Skills clave:
- `superpowers:brainstorming` antes de features nuevas
- `top-show-pro-cms-patterns` / `motion-presets` al agregar componentes
- `top-show-pro-copy-generator` si el cliente pide ayuda con copy
- `superpowers:systematic-debugging` cuando algo rompe

---

## Comandos útiles (quick reference)

### Skills

- Listar skills: `claude skills list`
- Invocar skill específica: `/<skill-name>` o vía Skill tool
- Crear skill: `Skill({ skill: "superpowers:writing-skills" })`

### Hooks

- Ver hooks activos: `cat .claude/settings.json`
- Agregar hook: `Skill({ skill: "update-config", args: "agregar hook X que haga Y" })`
- Remover hook: editá `.claude/settings.json` manualmente

### Memory

- Memory index: `cat .claude/projects/*/memory/MEMORY.md`
- Agregar memory: Claude sugiere automáticamente cuando detecta insight

---

## Referencias

- Claude Code docs: https://docs.claude.com/claude-code
- Superpowers skills: https://github.com/anthropics/claude-agents
- Skills marketplace (público): https://skill.sh (revisar periódicamente)
- Mintlify docs: https://mintlify.com (si cliente quiere docs públicas después)

---

## Actualización de esta guía

Si descubrís una skill útil durante desarrollo (sea del ecosistema o creás una custom):

1. Agregala a la tabla correspondiente arriba
2. Anotá cuándo usarla y el por qué
3. Si es custom del proyecto, commiteala en `.claude/skills/` del repo para que el equipo la herede
