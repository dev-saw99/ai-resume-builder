export function findChrome(): string | null;
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
