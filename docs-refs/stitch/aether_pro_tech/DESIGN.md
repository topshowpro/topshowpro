# Design System Specification: The Technical Avant-Garde

## 1. Overview & Creative North Star
**Creative North Star: "The Kinetic Blueprint"**

This design system is engineered for the high-stakes, high-precision world of technical event production. It rejects the "safe" corporate aesthetic in favor of a cinematic, architectural approach. We are not just building an interface; we are building a command center. 

The aesthetic is driven by **The Kinetic Blueprint**—a concept where the UI feels like a living schematic. We achieve this through intentional asymmetry, overlapping elements that suggest depth, and a high-contrast typographic scale that mimics editorial layouts. This system breaks the "template" look by treating the screen as a dark stage where light (color and type) is used with surgical precision to guide the user's eye.

---

## 2. Colors & Surface Architecture

The palette is rooted in deep obsidian tones, punctuated by high-energy "Electric Blue" and "Deep Purple" accents.

### Color Tokens
- **Background (Base):** `#0A0A0A` (The void/stage)
- **Secondary Background:** `#1A1A1A` (The structure)
- **Primary Accent:** `primary_container` (`#00BFFF`) - Electric Blue
- **Secondary Accent:** `secondary` (`#7B61FF`) - Deep Purple
- **Tertiary/Status:** `tertiary` (`#00FF9C`) - Neon Mint

### The "No-Line" Rule
To maintain a premium, seamless feel, **1px solid borders are prohibited for sectioning.** Boundaries must be defined solely through background color shifts. For example, a `surface_container_low` section should sit directly against a `surface` background. This creates a sophisticated, "molded" look rather than a boxed-in layout.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of tinted glass.
- **Level 1 (Base):** `surface` (`#131313`)
- **Level 2 (Sectioning):** `surface_container_low` (`#1C1B1B`)
- **Level 3 (Interactive Cards):** `surface_container_high` (`#2A2A2A`)
- **Level 4 (Modals/Popovers):** `surface_container_highest` (`#353534`)

### The "Glass & Gradient" Rule
Floating elements (drawers, tooltips, navigation) must utilize **Glassmorphism**. Apply a semi-transparent `surface_container` color with a `backdrop-blur` of 12px–20px. 
**Signature Texture:** Use subtle linear gradients for high-impact CTAs, transitioning from `primary` (`#8FD6FF`) to `primary_container` (`#00BFFF`) at a 135-degree angle to provide visual "soul."

---

## 3. Typography: Editorial Impact

The typography system is a hierarchy of authority. It mixes the impact of modern sans-serifs with the precision of monospaced tech fonts.

| Level | Font Family | Case | Token Role |
| :--- | :--- | :--- | :--- |
| **Display** | Epilogue | ALL CAPS | High-impact headlines, Hero sections |
| **Headline** | Epilogue | ALL CAPS | Section headers, Large modal titles |
| **Subtitle** | Space Grotesk | Sentence | `#5AA7E0` color; used for context above headlines |
| **Body** | Inter | Sentence | `#CCCCCC` color; general readability |
| **Tech/Stats**| Space Grotesk | ALL CAPS | `#00FF9C` or `#00BFFF`; data points, timers, IDs |

**The Editorial Scale:** Use extreme size contrasts. A `headline` font should feel massive compared to the `body` text nearby. This "Big & Small" approach creates a signature, non-standard rhythm.

---

## 4. Elevation & Depth

We convey hierarchy through **Tonal Layering** rather than traditional drop shadows.

- **The Layering Principle:** Depth is achieved by "stacking" the surface tiers. A `surface_container_lowest` card placed on a `surface_container_low` section creates a natural "recessed" look.
- **Ambient Shadows:** When a floating effect is mandatory (e.g., a floating action button), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6)`. The shadow must never be grey; it should be a darkened tint of the background.
- **The "Ghost Border":** If accessibility requires a container edge, use the `outline_variant` token at **15% opacity**. This creates a "blueprint" feel without cluttering the visual field.

---

## 5. Components

### Buttons (Command Elements)
- **Primary:** Background `#0A0A0A`, Border 1.5px `primary_container` (`#00BFFF`). Text: Inter Medium, White. 
- **Hover State:** Background fills with `primary_container` (`#00BFFF`), Text shifts to Black.
- **Shape:** Moderate roundedness (Level 2) to balance technical precision with modern interface approachability.

### Technical Cards
- **Rule:** No dividers. 
- **Separation:** Use `surface_container_high` for the card body and a `surface_container_highest` for the header area.
- **Visual Motif:** Add a subtle "Scanner" line (1px gradient line in Accent 1) that sits at the very top of the card.

### Inputs & Selectors
- **Style:** Underline-only or Ghost Border. Use `surface_container_lowest` for the input field background to create a "sunken" effect. 
- **Focus State:** The label (Space Grotesk) should glow slightly in `primary_container`.

### Additional Component: "The Data Pulse"
For technical stats (e.g., "Live Load," "Frame Rate"), use a specialized component:
- Font: Space Grotesk. 
- Background: `surface_container_highest` with a 2px left-accent border in `tertiary` (`#00FF9C`). 
- Detail: A subtle tech grid pattern (`grid-overlay`) at 5% opacity behind the text.

---

## 6. Do's and Don'ts

### Do:
- **Do** use intentional asymmetry. Offset images from their text containers to create "breathing room."
- **Do** use high-contrast imagery with dark overlays (`#0A0A0A` at 60% opacity) to ensure type is legible.
- **Do** use the `Space Grotesk` font specifically for numbers and status indicators to reinforce the technical theme.

### Don't:
- **Don't** use standard Material Design "elevated" cards with 100% opacity white shadows.
- **Don't** use maximum roundedness (Level 3) or sharp edges (Level 0). Stick to the moderate (Level 2) standard.
- **Don't** use dividers or horizontal lines to separate list items. Use vertical white space or subtle background shifts (`surface_container` tiers).
- **Don't** use "pure" white for body text. Always use `#CCCCCC` (on_surface_variant) to reduce eye strain in dark environments.

---

## 7. Visual Motifs & Textures
To elevate the design from "flat" to "premium," integrate the following:
1. **The Grid:** A repeating 24px square grid overlay at 3% opacity in sections of high information density.
2. **The Scanner:** A horizontal gradient line that moves slowly or sits static at the edge of hero images.
3. **The Glow:** Use `primary_container` with a heavy blur (150px+) as a non-interactive background "blob" to create a sense of depth and atmosphere.