import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * Parchment — warm paper, oxblood accents and Playfair headings; a
 * tinted left sidebar carries skills and education beside the story.
 */
export const parchment: Theme = {
  id: "parchment",
  name: "Parchment",
  className: "theme-parchment",
  sidebar: ["skills", "education", "certifications", "languages", "interests", "awards"],
  sidebarPosition: "left",
  tokens: {
    colors: {
      primary: "#8b3a2f",
      text: "#2b2118",
      muted: "#5f5344",
      faint: "#a39885",
      border: "#e3d7c2",
      background: "#fbf6ec",
    },
    font: {
      body: "'Crimson Pro', Georgia, 'Times New Roman', serif",
      heading: "'Playfair Display', Georgia, 'Times New Roman', serif",
      mono: "'IBM Plex Mono', Menlo, Consolas, monospace",
    },
    fontSize: {
      displayXl: "28pt",
      display: "19pt",
      heading: "10.5pt",
      title: "11.5pt",
      body: "10.5pt",
      small: "9.5pt",
      caption: "8.5pt",
    },
    spacing: {
      page: "13mm",
      sectionGap: "15pt",
      itemGap: "12pt",
      large: "13pt",
      medium: "8pt",
      small: "4pt",
    },
    radius: "2px",
    lineHeight: "1.5",
    headingLetterSpacing: "0.2em",
    headingTransform: "uppercase",
  },
  components: { ...defaultComponents },
};
