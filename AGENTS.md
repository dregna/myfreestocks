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
