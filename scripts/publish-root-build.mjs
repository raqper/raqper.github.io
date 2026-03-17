import { copyFile, cp, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SITE_DIR = path.join(ROOT, ".site");
const siteIndex = path.join(SITE_DIR, "index.html");
const siteStatic = path.join(SITE_DIR, "static");

const rootIndex = path.join(ROOT, "index.html");
const root404 = path.join(ROOT, "404.html");
const rootStatic = path.join(ROOT, "static");

await cp(siteStatic, rootStatic, { recursive: true, force: true });

const builtIndexHtml = await readFile(siteIndex, "utf8");
await writeFile(rootIndex, builtIndexHtml, "utf8");
await copyFile(rootIndex, root404);

console.log("Published .site build artifacts to root output.");
