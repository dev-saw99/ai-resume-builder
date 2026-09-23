import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * Minimal — monochrome, generous whitespace, no borders, serif-free.
 */
export const minimal: Theme = {
  id: "minimal",
  name: "Minimal",
  className: "theme-minimal",
  tokens: {
    colors: {
      primary: "#111111",
      text: "#111111",
      muted: "#555555",
      faint: "#999999",
      border: "transparent",
      background: "#ffffff",
    },
    font: {
      body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      mono: "'SF Mono', Menlo, Consolas, monospace",
    },
    fontSize: {
      displayXl: "24pt",
      display: "18pt",
      heading: "9.5pt",
      title: "10.5pt",
      body: "10pt",
      small: "9pt",
      caption: "8pt",
    },
    spacing: {
      page: "16mm",
      sectionGap: "16pt",
      itemGap: "12pt",
      large: "14pt",
      medium: "8pt",
      small: "4pt",
    },
    radius: "0px",
    lineHeight: "1.5",
    headingLetterSpacing: "0.14em",
    headingTransform: "uppercase",
  },
  components: defaultComponents,
};
