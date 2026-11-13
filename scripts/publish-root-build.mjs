import { copyFile, cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SITE_DIR = path.join(ROOT, ".site");
const siteIndex = path.join(SITE_DIR, "index.html");
const siteStatic = path.join(SITE_DIR, "static");

const rootIndex = path.join(ROOT, "index.html");
const root404 = path.join(ROOT, "404.html");
const rootStatic = path.join(ROOT, "static");

const SITE_URL = "https://raqper.github.io";

/**
 * Routes that get their own index.html with route-specific meta tags, so link
 * previews (LinkedIn, WhatsApp, Slack) show the right title and image without
 * running JavaScript. The SPA still boots from the same /static bundle.
 */
const WORKSHOP_IMAGE = { source: path.join(ROOT, "src", "og", "workshop.png"), publishedPath: "og/workshop.png" };

/** Certificates of participation (src/app/data/certificates.json): one static page each, kept out of search. */
const certificates = JSON.parse(await readFile(path.join(ROOT, "src", "app", "data", "certificates.json"), "utf8"));

const ROUTE_PAGES = [
  {
    route: "workshop",
    title: "AI for designers: from prompt to product · Workshop by Raquel Pereira",
    description:
      "A live online workshop for junior and mid-level designers. In three live sessions you take one design system from Figma tokens to a GitHub repository, then build a real screen on top of it with Claude.",
    image: WORKSHOP_IMAGE,
  },
  ...certificates.map((cert) => ({
    route: `workshop/certificate/${cert.id}`,
    title: `${cert.name} · Certificate of participation`,
    description: `${cert.name} took part in "${cert.course}", a ${cert.hours}-hour live online workshop by Raquel Pereira (${cert.cohort}).`,
    image: WORKSHOP_IMAGE,
    noindex: true,
  })),
];

const escapeAttr = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Replace the content of a <meta attr="key" content="..."> tag, or insert it before </head>. */
function setMeta(html, attr, key, value) {
  const pattern = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`);
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(value)}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `  ${tag}\n  </head>`);
}

function buildRouteHtml(baseHtml, page) {
  const url = `${SITE_URL}/${page.route}`;
  const imageUrl = `${SITE_URL}/${page.image.publishedPath}`;
  let html = baseHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(page.title)}</title>`);
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`);
  html = setMeta(html, "name", "description", page.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:title", page.title);
  html = setMeta(html, "property", "og:description", page.description);
  html = setMeta(html, "property", "og:image", imageUrl);
  html = setMeta(html, "property", "og:image:width", "1200");
  html = setMeta(html, "property", "og:image:height", "630");
  html = setMeta(html, "name", "twitter:title", page.title);
  html = setMeta(html, "name", "twitter:description", page.description);
  html = setMeta(html, "name", "twitter:image", imageUrl);
  if (page.noindex) html = setMeta(html, "name", "robots", "noindex");
  return html;
}

await cp(siteStatic, rootStatic, { recursive: true, force: true });

const builtIndexHtml = await readFile(siteIndex, "utf8");
await writeFile(rootIndex, builtIndexHtml, "utf8");
await copyFile(rootIndex, root404);

for (const page of ROUTE_PAGES) {
  const routeDir = path.join(ROOT, page.route);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), buildRouteHtml(builtIndexHtml, page), "utf8");

  const imageTarget = path.join(ROOT, page.image.publishedPath);
  await mkdir(path.dirname(imageTarget), { recursive: true });
  await copyFile(page.image.source, imageTarget);
}

console.log(`Published .site build artifacts to root output (+ ${ROUTE_PAGES.length} route pages).`);
