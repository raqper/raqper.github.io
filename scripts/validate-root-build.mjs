import { access, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const indexPath = path.join(ROOT, "index.html");
const notFoundPath = path.join(ROOT, "404.html");

const failures = [];

async function mustExist(filePath, label) {
  try {
    await access(filePath);
  } catch {
    failures.push(`${label} is missing (${path.basename(filePath)}).`);
  }
}

async function validateHtmlOutputs() {
  await mustExist(indexPath, "Root entry file");
  await mustExist(notFoundPath, "SPA fallback file");

  if (failures.length > 0) {
    return;
  }

  const [indexHtml, notFoundHtml] = await Promise.all([
    readFile(indexPath, "utf8"),
    readFile(notFoundPath, "utf8"),
  ]);

  if (indexHtml !== notFoundHtml) {
    failures.push("index.html and 404.html differ; SPA fallback can break deep links.");
  }

  if (!indexHtml.includes('src="/static/index-')) {
    failures.push("index.html does not reference /static/index-*.js as expected for root publish.");
  }

  if (!indexHtml.includes('href="/static/index-')) {
    failures.push("index.html does not reference /static/index-*.css as expected for root publish.");
  }

  if (indexHtml.includes('/raqper/')) {
    failures.push("index.html still references /raqper/ paths; expected root (/) paths.");
  }

  await validateRoutePages(indexHtml);
}

/** Route pages (e.g. /workshop) must boot the same bundle and carry their own preview meta. */
async function validateRoutePages(indexHtml) {
  const routes = [{ dir: "workshop", titleIncludes: "AI for designers", image: "og/workshop.png" }];
  const bundle = indexHtml.match(/src="(\/static\/index-[^"]+\.js)"/)?.[1];

  for (const route of routes) {
    const routeIndex = path.join(ROOT, route.dir, "index.html");
    await mustExist(routeIndex, `/${route.dir} entry file`);
    await mustExist(path.join(ROOT, route.image), `/${route.dir} preview image`);
    let html = "";
    try {
      html = await readFile(routeIndex, "utf8");
    } catch {
      continue;
    }
    if (bundle && !html.includes(bundle)) {
      failures.push(`${route.dir}/index.html does not load the current bundle (${bundle}).`);
    }
    if (!html.includes(route.titleIncludes)) {
      failures.push(`${route.dir}/index.html is missing its route-specific title.`);
    }
    if (!html.includes(`property="og:image"`)) {
      failures.push(`${route.dir}/index.html is missing og:image.`);
    }
  }
}

await validateHtmlOutputs();

if (failures.length > 0) {
  console.error("\nRoot build validation failed:\n");
  failures.forEach((item, idx) => {
    console.error(`${idx + 1}. ${item}`);
  });
  console.error("");
  process.exit(1);
}

console.log("Root build validation passed.");
