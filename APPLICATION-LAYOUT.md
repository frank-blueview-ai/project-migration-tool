Excellent — **collapsible sidebar it is**.  
This gives Project Migrate a sleek, modern feel similar to Vercel, Linear, and GitHub Desktop. It also pairs beautifully with your dark‑mode‑first design system.

Now we move into **STEP 2: Application Layout** — the structural backbone of the entire UI.

I’ll give you:

- The **full layout architecture**
- The **sidebar design**
- The **top bar design**
- The **page container system**
- The **responsive behavior**
- The **interaction patterns**
- The **component breakdown** you’ll use in React + Tailwind

This will become the foundation for every page we build next.

---

# 🎯 **STEP 2 — APPLICATION LAYOUT (Collapsible Sidebar + Top Bar)**

This is the “frame” of the entire application — the part that stays constant while pages change.

---

# ⭐ 2.1 Layout Overview

The app will use a **three‑part structure**:

```
┌───────────────────────────────────────────────┐
│ Top Bar (global actions, health, theme toggle)│
├───────┬───────────────────────────────────────┤
│Sidebar│ Main Content Area                     │
│       │ (pages, cards, forms, logs, etc.)     │
└───────┴───────────────────────────────────────┘
```

### Sidebar  
- Collapsible  
- Icon-only when collapsed  
- Expands on hover or click  
- Smooth 200ms animation  

### Top Bar  
- Always visible  
- Contains system health, breadcrumbs, and user menu  

### Main Content  
- Scrollable  
- Max width: 1200px  
- Uses your spacing scale (32px sections)

---

# ⭐ 2.2 Sidebar Navigation (Collapsible)

### **Expanded State (260px wide)**  
Shows:

- Icon + Label  
- Section headers  
- Active item highlight  
- Subtle border on the right  

### **Collapsed State (72px wide)**  
Shows:

- Icons only  
- Tooltip on hover  
- Expands on click or hover (configurable)

### **Navigation Items**
These match your workflows:

| Icon (Lucide) | Label          | Route               |
|---------------|----------------|---------------------|
| LayoutDashboard | Dashboard     | `/dashboard`        |
| PlayCircle     | Active Jobs    | `/jobs/active`      |
| History        | History        | `/jobs/history`     |
| Upload         | Migrate        | `/migrate`          |
| RotateCcw      | Rollback       | `/rollback`         |
| Settings       | Settings       | `/settings`         |

### **Sidebar Footer**
- App version  
- Link to logs or system info  
- Optional: “Collapse” button  

---

# ⭐ 2.3 Top Bar (Global Context)

The top bar gives users orientation and system-level controls.

### **Left side**
- Breadcrumbs (e.g., Jobs > Job #1234)
- Page title

### **Right side**
- System health indicator  
  - Green pulsing dot if backend reachable  
  - Amber if degraded  
  - Red if unreachable  
- Theme toggle (dark/light)  
- User menu (optional)  

### **Style**
- Height: 56px  
- Background: `#0D1117`  
- Border-bottom: `#2D333B`  

---

# ⭐ 2.4 Main Content Area

This is where pages render.

### Rules:
- Max width: 1200px  
- Centered with auto margins  
- Padding: 32px  
- Cards spaced by 24–32px  
- Scrollable independently of sidebar/top bar  

### Benefits:
- Clean, focused reading area  
- Consistent spacing  
- Professional dashboard feel  

---

# ⭐ 2.5 Responsive Behavior

### Desktop (≥1024px)
- Sidebar expanded by default  
- Collapsible on click  

### Tablet (≥768px)
- Sidebar collapsed by default  
- Expands on hover  

### Mobile (<768px)
- Sidebar becomes a slide‑in drawer  
- Top bar remains fixed  
- Pages become single-column  

---

# ⭐ 2.6 Interaction Patterns

### Sidebar Hover Expand
- 200ms ease-in-out  
- Expands from 72px → 260px  
- Content shifts smoothly  

### Active Item Highlight
- Blue left border  
- Slight background tint  

### Breadcrumbs
- Fade-in animation  
- Clickable segments  

### Page Transitions
- Fade + slight slide  
- 150ms  

---

# ⭐ 2.7 Component Breakdown (React + Tailwind)

We will create these components:

### **Layout Components**
- `<AppLayout>`  
- `<Sidebar>`  
- `<SidebarItem>`  
- `<TopBar>`  
- `<Breadcrumbs>`  
- `<PageContainer>`  

### **UI Components**
- `<Card>`  
- `<Button>`  
- `<Input>`  
- `<Toggle>`  
- `<Slider>`  
- `<Badge>`  
- `<ProgressBar>`  
- `<LiveLogs>`  
- `<Toast>`  

These will be reusable across all pages.

---

# ⭐ 2.8 Visual Summary (Text Wireframe)

```
┌──────────────────────────────────────────────────────────────┐
│ Top Bar: Breadcrumbs | Page Title | Health | Theme | User     │
├───────────────┬──────────────────────────────────────────────┤
│ Sidebar        │ Page Container                               │
│ [icon] Dashboard                                              │
│ [icon] Active Jobs                                            │
│ [icon] History                                                │
│ [icon] Migrate                                                │
│ [icon] Rollback                                               │
│ [icon] Settings                                               │
│               │  ┌─────────────────────────────────────────┐ │
│               │  │ Card: Migration Form                    │ │
│               │  ├─────────────────────────────────────────┤ │
│               │  │ Card: Recent Jobs                       │ │
│               │  └─────────────────────────────────────────┘ │
└───────────────┴──────────────────────────────────────────────┘
```

---

# 🎉 **STEP 2 COMPLETE**  
You now have the full application layout architecture — the skeleton of the entire UI.

This is the foundation for everything we build next.

---

# 🚀 **NEXT STEP: STEP 3 — Dashboard Page (Cards, Recent Jobs, System Health)**  
This is where we start building actual screens using the layout.

Before I generate the dashboard:

### Do you want the dashboard to show:
**A) A simple overview (Recent Jobs + System Health)**  
or  
**B) A rich overview (Recent Jobs + System Health + Stats + Quick Actions)**

Option B is more “enterprise dashboard,” but I’ll follow your preference.