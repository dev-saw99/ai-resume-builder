import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * Meta — Meta blue with the brand's gradient rule under the header,
 * bold friendly sans, rounded feel.
 */
export const meta: Theme = {
  id: "meta",
  name: "Meta",
  className: "theme-meta",
  tokens: {
    colors: {
      primary: "#0866ff",
      text: "#1c2b33",
      muted: "#465a69",
      faint: "#90a4b0",
      border: "#dee3e9",
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
    radius: "10px",
    lineHeight: "1.5",
    headingLetterSpacing: "0",
    headingTransform: "none",
  },
  components: defaultComponents,
};
