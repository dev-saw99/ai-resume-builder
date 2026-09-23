import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";
import { SkillChips } from "./shared";

/**
 * Aurora — soft mesh-gradient header, gradient section pips and pastel
 * chips on a clean white page.
 */
export const aurora: Theme = {
  id: "aurora",
  name: "Aurora",
  className: "theme-aurora",
  previewHint: "mesh",
  tokens: {
    colors: {
      primary: "#6d28d9",
      text: "#1e1b2e",
      muted: "#4b4b63",
      faint: "#9a9ab0",
      border: "#e4e0f5",
      background: "#ffffff",
    },
    font: {
      body: "'Plus Jakarta Sans', 'Inter', Arial, sans-serif",
      heading: "'Plus Jakarta Sans', 'Inter', Arial, sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "26pt",
      display: "18pt",
      heading: "10pt",
      title: "10.5pt",
      body: "9.5pt",
      small: "9pt",
      caption: "8pt",
    },
    spacing: {
      page: "12mm",
      sectionGap: "15pt",
      itemGap: "11pt",
      large: "13pt",
      medium: "8pt",
      small: "4.5pt",
    },
    radius: "12px",
    lineHeight: "1.55",
    headingLetterSpacing: "0.12em",
    headingTransform: "uppercase",
  },
  components: { ...defaultComponents, Skills: SkillChips },
};
