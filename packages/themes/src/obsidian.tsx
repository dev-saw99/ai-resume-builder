import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * Obsidian — near-black with a gold accent: centered Playfair letterhead,
 * gold hairlines and diamond bullets. Formal and dramatic.
 */
export const obsidian: Theme = {
  id: "obsidian",
  name: "Obsidian",
  className: "theme-obsidian",
  tokens: {
    colors: {
      primary: "#d4af37",
      text: "#ece7dc",
      muted: "#a8a398",
      faint: "#6f6b62",
      border: "#2e2a22",
      background: "#0b0b0c",
    },
    font: {
      body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Playfair Display', Georgia, 'Times New Roman', serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "27pt",
      display: "19pt",
      heading: "10pt",
      title: "11pt",
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
    radius: "0px",
    lineHeight: "1.6",
    headingLetterSpacing: "0.24em",
    headingTransform: "uppercase",
  },
  components: { ...defaultComponents },
};
