export function findChrome(): string | null;
export class PdfError extends Error {
  code: "NO_CHROME" | "LAUNCH_FAILED" | string;
  constructor(code: string, message: string);
}
export function closeBrowser(): Promise<void>;
export function renderPdf(options: {
  baseUrl: string;
  resume?: unknown;
  theme?: string;
  font?: string;
  bg?: string;
  paper?: "a4" | "letter";
  margin?: "none" | "narrow" | "normal" | "wide";
}): Promise<Buffer>;
