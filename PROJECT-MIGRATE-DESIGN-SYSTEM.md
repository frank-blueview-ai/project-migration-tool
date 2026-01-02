Perfect — **Dark Mode first** it is.  
That gives Project Migrate a strong, modern, Vercel‑meets‑Linear aesthetic, and it sets the tone for the entire design system.

We’ll now begin **Step 1: The Design System**, which is the foundation for everything else we build — components, pages, layouts, interactions, and the overall “feel” of the platform.

I’ll give you a complete, opinionated design system that fits your product’s personality: technical, trustworthy, modern, and enterprise‑ready.

---

# 🎨 **STEP 1 — PROJECT MIGRATE DESIGN SYSTEM (Dark Mode First)**  
This is the visual language that will guide every UI component and page we build next.

---

# 🎯 **1.1 Color Palette (Dark Mode First)**  
A migration tool needs clarity, contrast, and trust.  
Here’s a palette that balances professionalism with modern SaaS aesthetics.

### **Core Backgrounds**
- **Primary Background:** `#0D1117` (deep neutral black, GitHub dark mode base)  
- **Secondary Background:** `#161B22` (slightly lighter for cards)  
- **Elevated Surface:** `#1E242C` (for modals, popovers, elevated cards)

### **Text Colors**
- **Primary Text:** `#E6EDF3` (soft white, not harsh)  
- **Secondary Text:** `#9BA3B4` (muted gray for labels)  
- **Disabled Text:** `#5A6372`

### **Accent Colors**
These map directly to your workflows:

- **Migration Blue:** `#3B82F6`  
- **Rollback Amber:** `#F59E0B`  
- **Success Green:** `#10B981`  
- **Error Red:** `#EF4444`  
- **Info Cyan:** `#06B6D4`

### **Borders & Dividers**
- **Border:** `#2D333B`  
- **Hover Border:** `#3C444E`  
- **Card Outline:** subtle 1px border using `#2D333B`

### **Shadows**
Dark mode shadows must be subtle:

- `0px 4px 12px rgba(0, 0, 0, 0.4)`  
- `0px 1px 2px rgba(0, 0, 0, 0.6)`

---

# 🔤 **1.2 Typography**

### **Primary Font**
- **Inter** (modern, clean, perfect for dashboards)

### **Font Weights**
- 400 — body  
- 500 — labels  
- 600 — section headers  
- 700 — card titles  
- 800 — page titles  

### **Monospace Font (Logs & Paths)**
- **JetBrains Mono** or **IBM Plex Mono**

### **Font Sizes**
- XS: 12px  
- SM: 14px  
- Base: 16px  
- LG: 18px  
- XL: 20px  
- 2XL: 24px  
- 3XL: 30px (page titles)

---

# 🧱 **1.3 Spacing & Layout System**

### **Spacing Scale (8px grid)**
- 4px (tight)  
- 8px  
- 12px  
- 16px  
- 24px  
- 32px  
- 48px  

### **Card Padding**
- 24px internal padding  
- 16px between form elements  

### **Page Layout**
- Sidebar width: **260px**  
- Content max width: **1200px**  
- Section spacing: **32px**  

---

# 🧩 **1.4 Component System**

These are the reusable building blocks we’ll use in every page.

### **Buttons**
- Primary (blue)  
- Secondary (gray)  
- Danger (amber/red)  
- Ghost (transparent)  

Rounded corners: **6px**  
Height: **40px**  
Hover: lighten by 5–8%  
Active: darken by 5–8%

### **Inputs**
- Rounded: 6px  
- Background: `#0F141A`  
- Border: `#2D333B`  
- Focus ring: `#3B82F6` (blue glow)  
- Icons inside inputs (folder, CPU, lightning bolt)

### **Toggles**
- Rounded pill  
- Blue when active  
- Gray when inactive  

### **Sliders**
- Blue track  
- White thumb  
- Tooltip on hover showing numeric value

### **Cards**
- Background: `#161B22`  
- Border: `#2D333B`  
- Shadow: subtle  
- Rounded: 8px  

### **Badges**
- Running → Blue  
- Pending → Gray  
- Completed → Green  
- Failed → Red  
- Rollback → Amber  

### **Progress Bars**
- Blue for migration  
- Amber for rollback  
- Smooth animation  

### **Live Logs Terminal**
- Background: `#0D1117`  
- Border: `#2D333B`  
- Monospace font  
- Auto-scroll  
- Color-coded log levels  

---

# 🧭 **1.5 Iconography**

Use a consistent icon set:

- **Lucide Icons** (modern, open-source, perfect for dashboards)

Key icons:
- Folder  
- Arrow-right  
- CPU  
- Settings  
- History  
- Terminal  
- Alert-triangle  
- Check-circle  
- X-circle  
- Loader  

---

# 🧩 **1.6 Interaction Design**

### **Hover States**
- Slight border highlight  
- Slight background lift  
- Cursor pointer  

### **Focus States**
- Blue glow ring  
- Clear outline  

### **Transitions**
- 150–200ms ease-in-out  
- Applies to buttons, cards, toggles, inputs  

### **Animations**
- Progress bar smooth fill  
- Logs fade-in  
- Sidebar slide-in  

---

# 🎉 **STEP 1 COMPLETE**  
You now have a **full design system**:  
colors, typography, spacing, components, icons, interactions — everything needed to build a modern, enterprise-grade UI.

---

# 🚀 **NEXT STEP: STEP 2 — Application Layout (Sidebar + Top Bar + Page Structure)**  
This is where we turn the design system into a real, navigable app.

Before I generate the layout:

### Do you want the sidebar to be:
**A) Collapsible (like Vercel, GitHub Desktop)**  
or  
**B) Fixed width (like Stripe Dashboard)**

Your choice will shape the entire app structure.