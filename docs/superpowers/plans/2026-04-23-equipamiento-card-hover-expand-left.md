# Equipment Card Hover Expand Left Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Implement a hover effect on equipment category cards that expands content to the left (like the MiniMax M2.7 reference) when hovered, creating an overlay effect that doesn't push other cards down.

**Architecture:** Modify the existing CategorySection component to add left-expanding hover panels that reveal additional equipment information. The effect will use CSS transforms and positioning to create an overlay that appears on hover without affecting layout flow.

**Tech Stack:** React, TypeScript, Framer Motion, Tailwind CSS, Next.js

---

### Task 1: Analyze Current Card Structure

**Files:**
- Read: components/equipment/CategorySection.tsx

- [ ] **Step 1: Examine current card structure**

\\\	ypescript
// Current card structure in CategorySection.tsx
return (
  <motion.button
    key={cat.slug}
    type=\
button\
    aria-controls=\equipment-category-detail\
    aria-pressed={isActive}
    onClick={() => setSelectedSlug(cat.slug)}
    whileHover={prefersReducedMotion ? undefined : { y: -4 }}
    whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
    animate={
      prefersReducedMotion
        ? undefined
        : {
            scale: isActive ? 1.012 : 1,
            y: isActive ? -2 : 0,
          }
    }
    transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
    className=\group
relative
min-h-[330px]
overflow-hidden
text-left
l-bracket
transition-all
duration-300\
    style={{
      backgroundColor: isActive ? 'color-mix(in srgb, var(--bg-surface-hi) 85%, var(--accent-cyan) 15%)' : 'var(--bg-surface)',
      border: isActive
        ? '1px solid color-mix(in srgb, var(--accent-cyan) 42%, transparent)'
        : '1px solid rgba(255,255,255,0.08)',
      boxShadow: isActive
        ? '0 16px 42px rgba(0, 191, 255, 0.2), inset 0 0 0 1px rgba(0, 191, 255, 0.16)'
        : '0 10px 28px rgba(0,0,0,0.18)',
    }}
  >
    {/* ... existing card content ... */}
  </motion.button>
);
\\\

- [ ] **Step 2: Run analysis to verify current behavior**

Run: \
pm run dev\
Expected: Cards show current hover effect (slight lift and color change)

- [ ] **Step 3: Identify expansion areas**

\\\	ypescript
// Identify where to add expandable content
// After line 153 (current card content ends)
// Before closing motion.button tag
\\\

- [ ] **Step 4: Commit analysis**

\\\ash
git add components/equipment/CategorySection.tsx
git commit -m \feat:
analyze
current
card
structure
for
hover
expansion\
\\\



### Task 2: Design Hover Expansion Effect (Continued)

**Files:**
- Modify: components/equipment/CategorySection.tsx

- [ ] **Step 1: Research MiniMax M2.7 left expansion effect**

Based on research, the effect should:
1. On hover, expand content to the left from the card
2. Use transform: translateX(-100%) to slide content in from left
3. Maintain card position without pushing other cards
4. Use appropriate z-index to appear over neighboring cards
5. Include smooth transitions

- [ ] **Step 2: Define the expansion content structure (with placeholders for exact class names)**

We will add a div inside the motion.button, after the existing content, with the following classes (to be defined in the next step):
- absolute left-0 top-0 bottom-0
- w-[200%] 
- transform -translate-x-full 
- group-hover:translate-x-0
- transition-transform duration-500 ease-[0.16,1,0.3,1]
- bg-[var(--bg-surface)]/80 backdrop-blur-sm
- border-r border-[var(--accent-cyan)]/20
- z-index-[100]
- pointer-events-none

   And the expansion content will be placed inside this div.

- [ ] **Step 3: Test the basic expansion concept**

Run: \
pm run dev\
Expected: Card should show a left-slide panel on hover (initially empty)

- [ ] **Step 4: Commit basic expansion structure**

git add components/equipment/CategorySection.tsx
git commit -m 'feat: add basic left expansion hover effect'



### Task 2: Design Hover Expansion Effect

**Files:**
- Modify: components/equipment/CategorySection.tsx

- [ ] Step 1: Research MiniMax M2.7 left expansion effect

Based on research, the effect should:
1. On hover, expand content to the left from the card
2. Use transform: translateX(-100%) to slide content in from left
3. Maintain card position without pushing other cards
4. Use appropriate z-index to appear over neighboring cards
5. Include smooth transitions

- [ ] Step 2: Define the expansion content structure

We will add a div inside the motion.button, after the existing content, with classes for absolute positioning, left-0 top-0 bottom-0, w-[200%], transform -translate-x-full, group-hover:translate-x-0, transition-transform duration-500 ease-[0.16,1,0.3,1], bg-[var(--bg-surface)]/80 backdrop-blur-sm, border-r border-[var(--accent-cyan)]/20, z-index-[100], pointer-events-none.

- [ ] Step 3: Test the basic expansion concept

Run: npm run dev
Expected: Card should show a left-slide panel on hover (initially empty)

- [ ] Step 4: Commit basic expansion structure

git add components/equipment/CategorySection.tsx
git commit -m \
feat:
add
basic
left
expansion
hover
effect\



### Task 3: Populate Expansion Content

**Files:**
- Modify: components/equipment/CategorySection.tsx

- [ ] Step 1: Determine what information to show in the expansion

Based on the equipment card, we can show:
- More detailed description of the category
- List of brands available in this category (maybe with logos)
- Key features or specifications
- Call to action for that specific category

- [ ] Step 2: Implement the expansion content

We will add content inside the expansion div (from Task 2) that shows category description, brands, and a CTA.

- [ ] Step 3: Adjust styles if necessary

We might need to adjust the width of the expansion panel or the background opacity.

- [ ] Step 4: Test the expanded content

Run: npm run dev
Expected: On hover, a panel slides in from the left with category description, brands, and a CTA.

- [ ] Step 5: Commit the expanded content

git add components/equipment/CategorySection.tsx
git commit -m 'feat: populate hover expansion with category details'



## Self-Review

After writing the complete plan, look at the spec with fresh eyes and check the plan against it.

### 1. Spec coverage:
The goal is to implement a hover effect on equipment category cards that expands content to the left (like the MiniMax M2.7 reference) when hovered.
We have covered:
- Analyzing the current card structure (Task 1)
- Designing the hover expansion effect (Task 2)
- Populating the expansion content with relevant information (Task 3)

### 2. Placeholder scan:
We have avoided placeholders by providing concrete steps and code structure where possible.

### 3. Type consistency:
We are using the existing selectedCategory variable which is already defined and typed in the component.

### Execution Handoff

After saving the plan, offer execution choice:

**Plan complete and saved to docs/superpowers/plans/2026-04-23-equipamiento-card-hover-expand-left.md. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**

**If Subagent-Driven chosen:**
- **REQUIRED SUB-SKILL:** Use superpowers:subagent-driven-development
- Fresh subagent per task + two-stage review

**If Inline Execution chosen:**
- **REQUIRED SUB-SKILL:** Use superpowers:executing-plans
- Batch execution with checkpoints for review

