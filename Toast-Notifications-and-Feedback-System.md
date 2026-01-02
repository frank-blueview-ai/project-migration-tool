Perfect — **Option A: subtle, bottom‑right, minimal toasts**.  
This is the right choice for a professional operations dashboard. Subtle toasts keep the UI calm and focused, especially during long-running migrations where you don’t want loud, intrusive notifications.

Now we move into **STEP 8: Toast Notifications & Feedback System**, which will give users immediate, contextual feedback for every important action.

Below is the complete, opinionated blueprint.

---

# 🎯 **STEP 8 — TOAST NOTIFICATIONS & FEEDBACK SYSTEM (Subtle, Minimal, Bottom‑Right)**

Toasts are essential for communicating:

- Success  
- Errors  
- Warnings  
- Info events  
- Background updates  

But they should never overwhelm the user — especially in a technical tool like Project Migrate.

We’ll design a **subtle, elegant toast system** that fits your dark-mode design system and enterprise aesthetic.

---

# ⭐ 8.1 Toast Placement & Behavior

### **Placement**
- Bottom-right corner  
- Stacked vertically  
- Max 3 visible at once  
- Older toasts fade out as new ones appear  

### **Behavior**
- Auto-dismiss after 3–4 seconds  
- Pause dismissal on hover  
- Smooth fade-in and fade-out  
- Slight upward motion on entry  

### **Why this works**
It keeps the UI calm and professional, without interrupting the user’s workflow.

---

# ⭐ 8.2 Toast Types & Color Coding

Each toast type uses your accent colors:

### **Success (Green)**
Used for:
- Migration enqueued  
- Rollback enqueued  
- Job completed  

Style:
- Green left border  
- Green icon  
- Soft green glow  

### **Error (Red)**
Used for:
- Failed to enqueue  
- Job failed  
- API unreachable  

Style:
- Red left border  
- Red icon  
- Slight shake animation (optional)  

### **Warning (Amber)**
Used for:
- Rollback dry-run disabled  
- Missing manifest  
- High queue depth  

Style:
- Amber left border  
- Warning icon  

### **Info (Blue)**
Used for:
- Job started  
- Logs updated  
- Settings saved  

Style:
- Blue left border  
- Info icon  

---

# ⭐ 8.3 Toast Content Structure

Each toast contains:

- **Icon** (Lucide: check, x, alert-triangle, info)  
- **Title** (short, bold)  
- **Message** (optional, one line)  
- **Close button** (small “x”)  

### Example (Success)
```
✔ Migration Enqueued
Your migration job has been added to the queue.
```

### Example (Error)
```
✖ Failed to Enqueue Rollback
The manifest file could not be found.
```

### Example (Warning)
```
⚠ Rollback Confirmation Required
Type ROLLBACK to proceed with a destructive rollback.
```

### Example (Info)
```
ℹ Job Started
Migration job #1234 is now running.
```

---

# ⭐ 8.4 Toast Animation & Timing

### **Entry Animation**
- Fade in (150ms)  
- Slight upward motion (10px)  

### **Exit Animation**
- Fade out (200ms)  
- Slight downward motion  

### **Auto-Dismiss**
- 3 seconds for success/info  
- 5 seconds for warnings  
- 7 seconds for errors  

### **Hover Behavior**
- Pause timer  
- Slight highlight  

---

# ⭐ 8.5 When Toasts Trigger (Event Map)

### **Migration Form**
- Success → “Migration Enqueued”  
- Error → “Failed to Enqueue Migration”  

### **Rollback Form**
- Success → “Rollback Enqueued”  
- Error → “Failed to Enqueue Rollback”  
- Warning → “Rollback Confirmation Required”  

### **Job Details**
- Info → “Job Started”  
- Success → “Job Completed”  
- Error → “Job Failed”  

### **Settings**
- Success → “Settings Saved”  
- Error → “Invalid Pattern”  

### **System Health**
- Error → “Backend Unreachable”  
- Info → “Connection Restored”  

---

# ⭐ 8.6 Toast Component Breakdown (React + Tailwind)

We will build:

- `<ToastProvider>`  
- `<ToastContainer>`  
- `<Toast>`  
- `useToast()` hook  

This gives you a clean, reusable system.

---

# ⭐ 8.7 Text Wireframe (Subtle Toast)

```
┌──────────────────────────────────────────────┐
│ ✔ Migration Enqueued                         │
│ Your migration job has been added to queue.  │
└──────────────────────────────────────────────┘
```

### Visual Style:
- Dark background: `#161B22`  
- Border-left: 3px accent color  
- Rounded corners: 6px  
- Padding: 12px  
- Shadow: subtle  

---

# 🎉 **STEP 8 COMPLETE**  
You now have a complete, subtle, enterprise-grade toast notification system that:

- Fits your dark-mode design  
- Uses your accent colors  
- Provides immediate feedback  
- Never interrupts the user  
- Feels modern and professional  

This is a major UX upgrade.

---

# 🚀 **NEXT STEP: STEP 9 — Rollback “Danger Zone” UX**  
This step ensures rollback actions are visually distinct, safe, and impossible to trigger accidentally.

Before I generate it:

### Do you want the Rollback Danger Zone to be:
**A) Subtle (amber border + warning icon)**  
or  
**B) Strong (full-width amber background + confirmation modal)**

Both are valid — it depends on how cautious you want the UX to be.