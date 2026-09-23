// Validates a resume JSON file against the schema.
// Usage: npm run validate -- data/me.json
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { validateResume } from "../src/index.ts";

const file = process.argv[2];
if (!file) {
  console.error("Usage: npm run validate -- <path/to/resume.json>");
  process.exit(2);
}

const path = resolve(process.env.INIT_CWD ?? process.cwd(), file);
let json;
try {
  json = JSON.parse(readFileSync(path, "utf-8"));
} catch (error) {
  console.error(`✗ ${file}: ${error.message}`);
  process.exit(1);
}

const result = validateResume(json);
if (result.success) {
  console.log(`✓ ${file} is a valid resume`);
} else {
  console.error(`✗ ${file} has ${result.errors.length} problem(s):`);
  for (const { path: at, message } of result.errors) console.error(`  ${at} — ${message}`);
  process.exit(1);
}
