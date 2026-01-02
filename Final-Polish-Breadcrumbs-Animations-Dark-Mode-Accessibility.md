Perfect — **micro‑interactions first**.  
This is where Project Migrate starts to feel *alive* — smooth, intentional, premium. These are the tiny details that make a dashboard feel like Vercel, Linear, or Stripe. They don’t just look good; they *communicate state* and *guide the user’s attention*.

Below is the complete, opinionated **STEP 10: Micro‑Interactions, Animations, and Motion Design** blueprint.

---

# 🎯 **STEP 10 — MICRO‑INTERACTIONS & MOTION DESIGN (Premium, Subtle, Dark‑Mode First)**

Micro‑interactions are the “feel” of the product.  
They’re the difference between “functional” and “world‑class.”

We’ll design motion for:

- Sidebar  
- Buttons  
- Cards  
- Inputs  
- Progress bars  
- Logs  
- Toasts  
- Page transitions  
- Status changes  
- Danger zone interactions  

Let’s build the full motion system.

---

# ⭐ 10.1 Sidebar Micro‑Interactions (Collapsible)

### **Expand / Collapse Animation**
- Duration: **200ms**
- Easing: **ease‑in‑out**
- Width transitions smoothly from **72px → 260px**
- Icons fade in/out
- Labels slide in from the right (12px)

### **Hover on collapsed sidebar**
- Sidebar expands slightly (72px → 90px)
- Tooltip fades in with a 100ms delay

### **Active item**
- Blue left border animates from top → bottom
- Background tint fades in (50ms)

### **Why this matters**
It makes navigation feel fluid and modern.

---

# ⭐ 10.2 Button Micro‑Interactions

### **Hover**
- Background brightens by 6–8%
- Slight upward lift (translateY: -1px)
- Shadow increases subtly

### **Active (click)**
- Quick “press” animation (translateY: 1px)
- Shadow collapses
- Ripple effect (very subtle, 150ms)

### **Loading state**
- Spinner rotates at 1.2s per cycle
- Button text fades out
- Button width stays fixed (no layout shift)

### **Disabled**
- Reduced opacity (60%)
- No hover or active states

---

# ⭐ 10.3 Card Micro‑Interactions

### **Hover**
- Lift: translateY(-2px)
- Shadow increases slightly
- Border brightens by 5%

### **Focus (keyboard navigation)**
- Blue glow ring (migration)
- Amber glow ring (rollback)

### **Danger Zone Card**
- Amber glow pulses very subtly (1% opacity)
- Warning icon animates with a slow “breathing” effect

---

# ⭐ 10.4 Input Field Micro‑Interactions

### **Focus**
- Border animates from gray → blue (or amber)
- Glow ring fades in (150ms)
- Icon brightens slightly

### **Typing**
- Caret blinks at 500ms
- Characters fade in (20ms)

### **Validation**
- Success: green underline slides in from left
- Error: red underline shakes gently (20px, 80ms)

---

# ⭐ 10.5 Progress Bar Animations

### **Fill animation**
- Smooth, continuous motion
- Easing: cubic‑bezier(0.4, 0, 0.2, 1)
- No jumps when polling updates

### **Color**
- Migration: blue gradient
- Rollback: amber gradient

### **Completion**
- Bar fills to 100%
- Quick flash (50ms)
- Badge transitions to green

---

# ⭐ 10.6 Live Logs Terminal Animations

### **New log line**
- Fade in (100ms)
- Slide up (4px)
- Timestamp appears first, then message (staggered 30ms)

### **Auto-scroll**
- Smooth scroll to bottom (150ms)
- Pauses if user scrolls up

### **Error lines**
- Red text pulses once (50ms)

### **Warnings**
- Amber text with subtle glow

---

# ⭐ 10.7 Toast Animations (Subtle)

### **Entry**
- Fade in (150ms)
- Slide up (10px)
- Slight scale-up (1.02)

### **Exit**
- Fade out (200ms)
- Slide down (6px)

### **Hover**
- Pause timer
- Slight highlight

---

# ⭐ 10.8 Page Transitions

### **When navigating between pages**
- Fade in (120ms)
- Slide up (8px)
- Sidebar remains fixed

