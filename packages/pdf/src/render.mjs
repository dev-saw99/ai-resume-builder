// Server-side PDF renderer: drives a headless Chrome we control instead of the
// user's print dialog. Same layout engine as the preview, but with fixed paper
// size, zero @page margin, no headers/footers, tagged PDF + bookmarks, and the
// page background printed — so the output never depends on print-dialog settings.
import { existsSync } from "node:fs";
import { delimiter, join } from "node:path";
import puppeteer from "puppeteer-core";

// Any Chromium-based browser works (the renderer only needs the Chromium print engine).
// Order = preference: Chrome, then Chromium, then Brave, then Edge.
const CHROME_NAMES = [
  "google-chrome-stable",
  "google-chrome",
  "chromium",
  "chromium-browser",
  "chrome",
  "brave-browser",
  "brave-browser-stable",
  "brave",
  "microsoft-edge",
  "microsoft-edge-stable",
];

/** Well-known install locations that are usually NOT on PATH (macOS, Windows, Linux). */
function knownLocations() {
  const win = [process.env.PROGRAMFILES, process.env["PROGRAMFILES(X86)"], process.env.LOCALAPPDATA]
    .filter(Boolean)
    .flatMap((base) => [
      join(base, "Google", "Chrome", "Application", "chrome.exe"),
      join(base, "Chromium", "Application", "chrome.exe"),
      join(base, "Microsoft", "Edge", "Application", "msedge.exe"),
      join(base, "BraveSoftware", "Brave-Browser", "Application", "brave.exe"),
    ]);
  return [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    "/opt/google/chrome/chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/snap/bin/chromium",
    // Brave (deb/rpm install, Arch package, snap)
    "/opt/brave.com/brave/brave-browser",
    "/opt/brave.com/brave/brave",
    "/usr/bin/brave-browser",
    "/usr/bin/brave",
    "/snap/bin/brave",
    ...win,
  ];
}

/** Locate a Chromium-based browser (Chrome, Chromium, Brave, Edge): $CHROME_PATH, then PATH, then well-known install locations. */
export function findChrome() {
  const fromEnv = process.env.CHROME_PATH || process.env.PUPPETEER_EXECUTABLE_PATH;
  if (fromEnv && existsSync(fromEnv)) return fromEnv;
  for (const dir of (process.env.PATH ?? "").split(delimiter)) {
    for (const name of CHROME_NAMES) {
      for (const candidate of [join(dir, name), join(dir, `${name}.exe`)]) {
        if (existsSync(candidate)) return candidate;
      }
    }
  }
  return knownLocations().find((path) => existsSync(path)) ?? null;
}

/** Error with a machine-readable `code` so the UI can explain what to do. */
export class PdfError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "PdfError";
    this.code = code;
  }
}

let browserPromise = null;

async function getBrowser() {
  if (!browserPromise) {
    const executablePath = findChrome();
    if (!executablePath) {
      throw new PdfError(
        "NO_CHROME",
        "No Chrome, Chromium, Brave or Edge found. Install one, or set CHROME_PATH to its executable.",
      );
    }
    browserPromise = puppeteer
      .launch({ executablePath, headless: true, args: ["--no-sandbox", "--disable-gpu"] })
      .catch((error) => {
        browserPromise = null;
        throw new PdfError("LAUNCH_FAILED", `Could not start ${executablePath}: ${error.message}`);
      });
  }
  return browserPromise;
}

/** Close the shared browser (call on server shutdown / after a CLI run). */
export async function closeBrowser() {
  if (!browserPromise) return;
  const pending = browserPromise;
  browserPromise = null;
  try {
    await (await pending).close();
  } catch {
    // already gone
  }
}

const PAPERS = { a4: "A4", letter: "Letter" };

/**
 * Render the app at `baseUrl` to a PDF buffer.
 * @param {object} options
 * @param {string} options.baseUrl  URL of a running app (dev or preview server)
 * @param {unknown} [options.resume]  resume data to render; omit to use the app's own file
 * @param {string} [options.theme]
 * @param {string} [options.font]
 * @param {string} [options.bg]  page background override, hex
 * @param {"a4"|"letter"} [options.paper]
 * @param {"none"|"narrow"|"normal"|"wide"} [options.margin]
 */
export async function renderPdf({ baseUrl, resume, theme, font, bg, paper = "a4", margin = "normal" }) {
  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    if (resume !== undefined) {
      await page.evaluateOnNewDocument((data) => {
        window.__RESUME_OVERRIDE__ = data;
      }, resume);
    }

    const url = new URL(baseUrl);
    if (theme) url.searchParams.set("theme", theme);
    if (font) url.searchParams.set("font", font);
    if (bg) url.searchParams.set("bg", bg.replace(/^#/, ""));
    url.searchParams.set("print", "1");
    url.searchParams.set("paper", paper);
    url.searchParams.set("margin", margin);

    // A4 at 96 dpi; the print view lays out to the paper width regardless.
    await page.setViewport({ width: paper === "letter" ? 816 : 794, height: 1123 });
    await page.emulateMediaType("print");
    await page.goto(url.toString(), { waitUntil: "load", timeout: 30000 });
    await page.waitForSelector(".resume-page .rb-resume", { timeout: 15000 });
    // Web fonts come from Google Fonts: wait for them, but never hang when offline.
    await page.evaluate(
      () => Promise.race([document.fonts.ready, new Promise((done) => setTimeout(done, 8000))]),
    );

    const pdf = await page.pdf({
      format: PAPERS[paper] ?? "A4",
      printBackground: true,
      displayHeaderFooter: false,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      tagged: true,
      outline: true,
    });
    return Buffer.from(pdf);
  } finally {
    await page.close().catch(() => {});
  }
}
