import type { RefObject } from "react";
import { useReactToPrint } from "react-to-print";

export type PaperSize = "a4" | "letter";

export const PAPER_DIMENSIONS: Record<
  PaperSize,
  { width: string; height: string; widthPx: number; css: string }
> = {
  a4: { width: "210mm", height: "297mm", widthPx: (210 * 96) / 25.4, css: "A4" },
  letter: { width: "8.5in", height: "11in", widthPx: 8.5 * 96, css: "letter" },
};

/** Page margin presets, in millimeters. */
export const MARGIN_PRESETS = {
  none: 0,
  narrow: 8,
  normal: 12,
  wide: 16,
} as const;

export type MarginPreset = keyof typeof MARGIN_PRESETS;

export interface UseResumePdfOptions {
  /** Ref to the resume DOM node to print. */
  contentRef: RefObject<HTMLElement | null>;
  documentTitle?: string;
  paperSize?: PaperSize;
  /** Safety net painted behind the page frame (margins carry the page color). */
  backgroundColor?: string;
}

/**
 * Print-first PDF export via react-to-print. The browser's print engine
 * produces vector text — selectable, searchable, ATS-friendly.
 *
 * Pages print with zero @page margin: browsers never paint backgrounds into
 * the @page margin area, so margins are rendered inside the printable area
 * (repeating thead/tfoot spacers + side padding) and inherit the page color.
 */
export function useResumePdf({
  contentRef,
  documentTitle = "resume",
  paperSize = "a4",
  backgroundColor,
}: UseResumePdfOptions) {
  return useReactToPrint({
    contentRef,
    documentTitle,
    pageStyle: `
      @page {
        size: ${PAPER_DIMENSIONS[paperSize].css};
        margin: 0;
      }
      html, body {
        ${backgroundColor ? `background: ${backgroundColor};` : ""}
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    `,
  });
}