### **Breadcrumb transitions**
- Each segment fades in sequentially (50ms stagger)

### **Card transitions**
- Cards fade + scale from 98% → 100%

---

# ⭐ 10.9 Status Change Animations

### **Pending → Running**
- Badge color transitions gray → blue (150ms)
- Progress bar appears with fade-in

### **Running → Completed**
- Badge transitions blue → green
- Confetti burst (optional, subtle)
- Progress bar flashes once

### **Running → Failed**
- Badge transitions blue → red
- Card shakes gently (20px, 80ms)
- Error toast appears

---

# ⭐ 10.10 Danger Zone Interactions

### **Dry Run OFF**
- Amber glow intensifies
- Confirmation field slides down
- Warning toast appears

### **Confirmation modal**
- Fade-in overlay (150ms)
- Modal scales from 96% → 100%
- Buttons animate in with stagger (50ms)

---

# 🎉 **STEP 10 COMPLETE**  
You now have a complete, premium micro‑interaction system that:

- Makes the UI feel alive  
- Guides user attention  
- Communicates state changes  
- Reduces cognitive load  
- Matches your dark-mode aesthetic  
- Feels like Vercel, Linear, Stripe, and GitHub  

This is the final layer of polish that transforms Project Migrate into a world‑class product.

---

# 🚀 **NEXT STEP: STEP 11 — Accessibility & Keyboard Navigation**  
This is the final step before we move into implementation.

Before I generate it:

### Do you want accessibility to focus more on:
**A) Keyboard navigation & focus management**  
or  
**B) Screen reader support & ARIA roles**

Great — **keyboard navigation and focus management first**.  
This is exactly the right move for a tool like Project Migrate, because migrations and rollbacks are often performed by power users who expect to fly through the interface without touching a mouse. When keyboard navigation is done well, the entire app feels faster, more predictable, and more professional.

Below is the complete, opinionated **STEP 11: Accessibility & Keyboard Navigation** blueprint.

---

# 🎯 **STEP 11 — ACCESSIBILITY & KEYBOARD NAVIGATION (Power‑User Friendly)**

This step ensures that every part of Project Migrate is:

- Fully navigable with a keyboard  
- Predictable in focus order  
- Clear in focus visibility  
- Accessible to screen readers (we’ll do ARIA roles next)  
- Usable by power users who prefer speed over clicking  

Let’s build the full accessibility foundation.

---

# ⭐ 11.1 Global Keyboard Navigation Rules

These rules apply across the entire app.

### **Tab Order**
- Logical, top‑to‑bottom  
- Left‑to‑right  
- Sidebar → Top Bar → Page Content → Footer  

### **Shift+Tab**
- Moves backward through the same order  

### **Focus Ring**
- Migration actions → **blue glow**  
- Rollback actions → **amber glow**  
- Neutral UI → **white/gray glow**  

### **Focus Ring Style**
- 2px outline  
- Slight outer glow  
- Smooth fade-in (100ms)  

This makes keyboard focus obvious without being ugly.

---

# ⭐ 11.2 Sidebar Keyboard Navigation

The sidebar becomes a **first‑class keyboard citizen**.

### **Arrow Keys**
- ↑ and ↓ move between sidebar items  
- → expands a collapsed sidebar  
- ← collapses an expanded sidebar  

### **Enter**
- Activates the selected sidebar item  

### **Space**
- Toggles collapse/expand  

### **Home / End**
- Jump to first or last sidebar item  

### **Why this matters**
It makes the sidebar feel like a native app navigation panel.

---

# ⭐ 11.3 Top Bar Keyboard Navigation

### **Tab Order**
1. Breadcrumbs  
2. Page title (skipped visually but focusable for screen readers)  
3. System health indicator  
4. Theme toggle  
5. User menu  

### **Keyboard Shortcuts**
- **H** → Jump to Home/Dashboard  
- **J** → Jump to Jobs  
- **M** → Jump to Migration  
- **R** → Jump to Rollback  
- **S** → Jump to Settings  

### **Why this matters**
Power users can navigate the entire app with single keystrokes.

---

# ⭐ 11.4 Migration & Rollback Forms (Keyboard-First Design)

