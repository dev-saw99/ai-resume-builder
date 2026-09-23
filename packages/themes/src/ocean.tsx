import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";
import { SkillChips } from "./shared";

/**
 * Ocean — two-column layout with a tinted sidebar panel (skills, education,
 * certifications) beside the main experience column. Deep blue accent.
 */
export const ocean: Theme = {
  id: "ocean",
  name: "Ocean",
  className: "theme-ocean",
  sidebar: ["skills", "education", "certifications", "achievements", "languages", "interests"],
  tokens: {
    colors: {
      primary: "#0369a1",
      text: "#0f172a",
      muted: "#475569",
      faint: "#94a3b8",
      border: "#bae6fd",
      background: "#ffffff",
    },
    font: {
      body: "'Lato', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Lato', 'Helvetica Neue', Arial, sans-serif",
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
      sectionGap: "14pt",
      itemGap: "11pt",
      large: "12pt",
      medium: "7pt",
      small: "4pt",
    },
    radius: "6px",
    lineHeight: "1.5",
    headingLetterSpacing: "0.12em",
    headingTransform: "uppercase",
  },
  components: { ...defaultComponents, Skills: SkillChips },
};
