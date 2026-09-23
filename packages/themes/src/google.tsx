import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * Google — Material-flavored: Roboto, Google blue, gray ink, and a
 * four-color rule under the header.
 */
export const google: Theme = {
  id: "google",
  name: "Google",
  className: "theme-google",
  tokens: {
    colors: {
      primary: "#1a73e8",
      text: "#202124",
      muted: "#5f6368",
      faint: "#80868b",
      border: "#dadce0",
      background: "#ffffff",
    },
    font: {
      body: "'Roboto', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Roboto', 'Helvetica Neue', Arial, sans-serif",
      mono: "'Roboto Mono', 'JetBrains Mono', Menlo, monospace",
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
    radius: "8px",
    lineHeight: "1.5",
    headingLetterSpacing: "0",
    headingTransform: "none",
  },
  components: defaultComponents,
};
