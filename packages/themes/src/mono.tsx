import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * Mono — Vercel-inspired: strict black & white, tight tracking,
 * monospace section headings and dates.
 */
export const mono: Theme = {
  id: "mono",
  name: "Mono",
  className: "theme-mono",
  tokens: {
    colors: {
      primary: "#000000",
      text: "#111111",
      muted: "#525252",
      faint: "#8f8f8f",
      border: "#e5e5e5",
      background: "#ffffff",
    },
    font: {
      body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "23pt",
      display: "18pt",
      heading: "9.5pt",
      title: "10.5pt",
      body: "9.75pt",
      small: "9pt",
      caption: "8pt",
    },
    spacing: {
      page: "14mm",
      sectionGap: "15pt",
      itemGap: "11pt",
      large: "12pt",
      medium: "7pt",
      small: "4pt",
    },
    radius: "0px",
    lineHeight: "1.5",
    headingLetterSpacing: "0.12em",
    headingTransform: "uppercase",
  },
  components: defaultComponents,
};
