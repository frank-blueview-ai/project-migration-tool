Fantastic — **Option B: Migration + Rollback on the same page, in separate cards** is absolutely the right choice for your workflow. It keeps everything tightly connected, reduces navigation friction, and makes the page feel like a unified “Operations Console.”

Now we move into **STEP 4: Migration & Rollback Forms (Professional UI)** — and this is where the app starts to feel like a real product rather than a prototype.

Below is the complete redesign blueprint for both forms, using the design system and layout we already established.

---

# 🎯 **STEP 4 — MIGRATION & ROLLBACK FORMS (Side‑by‑Side Cards)**  
This step transforms your basic HTML forms into modern, enterprise‑grade configuration panels.

We’ll build:

- A **Migration Card**  
- A **Rollback Card**  
- Shared components (inputs, toggles, sliders, icons, tooltips)  
- A unified layout that feels clean, powerful, and safe  

Let’s break it down.

---

# ⭐ 4.1 Page Layout (Two Cards, Same Page)

The page will look like this:

```
┌──────────────────────────────────────────────────────────────┐
│ Breadcrumbs: Operations > Migrate & Rollback                 │
│ Page Title: Migrate & Rollback                               │
├──────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────┐   ┌──────────────────────────┐ │
│ │ Migration Card           │   │ Rollback Card            │ │
│ │ (Blue accent)            │   │ (Amber “Danger Zone”)    │ │
│ └──────────────────────────┘   └──────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

This gives users a clear, side‑by‑side comparison of the two workflows.

---

# ⭐ 4.2 Migration Card (Primary Workflow)

### **Card Title**
**Start a Migration**  
Accent color: Migration Blue (`#3B82F6`)

### **Sections**

#### **1. Path Configuration**
- **Source Path**  
  - Folder icon inside input  
  - Tooltip: “The directory you want to migrate from.”  
- **Destination Path**  
  - Folder icon  
  - Tooltip: “The directory where files will be copied to.”

#### **2. Migration Options**
- **Dry Run Toggle**  
  - Blue when ON  
  - Tooltip: “Simulates the migration without copying files.”  
- **Parallelism Slider**  
  - Range: 1–16  
  - Tooltip: “Number of parallel file copy workers.”

#### **3. Submit Button**
- Primary blue button  
- Loading state: spinner + “Enqueuing…”  
- Success toast: “Migration enqueued”  
- Error toast: “Failed to enqueue migration”

---

# ⭐ 4.3 Rollback Card (Danger Zone)

### **Card Title**
**Rollback Migration**  
Accent color: Rollback Amber (`#F59E0B`)

### **Visual Treatment**
- Amber border  
- Warning icon  
- Slight red/amber glow on hover  
- Subtle “Danger Zone” label at top

### **Sections**

#### **1. Rollback Configuration**
- **Target Directory**  
  - Tooltip: “Directory to roll back.”  
- **Manifest Path**  
  - Tooltip: “Path to the migration_manifest.json file.”

#### **2. Safety Options**
- **Dry Run Toggle**  
  - Amber when ON  
  - Tooltip: “Simulates rollback without deleting files.”  
- **Confirmation Input (only for real rollback)**  
  - Placeholder: “Type ROLLBACK to confirm”  
  - Required only when dry run is OFF  
  - Button disabled until correct text is entered

#### **3. Submit Button**
- Danger button (amber/red)  
- Loading state  
- Success toast: “Rollback enqueued”  
- Error toast: “Failed to enqueue rollback”

---

# ⭐ 4.4 Shared UI Components

### **Inputs**
- Dark background: `#0F141A`  
- Border: `#2D333B`  
- Focus ring: Blue or Amber depending on card  
- Icons inside inputs (Lucide: folder, file, cpu)

### **Toggles**
- Rounded pill  
- Smooth animation  
- Blue for migration  
- Amber for rollback  

### **Sliders**
- Blue track for migration  
- Amber track for rollback  
- Tooltip showing numeric value  

### **Tooltips**
- Small, dark, subtle  
- Appear on hover  
- Explain technical concepts clearly  

### **Buttons**
- Primary (blue)  
- Danger (amber/red)  
- Ghost (transparent)  
- Loading spinner  

---

# ⭐ 4.5 Interaction Flow

### Migration
1. User fills paths  
2. Adjusts parallelism  
3. Toggles dry run  
4. Clicks “Enqueue Migration”  
5. Toast appears  
6. User is automatically taken to Job Details page  
7. Job monitor shows progress + logs  

### Rollback
1. User fills target + manifest  
2. Toggles dry run  
3. If dry run OFF → confirmation field appears  
4. Clicks “Enqueue Rollback”  
5. Toast appears  
6. User is taken to Job Details page  

---

# ⭐ 4.6 Text Wireframe (Detailed)

```
┌──────────────────────────────────────────────────────────────┐
│ Start a Migration                                             │
│ [Source Path] (📁) [?]                                        │
│ [Destination Path] (📁) [?]                                   │
│ Dry Run: [ ON ] [?]                                           │
│ Parallelism: [====|-----] 4 [?]                               │
│ [ Enqueue Migration ]                                         │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ ⚠️  Rollback Migration (Danger Zone)                          │
│ [Target Directory] (📁) [?]                                   │
│ [Manifest Path] (📄) [?]                                      │
│ Dry Run: [ ON ] [?]                                           │
│ If Dry Run OFF:                                               │
│   Confirm: [ Type ROLLBACK ]                                  │
│ [ Enqueue Rollback ]                                          │
└──────────────────────────────────────────────────────────────┘
```

---

# 🎉 **STEP 4 COMPLETE**  
You now have a fully designed, enterprise-grade Migration & Rollback page with:

- Card-based layout  
- Icons, tooltips, toggles, sliders  
- Safety-first rollback UX  
- Toast notifications  
- Loading states  
- Confirmation patterns  

This is a massive upgrade from the original form.

---

# 🚀 **NEXT STEP: STEP 5 — Job Details Page (Progress, Stats, Logs)**  
This is the most important page in the entire app — the real-time job monitor.

Before I generate it:

### Do you want the Job Details page to show:
**A) A single-column layout (progress → stats → logs)**  
or  
**B) A two-column layout (left: progress/stats, right: live logs)**

Option B feels more like a real operations console, but I’ll follow your preference.