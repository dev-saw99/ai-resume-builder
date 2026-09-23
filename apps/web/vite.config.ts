import { writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "../..");
/**
 * The resume the app loads and Save writes to. Defaults to the bundled example;
 * override with RESUME_FILE=data/me.json (relative to the repo root, or absolute).
 */
const resumeJsonPath = resolve(repoRoot, process.env.RESUME_FILE ?? "examples/sonu.json");

/** Dev-only endpoint so the editor's Save button can write straight to the resume file. */
function saveResumePlugin(): Plugin {
  return {
    name: "save-resume-json",
    configureServer(server) {
      server.middlewares.use("/api/save-resume", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end("Method not allowed");
          return;
        }
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const body = Buffer.concat(chunks).toString("utf-8");
          JSON.parse(body);
          await writeFile(resumeJsonPath, body, "utf-8");
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: true }));
        } catch (error) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: false, error: (error as Error).message }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), saveResumePlugin()],
  resolve: {
    alias: { "@resume-data": resumeJsonPath },
  },
  define: {
    __RESUME_FILE__: JSON.stringify(relative(repoRoot, resumeJsonPath)),
  },
  server: {
    // Allow importing a resume that lives outside apps/web (e.g. data/me.json).
    fs: { allow: [repoRoot] },
  },
});
