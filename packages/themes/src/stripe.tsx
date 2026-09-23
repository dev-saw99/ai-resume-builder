import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * Stripe — deep navy text, blurple accent, sentence-case headings
 * with a short accent underline.
 */
export const stripe: Theme = {
  id: "stripe",
  name: "Stripe",
  className: "theme-stripe",
  tokens: {
    colors: {
      primary: "#635bff",
      text: "#0a2540",
      muted: "#425466",
      faint: "#8792a2",
      border: "#e6ebf1",
      background: "#ffffff",
    },
    font: {
      body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "25pt",
      display: "19pt",
      heading: "12pt",
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
    radius: "4px",
    lineHeight: "1.5",
    headingLetterSpacing: "0",
    headingTransform: "none",
  },
  components: defaultComponents,
};
