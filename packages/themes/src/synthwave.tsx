import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";
import { SkillChips } from "./shared";

/**
 * Synthwave — deep purple night with neon magenta and cyan, a glowing
 * gradient rule under a gradient name.
 */
export const synthwave: Theme = {
  id: "synthwave",
  name: "Synthwave",
  className: "theme-synthwave",
  tokens: {
    colors: {
      primary: "#ff2bd6",
      text: "#f1e8ff",
      muted: "#c4b5e6",
      faint: "#8a76b8",
      border: "#3a1d6e",
      background: "#14082e",
    },
    font: {
      body: "'Space Grotesk', 'Inter', Arial, sans-serif",
      heading: "'Space Grotesk', 'Inter', Arial, sans-serif",
      mono: "'Space Mono', Menlo, Consolas, monospace",
    },
    fontSize: {
      displayXl: "25pt",
      display: "18pt",
      heading: "10pt",
      title: "10.5pt",
      body: "9.75pt",
      small: "9pt",
      caption: "8pt",
    },
    spacing: {
      page: "13mm",
      sectionGap: "15pt",
      itemGap: "11pt",
      large: "13pt",
      medium: "8pt",
      small: "4pt",
    },
    radius: "4px",
    lineHeight: "1.55",
    headingLetterSpacing: "0.16em",
    headingTransform: "uppercase",
  },
  components: { ...defaultComponents, Skills: SkillChips },
};
