import { copyFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const sourceTemplate = path.join(ROOT, "src", "index.template.html");
const targetIndex = path.join(ROOT, "index.html");

await copyFile(sourceTemplate, targetIndex);
console.log("Prepared root index.html from src/index.template.html.");
