import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * Linear — cool graphite palette, tight tracking, understated purple accent.
 */
export const linear: Theme = {
  id: "linear",
  name: "Linear",
  className: "theme-linear",
  tokens: {
    colors: {
      primary: "#5e6ad2",
      text: "#1c1d21",
      muted: "#5c5e66",
      faint: "#9a9ca5",
      border: "#e4e5e8",
      background: "#ffffff",
    },
    font: {
      body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "26pt",
      display: "20pt",
      heading: "10pt",
      title: "11pt",
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
    radius: "4px",
    lineHeight: "1.45",
    headingLetterSpacing: "0.08em",
    headingTransform: "uppercase",
  },
  components: defaultComponents,
};
