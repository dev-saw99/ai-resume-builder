import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * Academic — a classic CV: centered serif letterhead, small-caps headings,
 * black on white, dense and printer-friendly.
 */
export const academic: Theme = {
  id: "academic",
  name: "Academic",
  className: "theme-academic",
  tokens: {
    colors: {
      primary: "#000000",
      text: "#111111",
      muted: "#3a3a3a",
      faint: "#7a7a7a",
      border: "#000000",
      background: "#ffffff",
    },
    font: {
      body: "'Source Serif 4', Georgia, 'Times New Roman', serif",
      heading: "'Source Serif 4', Georgia, 'Times New Roman', serif",
      mono: "'IBM Plex Mono', Menlo, Consolas, monospace",
    },
    fontSize: {
      displayXl: "22pt",
      display: "17pt",
      heading: "11pt",
      title: "10.5pt",
      body: "10.25pt",
      small: "9.5pt",
      caption: "8.5pt",
    },
    spacing: {
      page: "16mm",
      sectionGap: "13pt",
      itemGap: "9pt",
      large: "11pt",
      medium: "6pt",
      small: "3pt",
    },
    radius: "0px",
    lineHeight: "1.4",
    headingLetterSpacing: "0.12em",
    headingTransform: "uppercase",
  },
  components: defaultComponents,
};
