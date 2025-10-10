# AGENTS.md
## Project: MyFreeStocks.com
A modern, self-managed stock information and referral platform built with React + Vite + Tailwind CSS.

---

### 🧠 Agents Overview
This file defines the roles, behaviors, and scopes for all automation and AI-assisted modules (e.g., Codex, sentiment visualizer, data processors).

| Agent | Role | Scope | Notes |
|--------|------|--------|-------|
| **builder** | Handles structural and UI code generation. | `/src`, `/routes`, `/components` | Uses Tailwind, green theme, responsive layouts. |
| **designer** | Oversees brand visuals, theming, and assets. | `/public`, `/assets` | Maintains consistency with MyFreeStocks branding (green + neutral tones). |
| **content** | Generates SEO-friendly written content. | `/content`, Markdown, JSX text blocks | Tone: professional, clear, energetic. |
| **data** | Manages stock/market data ingestion and visualization. | `/src/data`, `/api`, `/components/ai` | Pulls, formats, and animates data (D3, Framer Motion). |
| **referrals** | Handles affiliate link management and tracking. | `/src/offers`, `/src/brokers` | Ensures correct link mapping, no layout changes. |
| **qa** | Performs testing and validation before build. | All | Ensures no regressions, minimal warnings, optimized bundle. |

---

### 🛠 Development Standards
- Use **React 18+**, **Vite**, **Tailwind CSS**.
- Keep all modules **self-contained** and **functional**.
- Maintain **dark/light mode** compatibility.
- Never overwrite existing layouts unless explicitly requested.
- Optimize for **Netlify** deployment.

---

### ⚙️ Automation Notes
- Codex should reference this file for agent role definitions and task routing.
- When prompted for missing agent files, assume the **builder** and **data** roles are default.
- Visualization modules (like MarketSentimentVisualizer) must import D3 via npm and be listed under dependencies.

---

### 🧩 Quick Reference
**Main directories**
```
/src/components
/src/pages
/src/data
/src/assets
/public
```

**Core theme:** `#16a34a` (green-600)  
**Accent:** `#4ade80` (green-400)  
**Neutral base:** gray-900 / gray-50  

---

### ✅ Revision
**Version:** 1.0  
**Last Updated:** 2025-10-09  
**Maintainer:** MyFreeStocks Dev Team
---

### ⚡ Codex Execution Directives

**Primary Agent:** `builder`
**Fallback Agent:** `data`

#### Builder Agent

### Layout Policy
All new pages must import and render their content inside `<Layout>` from `@/components/layout/Layout`.    
Do not recreate header, nav, or footer markup manually.    
Use `<Navbar>` and `<Footer>` only inside the shared layout.    
If older pages still reference `<PageShell>`, treat it as an alias of `<Layout>` for backward compatibility.  

Codex should interpret this repository as a **React + Vite web application** and apply the following rules during execution:

1. **Respect Layout Integrity:**  
   - Never overwrite the site-wide `<Layout>` or `<PageShell>` components.  
   - Preserve the overall navigation, header, footer, and theme consistency.

2. **Scoped Modifications Only:**  
   - When updating a page (e.g., `/offers`, `/how-it-works`), change only that route’s files inside `/src/pages` or its direct components.  
   - Do not modify `App.jsx`, router configuration, or other unrelated modules unless instructed.

3. **Styling Rules:**  
   - Use TailwindCSS utility classes with the brand palette (`green-600`, `green-400`, `gray-900`, `gray-50`).  
   - Maintain dark/light mode responsiveness.

4. **Dependencies:**  
   - Core: `react`, `react-router-dom`, `vite`, `tailwindcss`.  
   - Visuals: `framer-motion`, `d3`, `lucide-react`.  
   - Never introduce heavy frameworks unless explicitly requested.

5. **Data & Visualization:**  
   - When handling stock or market data, prefer local CSV or API mock sources inside `/src/data/`.  
   - Use `d3.csv()` and React hooks for parsing and rendering.

6. **Testing & Deployment:**  
   - Validate output builds without warnings.  
   - Ensure compatibility with Netlify’s default React/Vite build pipeline.  
   - Keep all assets within relative paths (`/src`, `/public`).

---

### 🧭 Codex Behavior Map
| Task Type | Responsible Agent | Example Action |
|------------|------------------|----------------|
| UI / component creation | builder | Create a new JSX component under `/src/components` |
| Visual or animation | data | Build D3 + Framer Motion visualization |
| Branding / logo / colors | designer | Adjust color tokens or images in `/assets` |
| Text / SEO / descriptions | content | Edit `/src/pages/*.jsx` or markdown sections |
| Referral logic | referrals | Update broker signup links and scoring logic |
| Validation | qa | Run build checks, lint, optimize imports |

---

**Codex should read this file at runtime to determine which agent to activate** and follow the associated standards before committing or pushing changes.
