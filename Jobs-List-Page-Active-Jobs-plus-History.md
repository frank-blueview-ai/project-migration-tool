Perfect — **Option B: a modern card‑based Jobs List page**.  
This is the right choice for Project Migrate because it gives the UI a clean, Vercel‑style feel, makes each job visually scannable, and supports richer interactions than a traditional table.

Now we move into **STEP 6: Jobs List Page (Active Jobs + History)** — the page that gives users visibility into everything happening in the system.

Below is the complete, opinionated blueprint.

---

# 🎯 **STEP 6 — JOBS LIST PAGE (Card‑Based Layout)**  
This page shows all jobs — active, pending, completed, failed — in a clean, modern card layout that feels like a real operations dashboard.

We’ll design:

- The page structure  
- The filtering system  
- The job cards  
- Status badges  
- Progress indicators  
- Empty states  
- Interactions  

Let’s build it.

---

# ⭐ 6.1 Page Layout Overview

The Jobs List page uses a **two‑section layout**:

```
┌──────────────────────────────────────────────────────────────┐
│ Breadcrumbs: Jobs                                             │
│ Page Title: Jobs                                              │
├──────────────────────────────────────────────────────────────┤
│ Filters + Search                                              │
├──────────────────────────────────────────────────────────────┤
│ Job Cards Grid                                                │
│ (responsive: 1–3 columns)                                     │
└──────────────────────────────────────────────────────────────┘
```

This gives users:

- Control over what they see  
- A clean, scannable overview  
- A modern, card‑based interface  

---

# ⭐ 6.2 Filters & Search

### Filters:
- **Status**  
  - All  
  - Pending  
  - Running  
  - Completed  
  - Failed  
- **Type**  
  - Migration  
  - Rollback  
- **Time Range**  
  - Last hour  
  - Last 24 hours  
  - Last 7 days  
  - All time  

### Search:
- Search by job ID  
- Search by path (source/destination)  
- Search by manifest  

### UI Style:
- Pills or segmented controls  
- Smooth transitions  
- Blue highlight for active filters  

---

# ⭐ 6.3 Job Cards (The Core Component)

Each job is represented as a **card** with:

- Status badge  
- Job type  
- Job ID  
- Timestamp  
- Duration  
- Progress bar (if running)  
- Quick actions  
- Mini log preview (optional)  

### Card Layout (Text Wireframe)

```
┌──────────────────────────────────────────────────────────────┐
│ Migration (blue badge)                                       │
│ Job #1234                                                     │
│ Started: 2m ago | Duration: 1m 12s                            │
│ Progress: [██████------] 42%                                  │
│ Files: 1240 / 3000 | Data: 12.4 GB / 38.2 GB                  │
│ [View Details] [Retry] [Cancel]                               │
└──────────────────────────────────────────────────────────────┘
```

### Visual Style:
- Dark card background  
- Subtle border  
- Hover lift  
- Smooth shadow  
- Rounded corners (8px)  

---

# ⭐ 6.4 Status Badges

Badges use your accent colors:

| Status     | Color     |
|------------|-----------|
| Pending    | Gray      |
| Running    | Blue      |
| Completed  | Green     |
| Failed     | Red       |
| Rollback   | Amber     |

Badges appear at the top-left of each card.

---

# ⭐ 6.5 Progress Indicators

For running jobs:

- Progress bar (blue or amber)  
- Percentage  
- ETA  
- Throughput  

### Example:
```
Progress: 42% — ETA: 1m 45s — 112 MB/s
```

---

# ⭐ 6.6 Quick Actions

Depending on job status:

### Running:
- Cancel Job  
- View Details  

### Completed:
- View Details  
- Start Rollback  
- Download Manifest  

### Failed:
- View Details  
- Retry Job  

### Pending:
- Cancel Job  
- View Details  

Buttons use:

- Blue for primary  
- Gray for secondary  
- Red for destructive  

---

# ⭐ 6.7 Mini Log Preview (Optional but powerful)

Each card can show the last 1–3 log lines:

```
[12:01:23] INFO Copying file: /src/app/main.py
[12:01:24] WARN Skipping ignored path: node_modules/
```

This gives users a quick sense of what’s happening without opening the job.

---

# ⭐ 6.8 Responsive Grid

### Desktop:
- 3 columns

### Tablet:
- 2 columns

### Mobile:
- 1 column  
- Cards stack vertically  
- Progress bar becomes thinner  

---

# ⭐ 6.9 Empty States

If no jobs match filters:

```
No jobs found
Start your first migration or adjust your filters.
[Start Migration]
```

Use a simple illustration or icon.

---

# ⭐ 6.10 Interaction Flow

### User opens Jobs page:
- Sees active jobs at top  
- Completed jobs below  
- Can filter, search, or click into details  

### User clicks a card:
- Navigates to Job Details page (Step 5)  

### User cancels a job:
- Confirmation modal  
- Card updates in real time  

### User retries a failed job:
- New job is created  
- Redirect to new Job Details page  

---

# 🎉 **STEP 6 COMPLETE**  
You now have a fully designed, modern, card‑based Jobs List page with:

- Filters  
- Search  
- Responsive grid  
- Status badges  
- Progress indicators  
- Quick actions  
- Mini logs  
- Empty states  

This page gives users complete visibility into the system.

---

# 🚀 **NEXT STEP: STEP 7 — Empty States & Onboarding Moments**  
This step makes the app feel polished, friendly, and professional.

Before I generate it:

### Do you want the empty states to be:
**A) Minimalist (simple icons + text)**  
or  
**B) Illustrated (soft illustrations like Vercel/Linear)**

Both are great — it depends on the personality you want.