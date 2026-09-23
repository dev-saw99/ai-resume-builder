import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * Notion — warm neutral ink, bold sentence-case headings, soft dividers
 * and a calm blue for links and dates.
 */
export const notion: Theme = {
  id: "notion",
  name: "Notion",
  className: "theme-notion",
  tokens: {
    colors: {
      primary: "#2383e2",
      text: "#37352f",
      muted: "#787774",
      faint: "#9b9a97",
      border: "#e9e9e7",
      background: "#ffffff",
    },
    font: {
      body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      mono: "'IBM Plex Mono', Menlo, Consolas, monospace",
    },
    fontSize: {
      displayXl: "25pt",
      display: "18pt",
      heading: "12pt",
      title: "10.5pt",
      body: "10pt",
      small: "9pt",
      caption: "8pt",
    },
    spacing: {
      page: "15mm",
      sectionGap: "15pt",
      itemGap: "11pt",
      large: "13pt",
      medium: "7pt",
      small: "4pt",
    },
    radius: "3px",
    lineHeight: "1.55",
    headingLetterSpacing: "0",
    headingTransform: "none",
  },
  components: defaultComponents,
};
