import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";
import { SkillChips } from "./shared";

/**
 * Timeline — experience and education hang off a vertical rail with dot
 * markers; skills are chips. Rose accent.
 */
export const timeline: Theme = {
  id: "timeline",
  name: "Timeline",
  className: "theme-timeline",
  previewHint: "timeline",
  tokens: {
    colors: {
      primary: "#e11d48",
      text: "#1f2937",
      muted: "#4b5563",
      faint: "#9ca3af",
      border: "#fecdd3",
      background: "#ffffff",
    },
    font: {
      body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
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
      itemGap: "12pt",
      large: "13pt",
      medium: "8pt",
      small: "4pt",
    },
    radius: "4px",
    lineHeight: "1.55",
    headingLetterSpacing: "0.14em",
    headingTransform: "uppercase",
  },
  components: { ...defaultComponents, Skills: SkillChips },
};
