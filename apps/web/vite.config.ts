import type { IncomingMessage, ServerResponse } from "node:http";
import { writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";
import { closeBrowser, PdfError, renderPdf } from "../../packages/pdf/src/render.mjs";

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

/**
 * POST /api/pdf — renders the current resume with our own headless Chrome (see
 * packages/pdf/src/render.mjs) so the PDF doesn't depend on the browser's print dialog.
 * The client falls back to the browser print dialog if this endpoint is unavailable.
 */
function pdfPlugin(): Plugin {
  type Middlewares = { use: (path: string, handler: (req: IncomingMessage, res: ServerResponse) => void) => void };
  const install = (middlewares: Middlewares) => {
    middlewares.use("/api/pdf", async (req, res) => {
      const fail = (status: number, message: string, code?: string) => {
        res.statusCode = status;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ ok: false, error: message, code }));
      };
      if (req.method !== "POST") return fail(405, "Method not allowed");
      try {
        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);
        const body = JSON.parse(Buffer.concat(chunks).toString("utf-8"));
        const pdf = await renderPdf({
          baseUrl: `http://${req.headers.host}/`,
          resume: body.resume,
          theme: body.theme,
          font: body.font,
          bg: body.bg ?? undefined,
          paper: body.paper === "letter" ? "letter" : "a4",
          margin: ["none", "narrow", "normal", "wide"].includes(body.margin) ? body.margin : "normal",
        });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Length", String(pdf.length));
        res.end(pdf);
      } catch (error) {
        const code = error instanceof PdfError ? error.code : "RENDER_FAILED";
        fail(500, (error as Error).message, code);
      }
    });
  };
  return {
    name: "resume-pdf",
    configureServer(server) {
      install(server.middlewares);
      server.httpServer?.once("close", () => void closeBrowser());
    },
    configurePreviewServer(server) {
      install(server.middlewares);
      server.httpServer?.once("close", () => void closeBrowser());
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), saveResumePlugin(), pdfPlugin()],
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
