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

/**
 * Ask the dev/preview server to render the PDF with its own headless Chrome.
 * Returns false when the server can't (static hosting, no Chrome installed, ...)
 * so the caller can fall back to the browser's print dialog.
 */
export async function downloadServerPdf(request: PdfRequest): Promise<boolean> {
  try {
    const { filename, ...payload } = request;
    const response = await fetch("/api/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok || response.headers.get("Content-Type") !== "application/pdf") return false;

    const url = URL.createObjectURL(await response.blob());
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
    return true;
  } catch {
    return false;
  }
}
