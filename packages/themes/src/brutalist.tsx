import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";
import { SkillChips } from "./shared";

/**
 * Brutalist — neo-brutalist: thick outlines, hard offset shadows and
 * flat pop colors on cream.
 */
export const brutalist: Theme = {
  id: "brutalist",
  name: "Brutalist",
  className: "theme-brutalist",
  previewHint: "frame",
  tokens: {
    colors: {
      primary: "#111111",
      text: "#111111",
      muted: "#3b3b3b",
      faint: "#6b6b6b",
      border: "#111111",
      background: "#fffbea",
    },
    font: {
      body: "'Space Grotesk', 'Inter', Arial, sans-serif",
      heading: "'Space Grotesk', 'Inter', Arial, sans-serif",
      mono: "'Space Mono', Menlo, Consolas, monospace",
    },
    fontSize: {
      displayXl: "26pt",
      display: "18pt",
      heading: "10.5pt",
      title: "10.5pt",
      body: "9.75pt",
      small: "9pt",
      caption: "8pt",
    },
    spacing: {
      page: "13mm",
      sectionGap: "16pt",
      itemGap: "12pt",
      large: "14pt",
      medium: "8pt",
      small: "4.5pt",
    },
    radius: "0px",
    lineHeight: "1.5",
    headingLetterSpacing: "0.04em",
    headingTransform: "uppercase",
  },
  components: { ...defaultComponents, Skills: SkillChips },
};
