import type { MarginPreset, PaperSize } from "@resume/pdf";
import type { Resume } from "@resume/schema";

export interface PdfRequest {
  resume: Resume;
  theme: string;
  font: string | null;
  bg: string | null;
  paper: PaperSize;
  margin: MarginPreset;
  filename: string;
}

export type PdfResult = { ok: true } | { ok: false; reason: string };

/**
 * Ask the dev/preview server to render the PDF with its own headless Chrome.
 * When the server can't (static hosting, no Chrome installed, ...) the result
 * says why, so the caller can explain it and fall back to the browser's print dialog.
 */
export async function downloadServerPdf(request: PdfRequest): Promise<PdfResult> {
  try {
    const { filename, ...payload } = request;
    const response = await fetch("/api/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok || response.headers.get("Content-Type") !== "application/pdf") {
      const body = await response.json().catch(() => null);
      if (body?.error) return { ok: false, reason: body.error };
      return {
        ok: false,
        reason: "This page isn't served by the project's dev/preview server, so the PDF renderer isn't available.",
      };
    }

    const url = URL.createObjectURL(await response.blob());
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: `Could not reach the PDF renderer (${(error as Error).message}).` };
  }
}
