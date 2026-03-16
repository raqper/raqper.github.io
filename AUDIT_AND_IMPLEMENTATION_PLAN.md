# Full professional audit and implementation plan (updated)

This document is the single source of truth for the portfolio site audit and implementation. It reflects the agreed deployment structure, the guarantee that **https://raqper.github.io/portfolio/catlady** will not break, and the requirement that publishing takes less than 5 minutes.

---

## Deployment and URL structure (agreed)

**Goal:** All of the following are public at the same time.

| URL | Behavior |
|-----|----------|
| **https://raqper.github.io/** | Redirects to **https://raqper.github.io/career** |
| **https://raqper.github.io/career** | Career page (professional identity) |
| **https://raqper.github.io/hobbies** | Hobbies page (personal interests) |
| **https://raqper.github.io/portfolio/catlady** | Hidden portfolio (shared only by direct link; noindex; not in main nav) |

**Implementation:**

1. **Vite** `vite.config.ts`: `base: '/'` (SPA served from domain root).
2. **React Router** `src/app/routes.tsx`:
   - `basename: "/"` (or omit).
   - **`/`** → redirect to **`/career`** (e.g. `<Navigate to="/career" replace />` or router redirect).
   - **`/career`** → Home (Career).
   - **`/hobbies`** → HobbiesHome.
   - **`/portfolio/catlady`** → Portfolio (hidden page).
3. **Deploy:** Push **contents of `dist/`** to the **root** of the `raqper.github.io` repo (e.g. `gh-pages -d dist -r https://github.com/raqper/raqper.github.io.git -b main`). No longer deploy into `.site/portfolio/catlady`.
4. **Canonical / OG / sitemap:** Use root domain URLs (e.g. `https://raqper.github.io/`, `https://raqper.github.io/career`, `https://raqper.github.io/hobbies`). Sitemap includes those; **exclude** `https://raqper.github.io/portfolio/catlady`. Keep **robots.txt** allowing `/`.

**Non‑breaking guarantee:** The route **`/portfolio/catlady`** remains in the router and continues to render the same Portfolio page. The URL **https://raqper.github.io/portfolio/catlady** does not change and will keep working after the new deployment. No breaking change for shared job links.

**Publish in under 5 minutes:**

- Deploy remains a **single command** (e.g. `npm run deploy` or `npm run deploy:site`).
- **Pre-deploy check (optional):** Run `npm run build` then `npx serve dist`, open `http://localhost:PORT/portfolio/catlady` and confirm the portfolio page loads before pushing.
- After you run the deploy command, GitHub Pages typically updates in 1–2 minutes.

---

## Part 1 — Repository and code audit

### 1.1 Project organization

| Finding | Action |
|--------|--------|
| Root `assets/` | Remove from repo; add `/assets` to `.gitignore` if builds output there. |
| Root `404.html` | Delete; rely on build to create `dist/404.html` from `index.html`. |
| After removing map from Hobbies | Remove `travel-map.tsx` and its import from HobbiesHome. |

### 1.2 Code cleanliness

| Finding | Action |
|--------|--------|
| Unused import | Remove `Navigate` from routes.tsx only if it becomes unused after adding the redirect (otherwise use it for the redirect). |
| `assetsInclude` in vite.config.ts | Optional: remove `'**/*.csv'` if no CSV is used. |

### 1.3 Frontend / inspect-mode / performance / accessibility

- Components and styles: keep structure as is.
- No `console.log`; remove only obvious dead commented code.
- Alt text: decorative images `alt=""`; meaningful images descriptive alt.
- Headings and ARIA: keep semantic structure; add labels where needed.
- Performance: lazy loading already used; optional image optimization later.

---

## Part 2 — SEO readiness

- **Source `index.html`:** Title, meta description, canonical (e.g. `https://raqper.github.io/`), Open Graph, Twitter Card; add `og:image` when asset is ready.
- **public/robots.txt:** `User-agent: *`, `Allow: /`, `Sitemap: https://raqper.github.io/sitemap.xml`.
- **public/sitemap.xml:** Include `/`, `/career`, `/hobbies`; **exclude** `/portfolio/catlady`.
- **Schema.org Person:** Optional JSON-LD in head or from Career page.
- **Per-route meta (optional):** Different title/description for Career vs Hobbies via `document.title` and meta helper (no heavy deps).

---

## Part 3 — Hidden portfolio page (noindex)

- In **Portfolio.tsx**, use **useEffect** to add `<meta name="robots" content="noindex, nofollow">` on mount and remove on unmount.
- Do not add links to this page from main navigation (already the case).

---

## Part 4 — Hero image alignment (Career page)

- **Goal:** Portrait’s right edge aligns with “Contact” nav item at all breakpoints; layout only, no visual design change.
- **Fix:** Use same horizontal spacing as nav for the portrait wrapper (e.g. `mr-6` / `md:mr-10` to match `px-6` / `md:px-10`) so the image’s right edge matches the nav’s right content edge.

---

## Part 5 — Hobbies: remove map, add location filters to photography

- **Remove:** TravelMap component and its section from HobbiesHome; delete `travel-map.tsx`. Optional: remove `react-simple-maps` if unused.
- **Analog photos:** Add a `location` field (e.g. extract from existing labels). Add location filter chips above the grid (“All” + one per location). Default “All”; clicking a filter shows only that location. Smooth filtering, no layout shift (e.g. fixed grid or opacity/visibility). No visual design change beyond the filter row; keep responsiveness.

---

## Part 6 — Hosting

- Remain static; GitHub Pages only; no backend or new build pipelines.

---

## Part 7 — GitHub repository readiness

- **README.md:** Short description, link to live site, explanation of Career / Hobbies / hidden portfolio structure.
- **.gitignore:** Add `.vite`; add `/assets` if needed; optional `*.docx`.
- **Routing/links:** All in-app links and base path consistent with `base: '/'` and `basename: '/'`; verify after change.

---

## Part 8 — Safe change policy

1. Audit first (this document), then implement.
2. Only clearly beneficial, safe, GitHub-Pages-compatible changes.
3. No visual/UI redesign; no unnecessary refactors.
4. **Do not break https://raqper.github.io/portfolio/catlady**; keep route and URL; publish remains a single command with optional quick local test so it can go live in under 5 minutes.

---

## Summary of implementation order

1. **Deployment & routing:** `base: '/'`, `basename: '/'`, redirect `/` → `/career`, route `/portfolio/catlady` → Portfolio; update deploy script to push `dist` to repo root.
2. **Non-breaking check:** Ensure `/portfolio/catlady` still works in built app (local test with `npx serve dist`).
3. **Repo cleanup:** Remove root `assets/`, root `404.html`; update `.gitignore`; remove unused import(s).
4. **SEO:** Update `index.html` meta; add `public/robots.txt` and `public/sitemap.xml`; optional Schema.org Person.
5. **Hidden portfolio:** noindex meta in Portfolio.tsx.
6. **Hero alignment:** Portrait margin to match nav padding.
7. **Hobbies:** Remove map; add location filters to analog-photos.
8. **Docs:** README.md.

Optional follow-ups: og:image, per-route titles, Lighthouse, image optimization.
