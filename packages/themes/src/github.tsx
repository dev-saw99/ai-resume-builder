import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * GitHub — Primer-style: system sans, markdown-like ruled headings,
 * blue links, monospace keyword lines.
 */
export const github: Theme = {
  id: "github",
  name: "GitHub",
  className: "theme-github",
  tokens: {
    colors: {
      primary: "#0969da",
      text: "#1f2328",
      muted: "#59636e",
      faint: "#818b98",
      border: "#d1d9e0",
      background: "#ffffff",
    },
    font: {
      body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif",
      heading: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif",
      mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
    },
    fontSize: {
      displayXl: "24pt",
      display: "18pt",
      heading: "12.5pt",
      title: "10.5pt",
      body: "10pt",
      small: "9pt",
      caption: "8pt",
    },
    spacing: {
      page: "14mm",
      sectionGap: "14pt",
      itemGap: "11pt",
      large: "12pt",
      medium: "7pt",
      small: "4pt",
    },
    radius: "6px",
    lineHeight: "1.5",
    headingLetterSpacing: "0",
    headingTransform: "none",
  },
  components: defaultComponents,
};