### **Tab Order**
- Source path  
- Destination path  
- Dry run toggle  
- Parallelism slider  
- Submit button  

### **Keyboard Controls**
- **Space** toggles Dry Run  
- **← / →** adjust slider  
- **Enter** submits form  

### **Confirmation Field (Rollback)**
- Only appears when Dry Run is OFF  
- Auto-focuses when revealed  
- Enter triggers modal  

### **Modal**
- **Esc** closes  
- **Tab** cycles through buttons  
- **Enter** confirms  

---

# ⭐ 11.5 Job Details Page (Keyboard Navigation)

### **Left Column**
- Job header  
- Progress bar  
- Stats grid  

### **Right Column (Logs)**
- Logs container is scrollable  
- **PageUp / PageDown** scroll logs  
- **Ctrl+End** jumps to bottom  
- **Ctrl+Home** jumps to top  
- **L** toggles auto-scroll  

### **Actions**
- **C** → Cancel job  
- **D** → Download logs  
- **F** → Fullscreen logs  

---

# ⭐ 11.6 Jobs List Page (Keyboard Navigation)

### **Grid Navigation**
- Arrow keys move between cards  
- Enter opens Job Details  
- Space selects card (for multi-select actions in future)  

### **Filters**
- Arrow keys move between filter pills  
- Space toggles filter  
- Esc clears filters  

### **Search**
- Auto-focus on “/” (like GitHub)  

---

# ⭐ 11.7 Toast Accessibility

### **Focus Behavior**
- Toasts do NOT steal focus  
- But they are focusable if user tabs to them  

### **Keyboard Controls**
- **Enter** closes toast  
- **Esc** closes toast  

### **Screen Reader Behavior**
- Toasts announce themselves politely  
- They do not interrupt ongoing announcements  

---

# ⭐ 11.8 Danger Zone Accessibility

### **Focus Trap in Modal**
- Focus cannot leave modal until user confirms or cancels  
- Esc always closes modal  
- Tab cycles through:  
  1. Title  
  2. Warning text  
  3. Checklist items  
  4. Cancel  
  5. Confirm  

### **Confirmation Field**
- Auto-focus  
- Enter triggers confirm  
- Incorrect text → shake animation + error message  

---

# ⭐ 11.9 Global Keyboard Shortcuts Summary

| Shortcut | Action |
|---------|--------|
| H | Go to Dashboard |
| J | Go to Jobs |
| M | Go to Migration |
| R | Go to Rollback |
| S | Go to Settings |
| / | Focus search |
| L | Toggle log auto-scroll |
| Esc | Close modals / toasts |

These shortcuts make the app feel like a native tool.

---

# 🎉 **STEP 11 COMPLETE**  
You now have a complete, enterprise-grade keyboard navigation system that:

- Makes the app fully usable without a mouse  
- Supports power users  
- Improves accessibility  
- Matches modern SaaS UX standards  
- Integrates with your dark-mode design system  
- Enhances safety for destructive actions  

This is a huge step toward making Project Migrate feel like a polished, professional product.

---

# 🚀 **NEXT STEP: STEP 12 — Screen Reader Support & ARIA Roles**  
This is the final accessibility layer.

Before I generate it:

### Do you want the screen reader support to be:
**A) Minimal (basic ARIA roles + labels)**  
or  
**B) Comprehensive (full semantic structure, live regions, role descriptions)**

Perfect — **Option A: minimal, clean ARIA + semantic structure**.  
This gives Project Migrate strong accessibility without over‑engineering it. It’s the right choice for a technical dashboard where clarity and predictability matter more than verbose screen‑reader chatter.

Now we move into **STEP 12: Screen Reader Support & ARIA Roles**, the final accessibility layer before implementation.

Below is the complete, opinionated blueprint.

---

# 🎯 **STEP 12 — SCREEN READER SUPPORT & ARIA ROLES (Minimal, Clean, Semantic)**

The goal here is simple:

**Make Project Migrate fully understandable to screen readers without adding noise.**

We’ll use:

- Semantic HTML  
- Minimal ARIA roles  
- Clear labels  
- Live regions only where needed  
- Descriptive text for dangerous actions  

Let’s build it.

---

# ⭐ 12.1 Semantic Structure (The Foundation)

