// Server-side PDF renderer: drives a headless Chrome we control instead of the
// user's print dialog. Same layout engine as the preview, but with fixed paper
// size, zero @page margin, no headers/footers, tagged PDF + bookmarks, and the
// page background printed — so the output never depends on print-dialog settings.
import { existsSync } from "node:fs";
import { delimiter, join } from "node:path";
import puppeteer from "puppeteer-core";

const CHROME_NAMES = [
  "google-chrome-stable",
  "google-chrome",
  "chromium",
  "chromium-browser",
  "chrome",
  "brave-browser",
  "microsoft-edge",
];

const MAC_CHROME = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
];

/** Locate a Chrome/Chromium binary: $CHROME_PATH, then PATH, then macOS app bundles. */
export function findChrome() {
  const fromEnv = process.env.CHROME_PATH || process.env.PUPPETEER_EXECUTABLE_PATH;
  if (fromEnv && existsSync(fromEnv)) return fromEnv;
  for (const dir of (process.env.PATH ?? "").split(delimiter)) {
    for (const name of CHROME_NAMES) {
      const candidate = join(dir, name);
      if (existsSync(candidate)) return candidate;
    }
  }
  return MAC_CHROME.find((path) => existsSync(path)) ?? null;
}

let browserPromise = null;

async function getBrowser() {
  if (!browserPromise) {
    const executablePath = findChrome();
    if (!executablePath) {
      throw new Error("No Chrome/Chromium found. Install one or set CHROME_PATH=/path/to/chrome.");
    }
    browserPromise = puppeteer
      .launch({ executablePath, headless: true, args: ["--no-sandbox", "--disable-gpu"] })
      .catch((error) => {
        browserPromise = null;
        throw error;
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
    // Web fonts come from Google Fonts; don't hang forever if we're offline.
    await page.goto(url.toString(), { waitUntil: "networkidle0", timeout: 30000 }).catch(() => {});
    await page.waitForSelector(".resume-page .rb-resume", { timeout: 15000 });
    await page.evaluate(() => document.fonts.ready);

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
