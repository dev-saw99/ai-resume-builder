import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";
import { SkillChips } from "./shared";

/**
 * Coral — warm two-column: coral accent bar on the letterhead and a
 * blush right sidebar of skill chips and education.
 */
export const coral: Theme = {
  id: "coral",
  name: "Coral",
  className: "theme-coral",
  sidebar: ["skills", "education", "certifications", "languages", "interests", "awards"],
  tokens: {
    colors: {
      primary: "#e8553d",
      text: "#2b2b2b",
      muted: "#555555",
      faint: "#a3a3a3",
      border: "#f3d5cc",
      background: "#ffffff",
    },
    font: {
      body: "'DM Sans', 'Inter', Arial, sans-serif",
      heading: "'DM Sans', 'Inter', Arial, sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "26pt",
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
    radius: "8px",
    lineHeight: "1.5",
    headingLetterSpacing: "0.12em",
    headingTransform: "uppercase",
  },
  components: { ...defaultComponents, Skills: SkillChips },
};
