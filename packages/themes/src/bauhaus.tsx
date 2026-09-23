import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";
import { SkillChips } from "./shared";

/**
 * Bauhaus — primary-color geometry (circle, square, triangle), heavy black
 * rules and Space Grotesk on warm paper.
 */
export const bauhaus: Theme = {
  id: "bauhaus",
  name: "Bauhaus",
  className: "theme-bauhaus",
  previewHint: "shapes",
  tokens: {
    colors: {
      primary: "#d62828",
      text: "#111111",
      muted: "#3f3f46",
      faint: "#71717a",
      border: "#111111",
      background: "#f7f3ea",
    },
    font: {
      body: "'Space Grotesk', 'Inter', Arial, sans-serif",
      heading: "'Space Grotesk', 'Inter', Arial, sans-serif",
      mono: "'Space Mono', Menlo, Consolas, monospace",
    },
    fontSize: {
      displayXl: "30pt",
      display: "20pt",
      heading: "11pt",
      title: "11pt",
      body: "9.75pt",
      small: "9pt",
      caption: "8pt",
    },
    spacing: {
      page: "14mm",
      sectionGap: "16pt",
      itemGap: "12pt",
      large: "14pt",
      medium: "8pt",
      small: "4pt",
    },
    radius: "0px",
    lineHeight: "1.5",
    headingLetterSpacing: "0.08em",
    headingTransform: "uppercase",
  },
  components: { ...defaultComponents, Skills: SkillChips },
};
