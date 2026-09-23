// Generates resume.schema.json (repo root) from the Zod schema — the Zod schema stays the single source of truth.
// Run: npm run schema:generate
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ResumeSchema } from "../src/index.ts";

const schema = zodToJsonSchema(ResumeSchema, { target: "jsonSchema7", $refStrategy: "none" });
const output = {
  ...schema,
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "https://github.com/dev-saw99/resume/resume.schema.json",
  title: "Resume",
  description: "Resume data for Resume Builder. Only `basics` is required; every other section is optional.",
};

const target = fileURLToPath(new URL("../../../resume.schema.json", import.meta.url));
writeFileSync(target, JSON.stringify(output, null, 2) + "\n");
console.log(`Wrote ${target}`);
