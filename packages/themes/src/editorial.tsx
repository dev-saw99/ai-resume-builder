import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * Editorial — magazine feel: large serif name, italic headline, sans body
 * and a terracotta accent.
 */
export const editorial: Theme = {
  id: "editorial",
  name: "Editorial",
  className: "theme-editorial",
  tokens: {
    colors: {
      primary: "#c2410c",
      text: "#292524",
      muted: "#57534e",
      faint: "#a8a29e",
      border: "#e7e5e4",
      background: "#fffdfa",
    },
    font: {
      body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Lora', Georgia, 'Times New Roman', serif",
      mono: "'IBM Plex Mono', Menlo, Consolas, monospace",
    },
    fontSize: {
      displayXl: "29pt",
      display: "20pt",
      heading: "11pt",
      title: "11pt",
      body: "9.75pt",
      small: "9pt",
      caption: "8pt",
    },
    spacing: {
      page: "15mm",
      sectionGap: "16pt",
      itemGap: "12pt",
      large: "14pt",
      medium: "8pt",
      small: "4pt",
    },
    radius: "2px",
    lineHeight: "1.55",
    headingLetterSpacing: "0.02em",
    headingTransform: "none",
  },
  components: defaultComponents,
};
