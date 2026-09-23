import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";
import { SkillChips } from "./shared";

/**
 * Midnight — dark theme: slate background, soft off-white text and a sky-blue
 * accent. The page background is painted into the PDF.
 */
export const midnight: Theme = {
  id: "midnight",
  name: "Midnight",
  className: "theme-midnight",
  tokens: {
    colors: {
      primary: "#38bdf8",
      text: "#e2e8f0",
      muted: "#94a3b8",
      faint: "#64748b",
      border: "#1e293b",
      background: "#0b1220",
    },
    font: {
      body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "24pt",
      display: "18pt",
      heading: "9.5pt",
      title: "10.5pt",
      body: "9.75pt",
      small: "9pt",
      caption: "8pt",
    },
    spacing: {
      page: "14mm",
      sectionGap: "15pt",
      itemGap: "11pt",
      large: "13pt",
      medium: "7pt",
      small: "4pt",
    },
    radius: "4px",
    lineHeight: "1.55",
    headingLetterSpacing: "0.14em",
    headingTransform: "uppercase",
  },
  components: { ...defaultComponents, Skills: SkillChips },
};
