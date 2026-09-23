import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * xAI — stark monochrome, heavy black rules, wide-tracked Space Grotesk
 * uppercase, monospace technical details. Brutalist and futuristic.
 */
export const xai: Theme = {
  id: "xai",
  name: "xAI",
  className: "theme-xai",
  tokens: {
    colors: {
      primary: "#000000",
      text: "#0a0a0a",
      muted: "#4a4a4a",
      faint: "#9a9a9a",
      border: "#111111",
      background: "#ffffff",
    },
    font: {
      body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Space Grotesk', 'Inter', Arial, sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "24pt",
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
    headingLetterSpacing: "0.24em",
    headingTransform: "uppercase",
  },
  components: defaultComponents,
};
