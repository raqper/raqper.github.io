# Raquel Pereira – Personal website

Personal and professional website for Raquel Pereira.

**Live site:** [https://raqper.github.io/](https://raqper.github.io/)

## Structure

- **Career** ([/career](https://raqper.github.io/career)) – Professional identity: experience, content, skills, and contact.
- **Hobbies** ([/hobbies](https://raqper.github.io/hobbies)) – Personal interests and hobbies.
- **Hidden portfolio** ([/portfolio/catlady](https://raqper.github.io/portfolio/catlady)) – Portfolio page shared only via direct link; not linked from the main navigation or sitemap, and not indexed by search engines.

## Tech

- React 18, React Router 7, Vite 6, TypeScript, Tailwind CSS 4, Motion.
- Static build; deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev
```

## Build & deploy

```bash
npm run build
npm run deploy:site
```

`deploy:site` builds and pushes the `dist` output to the root of the `raqper.github.io` repository (main branch).
