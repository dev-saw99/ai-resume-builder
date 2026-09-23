import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * Apple — airy and quiet: light-weight display name, sentence-case headings,
 * hairline dividers and the signature blue accent.
 */
export const apple: Theme = {
  id: "apple",
  name: "Apple",
  className: "theme-apple",
  tokens: {
    colors: {
      primary: "#0071e3",
      text: "#1d1d1f",
      muted: "#6e6e73",
      faint: "#86868b",
      border: "#d2d2d7",
      background: "#ffffff",
    },
    font: {
      body: "-apple-system, BlinkMacSystemFont, 'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "-apple-system, BlinkMacSystemFont, 'Inter', 'Helvetica Neue', Arial, sans-serif",
      mono: "'SF Mono', Menlo, Consolas, monospace",
    },
    fontSize: {
      displayXl: "26pt",
      display: "19pt",
      heading: "11.5pt",
      title: "10.5pt",
      body: "9.75pt",
      small: "9pt",
      caption: "8pt",
    },
    spacing: {
      page: "15mm",
      sectionGap: "17pt",
      itemGap: "12pt",
      large: "14pt",
      medium: "8pt",
      small: "4pt",
    },
    radius: "8px",
    lineHeight: "1.55",
    headingLetterSpacing: "-0.01em",
    headingTransform: "none",
  },
  components: defaultComponents,
};
