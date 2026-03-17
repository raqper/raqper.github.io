# Local Build and Deploy Workflow

Use this sequence for every update on `skills-improv` (and later on `main`).

## 1) Local development
- Start dev server: `npm run dev`
- Validate key routes locally before building:
  - `/career`
  - `/hobbies`
  - `/portfolio/catlady`

## 2) Production verification
- Run: `npm run build:verify`
- This does three things:
  1. Restores source `index.html` from `src/index.template.html`
  2. Builds to `.site/` and publishes finalized artifacts to root (`index.html`, `404.html`, `static/`)
  3. Verifies root publish invariants (`index.html`, `404.html`, `/static/` references)

## 3) Deploy preparation (GitHub Pages root publish)
- Confirm GitHub Pages source is your publishing branch root (`/`).
- Commit the generated root artifacts after `build:verify` succeeds.
- Push branch and validate the live site after Pages completes deployment.

## 4) Quick troubleshooting
- If local works but deploy fails, re-run `npm run build:verify` and check script output.
- If deep links fail, confirm `404.html` matches `index.html`.
- If routes load wrong assets, ensure references are root-based (`/static/...`) and not `/raqper/...`.
