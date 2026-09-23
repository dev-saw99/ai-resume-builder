import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";
import { SkillChips } from "./shared";

/**
 * Nordic — two-column with a frosted left sidebar (skills, education,
 * languages) and a calm slate-blue accent.
 */
export const nordic: Theme = {
  id: "nordic",
  name: "Nordic",
  className: "theme-nordic",
  sidebar: ["skills", "education", "certifications", "achievements", "languages", "interests"],
  sidebarPosition: "left",
  tokens: {
    colors: {
      primary: "#3b6ea5",
      text: "#1f2937",
      muted: "#4b5563",
      faint: "#9ca3af",
      border: "#d6e4f0",
      background: "#ffffff",
    },
    font: {
      body: "'Lato', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Lato', 'Helvetica Neue', Arial, sans-serif",
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
    radius: "6px",
    lineHeight: "1.5",
    headingLetterSpacing: "0.14em",
    headingTransform: "uppercase",
  },
  components: { ...defaultComponents, Skills: SkillChips },
};
