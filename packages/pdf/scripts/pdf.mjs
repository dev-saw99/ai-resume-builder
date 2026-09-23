// Render a resume JSON file to PDF without touching a browser UI.
// Usage: npm run pdf -- data/me.json [--theme slate] [--font inter] [--bg ffffff]
//                                    [--paper a4|letter] [--margin none|narrow|normal|wide] [--out me.pdf]
import { readFileSync, writeFileSync } from "node:fs";
import { createServer as createNetServer } from "node:net";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { validateResume } from "../../schema/src/index.ts";
import { closeBrowser, renderPdf } from "../src/render.mjs";

const args = process.argv.slice(2);
const flags = {};
const positional = [];
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith("--")) flags[args[i].slice(2)] = args[++i];
  else positional.push(args[i]);
}

const file = positional[0];
if (!file) {
  console.error("Usage: npm run pdf -- <resume.json> [--theme id] [--font id] [--bg hex] [--paper a4|letter] [--margin none|narrow|normal|wide] [--out file.pdf]");
  process.exit(2);
}

const cwd = process.env.INIT_CWD ?? process.cwd();
const input = resolve(cwd, file);
let resume;
try {
  resume = JSON.parse(readFileSync(input, "utf-8"));
} catch (error) {
  console.error(`✗ ${file}: ${error.message}`);
  process.exit(1);
}
const check = validateResume(resume);
if (!check.success) {
  console.error(`✗ ${file} is not a valid resume:`);
  for (const { path, message } of check.errors) console.error(`  ${path} — ${message}`);
  process.exit(1);
}

const output = flags.out
  ? resolve(cwd, flags.out)
  : join(dirname(input), basename(input).replace(/\.json$/i, "") + ".pdf");

const freePort = () =>
  new Promise((done, fail) => {
    const probe = createNetServer();
    probe.once("error", fail);
    probe.listen(0, "127.0.0.1", () => {
      const { port } = probe.address();
      probe.close(() => done(port));
    });
  });

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../../apps/web");
const server = await createServer({
  root: appRoot,
  logLevel: "silent",
  server: { host: "127.0.0.1", port: await freePort(), strictPort: true },
});
try {
  await server.listen();
  const baseUrl = server.resolvedUrls.local[0];
  const pdf = await renderPdf({
    baseUrl,
    resume,
    theme: flags.theme,
    font: flags.font,
    bg: flags.bg,
    paper: flags.paper === "letter" ? "letter" : "a4",
    margin: ["none", "narrow", "normal", "wide"].includes(flags.margin) ? flags.margin : "normal",
  });
  writeFileSync(output, pdf);
  console.log(`✓ wrote ${output} (${Math.round(pdf.length / 1024)} KB)`);
} catch (error) {
  console.error(`✗ ${error.message}`);
  process.exitCode = 1;
} finally {
  await closeBrowser();
  await server.close();
}
