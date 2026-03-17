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
