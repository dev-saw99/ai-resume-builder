import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * Atlas — two-column layout: experience and projects in the main column,
 * skills / education / certifications in a narrow sidebar. Teal accent.
 */
export const atlas: Theme = {
  id: "atlas",
  name: "Atlas",
  className: "theme-atlas",
  sidebar: ["skills", "education", "certifications", "achievements", "languages", "interests"],
  tokens: {
    colors: {
      primary: "#0f766e",
      text: "#1e293b",
      muted: "#475569",
      faint: "#94a3b8",
      border: "#e2e8f0",
      background: "#ffffff",
    },
    font: {
      body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "24pt",
      display: "18pt",
      heading: "10pt",
      title: "10.5pt",
      body: "9.5pt",
      small: "8.75pt",
      caption: "8pt",
    },
    spacing: {
      page: "13mm",
      sectionGap: "14pt",
      itemGap: "11pt",
      large: "12pt",
      medium: "7pt",
      small: "4pt",
    },
    radius: "4px",
    lineHeight: "1.5",
    headingLetterSpacing: "0.1em",
    headingTransform: "uppercase",
  },
  components: defaultComponents,
};
