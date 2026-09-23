import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";
import { MonogramHeader, SkillChips } from "./shared";

/**
 * Indigo — two-column with a saturated indigo→violet sidebar holding the
 * monogram, contact and skills; airy white main column.
 */
export const indigo: Theme = {
  id: "indigo",
  name: "Indigo",
  className: "theme-indigo",
  sidebar: ["skills", "education", "certifications", "languages", "interests", "awards"],
  sidebarPosition: "left",
  headerInSidebar: true,
  previewHint: "colorSidebar",
  tokens: {
    colors: {
      primary: "#4f46e5",
      text: "#1e1b4b",
      muted: "#4b5563",
      faint: "#9ca3af",
      border: "#e0e7ff",
      background: "#ffffff",
    },
    font: {
      body: "'Plus Jakarta Sans', 'Inter', Arial, sans-serif",
      heading: "'Plus Jakarta Sans', 'Inter', Arial, sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "20pt",
      display: "16pt",
      heading: "9.5pt",
      title: "10.5pt",
      body: "9.5pt",
      small: "8.75pt",
      caption: "8pt",
    },
    spacing: {
      page: "10mm",
      sectionGap: "14pt",
      itemGap: "11pt",
      large: "12pt",
      medium: "7pt",
      small: "4pt",
    },
    radius: "10px",
    lineHeight: "1.5",
    headingLetterSpacing: "0.14em",
    headingTransform: "uppercase",
  },
  components: { ...defaultComponents, Header: MonogramHeader, Skills: SkillChips },
};
