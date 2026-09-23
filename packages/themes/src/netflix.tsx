import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * Netflix — cinematic black on white with the signature red, condensed
 * display type (Bebas Neue) for the name and section titles.
 */
export const netflix: Theme = {
  id: "netflix",
  name: "Netflix",
  className: "theme-netflix",
  tokens: {
    colors: {
      primary: "#e50914",
      text: "#141414",
      muted: "#4d4d4d",
      faint: "#8c8c8c",
      border: "#e6e6e6",
      background: "#ffffff",
    },
    font: {
      body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Bebas Neue', 'Arial Narrow', Impact, sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "32pt",
      display: "22pt",
      heading: "14pt",
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
    radius: "2px",
    lineHeight: "1.5",
    headingLetterSpacing: "0.06em",
    headingTransform: "uppercase",
  },
  components: defaultComponents,
};
