import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * Ivory — Notion-inspired: warm ink on white, serif display headings
 * over a quiet sans body.
 */
export const ivory: Theme = {
  id: "ivory",
  name: "Ivory",
  className: "theme-ivory",
  tokens: {
    colors: {
      primary: "#37352f",
      text: "#37352f",
      muted: "#6f6e69",
      faint: "#a3a29d",
      border: "#e9e7e4",
      background: "#ffffff",
    },
    font: {
      body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Lora', Georgia, 'Times New Roman', serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "26pt",
      display: "19pt",
      heading: "13pt",
      title: "10.5pt",
      body: "9.75pt",
      small: "9pt",
      caption: "8pt",
    },
    spacing: {
      page: "15mm",
      sectionGap: "16pt",
      itemGap: "12pt",
      large: "13pt",
      medium: "8pt",
      small: "4.5pt",
    },
    radius: "3px",
    lineHeight: "1.55",
    headingLetterSpacing: "0",
    headingTransform: "none",
  },
  components: defaultComponents,
};