Every major part of the app gets a semantic container:

- `<nav>` → Sidebar  
- `<header>` → Top bar  
- `<main>` → Page content  
- `<section>` → Cards  
- `<form>` → Migration & Rollback forms  
- `<article>` → Job cards  
- `<aside>` → Logs panel (optional)  

This gives screen readers a clean, predictable structure.

---

# ⭐ 12.2 Minimal ARIA Roles (Only Where Needed)

We avoid overusing ARIA — semantic HTML does most of the work.

### **Where ARIA *is* needed:**

#### **Sidebar**
```html
<nav aria-label="Primary">
```

#### **Breadcrumbs**
```html
<nav aria-label="Breadcrumb">
```

#### **Status Badges**
```html
<span role="status">Running</span>
```

#### **Progress Bar**
```html
<div role="progressbar"
     aria-valuenow="42"
     aria-valuemin="0"
     aria-valuemax="100">
```

#### **Live Logs**
```html
<div aria-live="polite">
```

#### **Danger Zone**
```html
<section aria-labelledby="rollback-danger-title">
```

#### **Modal**
```html
<div role="dialog" aria-modal="true">
```

That’s it — minimal, clean, effective.

---

# ⭐ 12.3 Labels & Descriptions

### **Inputs**
Every input gets:

- `aria-label` OR  
- `<label for="...">`  

Example:
```html
<label for="source">Source Path</label>
<input id="source" aria-describedby="source-help">
<span id="source-help">Directory to migrate from.</span>
```

### **Toggles**
```html
<button role="switch" aria-checked="true">Dry Run</button>
```

### **Sliders**
```html
<input type="range" aria-label="Parallelism">
```

### **Buttons**
```html
<button aria-label="Enqueue Migration">Start</button>
```

---

# ⭐ 12.4 Live Regions (Only Where Needed)

We use **two** live regions:

### **1. Toast Notifications**
```html
<div aria-live="polite">
```

### **2. Logs Panel**
```html
<div aria-live="polite">
```

We avoid `assertive` because it interrupts screen readers.

---

# ⭐ 12.5 Danger Zone Accessibility

Rollback is destructive — screen readers must know that.

### **Danger Zone Section**
```html
<section aria-labelledby="danger-title" aria-describedby="danger-desc">
  <h2 id="danger-title">Rollback Migration (Danger Zone)</h2>
  <p id="danger-desc">This action may delete or overwrite files.</p>
</section>
```

### **Confirmation Field**
```html
<input aria-label="Type ROLLBACK to confirm">
```

### **Modal**
```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
```

---

# ⭐ 12.6 Job Cards (Accessible, Minimal)

Each job card is an `<article>`:

```html
<article aria-labelledby="job-1234-title">
  <h3 id="job-1234-title">Migration Job #1234</h3>
  <span role="status">Running</span>
  <div role="progressbar" aria-valuenow="42" aria-valuemin="0" aria-valuemax="100"></div>
</article>
```

This makes job cards fully navigable and understandable.

---

# ⭐ 12.7 Keyboard + Screen Reader Harmony

Because we already built strong keyboard navigation in Step 11, screen readers benefit automatically:

- Focus rings are visible  
- Tab order is logical  
- Modals trap focus  
- Danger zone is clearly labeled  
- Logs announce new lines politely  

This is exactly how modern dashboards handle accessibility.

---

# 🎉 **STEP 12 COMPLETE**  
You now have a complete accessibility foundation with:

- Semantic HTML  
- Minimal ARIA roles  
- Clear labels  
- Live regions only where needed  
- Accessible danger zones  
- Accessible modals  
- Accessible job cards  
- Accessible progress indicators  

This makes Project Migrate usable by everyone — without cluttering the UI or overwhelming screen readers.

---

# 🚀 **NEXT STEP: STEP 13 — Implementation Blueprint (React + Tailwind Architecture)**  
This is where we turn all the design work into a real, buildable frontend architecture.

Before I generate it:

### Do you want the implementation blueprint to be:
**A) High-level (folder structure, component hierarchy, routing)**  
or  
**B) Detailed (full component code templates, Tailwind classes, hooks)**

Both are possible — it depends on how deep you want to go.