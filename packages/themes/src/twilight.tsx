import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";
import { SkillChips } from "./shared";

/**
 * Twilight — dark two-column: deep indigo page, lavender accent, a
 * right-hand panel for skills and education.
 */
export const twilight: Theme = {
  id: "twilight",
  name: "Twilight",
  className: "theme-twilight",
  sidebar: ["skills", "education", "certifications", "languages", "interests", "awards"],
  tokens: {
    colors: {
      primary: "#a78bfa",
      text: "#e9e5f5",
      muted: "#b3accb",
      faint: "#7a7396",
      border: "#2b2547",
      background: "#120f24",
    },
    font: {
      body: "'DM Sans', 'Inter', Arial, sans-serif",
      heading: "'DM Sans', 'Inter', Arial, sans-serif",
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
    radius: "10px",
    lineHeight: "1.55",
    headingLetterSpacing: "0.14em",
    headingTransform: "uppercase",
  },
  components: { ...defaultComponents, Skills: SkillChips },
};
