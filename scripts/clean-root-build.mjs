import { readdir, rm } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const STATIC_DIR = path.join(ROOT, "static");

const GENERATED_ASSET_PATTERN = /-[A-Za-z0-9_-]{6,}\.[A-Za-z0-9]+$/;

async function cleanGeneratedStaticFiles() {
  let entries = [];

  try {
    entries = await readdir(STATIC_DIR, { withFileTypes: true });
  } catch {
    return;
  }

  const removable = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => GENERATED_ASSET_PATTERN.test(name));

  await Promise.all(
    removable.map((name) => rm(path.join(STATIC_DIR, name), { force: true }))
  );

  if (removable.length > 0) {
    console.log(`Removed ${removable.length} generated files from static/.`);
  }
}

await cleanGeneratedStaticFiles();
